---
title: Configuration management
description: How I manage my homelab software
---

All the [software](../3-software) runs in [Kubernetes](https://kubernetes.io/). I use [Terraform](https://www.terraform.io) with it's [kubernetes provider](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs) to manage deployments, services, jobs and so on.

## Network

### Load Balancer

I use [MetalLB](https://metallb.universe.tf/) as a bare metal implementation Load-Balancer

- `IPAddressPool` is set to `192.168.1.200-192.168.1.253`
- This way I can use services of type `LoadBalancer` and they will get an IP address on that range and that IP address will resolve inside the network
- For examples I configured Traefik to be in `192.158.1.200` and CoreDNS in `92.168.1.253`
- Installed using Helm

### DNS

I use the [`.home.arpa`](https://www.rfc-editor.org/rfc/rfc8375.html) special domain so I can go to `plex.home.arpa` from anywhere in my network to access my Plex server.

In the Unity Security Gateway I configured the DNS to go primarily to a [CoreDNS](https://coredns.io/) server running in Kuberentes at `192.168.1.253` and secondary to `1.1.1.1`

```plaintext
home.arpa. IN SOA dns.home.arpa. noc.dns.icann.com. 2015082541 7200 3600 1209600 3600
nas.home.arpa. IN A 192.168.1.150
storage.home.arpa. IN A 192.168.1.150
dash.home.arpa. IN A 192.168.1.200
jdownloader.home.arpa. IN A 192.168.1.200
nocodb.home.arpa. IN A 192.168.1.200
plex.home.arpa. IN A 192.168.1.200
metabase.home.arpa. IN A 192.168.1.200
transmission.home.arpa. IN A 192.168.1.200
```

Installed using helm.

## Traefik

I use [Traefik](https://traefik.io/traefik) as the Application Proxy to all the [software](../3-software).

I can simply point all the DNS entries to the same IP address and Traefik routes it to the correct service with a simple Rule: `host = "nocodb.home.arpa"`.

Installed using helm.

### Exposing services to the outside

I use Cloudflare to manage my domains and use other of it's services:

- Tunnels to expose my self-hosted services domain.
  For example I can go do `https://nocodb.example.com` to access NocoDB
- I use Cloudflare Zero Trust to manage who can access my services (family and friends).
  This way only valid traffic hits the server and it's totally secure

This also runs inside a kubernetes container using the `cloudflare/cloudflared`
image and some config files.

Notes:

- I have a secondary domain for my private stuff just to separete concerns
- It's pretty crazy I don't pay for any of this, I will be happy to do it
  but the free tiers are so good I don't have to

## Managing the servers

I use [Ansible](https://www.ansible.com) to install Kubernetes and other software in the machines.

- I keep its use to a minimal and try to keep everything else in Kubernetes + Terraform
- Roles used:
  - `geerlingguy.containerd`
  - `geerlingguy.kubernetes`
- Other config
  - Download a couple of Kubernetes tools
  - Mount the NAS to `/mnt/nas`

Then I moved the Kubernetes config to my workstation and work directly from there.

## Notes

I don't have this open-sourced at the moment because I haven't cleaned it up.
