var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://localhost',{
    username:"admin"
});

//监听平台的服务调用
client.on('connect', function () {
    console.log('connected');
   // client.subscribe('SiteWhere/system/ec2dbc34-f862-4a0f-9782-c5fa58cd4c76')
	//client.subscribe('SiteWhere/commands/ec2dbc34-f862-4a0f-9782-c5fa58cd4c76')



  // var temp = Math.round(Math.random() * 100)
  
  // var data = '{"hardwareId": "hard3", "type": "DeviceMeasurements","request": {"measurements": { "water.inTemper": '+temp+',"water.outTemper": 15,"device.Temper": 24.1},"updateState": true}}';
  // console.log(data);

  
	// var data = '{"hardwareId": "hardid2", "type": "DeviceMeasurements","request": {"measurements": { "water.inTemper": 24.1,"water.outTemper": 15,"device.Temper": 24.1},"updateState": true,"eventDate": "2018-04-26T11:16:03.391Z"}}'
  // var data = '{"hardwareId": "1234-TEST", "type": "DeviceAlert","request": {"type": "engine.overheat","level": "Warning","message": "The engine is about to overheat! Turn the machine off!", "updateState": false,"eventDate": "2016-02-10T19:40:03.391Z","metadata": {  "name1": "value1","name2": "value2"}}}'
 // client.publish('SiteWhere/input/json', data);

  setInterval(function () {
     var inTemp = Math.round(Math.random() * 100);
     var outTemp = Math.round(Math.random() * 80);
     var deviceTemp = Math.round(Math.random() * 110);
     var waterPa = Math.random()*2;
     var gasPa = Math.random()*1;

  
  var data = '{"hardwareId": "hardid1", "type": "DeviceMeasurements","request": {"measurements": { "gas.Pa":'+gasPa+',"water.Pa":'+waterPa+',"water.inTemper": '+inTemp+',"water.outTemper":'+outTemp+ ',"device.Temper": '+deviceTemp+'},"updateState": true}}';
  console.log(data);
client.publish('SiteWhere/input/json', data)
  
}, 10000);


//	client.unsubscribe('v1/devices/me/rpc/request/+')
	//client.end();
});

//服务调用到来时的执行逻辑
client.on('message', function (topic, message) {//topic相当于请求的路径，message相当于请求体，里边有请求的服务名和参数
    console.log('request.topic: ' + topic);
    console.log('request.body: ' + message.toString());
   // var requestId = topic.slice('v1/devices/me/rpc/request/'.length);
    //网关可以在这里解析message 然后进行相应的处理，将处理结果返回给用户。
   // client.publish('v1/devices/me/rpc/response/' + requestId, 'hahaha');
});


//curl -v -X POST -d @data.json http://10.108.217.227:8080/api/plugins/rpc/twoway/438cbac0-d320-11e7-a71a-974188b66f66 \
//--header "Content-Type:application/json" \
//--header "X-Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJ1c2VySWQiOiJhMmIyNTMxMC1iN2VjLTExZTctOGZjMC01NTkyMmI1ZDQ3ZjYiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiYTJiMTY4YjAtYjdlYy0xMWU3LThmYzAtNTU5MjJiNWQ0N2Y2IiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNTEwMTk4Njc5LCJleHAiOjE1MTkxOTg2Nzl9.XPq489vRt3CSpqdY6kzr5DNBvhyCcnezFK4DUAgQTjVkiVqjDEPN_jGKgdb9dKA_aiXVdWptkWOjLwJqubFpjA"