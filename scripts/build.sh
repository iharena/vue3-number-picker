#!/bin/bash

set -e

echo "➡️  Cleaning the dist folder..."
rm -rf dist

echo "🔨 Building the Vue library..."
npm run build:package

echo "🚀 Publishing to npm..."
npm publish --access public --//registry.npmjs.org/:_authToken="$NODE_AUTH_TOKEN"
echo "✅ Publish successful!"

echo "✅ Publish successful!"
