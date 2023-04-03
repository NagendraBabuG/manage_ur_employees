import { Link } from 'react-router-dom'
import Card from '../cardComponent/cardComponent.jsx'
import './card-directory.css'
const CardDirectory = ({ props }) => {
    console.log('card Directory')
    console.log(props)

    return (<div className='directory-container'>
        {
            props.map((cardContent) => (
                // console.log(cardContent)
                <Link to={cardContent.link} style={{ textDecoration: 'none' }}>
                <Card props={cardContent} />
                </Link>
            ))
        }
    </div>)
}

export default CardDirectory