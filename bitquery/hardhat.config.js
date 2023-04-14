/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'sepolia', // switched from goerli to sepolia
    networks: {
      hardhat: {},
      goerli: {
        url: 'https://rpc.ankr.com/eth_goerli',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      },
      sepolia: {
        url: 'https://rpc.ankr.com/eth_sepolia',
        accounts: [`0x${process.env.PRIVATE_KEY}`]       
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
