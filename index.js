/* gist.js
    retrieves a gist using github api and request
*/

var request = require('request'),
    gistURL = "https://api.github.com/gists/",
    userAgent = "node-gist-get";


function get(id, opts, callback) {
    "use strict";
    var ua = opts.userAgent || userAgent; // required by github api
    request({ url: gistURL + id,
              headers: { "User-Agent": ua }
            },
            function (error, response, body) {
                var result;
                if (error) {
                    console.log("Get " + gistURL + id + " failed.");
                    console.log(error);
                    callback(error);
                }
                result = JSON.parse(body);
                callback(null, result);
            }
    );
}

function getVersion(id, version, opts, callback) {
    "use strict";
    get(id + '/' + version, opts, callback);
}

function latest(id, opts, callback) {
    "use strict";
    get(id, opts, function (err, result) {
        var history, latest;
        if (err) {
            callback(err);
        }
        if (result) {
            history = result.history;
            history.sort(function (a, b) {
                // sort by committed_at date descending
                a = new Date(a.committed_at);
                b = new Date(b.committed_at);
                /* jshint curly: false */
                if (a<b) return 1;
                if (a>b) return -1;
                else return 0;
            });
        latest = getVersion(id, history[0].version, opts, callback);
        }
    });
}

module.exports = {
    get: get,
    latest: latest,
    version: getVersion
};
