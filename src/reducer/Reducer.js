import { Status } from "../constant"
import actionTypes from "./actionTypes"

export const reducer = (state, action) => {
    switch(action.type){

        case actionTypes.NEW_MOVE : {
            let {position, movesList, turn} = state
            position = [
                ...position,//remebering previous position
                action.payload.newPosition //new position
            ]
            
            movesList = [
                ...movesList,
                action.payload.newMove
            ]
            
            turn = turn === 'white' ? 'black' : 'white'

            return {
                ...state,//state will remain same 
                movesList,
                position,
                turn
            }
        }

        case actionTypes.GENERATE_CANDIDATE_MOVES : {
            return {
                ...state,
                candidateMoves : action.payload.candidateMoves
            }
        }

        case actionTypes.CLEAR_CANDIDATE_MOVES : {
            return {
                ...state,
                candidateMoves : []
            }
        }
        
        case actionTypes.PROMOTION_OPEN : {
            return {
                ...state,
                status : Status.promoting,
                promotionSquare : {...action.payload}
            }
        }

        case actionTypes.PROMOTION_CLOSE : {
            return {
                ...state,
                status : Status.ongoing,
                promotionSquare : null
            }
        }

        case actionTypes.CAN_CASTLE : {

            let {turn, castleDirection} = state
            castleDirection[turn] = action.payload
            return {
                ...state,
                castleDirection
            }
        }

        case actionTypes.STALEMATE : {

            return {
                ...state,
                status : Status.stalemate
            }
        }

        case actionTypes.WIN : {

            return {
                ...state,
                status : action.payload === 'white' ? Status.white : Status.black
            }
        }

        case actionTypes.INSUFFICIENT_MATERIAL : {

            return {
                ...state,
                status : Status.insufficient
            }
        }

        case actionTypes.NEW_GAME : {

            return {
                ...action.payload
            }
        }

        case actionTypes.TAKE_BACK : {
            let {position, movesList, turn} = state

            if(position.length > 1) {
                position = position.slice(0, position.length-1)
                movesList = movesList.slice(0, movesList.length-1)
                turn = turn === 'white' ? 'black' : 'white'
            }

            return {
                ...state,
                position,
                movesList,
                turn
            }
        }
        default : return state
    }

}