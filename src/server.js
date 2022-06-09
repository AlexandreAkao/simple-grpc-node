const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.resolve(__dirname, 'protos', 'streaming.proto');
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);
const streaming_proto = grpc.loadPackageDefinition(packageDefinition);

function test(call, callback) {
  callback(null, { message: 'Hello ' + call.request.name });
}

(function main() {
  const server = new grpc.Server();
  server.addService(
    streaming_proto.Streaming.service,
    { test }
  );
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
})()
