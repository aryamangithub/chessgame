import { createPosition } from "./helper";

export const initialGameState = {
    position : [createPosition()],
    turn : 'white',
    candidateMoves : []
}