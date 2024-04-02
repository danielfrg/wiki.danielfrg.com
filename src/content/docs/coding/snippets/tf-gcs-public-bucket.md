---
title: Terraform - Create a public GCS bucket
---

For hosting static websites.

```terraform
resource "google_storage_bucket" "cloud_danielfrg_com" {
  name     = "cloud.danielfrg.com"
  location = "US"

  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }

  // Optinally Add CORS policy
  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

# We use member to add another role without removing the existing ones
resource "google_storage_bucket_iam_member" "cloud_danielfrg_com_public" {
  bucket = google_storage_bucket.cloud_danielfrg_com.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

```
