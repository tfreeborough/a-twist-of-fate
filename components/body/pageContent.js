/** @jsx React.DOM */

var PageContent = React.createClass({
    render:function(){
        return(
            <div id="page-content" className="container white-text">
                <h1>{this.props.content}</h1>
            </div>
        )
    }
})