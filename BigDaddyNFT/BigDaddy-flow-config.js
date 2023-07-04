import { config } from "@onflow/fcl";

config({
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
    "accessNode.api": "https://rest-testnet.onflow.org",
    "flow.network": "testnet"
    //,  Mainnet: "https://rest-mainnet.onflow.org"
  //"discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn" // Mainnet: "https://fcl-discovery.onflow.org/authn"
})
