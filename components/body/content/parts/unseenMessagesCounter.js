/** @jsx React.DOM */

var UnseenMessagesCounter = React.createClass({
    render: function(){
        if(this.props.count > 0) {
            return (
                <div className="unseen-messages light-green-text">
                    {this.props.count}
                </div>
            )
        }else{
            return( <div></div> )
        }
    }
})