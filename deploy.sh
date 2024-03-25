#!/bin/bash
echo "Deploy script started"
cd /var/www/seismic/pms
git stash && git pull origin master
# composer install
echo "Deploy script finished execution"
exit;
