---
title: Configuration management
description: How I manage my homelab software
---

- All the [software](../3-software) runs in [Kubernetes](https://kubernetes.io/)
- I use [Terraform](https://www.terraform.io) with it's
  [kubernetes provider](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs)
  to manage helm charts, deployments, services, jobs and so on

## Managing the servers

I use [Ansible](https://www.ansible.com) to install Kubernetes and other
software in the machines.

- Kubernetes is installed using [KubeSpray]
  - I moved the Kubernetes config to my workstation and work directly from there
- Other than that I use to other minimal tasks such as:
  - Install some dependencies
  - Mount the NAS to `/mnt/nas`
