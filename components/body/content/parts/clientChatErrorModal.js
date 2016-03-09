/** @jsx React.DOM */

var ClientChatErrorModal = React.createClass({
    getInitialState: function(){
        return({
            error:''
        })
    },
    componentDidMount: function(){
        venti.on('showClientChatError',this.showClientChatError);
    },
    componentWillUnmount: function(){
        venti.off('showClientChatError',this.showClientChatError);
    },
    showClientChatError: function(data){
        switch(data.error){
            case 'exists':
                venti.trigger('activateChatPanel');
                break;
            default:
                this.setState({error:data.error});
                $('#client-chat-error-modal').openModal();
                break;
        }
    },
    hideModal: function(){
        $('#client-chat-error-modal').closeModal();
        $('.lean-overlay').remove();
    },
    render: function(){
        return(
            <div id="client-chat-error-modal" className="modal black-text">
                <div className="modal-content">
                    <h4 className="red-text">You can't join this room</h4>
                    <p className="flow-text">
                        You can't join this room. Reason: {this.state.error}
                    </p>
                </div>
                <div className="modal-footer">
                    <a href="javascript:void(0)" onClick={this.hideModal} className=" modal-action waves-effect waves-purple btn-flat">Ok, Got it!</a>
                </div>
            </div>
        )
    }
})