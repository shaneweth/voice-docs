// upload file that is created now to aws
// =========================================
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
var express = require("express");
{/* <script src="jquery-3.4.0.min.js"></script> */}


//configuring the AWS environment
AWS.config.update({
    accessKeyId: "AKIAIYSEHHRUPS64F53A",
    secretAccessKey: "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"
  });

var s3 = new AWS.S3();
// var filePath = "./apple.jpg";

// upload file to aws
// ===========================
// //configuring parameters
// var params = {
//   Bucket: 'teamawesome123',
//   Body : fs.createReadStream(filePath),
//   // Key : "folder/"+Date.now()+"_"+path.basename(filePath)
//   Key : "folder/"+path.basename(filePath)
// };

// s3.upload(params, function (err, data) {
//   //handle error
//   if (err) {
//     console.log("Error", err);
//   }
//    //success
//    if (data) {
//     console.log("Uploaded in:", data.Location);
//   }
// });

// ===========================================


// get files from aws
// =======================================
// var params = {
//   Bucket: "teamawesome123", 
//   Key: "folder/apple.jpg" 
//  };

// s3.getObject(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else console.log(data);           // successful response

// });


// list files from aws
// ==============================
var params = {
  Bucket: "teamawesome123" 
  
 };
 s3.listObjects(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response


  $("project-option")

 });