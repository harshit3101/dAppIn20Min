var Tx     = require('ethereumjs-tx').Transaction
const Web3 = require('web3');
let infuraUrl = "https://rinkeby.infura.io/v3/"+ process.env.INFURA_RINKEBY_API_KEY;

const web3 = new Web3(Web3.givenProvider || infuraUrl);

const account1 = '0xF2E87CEae431Ab8FC7b538825c67eb7D35b83C53' // Your account address 1
const account2 = '0xa4E9d2657C5b851C001b34695a2eDF4297051477' // Your account address 2

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.01', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  // Sign the transaction
  const tx = new Tx(txObject , { chain: 'rinkeby' })
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

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
})