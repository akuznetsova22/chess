import PieceType from "./PieceType";
import Player from "./Player";

class Rules {
    isValidMove(prevX, prevY, curX, curY, type, player, currBoard){
        let isValid = false;
         //pawns move rules
        if (type === PieceType.PAWN){
            isValid = this.movePawn(prevX, prevY, curX, curY, type, player, currBoard); 
        } else if (type === PieceType.KNIGHT){
            isValid = this.moveKnight(prevX, prevY, curX, curY, type, player, currBoard); 
        } else if (type === PieceType.BISHOP){
            isValid = this.moveBishop(prevX, prevY, curX, curY, type, player, currBoard); 
        } else if (type === PieceType.ROOK){
            isValid = this.moveRook(prevX, prevY, curX, curY, type, player, currBoard); 
        } else if (type === PieceType.QUEEN){
            isValid = this.moveQueen(prevX, prevY, curX, curY, type, player, currBoard); 
        } else if (type === PieceType.KING){
            isValid = this.moveKing(prevX, prevY, curX, curY, type, player, currBoard); 
        }
        return isValid;
    }
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
    movePawn(prevX, prevY, curX, curY, type, player, currBoard){
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
        return false;
    }
    moveKnight(prevX, prevY, curX, curY, type, player, currBoard){
        //Knight moves
        if ((curX-prevX===1 || curX-prevX===-1) && curY-prevY===2){
            if (!this.cellIsFree(curX,curY,currBoard)||this.cellIsTakenByEnemy(curX,curY,currBoard,player)){
                return true;
            }
        } else if ((curY-prevY===1 || curY-prevY===-1) && curX-prevX===2){
            if (!this.cellIsFree(curX,curY,currBoard)||this.cellIsTakenByEnemy(curX,curY,currBoard,player)){
                return true;
            }
        } else if ((curX-prevX===1 || curX-prevX===-1) && curY-prevY===-2){
            if (!this.cellIsFree(curX,curY,currBoard)||this.cellIsTakenByEnemy(curX,curY,currBoard,player)){
                return true;
            }
        } else if ((curY-prevY===1 || curY-prevY===-1) && curX-prevX===-2){
            if (!this.cellIsFree(curX,curY,currBoard)||this.cellIsTakenByEnemy(curX,curY,currBoard,player)){
                return true;
            }
        }
        return false;
    }
    moveBishop(prevX, prevY, curX, curY, type, player, currBoard){
        //Bishop moves
        for (let i=1; i<8; i++){
            if (curX > prevX && curY > prevY){
                let routeX = prevX + i;
                let routeY = prevY + i;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player) && (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX < prevX && curY < prevY){
                let routeX = prevX - i;
                let routeY = prevY - i;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)&& (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX < prevX && curY > prevY){
                let routeX = prevX - i;
                let routeY = prevY + i;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)&& (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX > prevX && curY < prevY){
                let routeX = prevX + i;
                let routeY = prevY - i;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)&& (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
        }
        return false;
    }
    moveRook(prevX, prevY, curX, curY, type, player, currBoard){
        for (let i=1; i<8; i++){
            if (curX > prevX && curY === prevY){
                let routeX = prevX + i;
                let routeY = prevY;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player) && (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX < prevX && curY === prevY){
                let routeX = prevX - i;
                let routeY = prevY;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)&& (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX === prevX && curY > prevY){
                let routeX = prevX;
                let routeY = prevY + i;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)&& (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX === prevX && curY < prevY){
                let routeX = prevX;
                let routeY = prevY - i;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)&& (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
        }
        return false;
    }
    moveQueen(prevX, prevY, curX, curY, type, player, currBoard){
        for (let i=1; i<8; i++){
            if (curX > prevX && curY === prevY){
                let routeX = prevX + i;
                let routeY = prevY;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player) && (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX < prevX && curY === prevY){
                let routeX = prevX - i;
                let routeY = prevY;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)&& (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX === prevX && curY > prevY){
                let routeX = prevX;
                let routeY = prevY + i;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)&& (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX === prevX && curY < prevY){
                let routeX = prevX;
                let routeY = prevY - i;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)&& (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX > prevX && curY > prevY){
                let routeX = prevX + i;
                let routeY = prevY + i;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player) && (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX < prevX && curY < prevY){
                let routeX = prevX - i;
                let routeY = prevY - i;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)&& (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX < prevX && curY > prevY){
                let routeX = prevX - i;
                let routeY = prevY + i;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)&& (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
            if (curX > prevX && curY < prevY){
                let routeX = prevX + i;
                let routeY = prevY - i;
                if (this.cellIsFree(routeX, routeY,currBoard)){
                    if (this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)&& (routeX === curX && routeY === curY)){
                        return true;
                    } else {
                        break;                    
                    }
                }  
                if (routeX === curX && routeY === curY){
                    return true;
                }
            }
        }
        return false;

    }
    moveKing(prevX, prevY, curX, curY, type, player, currBoard){
        for (let i = 1; i<2; i++){
            let multX = (curX < prevX)? -1:(curX > prevX)? 1: 0;
            let multY = (curY < prevY)? -1:(curY > prevY)? 1: 0;
            let routeX = prevX + multX*i;
            let routeY = prevY + multY*i;
            if (routeX===curX && routeY ===curY){
                if(!this.cellIsFree(routeX, routeY,currBoard)||this.cellIsTakenByEnemy(routeX, routeY, currBoard, player)){
                    return true;
                } else {
                    if (this.cellIsFree(routeX, routeY,currBoard)){
                        break;
                    }
                }
            }
        }
        return false;
    }
   
    
}
export default Rules;
