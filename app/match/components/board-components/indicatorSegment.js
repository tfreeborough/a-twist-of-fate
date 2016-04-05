/** @jsc React.DOM */


var IndicatorSegment = React.createClass({
    render: function(){

        /*
        I am not entirely confident in my SVG abilities, this could fall apart if you change anything. - Tom
         */

        // Ensure we actually convert that damn string into an int
        var radius = parseInt(this.props.radi);

        // Get the percent value
        var value = this.props.value;

        // enforce 0-100
        value = Math.min(Math.max(value, 0), 100);

        // Use the math, luke!
        var x = Math.cos((2 * Math.PI)/(100/value));
        var y = Math.sin((2 * Math.PI)/(100/value));

        // Determine if the arc  needs to encompass more than 50%
        var longArc = (value <= 50) ? 0 : 1;

        // set radius variables outside here
        var xradius = radius - (x*radius);
        var yradius =radius + (y*radius);

        // turn it all into a string
        var segmentString = "M" + radius + "," + radius + " L" + radius + "," + 0 + ", A" + radius + "," + radius + " 0 " + longArc + ",1 " + yradius + "," + xradius + " z";

        if(value >= 100){
            return(
                <circle r={radius} cx={radius} cy={radius}></circle>
            )
        }else{
            return (
                <path d={segmentString}></path>
            )
        }
    }
});