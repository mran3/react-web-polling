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
        let thumbsUpStyles = {'marginRight':'1em'}
        let thumbsDownStyles = {'transform':'rotate(180deg)',
            'marginLeft':'1em'}


        if (this.getLikesPercentage() < 15 ){
            thumbsUpStyles.display = 'none'
        }

        if (this.getDisLikesPercentage() < 15 ){
            thumbsDownStyles.display = 'none'
        }

        return <div className="VoteBox" style={{'backgroundImage':'url(/img/' + this.props.pic + ')'}}>
            <div className="votebox-content">
                <h1>{this.props.name}</h1>
                <div className="voteLinks" style={this.state.hideVoteLinks ? {'display':'none'}:{'display':'block'}}>
                    <span href="#" onClick={this.like.bind(this)}><img className="like-button" src="/img/thumbs-up.png" alt="Vote Like"/></span> &nbsp;
                    <span href="#" onClick={this.dislike.bind(this)}><img className="dislike-button" src="/img/thumbs-up.png" alt="Vote Dislike" /></span>
                </div>
                <a className="voteAgain" style={!this.state.hideVoteLinks ? {'display':'none'}:null} onClick={this.voteAgain.bind(this)}>
                    Vote again
                </a>
            </div>

            <div className="votes-bar">
                <div className="likes-bar" style={{'width':this.getLikesPercentage() + '%'}}>
                    <img src="/img/thumbs-up.png" alt="likes" style={thumbsUpStyles}/> {this.getLikesPercentage()}%
                </div>
                <div className="dislikes-bar" style={{'width':this.getDisLikesPercentage() + '%'}}>
                    <span style={{'paddingRight':'.5em'}}>{this.getDisLikesPercentage()}%</span>
                     <img src="/img/thumbs-up.png" alt="dislikes" style={thumbsDownStyles}/>
                </div>
            </div>
        </div>
    }
}