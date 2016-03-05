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
                        if(item.name.toLowerCase() == that.props.activeLink) {
                            return <MenuItem key={item.id} name={item.name} active={true} />;
                        }else{
                            return <MenuItem key={item.id} name={item.name} active={false} />;
                        }
                    })}
                </ul>
            </div>
        )
    }
})
