# gist-get
node module to retrieve gists using github api.

## installation
`npm install gist-get`

## usage
This module wraps the [github api](https://developer.github.com/v3/gists/) for retrieving gists. It uses the request module to send GET requests to the api.

`var gist = require('gist-get');`

### methods

`gist.get(id, [opts], callback)`

`id` is a gist id, such as 0d1faa46f230d941e184.

`opts` is an optional object, with one field, "headers". This can be used to specify the headers for the request. It defaults to the value of `require('github-api-base').headers`. This default exists to ensure that a User-Agent header is sent with the request, as required by the github api.

`callback(err, result)` will be passed the result of `JSON.parse(body)`, which is a javascript object representing the requested gist, assuming no errors.

`gist.version(id, version, [opts], callback)`

`version` is a revision hash, for requesting a specific revision of a gist, such as 70dc7bf945f1577eb650c6a6658b6e91973b836e.
The other parameters are the same as for `gist.get`.

`gist.latest(id, [opts], callback)`

`callback(err, result)` will, on success, be passed an object of the form `{ version: "70dc7bf945f1577eb650c6a6658b6e91973b836e", committed_at: "2014-10-22T23:43:30Z" }` corresponding to the version and commit time of the most recent version of the requested gist.
