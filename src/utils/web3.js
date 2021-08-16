import Web3 from 'web3'
const web3NoAccount = window.ethereum ? new Web3(window.ethereum) : null

const getWeb3NoAccount = () => {
  return web3NoAccount
}

export { getWeb3NoAccount }

export default web3NoAccount
