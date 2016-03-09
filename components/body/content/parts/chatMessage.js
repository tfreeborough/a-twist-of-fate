/** @jsx React.DOM */


var ChatMessage = React.createClass({
    render: function(){

        return(
            <div>
                <span className="purple-text text-lighten-2">{this.props.time} - {this.props.name}</span>: {this.props.message}
            </div>
        )
    }
})