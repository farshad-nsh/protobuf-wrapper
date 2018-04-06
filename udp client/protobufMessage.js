/**
 * Created by farshad on 4/5/18.
 */


var protobuf = require("protobufjs");

var funcs={};


funcs.encodeProtoBuf=function(cb){

    protobuf.load(funcs.file, function (err, root) {
        if (err)
            throw err;

        var AwesomeMessage = root.lookupType(funcs.proto);

        var payload=funcs.payload;
        var errMsg = AwesomeMessage.verify(payload);
        if (errMsg)
            throw Error(errMsg);

        var message = AwesomeMessage.create(payload);
        var buffer = AwesomeMessage.encode(message).finish();
        cb(buffer);

    });

}

funcs.decodeProtoBuf=function(message,cb){
    protobuf.load(funcs.file, function (err, root) {

        if (err)
            throw err;

        var AwesomeMessage = root.lookupType(funcs.proto);
        var errMsg = AwesomeMessage.verify(message);
        if (errMsg)
            throw Error(errMsg);
        try {

            var message6 = AwesomeMessage.decode(message);
            var object = AwesomeMessage.toObject(message6, {
                longs: String,
                enums: String,
                bytes: String,
                defaults: true, // includes default values
                arrays: true,   // populates empty arrays (repeated fields) even if defaults=false
                objects: true,  // populates empty objects (map fields) even if defaults=false
                oneofs: true    // includes virtual oneof fields set to the present field's name
            });

            cb(object);
        } catch (e) {
            if (e instanceof protobuf.util.ProtocolError) {
                console.log("missing required fields")
            } else {
                console.log("wire format is invalid")
            }
        }
    });
}






module.exports=funcs;