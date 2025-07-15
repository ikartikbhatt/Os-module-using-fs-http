const fs = require("fs");

function createDir(dirPath) {
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating directory:", err);
    } else {
      console.log("Directory created:", dirPath);
    }
  });
}

function deleteDir(dirPath) {
  fs.rm(dirPath, { recursive: true , force:true }, (err) => {
    if (err) {
      console.error("Error deleting directory:", err);
    } else {
      console.log("Directory deleted:", dirPath);
    }
  });
}




module.exports = {createDir,deleteDir};
