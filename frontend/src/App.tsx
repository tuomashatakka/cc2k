import React from 'react';

import api from './lib/api';
import './App.css';

import { mapSlice, updateMap } from './store/modules/map';
import { useDispatch, useStore } from 'react-redux';


function App() {

  const dispatch = useDispatch();
  const state = useStore();

  // @ts-ignore
  window.api = api

  // @ts-ignore
  window.actions= mapSlice
  // @ts-ignore
  window.action = () => dispatch(updateMap())

  // @ts-ignore
  window.state = state

  // @ts-ignore
  const handleUpdate = () => dispatch(updateMap())

  return (
    <div className="App">
      <button className="App-header" onClick={ handleUpdate }>
      PAINA</button>
    </div>
  );
}

export default App;
