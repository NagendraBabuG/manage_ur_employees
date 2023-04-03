import { Link } from "react-router-dom"
import './cardComponent.css'
const Card = ({ props }) => {
    /*
    card contains
    title, bgc, content, link
    */
    console.log('card Component')
    console.log(props)
    const {title, bgc, content, link} = props
    //style={{backgroundColor:props.bgc}}
    return <div className="card-container" style={{backgroundColor:props.bgc}}>
        <h2 className="card-title">{title}</h2>
        <div className="card-content">{content}</div>
    </div>

}
export default Card;