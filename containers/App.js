import React, {Component} from 'react';
import './App.css';
import VoteBox from "./VoteBox";

export default class App extends Component {
    render () {
        let voteBoxes = [];

        if (!this.state){
            return false;
        }

        for (let key in this.state.celebrities){

            let celebrityData = this.state.celebrities[key];
            voteBoxes.push(<VoteBox key={key}
                                    name={key}
                                    likes={celebrityData.likes}
                                    dislikes={celebrityData.dislikes}
                                    like={()=>{
                                        this.like(key)
                                    }}
                                    dislike={()=>{
                                        this.dislike(key)
                                    }}
            />);
        }

        return <div className="App"> {voteBoxes} </div>
    }

    like(celebrityKey){
        this.setState((prevState) => {
            prevState.celebrities[celebrityKey].likes++;
            return prevState;
        });

    }

    dislike(celebrityKey){
        this.setState((prevState) => {
            prevState.celebrities[celebrityKey].dislikes++;
            return prevState;
        });
    }

    componentDidUpdate(){
        localStorage.setItem('pollApp', JSON.stringify(this.state))
    }

    constructor (props){
        super(props)
        const savedState = JSON.parse(localStorage.getItem('pollApp'))
        if(savedState){
            this.state = savedState
        } else {
            fetch('http://www.mocky.io/v2/5ae95ae32d0000d4077b4b0b')
                .then(function(response) {
                    return response.json()
                })
                .then(function(json) {
                    console.log('parsed json', json)
                    this.setState({'celebrities':json})
                }.bind(this))
                .catch(function(ex) {
                    console.log('parsing failed', ex)
                })
        }
    }
}

