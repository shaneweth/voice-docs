// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');


// // upload file that is created now to aws
// // =========================================
// // Create unique bucket name
// var bucketName = 'teamawesome123';
// // Create name for uploaded object key
// var keyName = 'testing_thing.txt';

// var objectParams = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' };

// // Create object upload promise
// var uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
// uploadPromise.then(
//     function (data) {
//         console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//     });

//     // ===========================================

    
// upload file that is created now to aws
// =========================================


    // ===========================================


    // get files from aws
    // =======================================

    // var params = {
    //     Bucket: "teamawesome123", 
    //     Key: "testing_thing.txt"
    //    };
    //    var downloadFile = new AWS.S3({ apiVersion: '2006-03-01' }).getObject(params, function(err, data) {
    //      if (err) console.log(err, err.stack); // an error occurred
    //      else     console.log(data);           // successful response
    //      /*
    //      data = {
    //       AcceptRanges: "bytes", 
    //       ContentLength: 3191, 
    //       ContentType: "image/jpeg", 
    //       ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
    //       LastModified: <Date Representation>, 
    //       Metadata: {
    //       }, 
    //       TagCount: 2, 
    //       VersionId: "null"
    //      }
    //      */
    //    });