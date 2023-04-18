import React from "react";
import { Card } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import './NumberAvailable.css'
import configData from "../config.json";

class Numbershown extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            datas : []
        }
    }
    changeNumber = (data)=>{
        document.getElementById("nomorSurat").value = data;
    }
    deleteNumber = async ()=>{
        let confirmation = window.confirm("Yakin ingin menghapus id : " + this.props.id)
        if(confirmation){
        
            document.getElementById("loadingScreen").classList.remove("hide");
            let results = await fetch(`${configData.dbNomorTersedia}/delete/${this.props.id}`,{
                method : 'POST'
            })
            document.getElementById("loadingScreen").classList.add("hide");
            alert("Data berhasil dihapus");
    }
    }
    render(){
        return(
            <div style={{width:"100vw"}}>       
                    <b style={{fontSize:"10px"}}>{this.props.tanggal}</b> - <b style={{color:"gray",fontSize:"10px"}}>{this.props.id}</b><span class="badge badge-danger ml-2" onClick={this.deleteNumber}>Hapus</span><p style={{fontSize:"15px"}} className="mb-2">{this.props.nomor}</p>
            </div>
            
        )
    }
}

export default Numbershown;