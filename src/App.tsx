import React, { lazy } from 'react'
import styled from 'styled-components'

import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { usePollCoreFarmData, useFetchProfile, usePollBlockNumber, useFetchReferral } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import Pools from './views/Pools'
import history from './routerHistory'
  
// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
// removed unused pages
const Home = lazy(() => import('./views/Home'))
const Referral = lazy(() => import('./views/Referrals'))
const Farms = lazy(() => import('./views/Farms'))
const Farms2 = lazy(() => import('./views/PoolFarms'))
const Vaults = lazy(() => import('./views/Vaults'))
// const Lottery = lazy(() => import('./views/Lottery'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Collectibles = lazy(() => import('./views/Collectibles'))
// const Teams = lazy(() => import('./views/Teams'))
// const Team = lazy(() => import('./views/Teams/Team'))
// const Profile = lazy(() => import('./views/Profile'))
// const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
// const Predictions = lazy(() => import('./views/Predictions'))

const Logo = styled.div`
  background-color: white;
`

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  useFetchReferral()


  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        {/* for page loading - uses pageLoader defined by ui-kit */}
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/s" exact>
              <Home />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Farms2 />
            </Route>
            {/* <Route path="/vaults">
              <Vaults />
            </Route> */}
            {/* <Route path="/lottery">
              <Lottery />
            </Route>
            <Route path="/ifo">
              <Ifos />
            </Route> */}
            <Route path="/nfts">
              <Collectibles />
            </Route>
            {/* <Route exact path="/teams">
              <Teams />
            </Route>
            <Route path="/teams/:id">
              <Team />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/competition">
              <TradingCompetition />
            </Route>
            <Route path="/prediction">
              <Predictions />
            </Route> */}
            {/* Redirect */}
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            <Route path="/collectibles">
              <Redirect to="/nfts" />
            </Route>
            <Route path="/referrals">
              <Referral />
            </Route>
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      {/* easter egg that shows falling pancakes if konami code is pressed */}
      {/* <EasterEgg iterations={2} /> */}
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
