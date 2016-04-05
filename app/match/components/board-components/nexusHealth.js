/** @jsx React.DOM */

var NexusHealth = React.createClass({
    componentDidMount: function(){
    },
    render: function(){
        var percent = (100/45)*this.props.health;
        return(
            <div className="nexus-health">
                <div className="health-wrapper">
                    <div className="health-indicator" data-size="100" data-value={percent}>
                        <svg>
                            <IndicatorSegment radi="50" value={percent} />
                        </svg>
                    </div>
                    <p className="health">{this.props.health}</p>
                </div>
            </div>
        )
    }
})


