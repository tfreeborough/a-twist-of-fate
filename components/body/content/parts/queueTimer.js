/** @jsx React.DOM */


var QueueTimer = React.createClass({
    render: function(){
        if(this.props.inQueue == 'true'){
            return(
                <div>
                    In Queue
                </div>
            )
        }
        return(<div></div>)
    }
})