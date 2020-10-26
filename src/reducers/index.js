import { combineReducers } from 'redux'
import counter from './counter'
import home from './home'
import search from './search'
import appAll from './appAll';
import coin from './coin'
import coinRank from "./coinRank";
import collect from "./collect";
export default combineReducers({
  counter,
  home,
  search,
  appAll,
  coin,
  coinRank,
  collect
})
