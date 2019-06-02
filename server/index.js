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
                JSON.stringify(Object.assign(
                    JSON.parse(data),
                    {
                        jung: 1,
                        pressure: 0.3,
                        load: [
                            {
                                fe: 26,
                                part: 5,
                                pressure: -0.1
                            },
                            {
                                fe: 25,
                                part: 5,
                                pressure: -0.1
                            },
                            {
                                fe: 24,
                                part: 5,
                                pressure: -0.1
                            },
                            {
                                fe: 23,
                                part: 5,
                                pressure: -0.1
                            },
                            {
                                fe: 22,
                                part: 5,
                                pressure: -0.1
                            },
                            {
                                fe: 21,
                                part: 5,
                                pressure: -0.1
                            }
                        ]
                    }
                )),
                // '-m'
            ];

            worker(socket, params);
        }
    });

    socket.on('solve', function(data) {
        if (data) {
            console.log('Got mesh creation request', data);

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
