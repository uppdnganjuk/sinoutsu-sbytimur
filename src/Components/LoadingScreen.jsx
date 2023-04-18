import React from "react";
import "./LoadingScreen.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import loading from '../Images/loading.gif'

class LoadingScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : []
        }

    }
    render(){
        return(
            <div id="loadingScreen" className=" hide">
                <div className="loadingImg">
                    <img src={loading} alt=""/>
                </div>
                <div className="loadingBg">
                    
                </div>
            </div>
        )
    }
}

export default LoadingScreen;