const fs = require('fs');
const ACCESS_LOG = './access.log';


var lineReader = require('readline').createInterface({
    input: fs.createReadStream(ACCESS_LOG)
});


lineReader.on('line', function (line){
    if (line.includes('89.123.1.41')) {
        fs.writeFile('89.123.1.41_requests.log', line + '\n', { flag: 'a' }, () => {});
    }
});

lineReader.on('line', function (line){
    if (line.includes('34.48.240.111')) {
        fs.writeFile('34.48.240.111_requests.log', line + '\n', { flag: 'a' }, () => {});
    }
});

