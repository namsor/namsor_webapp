tar --exclude=release --exclude=node_modules --exclude=.git -zcvf ./release/0.0.1/webapp.tar.gz .
git add *
git commit -m "autopush"
git push
