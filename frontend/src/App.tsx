import api from './lib/api'
import './App.css'

import { updateMap } from './store/modules/map'
import { useDispatch, useStore } from 'react-redux'
import GameView from './store/view/GameView'


function App () {

  const dispatch = useDispatch()
  const state = useStore()

  // @ts-ignore
  window.api = api

  // @ts-ignore
  window.action = () => dispatch(updateMap())

  // @ts-ignore
  window.state = state

  // @ts-ignore
  // const handleUpdate = () => dispatch(updateMap())

  return (
    <div className='App'>
      <GameView />
    </div>
  )
}

export default App
