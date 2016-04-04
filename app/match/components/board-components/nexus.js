/** @jsx React.DOM */

var Nexus = React.createClass({
    getInitialState: function(){
        return(
            {
                owner:this.props.player,
                health:45
            }
        )
    },
    componentDidMount: function(){
        var that = this;
        setInterval(function(){
            var random = Math.floor(Math.random() * 45) + 1;
            that.setState({health:random});
        },3000)
    },
    render: function(){
       return(
           <div className="nexus-wrapper">
               <div className="nexus">
                   <NexusImage id={this.props.id} />
                   <NexusHealth health={this.state.health} />
               </div>
           </div>
       )
    }
});