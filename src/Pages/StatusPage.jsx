import React from "react";
import { Form, Button, Container } from "react-bootstrap"
import Headers from '../Containers/Headers';
import Footers from '../Containers/Footers';
import './StatusPage.css'
import laporjual from "../Images/laporjual.png"
import ImageContainer from '../Containers/ImageContainer'
import HeaderSurat from '../Containers/HeaderSurat';

class StatusPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allDatas : [],
            datasByDate : [],
            singleData : "data"
        }
        this.getDatas();
    }
    getDatas = async ()=>{
        let result = await fetch("https://sheetdb.io/api/v1/6kais3gjapjc3")
        let json = await result.json();
        this.setState({
            allDatas : json
        })
        console.log(json)
    }
    fixDate = (date)=>{
        let result = date.split("-");
        return result[2] + "/" + result[1] + "/" + result[0]
    }
    findByDate = ()=>{
        let date = this.fixDate(document.getElementById("datePicked").value);
        let datasByDate = [];
        let result = this.state.allDatas.map((data)=>{
            if(data.Timestamp.split(" ")[0] == date){
                datasByDate.push(data)
            }
        })
        console.log(datasByDate)
        this.setState({
            datasByDate : datasByDate
        })
    }
    componentDidUpdate = ()=>{

    }
    findByNopol = ()=>{
        let nopol = document.getElementById("nopolPicked").value;
        let result = this.state.datasByDate.map((data)=>{
            if(data.nopol == nopol){
                data.buktilaporan = this.parseDriveImage(data.buktilaporan)
                data.fotoktp = this.parseDriveImage(data.fotoktp)
                data.fotokk = this.parseDriveImage(data.fotokk)
                data.fotoselfie = this.parseDriveImage(data.fotoselfie)
                data.fotopendukung = this.parseDriveImage(data.fotopendukung)
                this.setState({
                    singleData : data
                })
            }
        })
    }
    parseDriveImage = (link)=>{
        console.log(link)
        let imageID = link.split("=")[1];
        return "https://drive.google.com/uc?id=" + imageID;
    }
    render(){
        return(
            <div>
                <div className="noprintArea">
                    <Headers />
                    <Container className="mt-3">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={laporjual} className="logoHaha"></img>
                    </div>
                    <Form.Group controlId="datePicked">
                        <Form.Control type="date" placeholder="name@example.com" />
                    </Form.Group>
                    <Button className="" onClick={this.findByDate}>Cari</Button>
                    <Form.Group controlId="nopolPicked" className="mt-2">
                        <p>Nomor Polisi</p>
                        <Form.Control as="select" size="md">
                            {this.state.datasByDate.map(data => {
                                console.log(data)
                                return (<option value={data.nopol}>{data.nopol}</option>)
                            })}
                        </Form.Control>
                        <Button onClick={this.findByNopol} className="mt-2">Preview</Button>
                    </Form.Group>
                    </Container>
                    
                </div>
                <div className="">
                    <HeaderSurat className="printArea"></HeaderSurat>
                    <div className="ml-5 mt-5"> 
                    <p>Yang bertandatangan di bawah ini :</p>  
                    <p>Nama : {this.state.singleData.nama}</p> 
                    <p>Alamat : {this.state.singleData.alamat}</p>
                    <p>Nomor HP : {this.state.singleData.nomorhp}</p>
                    <p className="mt-5">Menyatakan dengan sebenarnya bahwa kendaraan dengan identitas sebagai berikut :</p>
                    <p>Nomor Polisi : {this.state.singleData.nopol}</p>
                    <p>Status : {this.state.singleData.status}</p>
                    <p className="paragraph">Keterangan : {this.state.singleData.keterangan}</p>
                    <p className="mt-5">Demikian surat pernyataan ini saya buat degnan sebenar-benarnya dan apabila pernyataan ini tidak benar maka saya sanggup dituntut sesuai dengan ketentuan hukum yang berlaku</p>
                    <p className="mt-5">Bukti Laporan : </p>
                    <img className="imageLampiran" src={this.state.singleData.buktilaporan} />
                    <p>Foto KTP : </p>
                    <img className="imageLampiran" src={this.state.singleData.fotoktp} />
                    <p>Foto Kartu Keluarga : </p>
                    <img className="imageLampiran" src={this.state.singleData.fotokk} />
                    <p>Foto Selfie dengan KTP : </p>
                    <img className="imageLampiran" src={this.state.singleData.fotoselfie} />
                    <p>Dokumen Pendukung : </p>
                    <img className="imageLampiran" src={this.state.singleData.fotopendukung} />
                    </div>
                </div>
                <Footers />
            </div>
        )
    }
}
export default StatusPage



