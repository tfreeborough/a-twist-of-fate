/** @jsx React.DOM */


var PromptUsernameModal = React.createClass({
    componentDidMount: function(){
        venti.on('promptForUsername',this.promptForUsername);
    },
    promptForUsername: function(){
        $('#prompt-username-modal').openModal();
    },
    render: function(){
        return(
            <div id="prompt-username-modal" className="modal black-text">
                <div className="modal-content">
                    <h4 className="red-text">You can't queue yet.</h4>

                    <p className="flow-text">
                        You can't queue until you enter a username please enter one and then press Queue.
                    </p>
                </div>
                <div className="modal-footer">
                    <a href="javascript:void(0)" className=" modal-action modal-close waves-effect waves-purple btn-flat">Ok, Got it!</a>
                </div>
            </div>
        )
    }
})