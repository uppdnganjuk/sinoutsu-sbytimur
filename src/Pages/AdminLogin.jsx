import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import config from "../config.json";
import Footers from "../Containers/Footers"


class AdminLogin extends React.Component{
    constructor(props){
        super(props);
        this.validateAdmin()
    }
    validateAdmin = ()=>{
        if(localStorage.getItem("keyAdmin") == config.keyAdmin){
            window.location = "/admin";
            return;
        }
    }
    loginValidate = () => {
        const userEntry = document.getElementById("formUserName").value;
        const passEntry = document.getElementById("formUserPass").value;
        if (userEntry !== config.loginAdmin || passEntry !== config.loginAdminPass) {
            alert("Gagal Login")
        }else{
            window.location = "/admin";
            localStorage.setItem("keyAdmin","4987782413 9834577753 9109337677 8593305983 6475271696 7991864091 1025675194 4395424304 1114740978 7168908415");
        }
    }
    render(){
        return(
            <div className="container-sm d-flex flex-column align-items-center mt-5" style={{width:"300px"}}>
            <h1 id="judulLogin">admin</h1>
            <p>Sistem Nomor Urut Surat</p>
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
            <Footers />
            </div>
        )
    }
}

export default AdminLogin;