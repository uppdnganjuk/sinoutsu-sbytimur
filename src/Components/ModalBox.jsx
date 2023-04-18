import React from "react";
import { Navbar, Nav, NavDropdown, Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logobaru from '../Images/logobaru.png'
import config from "../config.json";


class ModalBox extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isAdminLoggedIn : false
        }
        }
        closeBox = ()=>{
            let modal_box = document.getElementById(this.props.id)
            modal_box.style.display = "none"
    }
    render(){
        return(
            <div id={this.props.id} className="yey" style={{display : "none"}}>
            <div
                // className="modal show"
                style={{ display: 'block', position:'absolute', zIndex:200, width:"50vw", left:"50vw",top:"50vh", transform: 'translate(-25vw,-25vh)'}}
            >
                <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
        
                <Modal.Body>
                    <p>{this.props.text}</p>
                </Modal.Body>
        
                <Modal.Footer>
                    <Button variant="primary" onClick={this.closeBox}>OK</Button>
                </Modal.Footer>
                </Modal.Dialog>
            </div>
            <div style={{ display: 'block', position:'absolute', backgroundColor:"black",width:"100vw",height:"100vh",zIndex:100,opacity:0.5}}></div>
            </div>
            
        )
    }
}

export default ModalBox;
