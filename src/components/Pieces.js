import PieceType from "./PieceType";
import Player from './Player';
function Pieces(){
const size = 8;
    //Creating figures library
const pieces = [];
//adding pawns
for (let i = 0; i < size; i++){
    pieces.push({
        image: 'images/wp.png',
        figureName: 'white pawn',
        x: i,
        y: 6,
        type: PieceType.PAWN,
        player: Player.WHITE,
    });
    pieces.push({
        image: 'images/bp.png',
        figureName: 'black pawn',
        x: i,
        y: 1,
        type: PieceType.PAWN,
        player: Player.BLACK
    });
}
//adding rooks
pieces.push({
    image: 'images/wr.png',
    figureName: 'white rook',
    x: 0,
    y: 7,
    type: PieceType.ROOK,
    player: Player.WHITE
})
pieces.push({
    image: 'images/br.png',
    figureName: 'black rook',
    x: 0,
    y: 0,
    type: PieceType.ROOK,
    player: Player.BLACK
})
pieces.push({
    image: 'images/wr.png',
    figureName: 'white rook',
    x: 7,
    y: 7,
    type: PieceType.ROOK,
    player: Player.WHITE
})
pieces.push({
    image: 'images/br.png',
    figureName: 'black rook',
    x: 7,
    y: 0,
    type: PieceType.ROOK,
    player: Player.BLACK
})
//adding horses
pieces.push({
    image: 'images/wN.png',
    figureName: 'white knight',
    x: 1,
    y: 7,
    type: PieceType.ROOK,
    player: Player.WHITE
})
pieces.push({
    image: 'images/bN.png',
    figureName: 'black knight',
    x: 1,
    y: 0,
    type: PieceType.KNIGHT,
    player: Player.BLACK
})
pieces.push({
    image: 'images/wN.png',
    figureName: 'white knight',
    x: 6,
    y: 7,
    type: PieceType.KNIGHT,
    player: Player.WHITE
})
pieces.push({
    image: 'images/bN.png',
    figureName: 'black knight',
    x: 6,
    y: 0,
    type: PieceType.KNIGHT,
    player: Player.BLACK
})
//adding bishops
pieces.push({
    image: 'images/wB.png',
    figureName: 'white bishop',
    x: 2,
    y: 7,
    type: PieceType.BISHOP,
    player: Player.WHITE
})
pieces.push({
    image: 'images/bB.png',
    figureName: 'black bishop',
    x: 2,
    y: 0,
    type: PieceType.BISHOP,
    player: Player.BLACK
})
pieces.push({
    image: 'images/wB.png',
    figureName: 'white bishop',
    x: 5,
    y: 7,
    type: PieceType.BISHOP,
    player: Player.WHITE
})
pieces.push({
    image: 'images/bB.png',
    figureName: 'black bishop',
    x: 5,
    y: 0,
    type: PieceType.BISHOP,
    player: Player.BLACK
})
//adding kings
pieces.push({
    image: 'images/wK.png',
    figureName: 'white king',
    x: 4,
    y: 7,
    type: PieceType.KING,
    player: Player.WHITE
})

pieces.push({
    image: 'images/bK.png',
    figureName: 'black king',
    x: 4,
    y: 0,
    type: PieceType.KING,
    player: Player.BLACK
})
//adding queens
pieces.push({
    image: 'images/wQ.png',
    figureName: 'white queen',
    x: 3,
    y: 7,
    type: PieceType.QUEEN,
    player: Player.WHITE
})

pieces.push({
    image: 'images/bQ.png',
    figureName: 'black queen',
    x: 3,
    y: 0,
    type: PieceType.QUEEN,
    player: Player.BLACK
})
    return pieces;
}
export default Pieces;