/** @jsx React.DOM */


var ClientChat = React.createClass({
    getInitialState: function(){
        return({
            roomsAvailable: {
                global: {
                    name: "Global",
                    users: []
                }
            }
        })
    },
    render: function(){
        var rooms = this.state.roomsAvailable;
        return(
            <div id="client-chat">
                <div className="fixed-action-btn horizontal click-to-toggle client-chat-icon">
                    <a className="btn-floating btn-large transparent">
                        <i className="large material-icons">chat</i>
                    </a>
                    <ul>
                        {Object.keys(this.state.roomsAvailable).map(function(room) {
                            return (
                                <li>
                                    <a className="btn-floating red">
                                        {rooms[room]['name']}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
})