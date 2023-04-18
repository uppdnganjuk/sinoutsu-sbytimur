// import React from "react";
// import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './HeaderSurat.css'; 
// import config from "../config.json";
// import JatimLogo from "../Images/jatim.png";


// class ImageContainer extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             buktilaporan : "buktilaporan",
//             fotoktp : "ktp",
//             fotokk : "kk",
//             fotoselfie : "selfie",
//             fotopendukung : "pendukung"  
//         }
//         console.log(props)
//     }
//     parseDriveImage = (link)=>{
//         console.log(link)
//         let imageID = link.split("=")[1];
//         return "https://drive.google.com/thumbnail?id=" + imageID;
//     }
//     componentDidUpdate = ()=>{
//         console.log(props)
//     }
//     render(){
//         return(
//             <div className="d-flex align-items-center justify-content-between">
//                 <img src={this.state.buktilaporan}></img>
//             </div>
            
//         )
//     }
// }

// export default ImageContainer;