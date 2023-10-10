import { useAppContext } from '../../../contexts/Context'
import { copyPosition, getNewMoveNotation } from '../../../helper'
import { clearCandidates, makeNewMove } from '../../../reducer/actions/move'
import './Promotion.css'

const Promotion = ({onClosePopup}) => {
    const options = ['queen', 'rook', 'bishop', 'knight']

    const {appState, dispatch} = useAppContext()
    const {promotionSquare} = appState

    if(!promotionSquare)
        return null

    const color = promotionSquare.x === 7 ? 'white' : 'black'

    const getPromotionBoxPosition = () => {
        const style = {}
        if(promotionSquare.x === 7) 
            style.top = '-12.5%'
        else 
            style.top = '97.5%'

        if(promotionSquare.y <= 1)
            style.left = '0%'
        else if (promotionSquare.y >= 6)
            style.right = '0%'
        else    
            style.left = `${12.5 * promotionSquare.y -20}%`

        return style
    }

    const onclick = option => {
        onClosePopup()
        const newPosition = copyPosition(appState.position[appState.position.length - 1])

        newPosition[promotionSquare.rank][promotionSquare.file] = ''
        newPosition[promotionSquare.x][promotionSquare.y] = color + option

        dispatch(clearCandidates())

        const newMove = getNewMoveNotation({
            ...promotionSquare,
            piece : color + 'p',
            promotesTo : option,
            position : appState.position[appState.position.length -1]
        })
        dispatch (makeNewMove({newPosition,newMove}))
    }

    return <div className='popup-inner promotion-choices' style={getPromotionBoxPosition()}>
        {
            options.map(option => 
                <div key={option}
                    className={`piece ${color}${option}`}
                    onclick = {() => onclick(option)}>  
                </div>
                )
        }
    </div>
}

export default Promotion