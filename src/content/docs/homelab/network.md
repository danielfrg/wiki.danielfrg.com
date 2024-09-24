---
title: Network
---

## Network

In Mikrotik I configured 3 subnets.

- `192.168.88.1/24`: Regular devices
- `10.0.0.1/24`: Homelab devices (NUC, RaspberryPis, NAS)
- `10.0.100.1/24`: Kubernetes services using `LoadBalancer` from MetalLb

I use the [`.home.arpa`](https://www.rfc-editor.org/rfc/rfc8375.html) special
domain so I can go to `plex.home.arpa` from anywhere in my network to access my
Plex server.

I configured router DNS to go primarily to a self-hosted
[CoreDNS](https://coredns.io/) server running in Kuberentes at `10.0.100.253`
and secondary to `1.1.1.1`

### Load Balancer: MetalLb

I use [MetalLB](https://metallb.universe.tf/) as a bare metal implementation
`LoadBalancer`

- This way I can use services of type `LoadBalancer` and they will get an IP
  address on that range and that IP address will resolve inside the network
- `IPAddressPool` is set to `10.0.100.1-10.0.100.253`

| Service | IP | | Traefik| `10.0.100.1` | | CoreDNS |`10.0.100.253` |

### DNS: CoreDNS

I point most of the entries to go to Traefik

```plaintext
home.arpa.              IN SOA dns.home.arpa. noc.dns.icann.com. 2015082541 7200 3600 1209600 3600
nas.home.arpa.          IN A 10.0.1.10
storage.home.arpa.      IN A 10.0.1.100
dash.home.arpa.         IN A 10.0.100.1
jdownloader.home.arpa.  IN A 10.0.100.1
nocodb.home.arpa.       IN A 10.0.100.1
plex.home.arpa.         IN A 10.0.100.1
metabase.home.arpa.     IN A 10.0.100.1
transmission.home.arpa. IN A 10.0.100.1
```

## Ingress: Traefik

[Traefik](https://traefik.io/traefik) as the Application Proxy to all the
[software](../3-software).

I can simply point all the DNS entries to the same IP address and Traefik routes
it to the correct service with a simple Rule: `host = "plex.home.arpa"`.

### Exposing services to the outside: Cloudflare

I use Cloudflare to manage my domains so I can use [Cloudflare Tunnels](TODO) to
expose the service to the outside world

- I use Cloudflare Zero Trust to manage who can access my services (family and
  friends)
- That way only valid traffic hits the server and it's totally secure

This also runs inside a kubernetes container using the `cloudflare/cloudflared`
image and some config files.

## Notes

- I have a secondary domain for my private stuff just to separate concerns
- It's pretty crazy I don't pay for any of this, I will be happy to do it but
  the CF free tier is so good I don't have to
- I don't have this open-sourced at the moment because I haven't cleaned it up
  but maybe one day.
