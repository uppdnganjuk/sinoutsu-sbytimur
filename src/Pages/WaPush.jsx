import React from 'react';
import ArsipCard from '../Components/ArsipCard'
import { Container, Button, Card, Form } from 'react-bootstrap';
import Headers from '../Containers/Headers';
import "./PrintPage.css"
import Footers from "../Containers/Footers"
import './WaPush.css';
import socketIOClient from "socket.io-client";
import configData from "../config.json";
import LoadingScreen from "../Components/LoadingScreen";

class WaPush extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            datas : [],
            jumlah : 0,
            date : 0
        }
        // this.startSocket()
        this.getAllData()
    }
    getAllData = async ()=>{
        const results = await fetch(configData.dbNomorHP,{
            method : "GET"
        })
        const datas = await results.json()
        console.log(datas.datas)
        this.setState({datas : datas.datas})
        this.setState({jumlah : datas.datas.length})
    }
    startSocket = ()=>{
        const socket = socketIOClient("http://localhost:2000");
        socket.on("FromApi",data=>{
            this.setState(data);
        })
    }
    sendWhatsApp = async ()=>{
        let text = document.getElementById("textWa").innerHTML;
        let body = {
            "text" : document.getElementById("textWa").innerHTML
        }
        let response = await fetch(configData.sendWa,{
            method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body : JSON.stringify(body)
            })
    }
    render(){
        return(
            <div className="PageContainer">
                <LoadingScreen />
                <Headers />  
                <Container className="d-flex justify-content-start align-items-start">
                    <div>
                        <p>Date {this.state.date}</p>
                        <div className="log"> Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan Makan </div>
                    </div>
                    <div className="ml-3 dataCenter">
                    <p>Data</p>
                    <Card>
                        <Card.Body>Jumlah Nomor HP :  {this.state.jumlah}</Card.Body>
                    </Card>
                    <Form.Group controlId="textWa">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={5} />
                    </Form.Group>
                    <Button variant="primary" onClick={this.sendWhatsApp}>Primary</Button>
                    </div>
                </Container>
                <Footers />
            </div>
        )
    }
}
export default WaPush
