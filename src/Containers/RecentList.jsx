import React from "react";
import configData from "../config.json";
import { Navbar, Nav, NavDropdown, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecentList.css'


class RecentList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            datas : ["hehe","hoho"]
        }
    }
    refreshState(){
        this.setState({
            datas : ["XXX","XXX"]
        })
    }
    parseISOString(s) {
        try{
            console.log(s)
            var b = s.split(/\D+/);
            return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])).toString().split("GMT")[0];
        }catch(a){
            return "XX/XX/XXX"
        }
      }
    componentDidMount(){
        fetch(configData.dbNomorSurat +"/search/recent/"+ 4,{
            method : "GET"
        }).then(res=>res.json()).then(json => this.setState({datas:json.datas}))
        
    }
    getSuratFullName = (props)=>{
        try{
            return props.dasarhukum + "/" + props.nomorsurat +"/202.601/" + props.tanggal.toString().split("-")[0]
        }catch(a){
            return "XXX/XXX/XXX"
        }
    }
    render(){
        return(
            <div>
                {this.state.datas.map(data=>{
                    return(
                        <Card className="recent-card" key={data.id} style={{ width: '100%' }}>
                            <Card.Body className="recent-body">
                                <Card.Text className="recent-date">
                                    {this.parseISOString(data.entrydate)}
                                </Card.Text>
                                <Card.Text className="recent-perihal">
                                    {data.perihal}
                                </Card.Text>
                                <Card.Text className="recent-number">
                                    {this.getSuratFullName(data) + " - " + data.pembuatsurat}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
                
            </div>
            
            
        )
    }
}

export default RecentList;