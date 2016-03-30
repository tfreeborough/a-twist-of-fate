/** @jsx React.DOM */


var QueueTimer = React.createClass({
    getInitialState: function(){
        return({
            timeInQueue:0
        })
    },
    resetQueueTimer: function(){
        this.setState({timeInQueue:0});
    },
    componentDidMount: function(){
        var that = this;
        var queueTiming = setInterval(function () {
            if(that.props.currentlyQueuing == 'true') {
                that.setState({timeInQueue: (that.state.timeInQueue + 1)});
            }
        }, 1000);

        venti.on('resetQueueTimer',this.resetQueueTimer);
    },
    render: function(){
        if(this.props.currentlyQueuing == 'true'){
            return(
                <div>
                    Time in queue: {this.state.timeInQueue} seconds
                </div>
            )
        }
        return(<div></div>)
    }
})