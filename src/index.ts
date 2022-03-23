import "dotenv/config";

import http from "http";

import server from "./server";

const PORT = 3002;

http.createServer({}, server).listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
