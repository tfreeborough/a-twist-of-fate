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
    render: function(){
       return(
           <div className="nexus-wrapper">
               <div className="nexus">
                    <NexusImage id={this.props.id} />
               </div>
           </div>
       )
    }
});