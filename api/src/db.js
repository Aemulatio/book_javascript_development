const mongoose = require('mongoose')

module.exports = {
    connect: DB_HOST => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(DB_HOST);
        mongoose.connection.on('error', err => {
            console.error(err)
            console.log(`Connection error`);
            process.exit();
        });
        mongoose.connection.on('connect', msg=>{
            console.log(msg)
            console.log("Connected")
        })
    },
    close: () => {
        mongoose.connection.close();
    }
};