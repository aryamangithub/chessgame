import './App.css';
import Board from './components/Board/Board';
import AppContext from './contexts/Context';
import { reducer } from './reducer/Reducer';
import { useReducer } from 'react';
import { initialGameState } from './constant';
import MovesList from './components/Control/bits/MovesList';
import Control from './components/Control/Control';

function App() {

  const [appState, dispatch] = useReducer(reducer, initialGameState)

  const providerState = {
    appState,
    dispatch
  }
  return (
    <AppContext.Provider value = {providerState}>
        <div className='App'>
            <Board/>
            <Control>
                <MovesList></MovesList>
            </Control>
        </div>
    </AppContext.Provider>
  );
}

export default App;


