const io = require('socket.io')();
const worker = require('./lib/worker');

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('start', function(data) {
        if (data) {
            console.log(data);
            let b = data.split(',');
            b = b.map( a => a.trim());
            b[0] = isNaN(Number(b[0])) ? 1 : Number(b[0]);
            b[1] = isNaN(Number(b[1])) ? 1 : Number(b[1]);
            b[2] = isNaN(Number(b[2])) ? 1 : Number(b[2]);

            b[3] = isNaN(Number(b[3])) ? 0.3 : Number(b[3]);
            b[4] = isNaN(Number(b[4])) ? 1 : Number(b[4]);
            b[5] = isNaN(Number(b[5])) ? -0.3 : Number(b[5]);

            console.log(b);
            worker(socket, b);
        }
    });
});

io.listen(3000);
console.log('listening on port', 3000);
