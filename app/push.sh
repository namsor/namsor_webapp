git pull
mv ../bower_components .
tar --exclude=release --exclude=node_modules --exclude=.git -czvf ../release/0.0.1/webapp.tar.gz \
META-INF WEB-INF bower_components/**/dist/* assets/*  bower_components/PACE/** bower_components/perfect-scrollbar/** \
*.html *.js *.map *.css robots.txt sitemap.xml
mv ./bower_components ../
git add ../release/
git commit -m "autopush"
git push
curl -X GET "https://v2.namsor.com/NamSorAPIv2/api2/json/redeployUI" -H "accept: */*" -H "X-API-KEY: $1"
