import React from 'react';
import ArsipCard from '../Components/ArsipCard'
import { Container, Form, Button, Table } from 'react-bootstrap';
import Headers from '../Containers/Headers';
import "./PrintPage.css"
import Footers from "../Containers/Footers"
import configData from "../config.json";
import LoadingScreen from "../Components/LoadingScreen";

class PrintPage extends React.Component{
    constructor(props){
        super(props)
        this.validateUser()
        this.state = {
            datas : []
        }
        this.getAllData()
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
        this.sortSuratByDate(datas);
        this.setState({datas: datas})
    }
    sortSuratByDate = (datas)=>{
        let emptyArray = [];
        for (let index = 0; index < datas.length; index++) {
            const element = datas[index];
            
        }
        datas.sort()
    }
    getSuratFullName = (props)=>{
        return props.dasarhukum + "/" + props.nomorsurat +"/202.620/" + props.tanggal.split("-")[0]
    }
    benerinTanggal = (tanggal) => {
        let tanggalBaru = tanggal.split("-");
        return tanggalBaru[2] + "-" + tanggalBaru[1] + "-" + tanggalBaru[0]
    }
    render(){
        return(
            <div className="PageContainer">
                
                <LoadingScreen />
                <Headers />
                <Container>
                    <div className="d-flex justify-content-center align-items-center flex-column"> 
                        <h4>Laporan Penggunaan Nomor Surat</h4>
                        <p>UPT PPD Nganjuk</p>
                    </div>
                    <div id="printArea">
                    <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Tanggal</th>
                        <th>Nomor Surat</th>
                        <th>Perihal</th>
                        <th>Pengguna</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.datas.map(data => {
                            return (
                                <tr>
                                <td>{data.id}</td>
                                <td>{this.benerinTanggal(data.tanggal)}</td>
                                <td>{this.getSuratFullName(data)}</td>
                                <td>{data.perihal}</td>
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
export default PrintPage