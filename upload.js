// upload file that is created now to aws
// =========================================
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

//configuring the AWS environment
AWS.config.update({
    accessKeyId: "AKIAQMRVTQ4UPCI2NHHQ",
    secretAccessKey: "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"
  });

var s3 = new AWS.S3();
var filePath = "./apple.jpg";

//configuring parameters
var params = {
  Bucket: 'teamawesome123',
  Body : fs.createReadStream(filePath),
  Key : "folder/"+Date.now()+"_"+path.basename(filePath)
};

s3.upload(params, function (err, data) {
  //handle error
  if (err) {
    console.log("Error", err);
  }
   //success
   if (data) {
    console.log("Uploaded in:", data.Location);
  }
});

    // ===========================================


    // get files from aws
    // =======================================
