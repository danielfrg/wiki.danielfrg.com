---
title: Setup an Identity Pool for Github Actions
---

## Variables

```terraform
variable "project_id" {
  type    = string
  default = "danielfrg"
}

variable "repo" {
  type    = string
  default = "danielfrg/danielfrg.com"
}
```

## Workload Identity pool and provider:

```terraform
resource "google_iam_workload_identity_pool" "github" {
  workload_identity_pool_id = "github"
  display_name              = "github"
  description               = "Pool for GitHub deployments"
}

resource "google_iam_workload_identity_pool_provider" "github" {
  project                            = var.project_id
  workload_identity_pool_provider_id = "github-actions"
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.actor"      = "assertion.actor"
    "attribute.aud"        = "assertion.aud"
    "attribute.repository" = "assertion.repository"
  }

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}
```

## Service account:

```terraform
resource "google_service_account" "github_actions" {
  project      = var.project_id
  account_id   = "github-actions"
  display_name = "Used for GitHub Actions"
}

# Add any roles that the SA needs. For example to upload to GCS
resource "google_project_iam_member" "github_action_storage_admin" {
  project = var.project_id
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}
```

[List of roles](https://cloud.google.com/iam/docs/understanding-roles)

## Link a repo to the service account

Repeat this as needed for each repo:

```terraform
resource "google_service_account_iam_member" "github_actions_workload_identity_repo" {
  service_account_id = google_service_account.github_actions.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository/${var.repo}"
}
```

## Outputs

Use this two values to configure the Github Actions

- Both the SA and IDP are sensitive but not secret. I still put then as Github Secrets.

```Terraform
output "workload_identity_provider" {
  value = "${google_iam_workload_identity_pool.github.name}/providers/${google_iam_workload_identity_pool_provider.github.workload_identity_pool_provider_id}"
}

output "github_actions_service_account" {
  value = google_service_account.github_actions.email
}
```

## Github Actions

```yaml
jobs:
  deploy:
    # This is needed for the Action token to have access
    permissions:
      contents: read
      id-token: write

    steps:
      [... Your steps ...]

      - name: Configure GCP auth
        uses: google-github-actions/auth@v1
        with:
          service_account: ${{ secrets.GCP_SERVICE_ACCOUNT }}
          workload_identity_provider: ${{ secrets.GCP_WORKLOAD_IDENTITY_PROVIDER }}
```
