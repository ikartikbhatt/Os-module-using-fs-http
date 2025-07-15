const fs = require("fs");
const createEntitites = require("../modules/index");
const getData = require("../utils/getData");
const path = require("path");
// {
//     createDir: [Function: createDir],
//     createFile: [Function: createFile]
//   }

//  dirPath,FilePath 

async function handleEntities(req, res) {
  console.log("routes working fine");
  if (req.url === "/createDir") {
    console.log("create dir called");
    
      
    try {
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


      if (fs.existsSync(dirPath)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Directory already exists" }));
      }
      
      createEntitites.dirFn.createDir(dirPath);
      console.log("inside dirpath if block >>>>>");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Directory created successfully" }));
      console.log(`${data.DirName} created successfully`);
      return;

    } catch (error) {
      console.error("Error in /createDir:", error);

      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to create directory" }));
    }
  } 

  if (req.url === "/createFile") {
    console.log("create File called");

    try {
      const data = await getData(req, "createFile");
      console.log('File DATA:', data);
      
      if (!data) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Kindly use proper request body" })
        );
      }

      let filePath;
      let fileid=0;
    if (!data.DirName || data.DirName.trim() === "") {
        // If DirName is missing or empty/whitespace → put file directly in /entities
        filePath = path.join(__dirname, "../entities", data.FileName);
    } else {
        // Normal case → nested inside a folder
        filePath = path.join(__dirname, "../entities", data.DirName, data.FileName);
        fileid=1;

    }
      console.log("FileName:", data.FileName);
      console.log("dirPath:", filePath);


      createEntitites.fileFn.createFile(filePath);
      console.log("inside filepath if block >>>>>");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "File created successfully" }));
      if (fileid===1) {
        console.log(`${data.FileName} created inside ${data.DirName} successfully`);
    } else {
        console.log(`${data.FileName} created inside entities folder successfully`);
        
      }

    } catch (error) {
      console.error("Error in /createFile:", error);

      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to create File" }));
    }
  }

}

module.exports = handleEntities;
