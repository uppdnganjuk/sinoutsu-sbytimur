import React from 'react';
import NumberAvailable from "../Containers/NumberAvailable";
import { Container, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import Headers from '../Containers/Headers';
import Footers from '../Containers/Footers';
import "./NomorPage.css";
import LoadingScreen from "../Components/LoadingScreen";
import configData from "../config.json";
import sinoutsulogo from '../Images/sinoutsu.png'

class NomorMasukPage extends React.Component{
    constructor(props){
        super(props)
        this.validateUser();
        this.state = {
            datas : [],
            pembanding : [],
            startDate : 0,

        }
    }
    validateUser = ()=>{
        if(localStorage.getItem("key") !== configData.key){
            window.location = "/";
        }
    }
    previewState = ()=>{
        let date, nomor, perihal, dasar, pembuat, nomorSurat, tujuan;
        date = this.switchDateFormat(document.getElementById("datePicked").value);
        nomor = document.getElementById("nomorSurat").value;
        perihal = document.getElementById("perihal").value;
        tujuan = document.getElementById("tujuanSurat").value;
        dasar = this.getDasarHukum();
        pembuat = document.getElementById("pembuatSurat").value
        nomorSurat = dasar + "/" + nomor + "/202.620/" + new Date().getFullYear()
        document.getElementById("tanggalPreview").innerHTML = date;
        document.getElementById("nomorPreview").innerHTML = nomorSurat;
        document.getElementById("perihalPreview").innerHTML = perihal;
        document.getElementById("pembuatPreview").innerHTML = pembuat;
        document.getElementById("tujuanPreview").innerHTML = tujuan;
    }
    getDasarHukum = () =>{
        let lainnya = document.getElementById("dasarSuratLain2").value;
        let dasar = document.getElementById("dasarSurat").value;
        if(lainnya){
            return lainnya
        }
        return dasar;
    }
    getNumber = async (date)=>{
        let results = await fetch(`${configData.dbNomorTersedia}/search?tanggal=${date}`);
        return await results.json();
    }
    getPembanding = async (date)=>{
        let results = await fetch(`${configData.dbNomorSurat}/search?tanggal=${date}`);
        return await results.json();
    }
    getDate = async ()=>{
        let date = document.getElementById("datePicked").value;
        
        document.getElementById("loadingScreen").classList.remove("hide");
        let results = await this.getNumber(date);
        let pembanding = await this.getPembanding(date);
        document.getElementById("loadingScreen").classList.add("hide");
        let arrayPembanding = [];
        for (let index = 0; index < pembanding.datas.length; index++) {
            arrayPembanding.push(pembanding.datas[index].nomorsurat.toString());
        }
        let number;
        try{
            number = results.datas[0].nomor;
            let numArray = number.split("-");
            this.setState({datas: numArray})
            this.setState({pembanding: arrayPembanding})
        }catch{
            document.getElementById("nomorSurat").value = "Nomor belum tersedia"
        }
        
    }
    uploadSurat = async ()=>{
        let date = document.getElementById("datePicked").value;
        let nomor = document.getElementById("nomorSurat").value;
        let perihal = document.getElementById("perihal").value;
        let dasar = this.getDasarHukum();
        let pembuat = document.getElementById("pembuatSurat").value;
        let tujuan = document.getElementById("tujuanSurat").value;

        let json = {
            "tanggal" : date,
            "nomorsurat" : parseInt(nomor),
            "perihal" : perihal,
            "dasarhukum" : dasar,
            "pembuatsurat" : pembuat,
            "tujuan" : tujuan
        }
        document.getElementById("loadingScreen").classList.remove("hide");
        let response = await fetch(configData.dbNomorSuratMasuk,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body : JSON.stringify(json)
        })
        
        document.getElementById("loadingScreen").classList.add("hide");
        alert("Berhasil diupload")
    }
    switchDateFormat = (initialDate) => {
        let dateArray = initialDate.split("-");
        return dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]; 
    }
    render(){
        return(
            <div className="PageContainer">
                <LoadingScreen />
                <Headers />
                <Container>
                    <Row className="mt-3">
                        <Col sm={4}>
                        <div className="d-flex align-items-center justify-content-center">
                            <img src={sinoutsulogo} className="logoHaha"></img>
                        </div>
                        <Form.Group controlId="datePicked">
                            <p>Tanggal</p>  
                            <Form.Control type="date" placeholder="name@example.com" />
                        </Form.Group> 
                        <Form.Group controlId="nomorSurat">
                            <p>Nomor Surat</p>
                            <Form.Control type="text" placeholder="Nomor Surat" itemID="nomorDipilih"/>
                        </Form.Group>
                        <Form.Group controlId="perihal">
                            <p>Perihal</p>
                            <Form.Control type="text" placeholder="Perihal" />
                        </Form.Group>
                        <Form.Group controlId="dasarSurat">
                            <p>Petunjuk Surat</p>
                            <Form.Control as="select" size="md">
                                <option value="005">005 - Undangan</option>
                                <option value="970">970 - Surat Keluar</option>
                                <option value="854">854 - Izin Cuti</option>
                                <option value="lain">Lainnya</option>
                            </Form.Control>
                            <Button onClick={this.showLainnya} className="mt-2">Lainnya</Button>
                        </Form.Group>
                        <Form.Group controlId="dasarSuratLain2" className="hide dasarSuratLain">
                            <p>Pentunjuk lainnya</p>
                            <Form.Control type="text" placeholder="Nomor yang dipilih"/>
                        </Form.Group>
                        <Form.Group controlId="pembuatSurat">
                            <p>Pengguna Nomor</p>
                            <Form.Control type="text" placeholder="Pengguna Nomor" />
                        </Form.Group>
                        <Form.Group controlId="tujuanSurat">
                            <p>Asal Surat</p>
                            <Form.Control type="text" placeholder="Asal Surat"/>
                        </Form.Group>
                        <div className="d-flex justify-content-end mb-3">
                        <Button variant="success" onClick={this.previewState}>Preview</Button>{' '}
                        </div>
                        </Col>
                        <Col sm={8}>
                        <Card>
                        <Card.Header>Preview</Card.Header>
                        <Card.Body className="">
                            <Card.Text>
                            <Table>
                            <tbody>
                                <tr>
                                <td>Tanggal</td>
                                <td id="tanggalPreview">XX/XX/XXXX</td>
                                </tr>
                                <tr>
                                <td>Pembuat</td>
                                <td id="pembuatPreview"></td>
                                </tr>
                                <tr>
                                <td>Nomor Surat</td>
                                <td id="nomorPreview">XX/XX.X/XX/XXXX</td>
                                </tr>
                                <tr>
                                <td>Asal</td>
                                <td id="tujuanPreview"></td>
                                </tr>
                                <tr>
                                <td>Perihal</td>
                                <td id="perihalPreview"></td>
                                </tr>
                            </tbody>
                            </Table>
                            </Card.Text>
                            <div className="d-flex justify-content-end">
                            <Button variant="warning" onClick={this.uploadSurat} >Upload Nomor</Button>
                            </div>
                        </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                </Container>
                <Footers />
            </div>
        )
    }
}
export default NomorMasukPage
