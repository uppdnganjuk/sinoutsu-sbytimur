import React from "react";
import { Card, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import './ArsipCard.css'
import config from "../config.json";
import trashLogo from "../Images/trash-can.png"
import editLogo from "../Images/edit.png"


class ArsipCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : [],
            refresh : false
        }
        this.state.refresh = false
    }
    hapusData = async ()=>{
        // if(localStorage.getItem("keyAdmin") !== config.keyAdmin){
        //     alert("Anda Bukan Admin")
        //     return;
        // }else{
            let confirmation = window.confirm("Yakin ingin menghapus nomor " + this.props.dasar + "/" + this.props.nomor +"/202.601/" + this.props.tanggal.split("-")[0])
            if(confirmation){
                
                document.getElementById("loadingScreen").classList.remove("hide");
                console.log(this.props)
                let results = await fetch(`${config.dbNomorSurat}/id/${this.props.id}`,{
                    method : 'POST'
                })
                console.log(results);
                document.getElementById("loadingScreen").classList.add("hide");
                alert("Data berhasil dihapus");
                // window.location = "/nomor"
            // }
        }
    }
    editData = ()=>{
        let editContainer = document.getElementById("edit-container").style.display = "block"
        let editEntri = document.getElementById("edit-entri");
        let editTanggal = document.getElementById("edit-tanggal");
        let editNomor = document.getElementById("edit-nomor");
        let editPerihal = document.getElementById("edit-perihal");
        let editPengguna = document.getElementById("edit-pengguna");
        let editTujuan = document.getElementById("edit-tujuan")
        editEntri.value = this.props.entrydate.split("T")[0]
        editTanggal.value = this.props.tanggal
        editNomor.value = this.props.dasar + "/" + this.props.nomor +"/202.601/" + this.props.tanggal.split("-")[0]
        editPerihal.value = this.props.perihal
        editPengguna.value = this.props.pembuat
        editTujuan.value = this.props.tujuan
    }
    render(){
        return(
            <Card className="ArsipCard mt-2 ml-2">
                <Card.Body className="p-2">
                
                <div className="body-card">
                    <div >
                        <b className="mb-0 judulKartu">Tanggal Entry</b>
                        <p className="mb-0">{this.props.entrydate.split("T")[0]}</p>
                        <b className="mb-0 judulKartu">Tanggal Surat</b>
                        <p className="mb-0">{this.props.tanggal}</p>
                    </div>
                    <div>
                        <b className="mt-2 judulKartu">Nomor</b>
                        <p className="mb-0">{this.props.dasar + "/" + this.props.nomor +"/202.601/" + this.props.tanggal.split("-")[0]}</p>
                        <b className="mt-2 judulKartu">Perihal</b>
                        <p className="mb-0" style={{textAlign:"justify"}}>{this.props.perihal}</p>
                    </div>
                    <div>
                    <b className="mt-2 judulKartu">Pengguna</b>
                        <p className="mb-0">{this.props.pembuat}</p>
                    <b className="mt-2 judulKartu">Tujuan</b>
                    <p className="mb-0">{this.props.tujuan}</p>
                    </div>
                    <div className="">
                        <Button className="hapusButton" variant="danger" onClick={this.hapusData}><img className="trash-logo" src={trashLogo}></img></Button>
                        <Button className="editButton mt-1" variant="warning"  onClick={this.editData}><img className="trash-logo" src={editLogo}></img></Button>
                    </div>
                </div>
                    
                </Card.Body>
                
            </Card>
        )
    }
}

export default ArsipCard;