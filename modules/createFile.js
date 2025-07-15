const fs = require("fs");

//check for existing file and create new file
function createFile(filePath) {
  fs.writeFile(filePath, "", { encoding: "utf-8" }, (err) => {
    if (err) throw err;
    console.log("File created:", filePath);
  });
}

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
}
module.exports = {createFile,deleteFile};
