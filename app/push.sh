mv ../bower_components .
tar --exclude=release --exclude=node_modules --exclude=.git -czvf ../release/0.0.1/webapp.tar.gz *.html *.js *.map *.css \
META-INF WEB-INF bower_components/**/dist/* assets/*  bower_components/PACE/** bower_components/perfect-scrollbar/**
mv ./bower_components ../
git add ../release/
git commit -m "autopush"
git push
curl -X GET "https://v2.namsor.com/NamSorAPIv2/api2/json/redeployUI" -H "accept: */*" -H "X-API-KEY: 19cc95884c46d1a1e664aa520f7213fc"
