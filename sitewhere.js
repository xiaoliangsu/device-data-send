var mqtt = require('mqtt');

//建立和平台的连接
var client  = mqtt.connect('mqtt://localhost',{
     username:"guest",
    password:"guest"
});

//监听平台的服务调用
client.on('connect', function () {
    console.log('connected');
	// client.subscribe('SiteWhere/commands/aaaaaaaa')
  client.subscribe('SiteWhere/commands/hard7')
	//var str = '{"hardwareId": "123-TEST2-4567890","type": "RegisterDevice","request": {"hardwareId": "123-TEST2-4567890","specificationToken": "964e7613-dab3-4fb3-8919-266a91370884","siteToken": "bb105f8d-3150-41f5-b9d1-db04965668d3"}}'
	//var st1 = '{"hardwareId": "123-TEST-4567890", "type": "DeviceMeasurements","request": {"measurements": { "home.temper": 23.1,"home.pm2.5": 15},"updateState": true,"eventDate": "2018-04-24T11:16:03.391Z"}}'
	//client.publish('SiteWhere/input/json', str)
//	client.unsubscribe('v1/devices/me/rpc/request/+')
//	client.end();
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