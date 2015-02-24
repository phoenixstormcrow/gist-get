var test = require('tape'),
    fs = require('fs'),
    gist = require('../index'),
    gistID = '0d1faa46f230d941e184', // a gist to test against
    latestVersion = '70dc7bf945f1577eb650c6a6658b6e91973b836e',
    latestCommit = '2014-10-22T23:43:30Z',
    getFile = 'test/get.json'; // file created using curl to access github api

test('get test', function (t) {
    t.plan(4);

    gist.get(gistID, {}, function (err, res) {
        if (err) throw (err);

        t.ok(res, 'result defined');
        t.equal(res.id, gistID, 'id matches');
        t.equal(res.history.length, 11, 'history length 11');

        fs.readFile(getFile, function(err, data) {
            if (err) throw err;
            var g = JSON.parse(data.toString());
            t.deepEqual(res, g, 'result equals contents of get.json');
        });
    });
});

test('get test without opts', function (t) {
    t.plan(4);

    gist.get(gistID, function (err, res) {
        if (err) throw (err);

        t.ok(res, 'result defined');
        t.equal(res.id, gistID, 'id matches');
        t.equal(res.history.length, 11, 'history length 11');

        fs.readFile(getFile, function(err, data) {
            if (err) throw err;
            var g = JSON.parse(data.toString());
            t.deepEqual(res, g, 'result equals contents of get.json');
        });
    });
});

test('latest test', function (t) {
    t.plan(2);

    gist.latest(gistID, {}, function (err, res) {
        if (err) throw err;

        t.ok(res, 'result defined');
        t.deepEqual(res, { version: latestVersion, committed_at: latestCommit }, 'result correct');
    });
});

test('latest test without opts', function (t) {
    t.plan(2);

    gist.latest(gistID, function (err, res) {
        if (err) throw err;

        t.ok(res, 'result defined');
        t.deepEqual(res, { version: latestVersion, committed_at: latestCommit }, 'result correct');
    });
});
