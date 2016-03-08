/** @jsx React.DOM */


var PromptUsernameModal = React.createClass({
    componentDidMount: function(){
        venti.on('promptForUsername',this.promptForUsername);
    },
    promptForUsername: function(){
        $('#prompt-username-modal').openModal();
    },
    hideModal: function(){
        $('#prompt-username-modal').closeModal();
        $('.lean-overlay').remove();
    },
    render: function(){
        return(
            <div id="prompt-username-modal" className="modal black-text">
                <div className="modal-content">
                    <h4 className="red-text">You need a username.</h4>

                    <p className="flow-text">
                        You can't queue/enter a chatroom until you enter a username.
                    </p>
                    <p className="flow-text">
                        Please enter one and then try again.
                    </p>
                </div>
                <div className="modal-footer">
                    <a href="javascript:void(0)" onClick={this.hideModal} className=" modal-action waves-effect waves-purple btn-flat">Ok, Got it!</a>
                </div>
            </div>
        )
    }
})