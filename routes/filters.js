const express = require('express');
const router = express.Router();
const pg = require('pg');
const url = require('url');

let env = (process.env.NODE_ENV == 'production') ? 'production' : 'development';
const config = require('../config')[env];

/* GET users listing. */
router.get('/', function(req, res, next) {
    let client = new pg.Client(config.database);
    client.connect((e)=>console.log(e));

    let sqlQuerySingers = "SELECT DISTINCT singer FROM music ORDER BY singer ASC";
    let sqlQueryGenres = "SELECT DISTINCT genre FROM music ORDER BY genre ASC";
    let sqlQueryYears = "SELECT DISTINCT year FROM music ORDER BY year ASC";

    let queryS = client.query(sqlQuerySingers);
    let queryG = client.query(sqlQueryGenres);
    let queryY = client.query(sqlQueryYears);

    let output = {filters: {singers: [], genres: [], years: []}};
    queryS.on('row', function(row) {
        output.filters.singers.push(row);
    });
    queryG.on('row', function(row) {
        output.filters.genres.push(row);
    });
    queryY.on('row', function(row) {
        output.filters.years.push(row);
    });

    let qCnt=0;
    queryS.on('end', ()=> { if (++qCnt == 3) out(); });
    queryG.on('end', ()=> { if (++qCnt == 3) out(); });
    queryY.on('end', ()=> { if (++qCnt == 3) out(); });

    let out = ()=>{
        client.end();
        res.json(output);
    }
});

module.exports = router;
