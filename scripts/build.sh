#!/bin/bash

set -e

# Default value
VERSION_TYPE=""

while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    --version=*)
      VERSION_TYPE="${key#*=}"
      shift
      ;;
    --version)
      VERSION_TYPE="$2"
      shift
      shift
      ;;
    *)
      shift
      ;;
  esac
done

# Ask if not provided and running interactively
if [[ -z "$VERSION_TYPE" ]]; then
  if [ -t 0 ]; then
    echo "Which version bump? (patch/minor/major)"
    read VERSION_TYPE
  else
    echo "⚠️  No version type provided. Defaulting to 'patch'."
    VERSION_TYPE="patch"
  fi
fi

echo "📦 Bumping version: $VERSION_TYPE"

# Use --no-git-tag-version in CI to avoid Git issues
if [ -n "$CI" ]; then
  npm version "$VERSION_TYPE" --no-git-tag-version
else
  npm version "$VERSION_TYPE"
fi

echo "➡️  Cleaning the dist folder..."
rm -rf dist

echo "🔨 Building the Vue library..."
npm run build:package

echo "🚀 Publishing to npm..."
npm publish --access public --//registry.npmjs.org/:_authToken="$NODE_AUTH_TOKEN"
echo "✅ Publish successful!"

echo "✅ Publish successful!"
