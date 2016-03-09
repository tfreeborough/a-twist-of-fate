/** @jsx React.DOM */


var ChatMessage = React.createClass({
    render: function(){
        if(this.props.type == 'message') {
            return (
                <div>
                    <span className="purple-text text-lighten-2">{this.props.time}
                        - {this.props.name}</span>: {this.props.message}
                </div>
            )
        }else if(this.props.type == 'join'){
            return (
                <div>
                    <span className="faded white-text"><i>{this.props.name} joined {this.props.room}</i></span>
                </div>
            )
        }else if(this.props.type == 'leave'){
            return (
                <div>
                    <span className="faded white-text"><i>{this.props.name} left {this.props.room}</i></span>
                </div>
            )
        }
    }
})