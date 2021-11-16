// Set of helper functions to facilitate wallet setup

import { BASE_BSC_SCAN_URL } from 'config'
import { nodes } from './getRpcUrl'

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = (window as WindowChain).ethereum
  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
    // new test
    // const chainId = parseInt('588', 10)
    // alert("chainId: ".concat(chainId.toString()))
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            // chainId: `0x${chainId.toString(16)}`,
            // chainName: 'Binance Smart Chain Mainnet',
            // nativeCurrency: {
            //   name: 'BNB',
            //   symbol: 'bnb',
            //   decimals: 18,
            // rinkeby test
            /* chainId: `0x${chainId.toString(16)}`,
            chainName: 'Rinkeby Test Network',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'eth',
              decimals: 18, */
            /* chainId: `0x${chainId.toString(16)}`,
            chainName: 'BSC Testnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'bnb',
              decimals: 18, */
            // },
            // rpcUrls: nodes,
            // blockExplorerUrls: [`https://explorer.binance.org/smart-testnet`],
            // 
            chainId: `0x588`,
            chainName: 'Metis',
            nativeCurrency: {
              name: 'METIS',
              symbol: 'METIS',
              decimals: 18,
            },
            rpcUrls: [`https://stardust.metis.io/?owner=588`],
            blockExplorerUrls: [`https://stardust-explorer.metis.io/`],          },
        ],
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  } else {
    console.error("Can't setup the right network on metamask because window.ethereum is undefined")
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
) => {
  const tokenAdded = await (window as WindowChain).ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  })

  return tokenAdded
}
