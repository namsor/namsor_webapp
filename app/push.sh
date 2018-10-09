mv ../bower_components .
tar --exclude=release --exclude=node_modules --exclude=.git -czvf ../release/0.0.1/webapp.tar.gz .
mv ./bower_components ../
git add ../release/
git commit -m "autopush"
git push
curl -X GET "http://195.201.247.18:8080/NamSorAPIv2/api2/json/redeployUI" -H "accept: */*" -H "X-API-KEY: 19cc95884c46d1a1e664aa520f7213fc"