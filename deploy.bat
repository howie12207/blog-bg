copy 404.html dist\
cd dist
git init 
git add -A
git commit -m 'deploy'
git push -f https://github.com/howie12207/blog-bg.git master:gh-pages