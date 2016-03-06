/** @jsx React.DOM */


var QueueTimer = React.createClass({
    getInitialState: function(){
        return({
            timeInQueue:0
        })
    },
    componentWillReceiveProps: function(props){
        if(this.props.inQueue == 'true') {
            var that = this;
            /*
            var queueTiming = setInterval(function () {
                that.setState({timeInQueue: (that.state.timeInQueue + 1)})
            }, 1000);
            */
        }
    },
    render: function(){
        if(this.props.inQueue == 'true'){
            return(
                <div>
                    Time in queue: {this.state.timeInQueue} seconds
                </div>
            )
        }
        return(<div></div>)
    }
})