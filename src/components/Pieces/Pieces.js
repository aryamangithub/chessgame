import './Pieces.css'
import Piece from './Piece'
import { useRef } from 'react'
import { useAppContext } from '../../contexts/Context'
import { copyPosition } from '../../helper'
import { clearCandidates, makeNewMove } from '../../reducer/actions/move'
import arbiter from '../../arbiter/arbiter'
import { openPromotion } from '../../reducer/actions/popup'
import { detectStalemate, detectInsufficientMaterial, detectCheckmate, updateCastling } from '../../reducer/actions/game'
import { getNewMoveNotation } from '../../helper'
import { getCastleDirections } from '../../arbiter/getMoves'

const Pieces = () => {

    const ref = useRef()

    const {appState, dispatch} = useAppContext()
    const currentPosition = appState.position[appState.position.length -1]

    const calculateCoords = e => {
        const {top, left, width} = ref.current.getBoundingClientRect()
        const size = width/8
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        return {x,y}
    }

    const updateCastlingState = ({piece,rank,file}) => {
        const direction = getCastleDirections({
            castleDirection : appState.castleDirection,
            piece,rank,file
        })

        if(direction) {
            dispatch(updateCastlingState(direction))
        }
    }

    const openPromotionBox = ({rank, file, x, y}) => {
        dispatch(openPromotion({
            rank : Number(rank),
            file : Number(file),
            x,
            y
        }))
    }

    const move = e => {
        const {x,y} = calculateCoords(e)

        const [piece,rank,file] = e.dataTransfer.getData("text").split(',')
        if(appState.candidateMoves?.find(m => m[0] === x && m[1] === y)){

            const opponent = piece.startsWith('black') ? 'white' : 'black'
            const CastleDirection = appState.CastleDirection[`${piece.startsWith('black') ? 'white' : 'black'}`]
            if((piece === 'white-pawn' && x === 7) || (piece === 'black-pawn' && x === 0)) {
                openPromotionBox({rank,file,x,y})
                return
            }
            if(piece.endsWith('rook') || piece.endsWith('king')) {
                updateCastlingState({piece,rank,file})
            }
            const newPosition = arbiter.performMove({
                position : currentPosition,
                piece, rank, file,
                x,y
            })

            const newMove = getNewMoveNotation({
                piece, rank, file,x,y,position : currentPosition
            })
            
            dispatch(makeNewMove({newPosition, newMove}))

            if(arbiter.insufficientMaterial(newPosition))
                dispatch(detectInsufficientMaterial())
            
            else if(arbiter.isCheckmate(newPosition, opponent, CastleDirection))
                dispatch(detectCheckmate(piece[0]))

            else if(arbiter.isStalemate(newPosition, opponent, CastleDirection))
                dispatch(detectStalemate())
        }
        dispatch(clearCandidates())
    }

    const onDrop = e => {
        e.preventDefault()
        move(e)
    }

    const onDragOver = e => {e.preventDefault()}

    return <div
        className='pieces'
        ref = {ref} 
        onDrop={onDrop}
        onDragOver={onDragOver} >
        {currentPosition.map((r, rank) => 
            r.map((f, file) =>
                currentPosition[rank][file]
                ?   <Piece
                        key={rank+'-'+file}
                        rank = {rank}
                        file = {file}
                        piece = {currentPosition[rank][file]}
                    />
                :   null    
            )
        )} 
    </div>
}


export default Pieces