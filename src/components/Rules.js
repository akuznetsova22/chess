import PieceType from "./PieceType";
import Player from "./Player";

class Rules {
    //checks whether cell is taken by any piece
    cellIsFree(x, y, currBoard){
        const cellFill = currBoard.find (piece => piece.x === x && piece.y === y);
        return cellFill;
    }
    //gets the opposite player color
    getEnemy(player){
        let enemy;
        if (player === Player.WHITE){
            enemy = Player.BLACK;
        } else {
            enemy = Player.WHITE
        }
        return enemy;
    }
    //checks whether opponent piece is taking the cell
    cellIsTakenByEnemy(x,y,currBoard, player){
        const cellFill = currBoard.find (piece => piece.x === x && piece.y === y);
        if (!cellFill){
            return false
        }
        else if (cellFill.player === this.getEnemy(player)){
            return true;
        }
        return false;

    }
   
    isValidMove(prevX, prevY, curX, curY, type, player, currBoard){
      
         //pawns move rules
        if (type === PieceType.PAWN){
            //initiating supplement docuemnts based on the current player
            let initialRow;
            let difference;
            if (player === Player.WHITE) {
                initialRow = 6;
                difference = -1
            } else {
                initialRow = 1;
                difference = 1;
            } 
            //allows first move to be 1 or 2 cells ahead
            if (prevY === initialRow && prevX === curX && curY - prevY === 2 * difference ){
                if (!this.cellIsFree(curX,curY, currBoard) && !this.cellIsFree(curX,curY - difference, currBoard)){
                    return true;
                }
            }
            else if (prevX === curX && curY - prevY === difference){
                if (!this.cellIsFree(curX,curY,currBoard)){
                        return true;
                    }
            }  
            // attacking the opponent
            else if (curX - prevX === -1 && curY - prevY === difference) {
                if (this.cellIsTakenByEnemy(curX,curY,currBoard,player)){
                    return true;
                }
            }
            else if (curX - prevX === 1 && curY - prevY === difference) {
                if (this.cellIsTakenByEnemy(curX,curY,currBoard,player)){
                    return true;
                } 
            }
        } 
        return false;
    }
}
export default Rules;
