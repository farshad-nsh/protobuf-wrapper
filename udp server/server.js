/**
 * Created by farshad on 4/5/18.
 */

var dgram = require("dgram");
var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {

    var d=require("./protobufMessage");
    d.file="speech.proto";
    d.proto="speechPackage.Speech";
    d.decodeProtoBuf(msg,function(ans){
        console.log("server got: " + ans+ " from " + rinfo.address + ":" + rinfo.port);
        console.log("server got: userId="+ans.userId+" ,signal="+ans.signal);
    });


});
server.on("listening", function () {
    var address = server.address();
    console.log("server listening " + address.address + ":" + address.port);
});

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
server.close();
});

server.bind(4049);