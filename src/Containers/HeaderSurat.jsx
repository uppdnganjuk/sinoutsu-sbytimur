import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeaderSurat.css'; 
import config from "../config.json";
import SamsatLogo from "../Images/logosamsat.png"
import JatimLogo from "../Images/jatim.png";


class HeaderSurat extends React.Component{
    render(){
        return(
            <div className="">
                <div className="d-flex align-items-center justify-content-center">
                    <img src={SamsatLogo} className="logoJatim"></img>   
                </div>
                
                    <h5 className="tulisan">KB SAMSAT NGANJUK</h5>
                    <h5 className="tulisan">JL . ANJUK LADANG KOTAK POS 7 NGANJUK</h5>
                    <br />
                    <h5 className="tulisan">SURAT PERNYATAAN LAPOR JUAL</h5>
            </div>
            
        )
    }
}

export default HeaderSurat;