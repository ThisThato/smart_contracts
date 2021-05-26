//Web3 setup
const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          //get user permission
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
const abi = JSON.parse(
  '[ { "inputs": [ { "internalType": "address", "name": "_member", "type": "address" } ], "name": "addMember", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_member", "type": "address" } ], "name": "delMember", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_message", "type": "string" } ], "name": "setQuote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "getQuote", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "whiteList", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" } ]'
);

//Contract
const getContract = async (web3) => {
  const quote = new web3.eth.Contract(abi, contractAddress);
  return quote;
};

//Smart contract functions
const getQuote = async (result, contract) => {
  result = await contract.methods.getQuote().call();
  //display label to contract quote
  document.getElementById("lastInfo").innerHTML = result;
};

const setQuote = (result, contract, accounts) => {
  let input;
  $("#input").on("change", (e) => {
    input = e.target.value;
  });

  $("#form").on("submit", async (e) => {
    e.preventDefault();
    await contract.methods.setQuote(input).send({ from: accounts[0] });
    setQuote(result, contract);
  });
};

//Application
async function quoteApp() {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = await getContract(web3);

  let quote;

  getQuote(quote, contract);
  setQuote(quote, contract, accounts);
}

quoteApp();
