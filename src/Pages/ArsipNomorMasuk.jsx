import React from 'react';
import ArsipCard from '../Components/ArsipCard'
import { Container, Form, Button, Table } from 'react-bootstrap';
import Headers from '../Containers/Headers';
import "./ArsipNomor.css"
import Footers from "../Containers/Footers"
import configData from "../config.json";
import LoadingScreen from "../Components/LoadingScreen";

class ArsipNomorMasuk extends React.Component{
    constructor(props){
        super(props)
        this.validateUser()
        this.state = {
            datas : [],
            now : "Maret 2021",
            numbering : 0,
            month : "all",
            year : "null"
        }
        this.getAllData()
    }
    validateUser = ()=>{
        if(localStorage.getItem("key") !== configData.key){
            window.location = "/";
        }
    }
    getAllData = async ()=>{
        const results = await fetch(configData.dbNomorSuratMasuk,{
            method : "GET"
        })
        const datas = await results.json()
        this.setState({datas: datas.datas})
    }
    cariSurat = async ()=>{
        let tanggal = document.getElementById("tanggalSurat").value
        
        document.getElementById("loadingScreen").classList.remove("hide");
        const results = await fetch(`${configData.dbNomorSuratMasuk}/search?tanggal=${tanggal}`,{
            method : "GET"
        })
        let json = await results.json();
        
        document.getElementById("loadingScreen").classList.add("hide");
        this.setState({now : this.benerinTanggal(document.getElementById("tanggalSurat").value)});
        console.log(document.getElementById("specificMonth").value)
        if(document.getElementById("specificMonth").value != "all"){
            this.setState({now : document.getElementById("specificMonth").value})
            console.log(this.state.now)
        }
        console.log(this.state.now)
        this.setState({numbering : 0})
        this.setState({datas: json.datas})
    }
    monthConverter = (bulan)=>{
        switch (bulan) {
            case "01":
                return "Periode Januari " + this.state.year
                break;
            case "02":
                return "Periode Februari " + this.state.year
                break;
            case "03":
                return "Periode Maret " + this.state.year
                break;
            case "04":
                return "Periode April " + this.state.year
                break;
            case "05":
                return "Periode Mei " + this.state.year
                break;
            case "06":
                return "Periode Juni " + this.state.year
                break;
            case "07":
                return "Periode Juli " + this.state.year
                break;
            case "08":
                return "Periode Agustus " + this.state.year
                break;
            case "09":
                return "Periode September " + this.state.year
                break;
            case "10":
                return "Periode Oktober " + this.state.year
                break;
            case "11":
                return "Periode November " + this.state.year
                break;
            case "10":
                return "Periode Desember " + this.state.year
                break;
            case "all" :
                return "Periode " + this.state.year
                break;
            default:
                return bulan
                break;
        }
    }
    benerinTanggal = (tanggal) => {
        let tanggalBaru = tanggal.split("-");
        return tanggalBaru[2] + "-" + tanggalBaru[1] + "-" + tanggalBaru[0]
    }
    getSuratFullName = (props)=>{
        return props.dasarhukum + "/" + props.nomorsurat +"/202.620/" + props.tanggal.split("-")[0]
    }
    specificMonth = ()=>{
        let month = document.getElementById("specificMonth").value;
        let year = document.getElementById("specificYear").value
        this.setState({
            month : month,
            year : year
        })
        if(document.getElementById("specificMonth").value != "all"){
            this.setState({now : month})
        }
        this.setState({numbering : 0})
        this.setState({now : "all" })
    }
    benerinTanggal = (tanggal) => {
        let tanggalBaru = tanggal.split("-");
        return tanggalBaru[2] + "-" + tanggalBaru[1] + "-" + tanggalBaru[0]
    }
    benerinNomor = (nomor) =>{
        if(nomor.toString().length == 1){
            return "00" + nomor 
        }else if(nomor.toString().length == 2){
            return "0" + nomor
        }
        return nomor;
    }
    getSuratFullName = (props)=>{
        return props.dasarhukum + "/" + this.benerinNomor(props.nomorsurat) +"/202.620/" + props.tanggal.split("-")[0]
    }
    getDate = ()=>{
    }
    render(){
        return(
            <div className="PageContainer">
                
                <LoadingScreen />
                <Headers />
                <Container className="noprintArea">
                        <div className="mt-3">
                            <div className="d-flex justify-content-betwenn">
                            <Form.Group controlId="specificMonth">
                            <Form.Control as="select" size="md" className="ml-2">
                                <option value="all">Semua</option>
                                <option value="01">Januari</option>
                                <option value="02">Februari</option>
                                <option value="03">Maret</option>
                                <option value="04">April</option>
                                <option value="05">Mei</option>
                                <option value="06">Juni</option>
                                <option value="07">Juli</option>
                                <option value="08">Agustus</option>
                                <option value="09">September</option>
                                <option value="10">Oktober</option>
                                <option value="11">November</option>
                                <option value="12">Desember</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="specificYear" className="ml-3">
                            <Form.Control type="text" placeholder="Tahun"/>
                        </Form.Group>
                        <Button onClick={this.specificMonth} className="ml-3 mr-2 tombolCari">Cari</Button><br />
                            </div>
                        <div className="d-flex justify-content-betwenn">
                        <Form.Group controlId="tanggalSurat">
                            <Form.Control className="ml-2"type="date" placeholder="name@example.com"/>
                        </Form.Group>
                        <Button variant="success" onClick={this.cariSurat} className="ml-3 tombolCari">Cari</Button>
                        </div>
                        </div>
                        <div sm={8} className="d-flex justify-content-start align-items-start flex-wrap">
                            {this.state.datas.map(data => {
                                if(this.state.month == "all" && data.tanggal.split("-")[0] == this.state.year){
                                    return (<ArsipCard key={Math.random()} id={data._id} nomor={this.benerinNomor(data.nomorsurat)} perihal={data.perihal} tanggal={data.tanggal} dasar={data.dasarhukum} pembuat={data.pembuatsurat} month={this.state.month}/>)
                                }
                                if(data.tanggal.split("-")[1] != this.state.month || data.tanggal.split("-")[0] != this.state.year){
                                    return;
                                }
                                return (<ArsipCard key={Math.random()} nomor={data.nomorsurat} perihal={data.perihal} tanggal={data.tanggal} dasar={data.dasarhukum} pembuat={data.pembuatsurat} month={this.state.month}/>)
                            })} 
                        </div>
                </Container>
                <Container className="printArea">
                    <div className="d-flex justify-content-center align-items-center flex-column"> 
                        <h4>Laporan Penggunaan Nomor Surat</h4>
                        <p>UPT PPD Nganjuk</p>
                        <p>{this.monthConverter(this.state.now)}</p>
                    </div>
                    <div id="printArea">
                    <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>No.</th>
                        <th>Tanggal</th>
                        <th>Nomor Surat</th>
                        <th>Perihal</th>
                        <th>Tujuan</th>
                        <th>Pengguna</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.datas.map(data => {
                            if(this.state.month == "all" && data.tanggal.split("-")[0] == this.state.year){
                                this.state.numbering ++
                                return (
                                    <tr>
                                    <td>{this.state.numbering}</td>
                                    <td>{this.benerinTanggal(data.tanggal)}</td>
                                    <td>{this.getSuratFullName(data)}</td>
                                    <td>{data.perihal}</td>
                                    <td>{data.tujuan}</td>
                                    <td>{data.pembuatsurat}</td>
                                    </tr>
                                )
                            }
                            if(data.tanggal.split("-")[1] != this.state.month || data.tanggal.split("-")[0] != this.state.year){
                                return;
                            }
                            
                            this.state.numbering ++
                            return (
                                <tr>
                                <td>{this.state.numbering}</td>
                                <td>{this.benerinTanggal(data.tanggal)}</td>
                                <td>{this.getSuratFullName(data)}</td>
                                <td>{data.perihal}</td>
                                <td>{data.tujuan}</td>
                                <td>{data.pembuatsurat}</td>
                                </tr>
                            )
                           
                        })}
                    </tbody>
                    </Table>
                    </div>
                </Container>
                <Footers />
            </div>
        )
    }
}
export default ArsipNomorMasuk
