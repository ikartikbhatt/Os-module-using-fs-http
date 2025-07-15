const http = require("http");
const localtunnel = require("localtunnel");
const handleEntities = require("../routes/handleEntities");
const entitiesOperation = require("../routes/entitiesOperation");

const PORT = 9000;

const server = http.createServer((req, res) => {
  if (
    req.method === "POST" &&
    (req.url == "/createFile" || req.url == "/createDir")
  ) {
    handleEntities(req, res);
  } else if (
    req.method === "POST" &&
    (req.url == "/createFile/delete" || req.url == "/createDir/delete")
  ) {
    entitiesOperation(req, res);
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid route or method" }));
  }
});




server.listen(PORT, async () => {
  console.log(`🟢 Server started on http://localhost:${PORT}`);

  try {
    const tunnel = await localtunnel({ port: PORT });

    console.log(
      `💡 Try this in Postman: ${tunnel.url}/createFile or ${tunnel.url}/createDir or ${tunnel.url}/createFile/delete or ${tunnel.url}/createDir/delete`
    );
  } catch (err) {
    console.error("❌ Failed to start localtunnel:", err);
  }
});
