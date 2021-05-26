const { default: Web3 } = require("web3");

//Web3 setup
const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("MetaMask is not installed");
      }
    });
  });
};

const contractAddress = "0x9d0373f9EC7233B99fd372B10d5CeBaabceC2FC2";
const api = JSON.parse(
  '[ { "inputs": [ { "internalType": "address", "name": "_member", "type": "address" } ], "name": "addMember", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_member", "type": "address" } ], "name": "delMember", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_message", "type": "string" } ], "name": "setQuote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "getQuote", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "whiteList", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" } ]'
);

//Contract
const getContract = async (web3) => {
  const quote = new web3.eth.Contract(api, contractAddress);
  return quote;
};

//Smart contract functions
const getQuote = async (result, contract) => {
  result = await contract.methods.getQuote().call();
  document.getElementById("lastInfo").innerHTML = result;
};

const setQuote = () => {};
