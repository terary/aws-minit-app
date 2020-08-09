"use strict";
const AWS = require('aws-sdk');
const meta  = new AWS.MetadataService();

const makeRequest = (resource) => {
    return new Promise((resolve,reject)=>{
        meta.request(resource, function(err, data){
            if(err) {
                reject(err);
            }else {
                resolve({[resource]:data});
            }
          });
    });
}


class AWSEnvironment {
    constructor(){
        this._awsEnv = null;
        if(AWSEnvironment.isAWS()) {
            this._init();
        } else {
            this._awsEnv ={'is not aws env':'is not aws env'}
            console.log('Not on AWS instance!!!')
        }
    }

    _init(){
        const self = this;
        const requests = [];
        requests.push(makeRequest("/latest/meta-data/instance-id"))
        requests.push(makeRequest("/latest/meta-data/local-ipv4"))
        requests.push(makeRequest("/latest/meta-data/public-ipv4"))
        requests.push(makeRequest("/latest/dynamic/instance-identity/document"))
        
        
        Promise.all(requests)
        .then(response=>{
            response.forEach(r=> {
                self._awsEnv = Object.assign({}, self._awsEnv, r);
            })
            // console.log(response)
        }).catch(err=>{
            console.log('Error', err)
            
        })
    }

    get awsEnv(){
        return this._awsEnv
    }
    get isAWS() {
        return AWSEnvironment.isAWS();
    }
    static isAWS() {
        return true;       
        //return process.env.HOSTNAME && process.env.HOSTNAME.indexOf('terary-msi') === -1
    }

}


module.exports = new AWSEnvironment();
