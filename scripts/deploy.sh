#!/bin/bash
zip -r release.zip docker-compose.yml resources/cdp.sql

echo "Installing ghr"
URL="https://github.com/tcnksm/ghr/releases/download/v0.12.0/ghr_v0.12.0_linux_386.tar.gz"
curl -L ${URL} > ghr.tar.gz
tar xvf ghr.tar.gz

./ghr_v0.12.0_linux_386/ghr -t $GITHUB_TOKEN -u acherifi -delete $TRAVIS_TAG release.zip