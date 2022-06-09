const PROTO_PATH = `${__dirname}/protos/streaming.proto`;

var parseArgs = require('minimist');
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader');

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

(function main() {
  const argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });

  const target = argv.target ?? 'localhost:50051';
  const client = new streaming_proto.Streaming(target, grpc.credentials.createInsecure());

  client.getAllMusics({}, function(err, response) {
    console.log(response);
  });
})()