/** @jsx React.DOM */

var PageContent = React.createClass({
    componentWillReceiveProps: function(props){
        this.props.page = props.page
    },
    render:function(){
        return(
            <div id="page-content" className="container white-text">
                <h1>&gt; {this.props.page}</h1>
                <ContentWrapper page={this.props.page} connection={this.props.connection} />
            </div>
        )
    }
})