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