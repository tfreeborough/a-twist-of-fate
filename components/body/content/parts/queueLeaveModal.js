/** @jsx React.DOM */

var QueueLeaveModal = React.createClass({
    getInitialState: function(){
        return({
            showing:false,
            designatedPath:''
        });
    },
    componentDidMount: function(){
        venti.on('changePageError',this.changePageError);
    },
    changePageError: function(data){
        this.showModal();
        this.setState({designatedPath:data.page})
    },
    triggerDesignatedPath: function(){
        queueSocket.emit('requestQueueCancel',{id:queueSocket.id});
        var that = this;
        queueSocket.on('requestQueueCancelAccepted', function (data) {
            if(that.state.designatedPath != '') {
                venti.trigger('programmaticallyLeaveQueue');
                venti.trigger('resetQueueTimer');
                venti.trigger('changePage', {
                    page: that.state.designatedPath.toLowerCase(),
                    originalName: that.state.designatedPath
                });
            }
            console.log('Changing designated path');
        });
    },
    showModal: function(){
        $('#queue-leave-modal').openModal({
                dismissible: false // Modal can be dismissed by clicking outside of the modal
            }
        );
    },
    hideModal: function(){
        $('#queue-leave-modal').closeModal();
    },
    render: function(){
            return (
                <div id="queue-leave-modal" className="modal black-text">
                    <div className="modal-content">
                        <h4>Are you sure?</h4>

                        <p className="flow-text">
                            You are about to change from the queue to {this.state.designatedPath}, doing so will cause you to leave the queue, are you sure
                            you wish to leave the queue and proceed to {this.state.designatedPath}?
                        </p>
                    </div>
                    <div className="modal-footer">
                        <a href="javascript:void(0)" onClick={this.triggerDesignatedPath} className=" modal-action modal-close waves-effect waves-green btn-flat">Yes, please leave the queue and take me to {this.state.designatedPath}</a>
                        <a href="javascript:void(0)" className=" modal-action modal-close waves-effect waves-red btn-flat">No, I'd like to remain in the queue</a>
                    </div>
                </div>
            )
    }
})