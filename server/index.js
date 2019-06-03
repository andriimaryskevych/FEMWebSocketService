const io = require('socket.io')();
const worker = require('./lib/worker');

const PORT = 4000;

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('mesh', function(data) {
        if (data) {
            console.log('Got mesh creation request', data);

            const params = [
                '--json',
                data,
                '-m'
            ];

            worker(socket, params);
        }
    });

    socket.on('solve', function(data) {
        if (data) {
            console.log('Got solve request', data);

            const params = [
                '--json',
                data
            ];

            worker(socket, params);
        }
    });
});

io.listen(PORT);
console.log('listening on port', PORT);
