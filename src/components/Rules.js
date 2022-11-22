import PieceType from "./PieceType";
import Player from "./Player";

class Rules {
    isValidMove(prevX, prevY, curX, curY, type, player){
        //pawns move
        if (type === PieceType.PAWN){
            if (player === Player.WHITE){
                if (prevY === 6){
                    if (prevX === curX && (prevY-1 === curY || prevY - 2 === curY)){
                        return true;
                    }
                } 
            }
        } 
        return false;
    }
}
export default Rules;
