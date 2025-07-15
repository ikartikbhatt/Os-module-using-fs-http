//getting file and directory name

// {
//     "message": "Data received successfully",
//     "DirName": "folder1",
//     "FileName": "file1"
// }

async function getData(req, mode) {
  try {
    const body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", (chunk) => (data += chunk));
      req.on("end", () => resolve(data));
      req.on("error", reject);
    });

    const parsedData = JSON.parse(body);

    // Validate for /createDir
    if (mode === "createDir") {
      const keys = Object.keys(parsedData);
      if (
        keys.length !== 1 ||
        !("DirName" in parsedData) ||
        typeof parsedData.DirName !== "string"
      ) {
        return null;
      }
    }

    // Validate for /createFile
    if (mode === "createFile") {
      const keys = Object.keys(parsedData);
      if (
        keys.length !== 2 ||
        !("DirName" in parsedData) ||
        !("FileName" in parsedData) ||
        typeof parsedData.DirName !== "string" ||
        typeof parsedData.FileName !== "string"||
        parsedData.FileName.trim() === ""
      ) {
        return null;
      }
    }

    return parsedData;

  } catch (err) {
    return null;
  }
}


module.exports = getData;
