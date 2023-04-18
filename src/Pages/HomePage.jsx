import React from 'react';
import LoginForm from "../Components/LoginForm";
import config from "../config.json";
import Footers from "../Containers/Footers";

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.validateAdmin()
    }
    
    validateAdmin = ()=>{
        if(localStorage.getItem("key") == config.key){
            window.location = "/nomorkeluar";
            return;
        }
    }
    render(){
        return(
            <div className="PageContainer">
                <LoginForm />
                {/* <a href="https://peratif.uptppdnganjuk.site"></a> */}
                <Footers />
            </div>
        )
    }
}
export default HomePage