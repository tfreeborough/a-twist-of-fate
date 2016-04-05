function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");

    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
}

function delete_cookie( name ) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

$.fn.easyaspie = function () {



    var	size	= parseInt(this.data('size')),
        radius	= size / 2,
        value	= parseInt(this.data('value'));

    // pie all the things!
    if (this.length > 1){
        this.each( function() {
            $(this).easyaspie();
        });
        return this;
    }

    // is you trying to break things?
    if (isNaN(value)) {
        return this;
    }

    // set the size of this
    this.css({
        height: size,
        width: size
    }).addClass('pie-sliced');

    // make value behave
    value = Math.min(Math.max(value, 0), 100);

    // make me some svg
    this.pie = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    // if value is 100 or higher, just use a circle
    if (value >= 100) {
        this.pie.slice = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.pie.slice.setAttribute('r', radius);
        this.pie.slice.setAttribute('cx', radius);
        this.pie.slice.setAttribute('cy', radius);

    } else {
        this.pie.slice = document.createElementNS("http://www.w3.org/2000/svg", "path");

        //calculate x,y coordinates of the point on the circle to draw the arc to.
        var x = Math.cos((2 * Math.PI)/(100/value));
        var y = Math.sin((2 * Math.PI)/(100/value));

        //should the arc go the long way round?
        var longArc = (value <= 50) ? 0 : 1;

        //d is a string that describes the path of the slice.
        var d = "M" + radius + "," + radius + " L" + radius + "," + 0 + ", A" + radius + "," + radius + " 0 " + longArc + ",1 " + (radius + y*radius) + "," + (radius - x*radius) + " z";
        this.pie.slice.setAttribute('d', d);
    }

    //add the slice to the pie.
    $(this.pie.slice).appendTo(this.pie);

    // add the pie to this
    $(this.pie).appendTo(this);

    return this;
};
