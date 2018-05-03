import React, {Component} from 'react'
import './VoteBox.css'

export default class VoteBox extends Component {

    constructor(props) {
        super(props);
        this.state = { hideVoteLinks: false }
    }

    getLikesPercentage() {
        const totalVotes = this.props.likes + this.props.dislikes
        let likeRatio = this.props.likes / totalVotes
        return Math.round(likeRatio * 100)
    }

    getDisLikesPercentage() {
        return 100 - this.getLikesPercentage()
    }

    like() {
        this.setState({hideVoteLinks:true})
        this.props.like()
    }

    dislike() {
        this.setState({hideVoteLinks:true})
        this.props.dislike()
    }

    voteAgain() {
        this.setState({hideVoteLinks:false})
    }

    render() {
        return <div className="VoteBox">
            <p>Vota por {this.props.name}</p>
            <div className="voteLinks" style={this.state.hideVoteLinks ? {'display':'none'}:{'display':'block'}}>
                <p><a href="#" onClick={this.like.bind(this)}>+1</a></p>
                <p><a href="#" onClick={this.dislike.bind(this)}>-1</a></p>
            </div>
            <a style={!this.state.hideVoteLinks ? {'display':'none'}:null} onClick={this.voteAgain.bind(this)}>
                Vote again
            </a>
            <p>Likes {this.getLikesPercentage()}%</p>
            <p>Dislikes {this.getDisLikesPercentage()}%</p>
        </div>
    }
}