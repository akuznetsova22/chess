import './Figues.css'
function Figure(props){
    return(
        <img className="Figure" src={props.src} alt={props.name}/>
    )
}
export default Figure;