/** @jsx React.DOM */

var MenuItem = React.createClass({
    getInitialState: function(){
        return({
            activeClass:''
        })
    },
    componentDidMount: function(){
        console.log(this.props.active);
        if(this.props.active){
            this.setState({activeClass:'active'})
        }
    },
    render: function(){
        return(
            <li className={this.state.activeClass}>
                {this.props.name}
            </li>
        );
    }
})