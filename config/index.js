"use strict";

class ConfigManager {
    constructor(){
        if (process.env.NODE_ENV === 'production') {
            this._configs = Object.assign({},configTemplate, prodConfig)
        }else {
            this._configs = Object.assign({},configTemplate, devConfig)
        }
    }
    getKey(key) {
        const keys = key.split('/');
        let value = this._configs;
        for(let i=0; i< keys.length; i++){
            if(value && value[keys[i]] ) {
                value = value[keys[i]]
            }else {
                value = undefined;
            }
        }
        return value; 
    }
}

const configTemplate = {
    mongoose: {
        connectionString: ''
    },
    someOtherItem: {
        nothing:'to configure now'
    },
    server: {
        port: 3000
    }
}

const devConfig = {
    mongoose: {
        connectionString: ''
    },
    someOtherItem: {
        nothing:'to configure now'
    },
    server: {
        port: 3010
    }
}
const prodConfig = {
    mongoose: {
        connectionString: ''
    },
    someOtherItem: {
        nothing:'to configure now'
    },
    server: {
        port: 3100
    }
}


module.exports = new ConfigManager();