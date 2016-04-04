/** @jsx React.DOM */

var NexusImage = React.createClass({
    render: function(){
        if(this.props.id == '1') {
            return (
                <div className="nexus-image">
                    <img src="/assets/images/match/blue.png" />
                </div>
            )
        }else{
            return (
                <div className="nexus-image">
                    <img src="/assets/images/match/red.png" />
                </div>
            )
        }
    }
})
