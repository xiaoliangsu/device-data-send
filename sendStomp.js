 var Stomp = require('stompjs');
 // var SockJS = require('sockjs-client');

 var client = Stomp.overTCP('localhost', 61613);


 //var client = Stomp.overWS('ws://localhost:61613/stomp');
 console.log(client);
 // var ws = new SockJS('http://127.0.0.1:15674/stomp');
 // var client = Stomp.over(ws);




var callback = function(message) {
    // called when the client receives a STOMP message from the server
    if (message.body) {
        alert("got message with body " + message.body)
    } else {
        alert("got empty message");
    }
};

var connect_callback = function() {
  console.log("connect");
 
  var tx = client.begin();
   client.subscribe("/queue/sitewhere.stomp1",function(msg){
  //console.log("resulttttt:"+msg);
  msg.ack({ transaction: tx.id, receipt: 'my-receipt' });
 },
 {ack:'client'});
   var data = '{"hardwareId": "111", "type": "DeviceAlert","request": {"type": "engine.overheat11","level": "Error","message": "The engine is about to overheat!! Turn the machine off!","updateState": true,"metadata":{"name1":"value1"}}}';
// 

 client.send('/queue/sitewhere.stomp1',{transaction: tx.id,priority: 1},data);


 tx.commit();



client.disconnect(function() {
   console.log("See you next time!");
});

};
var error_callback = function(error) {
    // display the error's message header:
    console.log("Error"+error);
};


//监听平台的服务调用
console.log('guest');
var headers = {
    login: 'guest',
    passcode: 'guest',
    // additional header
};



client.connect(headers,connect_callback, error_callback);



