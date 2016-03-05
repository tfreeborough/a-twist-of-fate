/** @jsx React.DOM */

var ContentWrapper = React.createClass({
    render: function() {
        return(
            <div>
                <p className="flow-text">This is the {this.props.page} content, There isn't really much here yet though.</p>
            </div>
        )
    }
})