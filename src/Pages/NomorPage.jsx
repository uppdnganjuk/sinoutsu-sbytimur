import React from 'react';
import NumberAvailable from "../Containers/NumberAvailable";
import { Container, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import Headers from '../Containers/Headers';
import Footers from '../Containers/Footers';
import "./NomorPage.css";

import RefreshImage from '../Images/refresh.png'
import ModalBox from '../Components/ModalBox';
import RecentList from '../Containers/RecentList';
import sinoutsulogo from '../Images/sinoutsu.png'
import checklogo from '../Images/check.png'
import LoadingScreen from "../Components/LoadingScreen";
import configData from "../config.json";

class NomorPage extends React.Component{
    constructor(props){
        super(props)
        this.validateUser();
        this.state = {
            datas : [],
            pembanding : [],
            startDate : 0,
            refresh : false
        }
        this.state.refresh = false
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
        nomorSurat = dasar + "/" + nomor + "/202.620/" + document.getElementById("datePicked").value.split("-")[0]
        document.getElementById("tanggalPreview").innerHTML = date;
        document.getElementById("nomorPreview").innerHTML = nomorSurat;
        document.getElementById("perihalPreview").innerHTML = perihal;
        document.getElementById("pembuatPreview").innerHTML = pembuat;
        document.getElementById("tujuanPreview").innerHTML = tujuan;
        document.getElementById('checklogo').style.display = "none"
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
        console.log(pembanding)
        document.getElementById("loadingScreen").classList.add("hide");
        let arrayPembanding = [];
        for (let index = 0; index < pembanding.datas.length; index++) {
            arrayPembanding.push(pembanding.datas[index].nomorsurat.toString());
        }
        console.log(arrayPembanding)
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
    dateCorrection = (number)=>{
        if(number.toString().length == 1){
            return "0" + number
        }
        return number
    }
    uploadSurat = async ()=>{
        let date = document.getElementById("datePicked").value;
        let d = new Date()
        let entrydate = d.getFullYear() + "-" + this.dateCorrection(d.getMonth() + 1) + "-" + this.dateCorrection(d.getDate())
        let nomor = document.getElementById("nomorSurat").value;
        let perihal = document.getElementById("perihal").value;
        let dasar = this.getDasarHukum();
        let pembuat = document.getElementById("pembuatSurat").value;
        let tujuan = document.getElementById("tujuanSurat").value;

        let json = {
            "tanggal" : date,
            "entrydate" : entrydate,
            "nomorsurat" : parseInt(nomor),
            "perihal" : perihal,
            "dasarhukum" : dasar,
            "pembuatsurat" : pembuat,
            "tujuan" : tujuan
        }

        console.log(json);

        document.getElementById("loadingScreen").classList.remove("hide");
        let response = await fetch(configData.dbNomorSurat,{
        method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body : JSON.stringify(json)
        })
        let result = await response.json()
        if(result.status == 'success'){
            document.getElementById("loadingScreen").classList.add("hide");
            document.getElementById("success-data").style.display = "block"
            document.getElementById("checklogo").style.display = "block"
            this.setState({
                refresh:true
            })
        }else{
            document.getElementById("loadingScreen").classList.add("hide");
            document.getElementById("exist-data").style.display = "block"
        }
        
       
    }
    switchDateFormat = (initialDate) => {
        let dateArray = initialDate.split("-");
        return dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]; 
    }
    showLainnya = ()=>{
        // let result = document.getElementById("dasarSuratLain2").classList.toggle("hide")
        document.getElementsByClassName("dasarSuratLain")[0].classList.toggle("hide")
    }
    render(){
        return(
            <div className="PageContainer">

                <LoadingScreen />
                <ModalBox title="Pemberitahuan" text="Data Sudah Ada, cek nomor surat Anda" id="exist-data"/>
                <ModalBox title="Pemberitahuan" text="Berhasil memasukkan data" id="success-data"/>
                <Headers />
                <Container>
                    <Row className="mt-3">
                        <Col sm={4}>
                        <div className="d-flex align-items-center justify-content-center">
                            <img src={sinoutsulogo} className="logoHaha"></img>
                        </div>
                        <Form.Group controlId="datePicked">
                            <Form.Control type="date" placeholder="name@example.com" />
                        </Form.Group>
                        <Button variant="warning" onClick={this.getDate}>Cek Nomor</Button>
                        <div id="numContainer">
                            <NumberAvailable key={Math.random()} number={this.state.datas} pembanding={this.state.pembanding}/>
                        </div>  
                        <Form.Group controlId="nomorSurat">
                            <Form.Control type="text" placeholder="Nomor petunjuk" itemID="nomorDipilih" readOnly/>
                        </Form.Group>
                        <Form.Group controlId="perihal">
                            <p>Perihal</p>
                            <Form.Control type="text" placeholder="Perihal" />
                        </Form.Group>
                        <Form.Group controlId="dasarSurat">
                            <p>Petunjuk Surat</p>
                            <Form.Control as="select" size="md">
                                <option value="005">005 - Undangan</option>
                                <option value="094">094 - Surat Tugas</option>
                                <option value="850">850 - Izin Cuti</option>
                                <option value="943">943 - Berita Acara Rekonsiliasi</option>
                                <option value="800">800 - Kepegawaian</option>
                                <option value="970">970 - Pendapatan</option>
                                <option value="973">973 - Pajak </option>
                                <option value="974">974 - Retribusi </option>
                                <option value="983">983 - Berita Acara Pencatatan dan Pelunasan Rekonsiliasi</option>
                                <option value="983">983 - Tanda Terima Pembayaran Rekonsiliasi </option>
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
                            <p>Tujuan Surat</p>
                            <Form.Control type="text" placeholder="Tujuan Surat"/>
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
                                    <td>Tujuan</td>
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
                                <img id='checklogo' src={checklogo} style={{width:"20px",height:"20px", marginTop:"10px", marginRight:"20px", display:"none"}}/>
                                <Button variant="warning" onClick={this.uploadSurat} >Unggah Nomor</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card style={{marginTop:"10px"}}>
                            <Card.Header>Riwayat</Card.Header>
                            <Card.Body className="">
                                <RecentList key={new Date().getTime()}/>
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
export default NomorPage
