const fs = require("fs");
const createEntitites = require("../modules/index");
const getData = require("../utils/getData");
const path = require("path");

//add a sub route for as /createDir/delete

async function entitiesOperation(req, res) {
  console.log("inside entitiesOperation function >>>");
  console.log("Incoming request:", req.method, req.url);
  try {
    if (req.url === "/createFile/delete") {
      console.log("inside file delete route ");

      const data = await getData(req, "createFile");
      console.log("File DATA:", data);

      if (!data) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Kindly use proper request body" })
        );
      }

      let filePath;
      let fileid = 0;
      if (!data.DirName || data.DirName.trim() === "") {
        // If DirName is missing or empty/whitespace → put file directly in /entities
        filePath = path.join(__dirname, "../entities", data.FileName);
      } else {
        // Normal case → nested inside a folder
        filePath = path.join(
          __dirname,
          "../entities",
          data.DirName,
          data.FileName
        );
        fileid = 1;
      }
      console.log("FileName:", data.FileName);
      console.log("dirPath:", filePath);

      if (!data.DirName || data.DirName.trim() === "") {
        // If DirName is missing or empty/whitespace → put file directly in /entities
        filePath = path.join(__dirname, "../entities", data.FileName);
      } else {
        // Normal case → nested inside a folder
        filePath = path.join(
          __dirname,
          "../entities",
          data.DirName,
          data.FileName
        );
      }

      if (!fs.existsSync(filePath)) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "File doesn't exists" }));
      }

      createEntitites.fileFn.deleteFile(filePath);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "File deleted successfully",
          FileNAme: data.FileName,
        })
      );

      if (fileid === 1) {
        console.log(
          `${data.FileName} deleted inside ${data.DirName} successfully`
        );
      } else {
        console.log(
          `${data.FileName} deleted inside entities folder successfully`
        );
      }
    }

    if (req.url === "/createDir/delete") {
      console.log("dir delete route working");
      const data = await getData(req, "createDir");
      if (!data || !data.DirName) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Kindly use proper request body" })
        );
      }

      const dirPath = path.join(__dirname, "../entities", data.DirName);
      console.log("DirName:", data.DirName);
      console.log("dirPath:", dirPath);

      console.log("About to check if directory exists:", dirPath);
      console.log("Directory exists?", fs.existsSync(dirPath)); // Add this

      if (!fs.existsSync(dirPath)) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Directory doesn't exists" }));
      }
      createEntitites.dirFn.deleteDir(dirPath);
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({
          message: "dir deleted succesfully",
          DirName: data.DirName,
        })
      );
    }
  } catch (error) {
    console.log("error>", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to perform operation" }));
  }
}

module.exports = entitiesOperation;
