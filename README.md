
---

# BigDaddyNFT

## Description

BigDaddyNFT is a development tool allowing users to create, sell, and manage utility NFTs. With its user-friendly interface, users can manage their NFTs and restrict website route access based on NFT ownership.

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
curl -O https://bigdaddynft.github.io/BigDaddyMinterPage/bigdaddy.sh
sh bigdaddy.sh
```

## Usage

To use the application, modify the `App.js` file as follows:

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyAwesomeSite from './MyAwesomeSite';
// Add these 2 lines
import { BigDaddyProvider, BigDaddyComponent, BigDaddyRoute, BIGDADDY_PATH } from './BigDaddyNFT/BigDaddy-config';
import './BigDaddyNFT/BigDaddy-flow-config';

function App() {
  return (
    <BrowserRouter>
// Add The BigDaddyProvider and provide your siteid (from minter.bigdaddy-nft.com), the path you want the user to be redirect after NFT verification, and the path of the image that you want to represent your NFT 
     <BigDaddyProvider siteId="mysiteid" pathAfterAuth="mypath" imagePath="nftImagePath">
        <Routes>
        // Add the route for the BigDaddyComponent
          <Route path={BIGDADDY_PATH} element={<BigDaddyComponent />} />
        // Protect your website routes with BigDaddyRoute
          <Route path="/" element={<BigDaddyRoute><MyAwesomeSite /></BigDaddyRoute>} />
        </Routes>
      </BigDaddyProvider>
  </BrowserRouter>   
  );
}

export default App;
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

---
