import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Headers.css';
import logobaru from '../Images/sinoutsu.png'
import config from "../config.json";


class Headers extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isAdminLoggedIn : false
        }
        this.showAdminLogOut();
    }
    showAdminLogOut = ()=>{
        if(localStorage.getItem("keyAdmin") == config.keyAdmin){
            this.state.isAdminLoggedIn = true;
        }
    }
    showAdminLogOutExecute = ()=>{
        if(this.state.isAdminLoggedIn){
            return (
                <Button variant="warning" onClick={this.logOutAdmin} className="logOutButton">Logout Admin</Button>
            )
        }
        return;
    }
    logOut = ()=>{
        localStorage.removeItem("key");
        alert("User Berhasil Keluar");
        window.location = "/";
    }
    logOutAdmin = ()=>{
        localStorage.removeItem("keyAdmin");
        alert("Admin Berhasil Keluar");
        window.location = "/";
    }
    render(){
        return(
            <Navbar bg="light" expand="lg">
                <img src={logobaru} className="logobaru"></img>
                <Navbar.Brand href="/" className="ml-3">Sinoutsu
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="d-flex justify-content-between">
                        {/* <Nav.Link href="/home">Beranda</Nav.Link> */}
                        {/* <Nav.Link href="https://sites.google.com/view/sirajanganjuk">Siraja</Nav.Link> */}
                        {/* <NavDropdown title="Sinohman" id="basic-nav-dropdown" className="">
                            <NavDropdown.Item href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAADWSKINUNlBJOFJWVFkxVE02Tk0zMUc4MUZROVlHMy4u">Formulir</NavDropdown.Item>
                            <NavDropdown.Item href="https://forms.office.com/Pages/DesignPage.aspx?lang=en-US&origin=OfficeDotCom&route=OfficeHome&fromAR=1#Analysis=true&FormId=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAADWSKINUNlBJOFJWVFkxVE02Tk0zMUc4MUZROVlHMy4u">Rekap Sinohman</NavDropdown.Item>
                        </NavDropdown> */}
                        {/* <NavDropdown title="Sinoutsu" id="basic-nav-dropdown" className=""> */}
                            {/* <Nav.Link href="/nomormasuk">Surat Masuk</Nav.Link>
                            <Nav.Link href="/arsip/nomormasuk">Arsip Surat Masuk</Nav.Link> */}
                            <Nav.Link href="/nomorkeluar">Ambil Surat Keluar</Nav.Link>
                            <Nav.Link href="/arsip/nomorkeluar">Arsip Surat Keluar</Nav.Link>
                            <Nav.Link href="/adminlogin">Admin Nomor</Nav.Link>
                        {/* </NavDropdown> */}
                        {/* <NavDropdown title="Pesta Keju" id="basic-nav-dropdown" className="">
                            <NavDropdown.Item href="https://docs.google.com/forms/d/12t4MZiHlrdrmTZtGFju-rK1maHYBZR_2NIbhVp9wRho/edit">Formulir</NavDropdown.Item>
                            <NavDropdown.Item href="/laporjual">Cetak Formulir</NavDropdown.Item>
                        </NavDropdown> */}
                        {/* <NavDropdown title="Sipekat" id="basic-nav-dropdown" className="">
                            <NavDropdown.Item href="https://bit.ly/SKM_SAMSAT_NGANJUK">Formulir Sipekat</NavDropdown.Item>
                            <NavDropdown.Item href="https://bit.ly/samsatnganjuk">WhatsApp Admin</NavDropdown.Item>
                            <NavDropdown.Item href="/sipekat">Rekap Sipekat</NavDropdown.Item>
                        </NavDropdown> */}
                        <Button className="logOutButton" variant="danger" onClick={this.logOut}>Logout</Button>
                        {this.showAdminLogOutExecute()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Headers;
