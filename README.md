
---

# BigDaddyNFT Plugin

## Description

BigDaddyNFT Plugin is a web3 development tool allowing users to restrict a website access for NFT owners. With its user-friendly interface, users can manage their NFTs and restrict website route access based on NFT ownership.

## BigDaddy Ecosystem

- [BigDaddyNFT Plugin](https://gitlab.bigdaddy-nft.com/bigdaddycore/bigdaddynftplugin)
  BigDaddyNFT Plugin is a web3 development tool allowing users to restrict a website access for NFT owners. With its user-friendly interface, users can manage their NFTs and restrict website route access based on NFT ownership.
  
- [BigDaddy Minter Page](https://gitlab.bigdaddy-nft.com/bigdaddycore/bigdaddymintersite)
  BigDaddy Minter Page is a website allowing users to create a NFT Collection. During creation, the BigDaddyContract will generate a siteId. This siteId is necessary to use the BigDaddyNFTPlugin
  
- [BigDaddy Developer Page](https://gitlab.bigdaddy-nft.com/bigdaddycore/bigdaddydeveloppersite)
  BigDaddy Developer Page is a website allowing developers to generate an account on the BigDaddy Gitlab Server (and on BigDaddy Mattermost), and to register a website Template that can be sold on BigDaddyMarketplace. 
  
- [BigDaddy Marketplace](https://gitlab.bigdaddy-nft.com/bigdaddycore/bigdaddymarketplace)
  BigDaddy Marketplace is a website allowing users to but a Website Template and to deploy it with a personnal SiteID on the Internet.

## Installation

### Prerequisites

This application requires the following dependencies:

- "react": "^18.2.0"
- "react-dom": "^18.2.0"
- "react-router-dom": "^6.3.0"
- "@onflow/fcl": "^1.4.1"

### Installation Procedure

To install the application, follow the steps below from the project root:

```bash
curl -O https://bigdaddynft.github.io/BigDaddyMinterSite/bigdaddy.sh
sh bigdaddy.sh
```

## Usage

To use the application, modify the `App.js` file as follows:

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyAwesomeSite from './MyAwesomeSite';
import MyAwesomeAdminPage from './MyAwesomeAdminPage';

// Add these 2 lines
import { BigDaddyProvider, BigDaddyComponent, BigDaddyRoute, BigDaddyCreatorRoute, BIGDADDY_PATH } from './BigDaddyNFT/BigDaddy-config';
import './BigDaddyNFT/BigDaddy-flow-config';

function App() {
  return (
    <BrowserRouter>
// Add The BigDaddyProvider and provide your siteid (from BigDaddy Minter Page), the path you want the user to be redirect after NFT verification,
// the path of the image that you want to represent your NFT, and your logo image path 
     <BigDaddyProvider siteId="mysiteid" pathAfterAuth="mypath" creatorPathAfterAuth="mycreatorpath" imagePath="nftImagePath" logoImagePath="yourlogoImagePath">
        <Routes>
        // Add the route for the BigDaddyComponent
          <Route path={BIGDADDY_PATH} element={<BigDaddyComponent />} />
        // Protect your website routes with BigDaddyRoute
          <Route path="/" element={<BigDaddyRoute><MyAwesomeSite /></BigDaddyRoute>} />
        // Protect your website admin route with BigDaddyCreatorRoute
          <Route path="/admin" element={<BigDaddyCreatorRoute><MyAwesomeAdminPage /></BigDaddyCreatorRoute>} />
        </Routes>
      </BigDaddyProvider>
  </BrowserRouter>   
  );
}

export default App;
```

Go to [BigDaddy Minter Page](http://bigdaddycore.app.bigdaddy-nft.com/bigdaddymintersite/)

Go to [BigDaddy Developer Page](http://bigdaddycore.app.bigdaddy-nft.com/bigdaddydeveloppersite/)

Go to [BigDaddy Marketplace](http://bigdaddycore.app.bigdaddy-nft.com/bigdaddymarketplace/)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

---

## Contributors

BigMahefa (github profile mahefa621@gmail.com)

BigHarick (github profile harick.one@gmail.com)

---

## Contact

You can contact us at bigdaddy@bigdaddy-nft.com or on our mattermost server https://mattermost.bigdaddy-nft.com/

---
