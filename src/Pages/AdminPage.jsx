import React from 'react';
import NumberAvailableAdmin from '../Containers/NumberAvailableAdmin'
import { Container, Row, Col, Form, Button, Card, Table, Dropdown, DropdownButton } from 'react-bootstrap';
import Headers from '../Containers/Headers';
import './AdminPage.css';
import Footers from "../Containers/Footers";
import LoadingScreen from "../Components/LoadingScreen";
import Numbershown from "../Containers/Numbershown";
import configData from "../config.json";

class AdminPage extends React.Component{
    constructor(props){
        super(props)
        this.validateUser();
        this.state = {
            allNumber : [],
            numberBefore : [],
            numberBeforeId : 0,
            lastNumber : 0,
            numberNow : [],
            dateNow : 0,
            bulanShown : "tahun"
        }
    }
    validateUser = ()=>{
        if(localStorage.getItem("keyAdmin") !== configData.keyAdmin){
            window.location = "/adminlogin";
        }
    }
    DateNow = ()=>{
        let makan = new Date();
        return makan.getFullYear() + "-" + makan.getMonth() + "-" + makan.getDate()
    }
    previewBefore = async ()=>{
        console.log("Preview Before")
        let dateAdmin = document.getElementById("dateAdmin").value;
        document.getElementById("loadingScreen").classList.remove("hide");
        let datas = await this.getDatas(dateAdmin);
        document.getElementById("loadingScreen").classList.add("hide");
        let datasArray;
        console.log(datas);
        try{ 
            datasArray = datas.responseBefore[0].nomor.split("-");
        }catch{
            alert("Tidak ada nomor pada tanggal sebelumnya, pilih tanggal lainnya")
            return
        }
        this.setState({})
        this.setState({
            numberBefore : datasArray,
            numberBeforeId : datas.responseBefore[0]._id
        });
    }
    previewNow = async ()=>{
        let dateAdmin = document.getElementById("dateAdmin").value;
        document.getElementById("loadingScreen").classList.remove("hide");
        let datas = await this.getDatas(dateAdmin);
        
        document.getElementById("loadingScreen").classList.add("hide");
        let datasArray;
        try{
            datasArray = datas.responseBefore[0].nomor.split("-");
        }catch{
            alert("Tidak ada nomor pada tanggal sebelumnya, pilih tanggal lainnya")
            return
        }
        let lastNumber = datasArray[datasArray.length - 1];
        let jumlahNum = parseInt(document.getElementById("numberAdmin").value)
        let NumArray = [];
        for (let index = 0; index < jumlahNum; index++) {
            lastNumber++;
            NumArray.push(lastNumber);
        }
        this.setState({numberNow : NumArray});
    }
    parseNum = ()=>{
        return this.state.numberNow.join("-");
    }
    provideNumber = async ()=>{
        let dateAdmin = document.getElementById("dateAdmin").value;
        let numberAdmin = document.getElementById("numberAdmin").value;
        let checkAvailable = await this.getDatas(dateAdmin);
        if(this.validateNumber(checkAvailable) == 0){
            return;
        }
        let json = {
            "id" : Date.now(),
            "tanggal" : dateAdmin,
            "jumlahnomor" : numberAdmin,
            "nomor" : this.parseNum()
        }
        let results = this.postNumber(json);
        
    }
    validateNumber = (checkAvailable)=>{
        if (checkAvailable.response.length !== 0) {
            alert("Tanggal Sudah Ada!")
            return 0;
        }
        if(checkAvailable.responseBefore.length == 0){
            alert("Tanggal Sebelumnya Kosong")
            return 0;
        }
    }
    getDatas = async (date)=>{
        const tomorrow = new Date(date)
        tomorrow.setDate(tomorrow.getDate() - 1)
        let yesterday = tomorrow.toISOString()
        
        let response = await fetch(`${configData.dbNomorTersedia}/search?tanggal=${date}`)
        let responseBefore = await fetch(`${configData.dbNomorTersedia}/search?tanggal=${yesterday.split("T")[0]}`)
        let responseJSON = await response.json();
        let responseBeforeJSON = await responseBefore.json();
        return {
            response : responseJSON.datas,
            responseBefore : responseBeforeJSON.datas
        }
    }
    hapusNomorBefore = async ()=>{
        
        document.getElementById("loadingScreen").classList.remove("hide");
        let results = await fetch(`${configData.dbNomorTersedia}/delete/${this.state.numberBeforeId}`,{
            method : 'POST'
        })
        document.getElementById("loadingScreen").classList.add("hide");
    }
    setAsWeekEnd = async ()=>{
        let dateAdmin = document.getElementById("dateAdmin").value;
        let numberAdmin = document.getElementById("numberAdmin").value;
        let checkAvailable = await this.getDatas(dateAdmin);
        if(this.validateNumber(checkAvailable) == 0){
            return;
        }
        let json = {
            "id" : Date.now(),
            "tanggal" : dateAdmin,
            "jumlahnomor" : numberAdmin,
            "nomor" : this.state.numberBefore[this.state.numberBefore.length - 1]
        }
        let results = this.postNumber(json);
    }
    postNumber = async (data)=>{
        document.getElementById("loadingScreen").classList.remove("hide");
        let response = await fetch(configData.dbNomorTersedia,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body : JSON.stringify(data)
        })
        document.getElementById("loadingScreen").classList.add("hide");
        alert("Berhasil dibuat");
    }
    Numbershown = async (data)=>{
        let dateAdmin = document.getElementById("bulan").value;
        let dateDate = document.getElementById("tahun").value;
        let response = await fetch(configData.dbNomorTersedia)
        let responseJSON = await response.json();
        this.setState({
            allNumber : responseJSON.datas,
            bulanShown : dateDate + "-" + dateAdmin
        })
    }
    render(){
        return(
            <div className="PageContainer">
                <LoadingScreen />
                <Headers />
                <Container>
                    <Row className="mt-3">
                        <Col sm={4}>
                        <Form.Group controlId="dateAdmin">
                            <Form.Control type="date" placeholder="Tanggal"/>                            
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                        <p onClick={this.previewBefore} className="kemarinButton">Lihat Nomor Kemarin</p>
                        </div>
                        <Form.Group controlId="numberAdmin">
                            <p>Nomor surat yang disediakan</p>
                            <Form.Control type="number" placeholder="Jumlah Surat" min={0} max={15}/>
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                        <Button variant="warning" onClick={this.previewNow}>Preview Nomor</Button> 
                        </div>
                        </Col>
                        <Col sm={8}>
                            <p className="mt-3">Nomor Kemarin : <b onClick={this.hapusNomorBefore} className="kemarinButton">Hapus?</b></p>
                            <Card body>
                            <NumberAvailableAdmin key={Math.random()} number={this.state.numberBefore}/>
                            </Card>
                            <p className="mt-3">Nomor Sekarang : </p>   
                            <Card body>
                            <NumberAvailableAdmin key={Math.random()} number={this.state.numberNow}/></Card> 
                            
                            <Button variant="warning" onClick={this.setAsWeekEnd} className="mt-2">Tandai sebagai Hari Libur</Button>
                            <Button variant="success" onClick={this.provideNumber} className="mt-2 ml-2">Sediakan Nomor</Button>{' '}                    
                        </Col>
                    </Row>
                    <hr />
                    <b>Rekapitulasi Nomor Terbit</b>
                    <Row sm={3} className="mt-3">
                        <div className="d-flex">
                        <Form.Group controlId="bulan">
                            <Form.Control as="select" size="md">
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
                            <Form.Group controlId="tahun" className="ml-2">
                                <Form.Control type="text" placeholder="Tahun"/>
                            </Form.Group>
                            <Button variant="success" onClick={this.Numbershown} style={{height:"40px"}} className="ml-3">Show</Button>
                        </div>
                        </Row>
                        <Row>
                            
                            {this.state.allNumber.map(data=>{
                                let regexs = new RegExp(this.state.bulanShown + "-\\d+","g")
                                console.log(regexs)
                                let patt = data.tanggal.match(regexs)
                                if(patt){
                                    return (
                                        <div>
                                        <Numbershown id={data._id} nomor={data.nomor} tanggal={data.tanggal} bulan={this.state.bulanShown}/>
                                        </div>
                                        )
                                }
                                })}
                        </Row>
                        
                </Container>
                <Footers />
            </div>
        )
    }
}
export default AdminPage
