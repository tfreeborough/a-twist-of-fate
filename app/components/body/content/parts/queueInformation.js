/** @jsx React.DOM */

var QueueInformation = React.createClass({
    componentWillReceiveProps: function(props){
        this.props.usersInQueue = props.usersInQueue;
        this.props.currentlyQueuing = props.currentlyQueuing;
        venti.trigger('userInQueue',{queuing:props.currentlyQueuing});
    },
    render: function(){
        return(
            <div className="queue-information">
                <p className="flow-text">Current users in queue: {this.props.usersInQueue}</p>
                <QueueTimer currentlyQueuing={this.props.currentlyQueuing} />
                <QueueLeaveModal />
            </div>
        )
    }
})