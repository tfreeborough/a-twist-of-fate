/** @jsx React.DOM */

var Match = React.createClass({
    getInitialState: function(){
        return({
            valid:false,
            match_id:getCookie('match_id')
        });
    },
    componentDidMount: function(){
        delete_cookie('match_id');
    },
    componentWillUnmount: function(){

    },
    render: function(){
        return(
            <div>
                <h1>{this.state.match_id}</h1>
                <GameBoard />
                <GameChat />
                <GameTimer />
                <Settings />
            </div>
        )
    }
})