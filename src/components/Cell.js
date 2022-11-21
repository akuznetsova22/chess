import './Cell.css';

function Cell(props){
    if (props.type % 2 === 0){
        return (
            <div className='cell white-cell'>
                {props.image&&<div className ='cellImage' style={{backgroundImage:`url(${props.image})`}} name={props.figureName}></div>}
            </div>
        )
    } else {
        return (
            <div className='cell black-cell'>
                {props.image&&<div className ='cellImage' style={{backgroundImage:`url(${props.image})`}} name={props.figureName}></div>}
            </div>
        )
    }
    
}
export default Cell;