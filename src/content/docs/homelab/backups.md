---
title: Backups
---

## Storage

I do a daily backup of my NAS to Backblaze B2.
I simply configured it on Synology and it works great when I need to go
back and get a file.

I would like to maybe have another back of just the plain files.

Backblaze B2 UI is terrible but it's cheap and reliable

## Github

I wrote a simple script
[danielfrg/github-archive](https://github.com/danielfrg/github-archive)
to download all my repos.

I run it on a schedule on [Buildkite](https://buildkite.com) and it saves it to the NAS.
