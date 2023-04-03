import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import backgroundImg from './home-background.png'
import './home.css'
const Home = () => {
    return (
        <div className="home-container">
            <img src={backgroundImg}/>

        </div>
    )
}


export default Home;