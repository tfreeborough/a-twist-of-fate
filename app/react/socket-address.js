var socket = io('http://localhost');

if(window.location.pathname == '/'){
    var queueSocket = io('http://localhost/queue');
    var registerSocket = io('http://localhost/register');
    var logInSocket = io("http://localhost/logIn");
}


if(window.location.pathname == '/match/'){
    var matchSocket = io('http://localhost/match');
}