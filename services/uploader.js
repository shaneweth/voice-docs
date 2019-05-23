const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    accessKeyId: "AKIAQMRVTQ4UHNVINY4J",
    secretAccessKey: "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"
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'audio' || file.mimetype === 'audio/x-m4a') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'teamawesome123',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            console.log("hello");
            cb(null, "thisisafile");
        }
    })
});

module.exports = upload;
