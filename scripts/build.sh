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

# Ask if not provided
if [[ -z "$VERSION_TYPE" ]]; then
  echo "Which version bump? (patch/minor/major)"
  read VERSION_TYPE
fi

npm version "$VERSION_TYPE"

echo "➡️  Cleaning the dist folder (optional)..."
rm -rf dist

echo "🎨 Compiling SCSS themes..."
npm run build:themes

echo "🔨 Building the Vue library..."
npm run build

echo "🚀 Publishing to npm..."
npm publish --access public

echo "✅ Publish successful!"
