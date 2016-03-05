/** @jsx React.DOM */

var ConnectionStatus = React.createClass({
    getInitialState: function(){
        return ({
            connected:false,
            status:'Not Available',
            connectionMsg:'A connection has yet to be initialted with the server.',
            icon:'data:image/png;base64,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'
        })
    },
    componentDidMount: function(){
        venti.on('server_connection_error',this.connectionLost);
        venti.on('server_connection_success',this.connectionCreated);
    },
    componentWillUnmount: function(){
        venti.off('server_connection_error',this.connectionLost);
        venti.off('server_connection_success',this.connectionCreated);
    },
    connectionCreated: function(data){
        this.setState({connected:true});
        this.setState({status:'Connected'});
        this.setState({connectionMsg:data.msg});
        this.setState({icon:'data:image/png;base64,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'});
    },
    connectionLost: function(data){
        this.setState({connected:false});
        this.setState({status:'Not Connected'});
        this.setState({connectionMsg:data.msg});
        this.setState({icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA7VBMVEX////ZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwDZUwAAAABZHSfAAAAATXRSTlMAE3bbuE8BIOCeAhQoEA+h/urEn3lTLgkOyOK9l3FMJgX79MfGDcUMNKb5wlZOk8M7sPzcdQaxMOeNaI8hmGWv2q4E+DqsSFf3R6Qzqyb0jPwAAAABYktHRE4ZYXHfAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4AMFACIVYIGZCwAAA5BJREFUeNrt22lX2lAQgOEruwKyE9kjLkhUZK1aq1Vcujn//+8UWpAk5EIyd8icWucrIc8rx4PJvVEIv2crEAyFI76zbxONwWS2d3h9voK5z1Ww8HkKzD5HgdX3v8Du+12w7Ptb4ORPCjbzjRRPJN35AOEN8LupNEAmm8sXito6H0L0/l5pcfp0uVKt1Ru61IfgRv357DdlPgTI/QPwMrEtZj/63vxDXv/of/ePP3xOv5Vl8zVe/6RtnJ4x+ufG9ISdC09+k9r3Ovs6rw/QYPahzuxDjdmHKoXfxftQoQjo4X0oE/jxvkJAWlMPiAwUAqBI8BEMVQIKBAGjTwoBeYIApYIcRYBKQZYkQKEgQxOgUJBUx9UKEkQB2IJ0nCoAWZAi83EFpV3CAERBaY/S915wQOx7LSDxR5eFoo4rIPELmcmZrs4xBYcU/vXsZJ+9F5D4N/OzNb94LTg8ovSta3xuCo6Rfty8oGzyoW0+an0B0u/2+oPhyMmHW8uB6wqQ/t/7j57u4MOd9dDVBVkVH+Crvuzf26+uVxVkW0o+wMPY7j8+LR0uL1D2AZ51m//i8AZZwYW6DzBY70sLOgQ+uPGlBd8Q/gnGlxVgLsTbKF9SYHi/H9XkH8D3Hyvf6VTwE/EJnKJ+fucC4xci4AzrLxcY5y685ek4B7hZ47IWIP2WZP3zdexwsHZ32w5Irg+wvnT916Hg6X76QtPxGoncdyh4eZy94nCdiPSPVq5/2wrefLjS7QVYf83+h6Vg4VuXn0bDQb/X3YhvKTD7tuWnCPIu2M3+z1uBxYdLnGjzXe3/zQqsfmakaE/H7f7rnwKrT7IA6H7/d1Jg868pfA/73691q3/js2+fd+GXeP1dZl+kmP14mtcXCWZfJLH+QKcJEBlswfNYHZ+Ot0148zzQfAY5dMBs/UB18vgA6FH8IS4oBMCQIKCoEjAgeDhTw38TAfQpdkHKKr8EBL6o4H2jSxFQxfu4+w/71Jh9UWf2RYPZF/o+ry+iTU/yRYfaj3nysy1xdmq0Txh9MXuaj9EnHI8+dv/nw6fxSfb//mWfev/do0++/8/tbzH7IiC1mg5/G6mf/5hMUObHonqjXqtWyumN+iIk9edHaMVCPped3LmmU6TP38wmvM6fTzJB9/yTeSLb7vzNzc42r+9U4K+/XOC3by/w37cWcPjmAh5/UcDlzwv4/Mk3UjgUDFD//+H6+Q0XJ7RVSp+NxQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wMy0wNVQwMDozNDoyMSswMTowMB1g8ycAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMDMtMDVUMDA6MzQ6MjErMDE6MDBsPUubAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=='});
    },
    render: function(){

        /*
        Pass the current status to the main component, we can then use the status of the connection
        in areas like the play component, this trigger will re-render the main component.
         */
        venti.trigger('send_connection_to_main',{connection:this.state.connected});

        return(
            <div className="server-connection">
                <div>
                    <img alt={this.state.status} title={this.state.connectionMsg} src={this.state.icon} />
                </div>
            </div>
        )
    }
})
