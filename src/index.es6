/* gist.js
    retrieves a gist using github api and request
*/

var request = require('request'),
    base = require('github-api-base'),
    url = `${base}gists/`,
    defaultOpts = {
        headers: base.headers
    };

function compare(a, b) {
    'use strict';
    /* jshint curly: false */
    /* compare two gist history entries by commit date */
    /* sorted in descending order */
    var d1 = new Date(a.committed_at),
        d2 = new Date(b.committed_at);
    if (d1 < d2) return 1;
    if (d2 < d1) return -1;
    return 0;
}

function get(id, opts, callback) {
    'use strict';
    if (arguments.length === 2 && typeof arguments[1] === 'function') {
        opts = defaultOpts;
        callback = arguments[1];
    }
    var headers = opts.headers || base.headers;
    request({ url: `${url}${id}`,
              headers: headers
            },
            function (error, response, body) {
                if (error) {
                    callback(error);
                }
                if (response.statusCode === 200) {
                    callback(null, JSON.parse(body));
                }
                else {
                    let code = response.statusCode,
                        msg = response.statusMessage,
                        err = new Error(`${code} ${msg}`);
                    callback(err);
                }
            }
    );
}

function getVersion(id, version, opts, callback) {
    'use strict';
    if (arguments.length === 3 && typeof arguments[2] === 'function') {
        opts = defaultOpts;
        callback = arguments[2];
    }

    get(`${id}/${version}`, opts, callback);
}

function latest(id, opts, callback) {
    'use strict';
    if (arguments.length === 2 && typeof arguments[1] === 'function') {
        opts = defaultOpts;
        callback = arguments[1];
    }

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
    version: getVersion,
};
