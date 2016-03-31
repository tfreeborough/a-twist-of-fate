/** @jsx React.DOM */

var MatchErrorModal = React.createClass({
    getInitialState: function(){
        return({
            name:'',
            msg:''
        });
    },
    componentDidMount: function(){
        matchSocket.on('matchError',this.setError);
    },
    componentWillUnmount: function(){
        matchSocket.removeListener('matchError',this.setError);
    },
    setError: function(data){
        this.setState({name:data.name});
        this.setState({msg:data.msg});
        this.showModal();
    },
    showModal: function(){
        console.log('ERROR TIME!');
        $('#match-error-modal').openModal({
            dismissible: false
        });
    },
    hideModal: function(){
        $('#match-error-modal').closeModal();
        $('.lean-overlay').remove();
        window.location.href = '/';
    },
    render: function(){
        return(
            <div id="match-error-modal" className="modal black-text">
                <div className="modal-content">
                    <h4 className="red-text">{this.state.name}</h4>
                    <p className="flow-text">
                        {this.state.msg}
                    </p>
                </div>
                <div className="modal-footer">
                    <a href="javascript:void(0)" onClick={this.hideModal} className="modal-action waves-effect waves-purple btn-flat">Alas! My Fight was in Vein...</a>
                </div>
            </div>
        )
    }
})