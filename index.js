/* gist.js
    retrieves a gist using github api and request
*/

var request = require("request"),
    gistURL = "https://api.github.com/gists/",
    userAgent = "node-gist-get";

function compare(a, b) {
    "use strict";
    /* jshint curly: false */
    /* compare two gist history entries by commit date */
    /* sorted in descending order */
    var d1 = new Date(a.committed_at),
        d2 = new Date(b.committed_at);
    if (d1 < d2) {
        return 1;
    }if (d2 < d1) {
        return -1;
    }return 0;
}

function get(id, opts, callback) {
    "use strict";
    var ua = opts.userAgent || userAgent; // required by github api
    request({ url: "" + gistURL + "" + id,
        headers: { "User-Agent": ua }
    }, function (error, response, body) {
        if (error) {
            callback(error);
        }
        if (response.statusCode === 200) {
            callback(null, JSON.parse(body));
        } else {
            var code = response.statusCode,
                msg = response.statusMessage,
                err = new Error("" + code + " " + msg);
            callback(err);
        }
    });
}

function getVersion(id, version, opts, callback) {
    "use strict";
    get("" + id + "/" + version, opts, callback);
}

function latest(id, opts, callback) {
    "use strict";
    get(id, opts, function (err, result) {
        var history;
        if (err) {
            callback(err);
        } else {
            history = result.history.sort(compare);
            callback(null, { version: history[0].version,
                committed_at: history[0].committed_at });
        }
    });
}

module.exports = {
    get: get,
    latest: latest,
    version: getVersion };
