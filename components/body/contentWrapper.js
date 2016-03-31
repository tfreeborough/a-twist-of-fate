/** @jsx React.DOM */

var ContentWrapper = React.createClass({
    render: function() {
        if(this.props.page.toLowerCase() == 'home') { return ( <HomepageContent /> ) }
        else if(this.props.page.toLowerCase() == 'play'){ return( <PlayContent connection={this.props.connection} /> ) }
    	else if(this.props.page.toLowerCase() == 'register'){ return ( <RegisterContent /> ) }
    	else if(this.props.page.toLowerCase() == "log in"){return (<LogInContent/>) }
    }
})