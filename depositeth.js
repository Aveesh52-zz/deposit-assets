const Network = require("@maticnetwork/meta/network");
const Matic = require("@maticnetwork/maticjs").default;

const network = new Network("testnet","v3");
const MaticNetwork = network.Matic;
const MainNetwork = network.Main;


const from = '0x8727aff41b503b4c01d757391d3b3a9d38b67dcd'; // from address

const matic = new Matic({
  maticProvider: MaticNetwork.RPC,
  parentProvider: MainNetwork.RPC,
  rootChain: MainNetwork.Contracts.RootChain,
  withdrawManager: MainNetwork.Contracts.WithdrawManagerProxy,
  depositManager: MainNetwork.Contracts.DepositManagerProxy,
  registry: MainNetwork.Contracts.Registry
});

async function init() {
  await matic.initialize();
  await matic.setWallet('0xE86F1698548CFC955C3B3556DFB2C8F35FEB6EA5B35AB90608CBC6B04B9F700F');
}

async function PromiseTimeout(delayms) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, delayms);
  });
}

async function demoEth() {
  await init();
  const amount = "100000000000000000"; // amount in wei
  console.log("*****Deposit ETH*****");

  await matic
    .depositEther(amount, {
      from
    })
    .then(async logs => {
      console.log("Deposit on Ropsten:" + logs.transactionHash);
      await PromiseTimeout(10000);          //-10sec
        });
      }
    
demoEth();