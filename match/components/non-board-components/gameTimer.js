/** @jsx React.DOM */

var GameTimer = React.createClass({
    getInitialState: function(){
        return({
            timer:0
        })
    },
    componentDidMount: function(){
        var that = this;
        var timerInterval = setInterval(function(){
            that.setState({timer:that.state.timer+1});
        },1000);
    },
    render: function(){
        return(
            <div className="match-timer flow-text noselect">
                {pad(Math.floor(this.state.timer/60),2)}:{pad(this.state.timer%60,2)}
            </div>
        )
    }
})