import React from 'react';
import ArsipCard from '../Components/ArsipCard'
import { Container, Form, Button, Table } from 'react-bootstrap';
import Headers from '../Containers/Headers';
import "./ArsipNomor.css"
import Footers from "../Containers/Footers"
import configData from "../config.json";
import LoadingScreen from "../Components/LoadingScreen";
import ModalBox from "../Components/ModalBox"
import EditBox from "../Containers/EditBox"

class ArsipNomor extends React.Component{
    constructor(props){
        super(props)
        this.validateUser()
        this.state = {
            datas : [],
            from : "kosong",
            to : "kosong",
            numbering : 0,
            month : "all",
            year : "null",
            refresh : false
        }
        // this.state.refresh = false
    }
    validateUser = ()=>{
        if(localStorage.getItem("key") !== configData.key){
            window.location = "/";
        }
    }
    getAllData = async ()=>{
        const results = await fetch(configData.dbNomorSurat,{
            method : "GET"
        })
        const datas = await results.json()
        this.setState({from : "Awal Periode"});
        this.setState({to : "Akhir Periode"});
        this.setState({datas: datas.datas})
    }
    cariSurat = async ()=>{
        console.log(this.state.numbering)
        let fromDate = document.getElementById("fromDate").value
        let toDate = document.getElementById("toDate").value
        let url;
        console.log(fromDate);
        console.log(toDate)
        if(document.getElementById("dasarPencarian").value == "surat"){
            url = `${configData.dbNomorSurat}/search/bynumber/${fromDate}/${toDate}`
        }else{
            url = `${configData.dbNomorSurat}/search/byentry/${fromDate}/${toDate}`
        }
        console.log(url);
        document.getElementById("loadingScreen").classList.remove("hide");
        const results = await fetch(url,{
            method : "GET"
        })
        let json = await results.json();
        document.getElementById("loadingScreen").classList.add("hide");
        this.setState({from : fromDate});
        this.setState({to : toDate});
        this.setState({datas: json.datas})
        this.setState({
            numbering : 0
        })
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
                <ModalBox title="Pemberitahuan" text="Update Data Berhasil" id="update-success"/>
                <ModalBox title="Pemberitahuan" text="Update Data Berhasil" id="update-failed"/>
                <Headers />
                <Container className="noprintArea">
                        <div className="mt-3">
                            <div className="d-flex justify-content-betwenn">
                            <Form.Group controlId="dasarPencarian" className="ml-2">
                                <Form.Label>Dasar Pencarian :</Form.Label>
                                <Form.Control as="select">
                                <option value="surat">Tanggal Surat</option>
                                <option value="entri">Tanggal Entri</option>
                                </Form.Control>
                            </Form.Group>
                            </div>
                        <div className="d-flex justify-content-betwenn">
                        <Form.Group controlId="fromDate">
                            <Form.Control className="ml-2 mr-2"type="date" placeholder="name@example.com"/>
                        </Form.Group>
                        <Form.Group controlId="toDate">
                            <Form.Control className="ml-4 mr-5"type="date" placeholder="name@example.com"/>
                        </Form.Group>
                        <Button variant="success" onClick={this.cariSurat} className="ml-5 tombolCari">Cari</Button>
                        {/* <Button variant="warning" onClick={this.getAllData} className=" ml-1 tombolCari">Cari Semua</Button> */}
                        </div>
                        </div>
                        
                    <EditBox/>
                        <div sm={8} className="d-flex justify-content-start align-items-start flex-wrap">
                            {this.state.datas.map(data => {
                                return (<ArsipCard key={Math.random()} id={data._id} nomor={data.nomorsurat} entrydate={data.entrydate} perihal={data.perihal} tanggal={data.tanggal.split("T")[0]} dasar={data.dasarhukum} pembuat={data.pembuatsurat} month={this.state.month} tujuan={data.tujuan}/>)
                            })} 
                        </div>
                </Container>
                <Container className="printArea">
                    <div className="d-flex justify-content-center align-items-center flex-column"> 
                        <h4>Laporan Penggunaan Nomor Surat</h4>
                        <p>UPT PPD Nganjuk</p>
                        <p>{this.benerinTanggal(this.state.from)} - {this.benerinTanggal(this.state.to)}</p>
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
                                if(this.state.datas.length < this.state.numbering){
                                    this.state.numbering = 0
                                }
                                this.state.numbering ++
                                return (
                                    <tr>
                                    <td>{this.state.numbering}</td>
                                    <td>{this.benerinTanggal(data.tanggal.split("T")[0])}</td>
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
export default ArsipNomor
