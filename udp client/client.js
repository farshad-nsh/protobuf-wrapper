/**
 * Created by macbook on 4/5/18.
 */
/**
 * Created by farshad on 4/5/18.
 */

const dgram = require('dgram');

const client = dgram.createSocket('udp4');
var s=require('./protobufMessage');
var count=0;

function intervalFunc() {
    count++;
    if (count=="3"){
        clearInterval(this);
    }
    s.payload = {
        userId: "farshad",
        signal: "some interesting voice to be recognized"
    };
    s.file="speech.proto";
    s.proto="speechPackage.Speech";
    s.encodeProtoBuf(function(ans){
        console.log(" here ans=%s",ans.toString());
        client.send( ans, 4049, 'localhost', (err) => {
        });
    });
}
setInterval(intervalFunc,1500);





