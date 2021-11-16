import BigNumber from 'bignumber.js'
import {BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_PER_YEAR} from 'config'

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: number,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cakePriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApr = (poolWeight: BigNumber, cakePriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyCakeRewardAllocation = CAKE_PER_YEAR.times(poolWeight)
  const apr = yearlyCakeRewardAllocation.times(cakePriceUsd).div(poolLiquidityUsd).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}
/**
 * Calculate Vault Daily APR
 * 
 * @param dailyPoolRewardUsd daily reward of the pool in USD
 * @param tvlInQuoteToken TVL of pool in quote token form
 * @param quotoTokenPriceUsd price per quote token
 * @returns apr as a number unless its null or inifinite
 */
export const getVaultApr = (dailyPoolRewardUsd: BigNumber, tvlInQuoteToken: BigNumber, quoteTokenPriceUsd: BigNumber): number =>{
  const tvlInUsd = tvlInQuoteToken.times(quoteTokenPriceUsd)
  const apr = dailyPoolRewardUsd.div(tvlInUsd).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get vault APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param tokenPriceUsd token price in USD of the token earned
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @param tokenPerBlock the token per block of the token earned
 * @returns
 */
export const getSpadeVaultApr = (poolWeight: BigNumber, tokenPriceUsd: BigNumber, poolLiquidityUsd: BigNumber, tokenPerBlock: BigNumber): number => {
  const yearlyTokenRewardAllocation = tokenPerBlock.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apr = yearlyTokenRewardAllocation.times(tokenPriceUsd).div(poolLiquidityUsd).times(100).div(365)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export default null