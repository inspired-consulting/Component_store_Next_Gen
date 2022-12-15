const pgpool = require('./src/pgpool');

var pool = pgpool.getPool();
pool.query (`SELECT * FROM component `, (err, result) => {
    if (!err) {
        console.log("result",result.rows)
        console.log("data is shown");
    } else {
        console.log(err.message); 
    }
})

const query = `INSERT INTO component
    (id, uuid, name, website) 
    VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM component),'0e37df36-f698-11e6-8dd4-cb9ced3df976', 'nisha new post', 'www.name.comnisha') RETURNING id`
    var pool = pgpool.getPool();
    pool.query(query, (err, result) => {
    if (!err) { 
        console.log("inserted value", result.rows[0].id); 
    }
    else {
        console.log(err.message); 
    }
})