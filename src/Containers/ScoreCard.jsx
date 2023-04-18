import React from "react";
import { Navbar, Nav, NavDropdown, Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ScoreCard.css'


class ScoreCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ratarata : 0
        }
    }
    getAverage = ()=>{
        console.log(this.props.averageArray)
        let total = 0;
        for (let index = 0; index < this.props.averageArray.length; index++) {
            let num = parseInt(this.props.averageArray[index]);
            total += num
        }
        console.log(total)
        let ratarata = total / this.props.averageArray.length
        this.setState({
            ratarata : ratarata.toFixed(2)
        })
        console.log(this.state.ratarata)
    }
    componentDidUpdate = (prevProps, prevState) =>{
        if (prevProps.averageArray !== this.props.averageArray) {
            this.getAverage();
         }
    }
    render(){
        return(
            <Card style={{ width: '8rem' }} className="m-1">
            <Card.Body>
                <Card.Title>{this.props.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Rata-rata</Card.Subtitle>
                <Card.Text className="cardScore">
                    <h1 style={{textAlign : "center"}}>{this.state.ratarata}</h1>
                </Card.Text>
                <Button>Simpan</Button>
            </Card.Body>
            </Card>
            
        )
    }
}

export default ScoreCard;