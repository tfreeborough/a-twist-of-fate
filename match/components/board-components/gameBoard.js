/** @jsx React.DOM */

var GameBoard = React.createClass({
    render: function(){
        return(
            <div>
                <div className="opponent-half">
                    <h4 className="opponent-name">{this.props.opponentName}</h4>
                </div>
                <div className="player-half">
                    <h4 className="player-name">{this.props.playerName}</h4>
                </div>
            </div>
        )
    }
})