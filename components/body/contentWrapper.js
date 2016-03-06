/** @jsx React.DOM */

var ContentWrapper = React.createClass({
    render: function() {
        if(this.props.page.toLowerCase() == 'home') { return ( <HomepageContent /> ) }
        else if(this.props.page.toLowerCase() == 'play'){ return( <PlayContent /> ) }
    }
})