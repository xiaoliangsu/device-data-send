
//  var amqp = require('amqplib');

// amqp.connect('amqp://localhost:5672', function(err, conn) {

//   conn.createChannel(function(err, ch) {
//   	console.log("connetc");
//   	 var data = '{"hardwareId": "sssssss", "type": "DeviceAlert","request": {"type": "engine.overheat","level": "Error","message": "The engine is about to overheat!! Turn the machine off!","updateState": true,"metadata":{"name1":"value1"}}}'
//   	 var q = 'sitewhere.input';

//     ch.assertQueue(q, {durable: false}).then(function(_qok){
//   //监听成功后向队列发送消息，这里我们就简单发送一个字符串。发送完毕后关闭通道。
//       ch.sendToQueue(q,new Buffer(data));
//       console.log(" [x] Sent '%s'",data);
//       return ch.close()
//     });
   

//     // Note: on Node 6 Buffer.from(msg) should be used

//     // ch.sendToQueue(q, new Buffer(data));

//     // console.log(" [x] Sent 'Hello World!'");
//     // conn.close()

//   });

// });

var amqp = require('amqplib');
var when = require('when');
//连接本地消息队列服务
amqp.connect('amqp://localhost:5672').then(function(conn){
//创建通道，让when立即执行promise
  return when(conn.createChannel().then(function(ch){
    var q = 'sitewhere.loutong6';
    var msg = 'Hello World';
    var data = '{"hardwareId": "hard1", "type": "DeviceAlert","request": {"type": "engine.overPa","level": "Error","message": "The engine is about to overheat!! Turn the machine off!","updateState": true,"metadata":{"name1":"value1"}}}'

  //监听q队列，设置持久化为false。
    return ch.assertQueue(q,{durable: true}).then(function(_qok){
  //监听成功后向队列发送消息，这里我们就简单发送一个字符串。发送完毕后关闭通道。
      ch.sendToQueue(q,new Buffer(data));
      console.log(" [x] Sent '%s'",data);
      return ch.close()
    });
  })).ensure(function(){ //ensure是promise.finally的别名，不管promise的状态如何都会执行的函数
//这里我们把连接关闭
    conn.close();
  });
}).then(null,console.warn);











  // var amqp = require("amqp");  
// var connOptions = {  
// 	amqps_URI:"amqps://",
//     host: "127.0.0.1"  
//     , port: 5672  
//     , login: "guest"  
//     , password: "guest"  
//     , authMechanism: "AMQPLAIN"  
//     , vhost: "/"  
//     , ssl: {  
//     enabled : false  
//     }  
// }  
// var conn = amqp.createConnection(connOptions); //连接rabbitmq 
// console.log(conn);



  
//   conn.on('ready', function (data) {  
//      console.log("连接成功")  
//      var exch = conn.exchange("sitewhere.input",{type: 'topic',durable:true,autoDelete:false,confirm:true},function(exchange){  //durable这个要正确哟  
//             console.log("开始发送")  
//             var data = '{"hardwareId": "sssssss", "type": "DeviceAlert","request": {"type": "engine.overheat","level": "Error","message": "The engine is about to overheat!! Turn the machine off!","updateState": true,"metadata":{"name1":"value1"}}}'
           
//             conn.publish('sitewhere.input',data,{mandatory: true},()=>{  
//                 console.log("aaaaaaaaaaaaa发送成功")  //回调  

//             },(error)=>{  
//                 console.log(error)  //回调  

//             });   
          
//           console.log("发送完成")  
//           conn.disconnect()  
//         }); //获取exchange 生成生产者  
//   }  
// )  
  
// conn.on('error', function(e) {  
//     console.log("Error from amqp: ", e);  
// });  

