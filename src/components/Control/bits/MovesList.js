import {useAppContext} from "../../../contexts/Context"
import './MovesList.css'
const MovesList = () => {

    const {appState} = useAppContext() 

    if(!appState || !appState.MovesList || !Array.isArray(appState.MovesList)){
        return null
    }
    return <div className="moves-list">
        {MovesList.map((move, i) => 
            <div key={i} data-number ={Math.floor((i/2) + 1)}>{move}</div>
        )}
    </div>
}

export default MovesList