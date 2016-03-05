/** @jsx React.DOM */

var SiteMenu = React.createClass({
    getInitialState: function(){
        return({
            menuItems:[
                {name:'Home'},
                {name:'Play'}
            ]
        });
    },
    render: function(){
        var that = this;
        return (
            <div className="flow-text container">
                <ul className="main-menu">
                    {this.state.menuItems.map(function(item) {
                        return <MenuItem key={item.id} name={item.name} active={that.props.activeLink} connection={that.props.connection} />;
                    })}
                </ul>
            </div>
        )
    }
})
