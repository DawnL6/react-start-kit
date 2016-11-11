import request from 'superagent';

const host = 'http://101.200.129.112:9527/';
const GET_FILE = host + 'file/get/';

export function getFileList(path,successCb,errorCb) {
    request
        .get(GET_FILE)
        .query({
            path:path
        })
        .end(function (err,res) {
            if(err){return errorCb(err)}
            successCb(res.body)
        })
}