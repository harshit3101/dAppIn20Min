const Web3 = require('web3')
let infuraUrlMainnet = "https://mainnet.infura.io/v3/"+ process.env.INFURA_MAINNET_API_KEY;

const web3 = new Web3(infuraUrlMainnet);

// Get average gas price in wei from last few blocks median gas price
// web3.eth.getGasPrice().then((result) => {
//   console.log(web3.utils.fromWei(result, 'ether')
// });

web3.eth.getGasPrice().then(weiGas => 
    console.log("Gas Price In ether",web3.utils.fromWei(weiGas, 'ether')));
  

// Use sha256 Hashing function
console.log("test String in sha3",web3.utils.sha3('Test String'))

// Use keccak256 Hashing function (alias)
console.log("test String in keccak256",web3.utils.keccak256('Test String'))

// Get a Random Hex
console.log(web3.utils.randomHex(32))

// Get access to the underscore JS library
// const _ = web3.utils._

// _.each({ key1: 'value1', key2: 'value2' }, (value, key) => {
//   console.log(key)
// })