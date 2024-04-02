---
title: Backups
---

## Storage

I do a daily backup of my NAS to AWS S3.

- For software config files I use Synology backup
    - It works great when I need to go back and some simple files
- For media files I use rclone to run a daily backup to AWS S3 Glacier (TODO)

## Github repos

I wrote a simple script
[danielfrg/github-archive](https://github.com/danielfrg/github-archive) to download all my repos

- I run it on a schedule on Github CI and it saves it to the NAS. Which is then backed up to AWS

## Google drive and Photos

Still need to figure out how to backup to the NAS