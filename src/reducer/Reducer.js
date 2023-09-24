import actionTypes from "./actionTypes"

export const reducer = (state, action) => {
    switch(action.type){

        case actionTypes.NEW_MOVE : {
            let {position, turn} = state
            position = [
                ...position,//remebering previous position
                action.payload.newPosition //new position
            ]
            
            turn = turn === 'white' ? 'black' : 'white'

            return {
                ...state,//state will remain same 
                position,
                turn,
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
        default : return state
    }

}