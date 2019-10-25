#!/bin/bash

git checkout master
yarn build
git checkout gh-pages
rm src.* g*.png index.html
cp dist/* ./
git add .
git commit -m 'Update public page'
git push origin gh-pages
git checkout master
