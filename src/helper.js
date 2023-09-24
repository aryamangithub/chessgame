export const getCharacter = file => String.fromCharCode(file + 96)

export const createPosition = () => {

    const position = new Array(8).fill('').map(x=> new Array(8).fill(''))

    // for(let i = 0; i < 8; i++){
    //     position[1][i] = 'white-pawn'
    //     position[6][i] = 'black-pawn'
    // }

    position[0][0] = 'white-rook'
    position[0][1] = 'white-knight'
    position[0][2] = 'white-bishop'
    position[0][3] = 'white-queen'
    position[0][4] = 'white-king'
    position[0][5] = 'white-bishop'
    position[0][6] = 'white-knight'
    position[0][7] = 'white-rook'
    
    position[7][0] = 'black-rook'
    position[7][1] = 'black-knight'
    position[7][2] = 'black-bishop'
    position[7][3] = 'black-queen'
    position[7][4] = 'black-king'
    position[7][5] = 'black-bishop'
    position[7][6] = 'black-knight'
    position[7][7] = 'black-rook'
    
    return position
}

export const copyPosition = position => {
    const newPosition = new Array(8).fill('').map(x => new Array(8).fill(''))

    for(let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            newPosition[rank][file] = position[rank][file]
        }
    }
    return newPosition
}