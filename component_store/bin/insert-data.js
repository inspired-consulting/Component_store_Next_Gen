const childprocess = require('child_process');
childprocess.execSync(
    'psql -h 127.0.0.1 -d componentstore -U componento -f ./bin/example.sql'+
    '&& cd uploads && mkdir example-component && cd example-component && mkdir 1.2.3'+
    '&& cd 1.2.3 && cd ../../../ && cp ./bin/example.js ./uploads/example-component/1.2.3/example.js'
);