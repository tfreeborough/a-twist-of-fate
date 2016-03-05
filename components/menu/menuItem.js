/** @jsx React.DOM */

var MenuItem = React.createClass({
    changeActivePage: function(){
        venti.trigger('changePage',{page:this.props.name.toLowerCase(),originalName:this.props.name});
    },
    render: function(){
        if(this.props.active == this.props.name.toLowerCase()){
            return(
                <li onClick={this.changeActivePage} >
                    <a className="active" href="javascript:void(0)">{this.props.name}</a>
                </li>
            );
        }else{
            return(
                <li onClick={this.changeActivePage}>
                    <a href="javascript:void(0)">{this.props.name}</a>
                </li>
            );
        }

    }
})