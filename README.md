# main-website

# Projet dev C2T

Generate API configuration file base on the openapi.json configuration

1. Place the openapi.json file in scripts/
2. Run "npm run gen_api_config" from the root of the project
3. The api_config.js (minified) file is generated in app/Namsor2/public/javascript/services/api/
4. If debugFile = true then api_config.json (prettyfied) file is generated in scripts/
5. If testMode = true then no file is written but a partial result is logged in the console

In case of red "ERROR !" message, stay calm and contact C2T dev team.
