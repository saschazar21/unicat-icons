#!/bin/bash
set -e

DRY=false
NPMRC=~/.npmrc
CWD=`pwd`
DIST="${CWD}/dist"

# Set dry-run for non tag related commits
if [ "$1" == "dry" ]
then
  echo "[DRY RUN] enabled"
  DRY=true
fi

# Populate .npmrc, if necessary environment variables are set, otherwise exit with error
if [ "$NPM_API_TOKEN" == ""  ] || [ "$NPM_EMAIL" == "" ]
then
  echo "No NPM_API_TOKEN or NPM_EMAIL set! Exiting..."
  exit 1
else
  echo "Populating $NPMRC with credentials..."
  echo "//registry.npmjs.org/:_authToken=$NPM_API_TOKEN" > $NPMRC
  echo "//registry.npmjs.org/:email=$NPM_EMAIL" >> $NPMRC
  echo "Done!"
fi

# Change working directory to $DIST
echo "Changing to directory $DIST"
cd $DIST

if [ $DRY == true ]
then
  echo "Perform a dry-run deployment..."
  npm publish --access public --dry-run
else
  echo "Deploying to npm..."
  npm publish --access public --tag $TRAVIS_TAG
fi
echo "Done!"
