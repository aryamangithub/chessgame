import './App.css';
import Board from './components/Board/Board';
import AppContext from './contexts/Context';
import { reducer } from './reducer/Reducer';
import { useReducer } from 'react';
import { initialGameState } from './constant';

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
        </div>
    </AppContext.Provider>
  );
}

export default App;


