const http = require('http');

function authenticate(userId, password) {  
  return new Promise((resolve, reject) => {
    let data = {
      userId,
      password,
    };
    let dataEncoded = JSON.stringify(data);
    let req = http.request(
      {
        host: '127.0.0.1',
		port: 3000,
        method: 'POST',
        headers: {
          //'Content-Length': Buffer.byteLength(dataEncoded),
         // 'Content-Type': 'application/json',
        },
      },
	  /*
      res => {
        let buffers = [];
        res.on('error', reject);
        res.on('data', buffer => buffers.push(buffer));
        res.on(
          'end',
          () =>
            res.statusCode === 200
              ? resolve(Buffer.concat(buffers))
              : reject(Buffer.concat(buffers))
        );
      }
	  */
    );
    req.write(dataEncoded);
    req.end();
  });
}

authenticate('123123', '123213213213');