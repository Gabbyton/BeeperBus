const AWS = require('aws-sdk');

const fs = require("fs");
const path = require("path");

const config = require("../secrets/config");
const env = process.env.NODE_ENV || "development";

const s3Config = config[env];

const cron = require("node-cron");
const winston = require("winston");

const Vehicle = require("../models/vehicle");
const Arrival = require("../models/arrival");

logger = winston.loggers.get("main");

async function uploadData(filePath, fileName) {
    try {
        const s3 = new AWS.S3({
            accessKeyId: s3Config.secretId,
            secretAccessKey: s3Config.secretKey,
        });

        const bucketName = s3Config.s3Bucket;
        const fileData = fs.readFileSync(filePath);

        s3.upload({
            Bucket: bucketName,
            Key: fileName,
            Body: fileData
        }, (err, data) => {
            if (err) {
                logger.error(`Error dumping data, ${err}`);
            } else {
                logger.info(`File uploaded successfully. ${data.Location}`);
            }
        });
    } catch (err) {
        logger.error(`error uploading data, ${err}`);
    }
}

async function clearData(dbObj, lastDate) {
    try {
        await dbObj.destroy({
            where: {
                createdAt: {
                    [Op.lt]: lastDate
                }
            }
        })
        logger.info(`cleared data until date ${lastDate}`);
    }
    catch (err) {
        logger.error(`Error clearing data, ${err}`);
    }
}

async function dumpData(dbObj, fileName) {

    try {
        results = await dbObj.findAll();
        data = results.map(user => [...Object.values(user.dataValues)]);

        keys = Object.keys(results[0].dataValues).join(',')
        csvContent = [keys].concat(data).join('\n');
    } catch (err) {
        logger.error(`Error retrieving data for dump, ${err}`);
    }

    try {
        lastDate = results[results.length - 1].dataValues.createdAt
        datePrefix = `${lastDate.getFullYear()}${lastDate.getMonth().toString().padStart(2, "0")}${lastDate.getDate().toString().padStart(2, "0")}`;
        savePath = path.join('/tmp', `${datePrefix}_${fileName}`);

        fs.writeFileSync(savePath, csvContent);
        return { savePath: savePath, lastDate: lastDate };
    } catch (err) {
        logger.error(`Error writing data dump, ${err}`);
        return -1;
    }
}

async function run() {
    vehicleMetadata = await dumpData(Vehicle, "vehicles");
    arrivalMetadata = await dumpData(Arrival, "arrivals");

    await clearData(Vehicle, vehicleMetadata.lastDate);
    await clearData(Arrival, arrivalMetadata.lastDate);

    await uploadData(vehicleMetadata.savePath, path.basename(vehicleMetadata.savePath).toString())
    await uploadData(arrivalMetadata.savePath, path.basename(arrivalMetadata.savePath).toString())
}

scheduleDump = function () {
    const cronJob = cron.schedule("0 20 * * 6", run);
    return cronJob;
}

module.exports = { scheduleDump };