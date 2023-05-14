import Head from "next/head";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import Link from 'next/link'
import { providers, Contract, ethers } from "ethers";
import { useEffect, useRef, useState } from "react";

//import {abi as abi_Contract } from "../artifacts/contracts/BadgerCoin.sol/BadgerCoin.json";
//import {bytecode as bytecode_Contract} from "../artifacts/contracts/BadgerCoin.sol/BadgerCoin.json";

import { Magic } from 'magic-sdk';


export default function Home() {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);

  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);

  //to store user adress
  const [UserAddress, setUserAddress] = useState(false);

  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  // Used to store deployed contract address
  //const { ContractAddress, setContractAddress } = useContractAddress()
  const [ContractAddress, setContractAddress] = useState("");


  //magic wallet instance



  const deploycontracts = async () => {
    try {
        console.log("here");
  //useEffect(() => {
    const magic = new Magic("pk_live_36A858B5B8CAB160", {
      network: "goerli", // or your own custom node url in the format of { rpcUrl: string chainId: number }
      });
    
    //}, []);
    
      //const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        
        const accounts = await magic.wallet.connectWithUI();
        console.log('Logged in user:', accounts[0]);
        setUserAddress(accounts[0]);
        // We need a Signer here since this is a 'write' transaction.
        //const signer = await getProviderOrSigner(true);

        //var Contracts = new ethers.ContractFactory(abi_Contract, bytecode_Contract, signer);
        //var deployed_Contract = await Contracts.deploy("BadgerCoin","BC",1000000);
        //await deployed_Contract.deployTransaction.wait();
        //setContractAddress(deployed_Contract.address);

        setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  





  

  /*
    connectWallet: Connects the MetaMask wallet
  */


  /*
    renderButton: Returns a button based on the state of the dapp
  */
  const renderButton = () => {

    if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else {
        return (
            <div>
                <div>
          <button onClick={deploycontracts} className={styles.button}>
            Deploy
          </button>
          </div>
          Your wallet address is: {UserAddress}
          </div>
        );
      }
  };



  return (
    <div>
      <Head>
        <title>Boilerplate Hardhat</title>
        <meta name="description" content="Boilerplate-Hardhat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Modify the boilerplate</h1>
          <div className={styles.description}>
            {/* Using HTML Entities for the apostrophe */}
            The boiler plate uses harhart enviroment and ether.js for interacting with the blockchain
          </div>
          <div className={styles.description}>
            Click to Deploy the Sample contract
          </div>
          {renderButton()}
        </div>
        <button className={styles.button}>
          Forum
          <Link href="/snapshot">Snapshot</Link> 
        </button>  
        <div>
          <img className={styles.image} src="./crypto-devs.svg" />
        </div>
      </div>

      <footer className={styles.footer}>
        Not for production purposes
      </footer>
    </div>
  );
}