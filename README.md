# A simple wrapper for protobuf.js 
UDP is faster than tcp and that is why it is widely used in
voip,skype,speech recognition,industrial IOT,... <br>
Node.Js can handle TCP using net library.  On the other hand, <b>dgram</b>
is a library that makes UDP connection in nodejs that is used here. 

##  UDP using protocol buffer
<b>Protocol buffers</b> are created by google to send
data in a structured way. The current library is
the simplest approach to send data by protocol buffers using UDP(user datagram protocol)
in nodejs. 

## client side
we send messages through UDP and using protocol buffers.


<code>   


     const client = dgram.createSocket('udp4');
     var s=require('./protobufMessage');
</code>

<code> 
    
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
</code>

## server side
we first create a udp server to receive messages that are serialized
by protocol buffer


<code>

      var dgram = require("dgram");
      var server = dgram.createSocket("udp4");
</code>

<code>

    server.on("message", function (msg, rinfo) {
    var d=require("./protobufMessage");
    d.file="speech.proto";
    d.proto="speechPackage.Speech";
    d.decodeProtoBuf(msg,function(ans){
    console.log("server got: " + ans+ " from " + rinfo.address + ":" + rinfo.port);
    console.log("server got: userId="+ans.userId+" ,signal="+ans.signal);
                                      });
    });

</code>



