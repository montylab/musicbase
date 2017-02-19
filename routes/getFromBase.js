const express = require('express');
const router = express.Router();
const pg = require('pg');
const url = require('url');

let env = (process.env.NODE_ENV == 'production') ? 'production' : 'development';
const config = require('../config')[env];




router.get('/', function(req, res, next) {
    let params = url.parse(req.url, true).query;
    let sqlParam = {
        orderDirection: params.desc ? 'DESC' : 'ASC',
        orderBy: params.order || 'singer',
        limit: params.limit || 50,
        offset: params.offset || 0,
        where: '',
    };

    if (params.where && params.equal) {
        params.where = JSON.parse(params.where);
        params.equal = JSON.parse(params.equal);

        let i=params.where.length;
        while(i--) {
            if (params.where[i] && params.equal[i]) {
                sqlParam.where += ' '+params.where[i] +'=\''+ params.equal[i]+'\' AND '
            }
        }
    }
    sqlParam.where += 'true';


    let client = new pg.Client(config.database);
    client.connect((e)=>console.log(e));


    let sqlQuery = "SELECT * FROM music ";
    sqlQuery += " WHERE "+ sqlParam.where;
    sqlQuery += " ORDER BY "+sqlParam.orderBy+" "+ sqlParam.orderDirection + " LIMIT "+ sqlParam.limit + " OFFSET " + sqlParam.offset;


    console.log(sqlQuery);
    let query = client.query(sqlQuery);


    let output = {music: []};
    query.on('row', function(row) {
        output.music.push(row);
    });

    query.on('end', function() {
        client.end();
        res.json(output);
    });

});

module.exports = router;
