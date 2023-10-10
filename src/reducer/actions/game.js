import { initialGameState } from "../../constant"
import actionTypes from "../actionTypes"

export const updateCastling = direction => {
    return {
        type : actionTypes.CAN_CASTLE,
        payload : direction
    }
}

export const detectStalemate = (direction) => {
    return {
        type : actionTypes.STALEMATE,
    }
}

export const detectInsufficientMaterial = (direction) => {
    return {
        type : actionTypes.INSUFFICIENT_MATERIAL,
    }
}

export const detectCheckmate = winner => {
    return {
        type : actionTypes.CHECKMATE,
        payload : winner
    }
}

export const setupNewGame = () => {
    return {
        type : actionTypes.NEW_GAME,
        payload : initialGameState
    }
}