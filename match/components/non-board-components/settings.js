/** @jsx React.DOM */

var mouseDown = 0;
document.body.onmousedown = function() {
    mouseDown = 1;
}
document.body.onmouseup = function() {
    mouseDown = 0;
}

var Settings = React.createClass({
    setGlobalVolume: function(volume){
        localStorage.setItem('globalVolume',volume);
        updateVolume();
    },
    moveVolumeSlider: function(event){
        if(mouseDown) {
            var x = event.pageX - $('.volume-bar').offset().left;
            var width = $('.volume-bar').width();
            var percentage = Math.round(x / (width / 100));
            $('.volume-bar-inner').css('width', x+1 + 'px');
            $('.volume-bar-percent').text(percentage+'%');
            this.setGlobalVolume(0.01*percentage);
        }else if(event.type == 'click'){
            var x = event.pageX - $('.volume-bar').offset().left;
            var width = $('.volume-bar').width();
            var percentage = Math.round(x / (width / 100));
            $('.volume-bar-inner').css('width', x+1 + 'px');
            $('.volume-bar-percent').text(percentage+'%');
            this.setGlobalVolume(0.01*percentage);
        }
    },
    setVolumeWidth: function(){
        console.log('SETTING WIDTH');
        var width = 360;
        $('.volume-bar-inner').css('width', ((width/100)*(localStorage.getItem('globalVolume')*100))+1 + 'px');
        $('.volume-bar-percent').text(Math.round(localStorage.getItem('globalVolume')*100)+'%');
    },
    toggleSettings: function(){
        $('.match-settings').slideToggle(300);
    },
    toggleFullScreen: function(){
        toggleFullScreen();
    },
    fullScreenExitHandler: function(){
        if (document.webkitIsFullScreen === false){
            $('.fullscreen-settings .switch input').prop('checked', false);
        }
        if(document.mozFullScreen === false){
            $('.fullscreen-settings .switch input').prop('checked', false);
        }
        if(document.msFullscreenElement === false) {
            $('.fullscreen-settings .switch input').prop('checked', false);
        }
    },
    componentDidMount: function(){
        this.setVolumeWidth();
        var screen_change_events = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange";
        $(document).on(screen_change_events, this.fullScreenExitHandler);
    },
    render: function(){
        return(
            <div>
                <div className="match-settings">
                    <div className="volume-bar" onClick={this.moveVolumeSlider} onMouseMove={this.moveVolumeSlider}>
                        <div className="volume-bar-inner">
                        </div>
                        <div className="volume-bar-percent flow-text noselect">100%</div>
                        <div className="settings-label flow-text noselect">Volume</div>
                    </div>
                    <div className="fullscreen-settings">

                        <div className="switch">
                            <label>
                                Off
                                <input type="checkbox" onClick={this.toggleFullScreen} />
                                    <span className="lever blue darken-3"></span>
                                    On
                                </label>
                            </div>
                            <span className="flow-text faded toggle-label">Toggle Fullscreen</span>
                    </div>
                </div>
                <div className="settings-icon" onClick={this.toggleSettings}>
                    <span className="mega-octicon octicon-gear pink-text"></span>
                </div>
            </div>
        )
    }
})