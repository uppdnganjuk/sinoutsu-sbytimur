import React from 'react';
import ArsipCard from '../Components/ArsipCard'
import { Container, Carousel, Image } from 'react-bootstrap';
import Headers from '../Containers/Headers';
import "./PrintPage.css"
import Footers from "../Containers/Footers"
import './WelcomePage.css';
import FotoSamsat from "../Images/bg.jpg"
import LoadingScreen from "../Components/LoadingScreen";

class WelcomePage extends React.Component{
    render(){
        return(
            <div className="PageContainer">
                <LoadingScreen />
                <Headers />
                <h1 className="judul">561 Dalam Genggaman</h1>   
                <Container className="d-flex justify-content-center">
                    <img src={FotoSamsat} className="background"></img>

                </Container>
                <Footers />
            </div>
        )
    }
}
export default WelcomePage
