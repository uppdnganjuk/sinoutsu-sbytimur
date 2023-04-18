import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import "./LoginForm.css";
import config from "../config.json";

import logoBaru from '../Images/logobaru.png';

class LoginForm extends React.Component{
    loginValidate = () => {
        const userEntry = document.getElementById("formUserName").value;
        const passEntry = document.getElementById("formUserPass").value;
        if (userEntry !== config.loginUser || passEntry !== config.loginPass) {
            alert("Gagal Login")
        }else{
            window.location = "/home";
            localStorage.setItem("key","8517969323 9273101277 2476519913 2113710272 3417179016 6457293068 3224900016 8002855273 3871641502 5405196001");
        }
    }
    render(){
        return(
            <div className="container-sm d-flex flex-column align-items-center mt-5" style={{width:"300px"}}>
                
                <img src={logoBaru} className="logo"></img>
            <h1 id="judulLogin">{config.appInfo.appName}</h1>
            <p className="appDesc">{config.appInfo.appDesc}</p>
            <Card className="m-3" style={{width:"300px"}}>
                <Card.Header>Login</Card.Header>
                <Card.Body>
                <Form>
                <Form.Group controlId="formUserName">
                    <Form.Control type="email" placeholder="Username" />
                </Form.Group>
                <Form.Group controlId="formUserPass">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="warning" type="submit" onClick={this.loginValidate}>
                    Login
                </Button>
                </Form>
                </Card.Body>
            </Card>
            </div>
        )
    }
}

export default LoginForm;
