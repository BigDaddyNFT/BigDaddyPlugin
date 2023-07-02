curl -L -o BigDaddyNFT.zip https://github.com/BigDaddyNFT/BigDaddyPlugin/zipball/master/
unzip BigDaddyNFT.zip -d src
cd src/BigDaddyNFT-BigDaddyPlugin-76df8bb
cp -r BigDaddyNFT ../
cd ..
cd ..
rm -r src/BigDaddyNFT-BigDaddyPlugin-76df8bb
rm BigDaddyNFT.zip
npm list react-router-dom || npm install react-router-dom
npm list @onflow/fcl || npm install @onflow/fcl
