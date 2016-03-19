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
    componentDidMount: function(){
        this.setVolumeWidth();

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
                </div>
                <div className="settings-icon" onClick={this.toggleSettings}>
                    <span className="mega-octicon octicon-gear pink-text"></span>
                </div>
            </div>
        )
    }
})