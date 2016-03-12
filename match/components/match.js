/** @jsx React.DOM */

var Match = React.createClass({
    getInitialState: function(){
        return({
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
                <GameBoard />
                <GameChat />
                <GameTimer />
                <Settings />
            </div>
        )
    }
})