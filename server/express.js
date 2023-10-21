/* */
const bodyParser = require("body-parser");
var cors = require("cors");
const fs = require("fs");

const express = require("express");
const path = require("path");

import { authorize } from "./googledocs-api";
import { postResume, streamFile } from "./resume-utils";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const rootPath = "/var/www/html/client";

// Set up prerendering
app.use(
  require("prerender-node")
    .set("prerenderToken", "ExGiUoWXPslDLEsfxCbM")
    .set("protocol", "https")
);

// Serve the static files from the React app
app.use(express.static(path.join(rootPath, "/")));

// An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });

app.post("/resumes", async (req, res) => {
  postResume(req.body, (err, idDoc) => {
    if (err != null) {
      res.status(400).send(err);
      return;
    }

    fs.readFile("credentials.json", (err, content) => {
      if (err) {
        console.log("Error loading client secret file:", err);
        res.status(500).send("Server Error");
        return;
      }
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(JSON.parse(content), auth => {
        streamFile(
          auth,
          idDoc,
          res,
          `${req.body.contact.firstname}${req.body.contact.lastname}Resume`,
          req.query.fileType
        );
      });
    });
  });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(rootPath + "/index.html"));
});

const port = process.env.PORT || 8002;
app.listen(port);

console.log("App is listening on port " + port);
