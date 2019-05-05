const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function task(socket, data){
    var femProcess = spawn(
        'dotnet',
        [
            path.resolve(__dirname, '../../../', 'FEM/FEM/bin/Debug/netcoreapp2.0/FEM.dll'),
            '--json',
            JSON.stringify({
                sizeX: 100,
                sizeY: 100,
                sizeZ: 100,
                xAxisFEMCount: 3,
                yAxisFEMCount: 3,
                zAxisFEMCount: 3,
                puasson: 0.3,
                jung: 1,
                pressure: -0.1
            })
        ]
    );

    femProcess.stdout.on('data', (data) => {
        console.log(data.toString());

        if (data.toString() == 'Generated start.txt') {
            fs.readFile('./start.txt', 'utf8', (err, data) => {
                if (!err) {
                    socket.emit('start.txt', data);
                } else {
                    console.log('Error reading file start.txt');
                }
            });
        }

        if (data.toString() == 'Generated points.txt') {
            fs.readFile('./points.txt', 'utf8', (err, data) => {
                if (!err) {
                    socket.emit('points.txt', data);
                } else {
                    console.log('Error reading file points.txt');
                }
            });
        }
    });

    femProcess.stderr.on('data', (data) => {
        console.log(data.toString());
    });

    femProcess.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });
}

module.exports = task;
