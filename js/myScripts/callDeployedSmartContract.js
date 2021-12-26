var Tx     = require('ethereumjs-tx').Transaction
const Web3 = require('web3');
let infuraUrl = "https://rinkeby.infura.io/v3/"+ process.env.INFURA_RINKEBY_API_KEY;

const web3 = new Web3(Web3.givenProvider || infuraUrl);

const account1 = '0xF2E87CEae431Ab8FC7b538825c67eb7D35b83C53' // Your account address 1

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')

var contractAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "val",
				"type": "string"
			}
		],
		"name": "setValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "value",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Set Contract Address
var contractAddress = '0x50ad15439a96a51e5Bf0fE9a8A5E2F9B97CF7f8F'; 

const contract = new web3.eth.Contract(contractAbi, contractAddress);

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to: contractAddress,
    data: contract.methods.setValue('Test Name Yes3').encodeABI()
  }

  // Sign the transaction
  const tx = new Tx(txObject , { chain: 'rinkeby' })
  tx.sign(privateKey1);

  const serializedTx = tx.serialize();
  const raw = '0x' + serializedTx.toString('hex');

  contract.methods.retrieve().call((err, name) => {
    console.log({ err, name });
});

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    if(err){
      console.error('error: ',err);
    }
  // Now go check etherscan to see the transaction!

    if(txHash){
        console.log('txHash:', txHash);
        if(infuraUrl.includes('rinkeby')) {
            console.log("Go to https://rinkeby.etherscan.io/tx/"+txHash+" for checing transaction details");
        }
    }
  })
});


