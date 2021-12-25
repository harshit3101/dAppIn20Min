var Tx     = require('ethereumjs-tx').Transaction
const Web3 = require('web3');
let infuraUrl = "https://rinkeby.infura.io/v3/"+ process.env.INFURA_RINKEBY_API_KEY;

const web3 = new Web3(Web3.givenProvider || infuraUrl);

const account1 = '0xF2E87CEae431Ab8FC7b538825c67eb7D35b83C53' // Your account address 1

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex');
const data = '0x608060405234801561001057600080fd5b506040518060400160405280600481526020017f74657374000000000000000000000000000000000000000000000000000000008152506000908051906020019061005c929190610062565b50610166565b82805461006e90610105565b90600052602060002090601f01602090048101928261009057600085556100d7565b82601f106100a957805160ff19168380011785556100d7565b828001600101855582156100d7579182015b828111156100d65782518255916020019190600101906100bb565b5b5090506100e491906100e8565b5090565b5b808211156101015760008160009055506001016100e9565b5090565b6000600282049050600182168061011d57607f821691505b6020821081141561013157610130610137565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61055f806101756000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632e64cec1146100465780633fa4f2451461006457806393a0935214610082575b600080fd5b61004e61009e565b60405161005b919061036d565b60405180910390f35b61006c610130565b604051610079919061036d565b60405180910390f35b61009c600480360381019061009791906102eb565b6101be565b005b6060600080546100ad90610443565b80601f01602080910402602001604051908101604052809291908181526020018280546100d990610443565b80156101265780601f106100fb57610100808354040283529160200191610126565b820191906000526020600020905b81548152906001019060200180831161010957829003601f168201915b5050505050905090565b6000805461013d90610443565b80601f016020809104026020016040519081016040528092919081815260200182805461016990610443565b80156101b65780601f1061018b576101008083540402835291602001916101b6565b820191906000526020600020905b81548152906001019060200180831161019957829003601f168201915b505050505081565b80600090805190602001906101d49291906101d8565b5050565b8280546101e490610443565b90600052602060002090601f016020900481019282610206576000855561024d565b82601f1061021f57805160ff191683800117855561024d565b8280016001018555821561024d579182015b8281111561024c578251825591602001919060010190610231565b5b50905061025a919061025e565b5090565b5b8082111561027757600081600090555060010161025f565b5090565b600061028e610289846103b4565b61038f565b9050828152602081018484840111156102aa576102a9610509565b5b6102b5848285610401565b509392505050565b600082601f8301126102d2576102d1610504565b5b81356102e284826020860161027b565b91505092915050565b60006020828403121561030157610300610513565b5b600082013567ffffffffffffffff81111561031f5761031e61050e565b5b61032b848285016102bd565b91505092915050565b600061033f826103e5565b61034981856103f0565b9350610359818560208601610410565b61036281610518565b840191505092915050565b600060208201905081810360008301526103878184610334565b905092915050565b60006103996103aa565b90506103a58282610475565b919050565b6000604051905090565b600067ffffffffffffffff8211156103cf576103ce6104d5565b5b6103d882610518565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b82818337600083830152505050565b60005b8381101561042e578082015181840152602081019050610413565b8381111561043d576000848401525b50505050565b6000600282049050600182168061045b57607f821691505b6020821081141561046f5761046e6104a6565b5b50919050565b61047e82610518565b810181811067ffffffffffffffff8211171561049d5761049c6104d5565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f830116905091905056fea26469706673582212208a1548447eb3412edee3d43df7c36d47ccd2cb923b01e7991cf6d0a828e724fa64736f6c63430008070033';

//complied bytecode of smart contract 

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(1000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    data: data
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