import React from "react";
import { Navbar, Nav, NavDropdown, Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import configData from "../config.json"


class EditBox extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            refresh : false
        }

        this.state.refresh = false
    }
    saveEdit = async ()=>{
        let editEntri = document.getElementById("edit-entri");
        let editTanggal = document.getElementById("edit-tanggal");
        let editNomor = document.getElementById("edit-nomor");
        let editPerihal = document.getElementById("edit-perihal");
        let editPengguna = document.getElementById("edit-pengguna");
        let editTujuan = document.getElementById("edit-tujuan")
        let json = {
            "tanggal" : editTanggal.value,
            "entrydate" : editEntri.value,
            "nomorsurat" : parseInt(editNomor.value.split("\/")[1]),
            "perihal" : editPerihal.value,
            "dasarhukum" : editNomor.value.split("\/")[0],
            "pembuatsurat" : editPengguna.value,
            "tujuan" : editTujuan.value
        }

        console.log(json);

        document.getElementById("loadingScreen").classList.remove("hide");
        let response = await fetch(configData.dbNomorSurat + "/update",{
        method:"PUT",
            headers: {
                'Content-Type': 'application/json'
              },
            body : JSON.stringify(json)
        })
        let result = await response.json()
        console.log(result)
        document.getElementById("loadingScreen").classList.add("hide");
        this.setState({
            refresh : true
        })
        if(result.status == "success"){
            document.getElementById("update-success").style.display = "block"
            let editContainer = document.getElementById("edit-container").style.display = "none"
        }else{
            document.getElementById("update-failed").style.display = "block"
            
        }

    }
    render(){
        return(
            <Card style={{ width: '100%' , display:"none"}} className="m-1" id="edit-container">
            <Card.Header>Edit Surat</Card.Header>
            <Card.Body>
                <label style={{fontSize:"15px"}}>Tanggal Entri</label>
                <input type="text" class="form-control mb-1" id="edit-entri" aria-describedby="emailHelp" placeholder="Tanggal Entri" readOnly></input>
                <label style={{fontSize:"15px"}}>Tanggal Surat</label>
                <input type="text" class="form-control mb-1" id="edit-tanggal" aria-describedby="emailHelp" placeholder="Tanggal Surat" readOnly></input>
                <label style={{fontSize:"15px"}}>Nomor Surat</label>
                <input type="text" class="form-control mb-1" id="edit-nomor" aria-describedby="emailHelp" placeholder="Nomor Surat" readOnly></input>
                <label style={{fontSize:"15px"}}>Perihal Surat</label>
                <input type="text" class="form-control mb-1" id="edit-perihal" aria-describedby="emailHelp" placeholder="Perihal"></input>
                <label style={{fontSize:"15px"}}>Pengguna</label>
                <input type="text" class="form-control mb-1" id="edit-pengguna" aria-describedby="emailHelp" placeholder="Pengguna"></input>
                <label style={{fontSize:"15px"}}>Tujuan</label>
                <input type="text" class="form-control mb-2" id="edit-tujuan" aria-describedby="emailHelp" placeholder="Tujuan"></input>
                <Button onClick={this.saveEdit}>Simpan</Button>
            </Card.Body>
            </Card>
            
        )
    }
}

export default EditBox;