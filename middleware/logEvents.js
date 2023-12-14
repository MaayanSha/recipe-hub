
//modules required
const { format } = require('date-fns')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const promiseFs = require('fs').promises
const path = require('path')

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;
    console.log(logItem);
    try{
        if (!fs.existsSync(path.join(__dirname,"middleware","logs"))){
            await promiseFs.mkdir(path.join(__dirname,"middleware","logs"));

        }
        await promiseFs.appendFile(path.join(__dirname,"middleware","logs","logs.txt"),logItem)
    } catch (err){
        console.log(err);
    }
}

module.exports = logEvents;


