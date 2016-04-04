/** @jsx React.DOM */

var GameBoard = React.createClass({
    render: function(){
        return(
            <div>
                <div className="opponent-half blue darken-3">
                    <h4 className="opponent-name">{this.props.opponentName}</h4>
                    <Nexus id={this.props.opponentId} player={this.props.opponentName} />
                </div>
                <div className="player-half indigo darken-3">
                    <h4 className="player-name">{this.props.playerName}</h4>
                    <Nexus id={this.props.playerId} player={this.props.playerName} />
                </div>
            </div>
        )
    }
})