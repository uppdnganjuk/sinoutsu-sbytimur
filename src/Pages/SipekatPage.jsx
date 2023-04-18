import React from 'react';
import ArsipCard from '../Components/ArsipCard'
import ScoreCard from '../Containers/ScoreCard';
import { Container, Form, Button, Table, Card } from 'react-bootstrap';
import Headers from '../Containers/Headers';
import "./SipekatPage.css"
import Footers from "../Containers/Footers"
import configData from "../config.json";
import LoadingScreen from "../Components/LoadingScreen";

class SipekatPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            datas : [],
            unsur1 : 0,
            unsur2 : 0,
            unsur3 : 0,
            unsur4 : 0,
            unsur5 : 0,
            unsur6 : 0,
            unsur7 : 0,
            unsur8 : 0,
        }
        this.getAllData();
    }
    getAllData = async ()=>{
        let result = await fetch(configData.dbsipekat);
        let json = await result.json();
        json.splice(0,2);
        let dataArray = [];
        json.map(data=>{
            if(data.unsur1 != "FALSE"){
                dataArray.push(data);
            }
        })
        console.log(dataArray);
        this.getAverage(dataArray);
        this.setState({datas : dataArray});
    }
    getAverage = async (dataArray)=>{
        let unsur1 = [];
        let unsur2 = [];
        let unsur3 = [];
        let unsur4 = [];
        let unsur5 = [];
        let unsur6 = [];
        let unsur7 = [];
        let unsur8 = [];
        let unsur9 = [];
        dataArray.map(data => {
            unsur1.push(data.unsur1)
            unsur2.push(data.unsur2)
            unsur3.push(data.unsur3)
            unsur4.push(data.unsur4)
            unsur5.push(data.unsur5)
            unsur6.push(data.unsur6)
            unsur7.push(data.unsur7)
            unsur8.push(data.unsur8)
            unsur9.push(data.unsur9)
        })
        this.setState({
            unsur1 : unsur1,
            unsur2 : unsur2,
            unsur3 : unsur3,
            unsur4 : unsur4,
            unsur5 : unsur5,
            unsur6 : unsur6,
            unsur7 : unsur7,
            unsur8 : unsur8,
            unsur9 : unsur9
        }
        )
    }
    render(){
        return(
            <div className="PageContainer">
                
                <LoadingScreen />
                <Headers />
                <Container>
                    {/* <h1 style={{textAlign :"center"}}>SIPEKAT</h1> */}
                    <div className="d-flex mt-3 flex-wrap">
                        <ScoreCard className="m-3" title="Unsur 1" averageArray={this.state.unsur1}/>
                        <ScoreCard title="Unsur 2" averageArray={this.state.unsur2}/>
                        <ScoreCard title="Unsur 3" averageArray={this.state.unsur3}/>
                        <ScoreCard title="Unsur 4" averageArray={this.state.unsur4}/>
                        <ScoreCard title="Unsur 5" averageArray={this.state.unsur5}/>
                        <ScoreCard title="Unsur 6" averageArray={this.state.unsur6}/>
                        <ScoreCard title="Unsur 7" averageArray={this.state.unsur7}/>
                        <ScoreCard title="Unsur 8" averageArray={this.state.unsur8}/>
                        <ScoreCard title="Unsur 9" averageArray={this.state.unsur9}/>
                    </div>
                   
                    <Table striped bordered hover className="mt-2">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Unsur 1</th>
                        <th>Unsur 2</th>
                        <th>Unsur 3</th>
                        <th>Unsur 4</th>
                        <th>Unsur 5</th>
                        <th>Unsur 6</th>
                        <th>Unsur 7</th>
                        <th>Unsur 8</th>
                        <th>Unsur 9</th>
                        <th>Unsur 10</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.datas.map(data=>{
                          
                                return (
                                    <tr>
                                    <th>{data.no}</th>
                                    <th>{data.unsur1}</th>
                                    <th>{data.unsur2}</th>
                                    <th>{data.unsur3}</th>
                                    <th>{data.unsur4}</th>
                                    <th>{data.unsur5}</th>
                                    <th>{data.unsur6}</th>
                                    <th>{data.unsur7}</th>
                                    <th>{data.unsur8}</th>
                                    <th>{data.unsur9}</th>
                                    <th>{data.keterangan}</th>
                            </tr>
                                )
                            
                        })}
                        
                    </tbody>
                    </Table>
                </Container>
                <Footers />
            </div>
        )
    }
}
export default SipekatPage