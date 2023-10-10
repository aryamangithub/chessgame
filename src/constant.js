import { createPosition } from "./helper";

export const Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'Promoting',
    'white' : 'White wins',
    'black' : 'Black wins',
    'stalemate' : 'by stalemate',
    'insufficient' : 'by insufficient material',
    'castling' : 'castling'
}

export const initialGameState = {
    position : [createPosition()],
    turn : 'white',
    movesList : [],
    candidateMoves : [],
    status : Status.ongoing,
    promotionSquare : null,
    castleDirection : {
        white : 'both',
        black : 'both',
    }
}