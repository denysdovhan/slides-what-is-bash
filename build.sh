#!/usr/bin/env sh

DIST=".deploy"

# Clean dist
[ -d "$DIST" ] && rm -rf "$DIST"
mkdir -p "$DIST"

# Copy files
cp -r bower_components "$DIST"
cp    index.html       "$DIST"
