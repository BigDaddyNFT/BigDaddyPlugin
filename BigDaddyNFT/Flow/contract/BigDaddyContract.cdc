// Importation des contrats nécessaires
import FungibleToken from 0x9a0766d93b6608b7
import FUSD from 0xe223d8a629e49c68

// Déclaration du contrat principal
pub contract BigDaddyContract {

    // Variables privées
    access(self) var templates: {UInt32: Template}
    access(self) var availableNFTs: @{UInt64: BigDaddyNFT}
    access(self) var nextTemplateID: UInt32
    access(self) var totalBigDaddyNFTs: UInt64
    access(self) var bigDaddyAuthorisation: {UInt64: String}

    // Constantes publiques
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterCollectionPublicPath: PublicPath
    pub let ReceiverPublicPath: PublicPath

    // Définition de la structure Template
    pub struct Template {
        pub let templateID: UInt32
        pub let name: String
        pub let price: UFix64
        access(contract) let templateKey: String
        pub let creator: Address

        // Initialisation du modèle
        init(templateID: UInt32, name: String, price: UFix64, creator: AuthAccount) {
            self.templateID = templateID
            self.name = name
            self.price = price
            self.creator = creator.address
            self.templateKey = self._calculateTemplateKey()
        }

        // Fonction de calcul de la clé du modèle
        access(self) fun _calculateTemplateKey(): String {
        let templateKey = HashAlgorithm.SHA2_256.hashWithTag(self.name.utf8, tag: self.templateID.toString())

        // Convertir le tableau d'octets en chaîne hexadécimale
        let templateKeyString = String.encodeHex(templateKey)
        // Vérifier si le templateKey généré existe déjà
        for key in BigDaddyContract.templates.keys {
        if (BigDaddyContract.templates[key]?.templateKey == templateKeyString) {
        panic ("Sorry you have to change you NFT collection name.")
        }
      } 

        return templateKeyString
    }

    }

    // Ressource BigDaddyNFT
    pub resource BigDaddyNFT {
        pub let id: UInt64
        pub let data: Template

        // Initialisation de BigDaddyNFT
        init(templateID: UInt32, creator: AuthAccount) {
            pre {
                BigDaddyContract.templates[templateID] != nil : "Could not create BigDaddyNFT: template does not exist."
            }
            let bigDaddyNFTTemplate = BigDaddyContract.templates[templateID]!
            BigDaddyContract.totalBigDaddyNFTs = BigDaddyContract.totalBigDaddyNFTs + 1
            self.id = BigDaddyContract.totalBigDaddyNFTs
            self.data = bigDaddyNFTTemplate
            self.addKeyValuePair(templateKey: self.data.templateKey, nftId: self.id)
        }

                // Fonction d'ajout d'une paire de clés au contrat
        access(self) fun addKeyValuePair(templateKey: String, nftId: UInt64) {
            // Vérifier si la clé existe déjà
            if BigDaddyContract.bigDaddyAuthorisation[nftId] == nil {
                // Si elle n'existe pas, ajouter la paire au dictionnaire
                BigDaddyContract.bigDaddyAuthorisation[nftId] = templateKey
            } else {
                // Sinon, afficher un message d'erreur ou traiter comme vous le souhaitez
                panic("L'ID du NFT existe déjà dans le dictionnaire.")
            }
        }
    }

  // MinterCollectionPublic est une interface pour les utilisateurs ou les contrats qui peuvent créer (ou "miner") de nouveaux NFT.
  pub resource interface MinterCollectionPublic {
      // mintBigDaddyNFTNewTemplate crée de nouveaux NFT à partir d'un nouveau modèle. 
      // Le modèle est défini par son nom, son prix et l'adresse du compte qui l'a créé (minter).
      // La quantité de NFT à créer à partir de ce modèle est également spécifiée.
      pub fun mintBigDaddyNFTNewTemplate(name: String, price: UFix64, quantity: UInt16, minter: AuthAccount)

      // mintBigDaddyNFTExistingTemplate crée de nouveaux NFT à partir d'un modèle existant.
      // Le modèle est identifié par son ID de modèle, et la quantité de NFT à créer à partir de ce modèle est spécifiée.
      // Le compte qui crée le NFT (minter) est également spécifié.
      pub fun mintBigDaddyNFTExistingTemplate(quantity: UInt16, minter: AuthAccount)

      // getSiteID récupère l'ID du site associé à la collection de NFT.
      pub fun getSiteID() : String
  }

  // CollectionPublic est une interface pour les utilisateurs ou les contrats qui peuvent lire les informations d'accès personnelles de la collection.
  pub resource interface CollectionPublic {
      // getPersonalAccess vérifie si un utilisateur a accès à un site spécifique en fonction de son ID de site.
      // Il retourne un booléen qui est vrai si l'utilisateur a accès au site, et faux sinon.
      pub fun getPersonalAccess(siteID: String): Bool
  }

  // Receiver est une interface pour les utilisateurs ou les contrats qui peuvent déposer des NFT dans la collection.
  pub resource interface Receiver {
      // deposit prend un NFT et le dépose dans la collection.
      pub fun deposit(token: @BigDaddyNFT)
  }


  pub resource Collection: CollectionPublic, Receiver, MinterCollectionPublic {
    access(self) var ownedBigDaddyNFTs: @{UInt64: BigDaddyNFT}
    access(self) var myUserKeys: [UInt64]
    access(self) var siteId : String

  pub fun mintBigDaddyNFTNewTemplate(name: String, price: UFix64, quantity: UInt16, minter: AuthAccount) {

      for key in BigDaddyContract.templates.keys {
        if (BigDaddyContract.templates[key]?.creator == minter.address) {
        panic ("user allready have a SiteID")
        }
      } 
       
      let newTemplateID = BigDaddyContract.nextTemplateID
      BigDaddyContract.templates[newTemplateID] = Template(templateID: newTemplateID, name: name, price: price, creator: minter)
      BigDaddyContract.nextTemplateID = BigDaddyContract.nextTemplateID + 1
      self.siteId = BigDaddyContract.templates[newTemplateID]?.templateKey ?? panic("Problem during siteId Generation")
      self.mintBigDaddyNFTExistingTemplate(quantity: quantity, minter: minter)
    }

    pub fun mintBigDaddyNFTExistingTemplate(quantity: UInt16, minter: AuthAccount) {
      var templateID :UInt32 = 0

      for key in BigDaddyContract.templates.keys {
      if (BigDaddyContract.templates[key]?.creator == minter.address) {
          templateID = BigDaddyContract.templates[key]?.templateID ?? panic("pas de Template a créer pour cet utilisateur")
        }
      }
      var a: UInt16 = 0
      while a < quantity {
        self.createNFT(templateID: templateID, minter: minter)
        a = a + 1
      } 
    }

    access(self) fun createNFT(templateID: UInt32, minter: AuthAccount) {
      let newNFT <- create BigDaddyNFT(templateID: templateID, creator: minter)
      BigDaddyContract.availableNFTs[newNFT.id] <-! newNFT
    }

    pub fun getSiteID() : String {
      return self.siteId
    }

    destroy() {
      destroy self.ownedBigDaddyNFTs
    }

    pub fun deposit(token: @BigDaddyNFT) {
      // Vérifie si un token avec le même ID existe déjà.
    if (self.ownedBigDaddyNFTs[token.id] != nil) {
        panic("Un token avec cet ID existe déjà!")
    }

    // Si non, ajoute le nouveau token.
    self.ownedBigDaddyNFTs[token.id] <-! token
    }

    pub fun getPersonalAccess(siteID: String): Bool {
      self.myUserKeys = []
      
      for key in self.ownedBigDaddyNFTs.keys {
      let nftKey = self.ownedBigDaddyNFTs[key]?.id ?? panic("No Big DaddyNFT! Sorry!")
      self.myUserKeys.append(nftKey)
      }

      var isValidate = false;

      // Parcourir toutes les clés dans myUserKeys
    for userKey in self.myUserKeys {
        // Vérifier si la clé existe dans bigDaddyAuthorisation
        if let templateKey = BigDaddyContract.bigDaddyAuthorisation[userKey] {
            // Si oui, vérifier si le templateKey est égal à siteID
            if templateKey == siteID {
                isValidate = true
                // Si la condition est remplie, nous pouvons interrompre la boucle
                break
            }
        }
    }

      return isValidate
    }

    init() {
      self.ownedBigDaddyNFTs <- {}
      self.myUserKeys = []
      self.siteId = ""
    }
  }

  pub fun createEmptyCollection(): @Collection {
    return <-create self.Collection()
  }

  pub fun buyBigDaddyNFT(siteID: String, buyer: AuthAccount): @BigDaddyNFT? {

  let template = self.getTemplate(siteID: siteID) ?? panic ("Did not found NFT to buy")

  if (template.price != 0.0) {
  // Récupération du compte du créateur
  let creatorAddress = template.creator
  let creatorAccount = getAccount(creatorAddress)
  let buyerAccount = getAccount(buyer.address)

  // Création de la référence de paiement pour le compte du créateur
  let creatorPaymentReceiverRef = creatorAccount.getCapability(/public/fusdReceiver)
                                                .borrow<&FUSD.Vault{FungibleToken.Receiver}>()
                                                ?? panic("Could not borrow payment receiver reference from the creator")

  let vaultRef = buyerAccount.getCapability(/public/fusdBalance).borrow<&FUSD.Vault{FungibleToken.Balance}>() ?? panic("Could not borrow FUSD vault Balance")
  let providerRef = buyerAccount.getCapability(/public/fusdProvider).borrow<&FUSD.Vault{FungibleToken.Provider}>() ?? panic("Could not borrow FUSD vault")

  // Assurez-vous que le paiement est suffisant pour le NFT
  assert(
    vaultRef.balance >= template.price,
    message: "Insufficient funds for purchasing this NFT"
  )

  // Transférer les fonds au créateur
  creatorPaymentReceiverRef.deposit(from: <-providerRef.withdraw(amount: template.price))
  }

  // Retirer le NFT des NFTs disponibles
  let nft <- self.removeFromAvailableNFTs(templateID: template.templateID)

  // Renvoyer le NFT
  return <-nft
}

// Une fonction pour retirer un NFT de la collection de NFTs disponibles en utilisant un templateID
  access(self) fun removeFromAvailableNFTs(templateID: UInt32): @BigDaddyNFT? {
    for key in self.availableNFTs.keys {
      if self.availableNFTs[key]?.data?.templateID == templateID {
        let removedNFT <- self.availableNFTs.remove(key: key)
        return <-removedNFT
      }
    }
    panic("No NFT found with this templateID")
  }

// Une fonction pour retirer un NFT de la collection de NFTs disponibles en utilisant un templateID
  pub fun getTemplatebyCreatorAdress(creator: Address): Template? {
    for key in BigDaddyContract.templates.keys {
        if (BigDaddyContract.templates[key]?.creator == creator) {
        return BigDaddyContract.templates[key]
        }
      } 
     return nil 
  }


pub fun getTemplate(siteID: String):  Template? {
  
  // Parcourir les modèles et retourner le modèle correspondant
    for key in self.templates.keys {
        if (self.templates[key]?.templateKey == siteID) {
          return self.templates[key]
        }
      }

  // Si aucun modèle ne correspond, retourner nil
  return nil
  }

  init() {
    self.templates = {}
    self.availableNFTs <- {}
    self.totalBigDaddyNFTs = 0
    self.nextTemplateID = 1
    self.bigDaddyAuthorisation = {}
    self.CollectionStoragePath = /storage/BigDaddyNFTCollection
    self.CollectionPublicPath = /public/BigDaddyNFTCollectionPublic
    self.MinterCollectionPublicPath = /public/BigDaddyNFTMinterCollectionPublic
    self.ReceiverPublicPath = /public/BigDaddyNFTReceiverPublic
  }
}
