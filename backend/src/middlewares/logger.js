"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// $ npm i morgan
// app.use(logger):

const morgan = require("morgan");
const fs = require("node:fs");
const path = require("node:path");

const now = new Date();
const today = now.toISOString().split("T")[0];

// Netlify veya sunucusuz ortamlar için geçici dizin kullanın
const logDirectory = path.join("/tmp", "logs");

if (!fs.existsSync(logDirectory)) {
  console.log("Logs folder has been created in /tmp");
  fs.mkdirSync(logDirectory, { recursive: true });
} else {
  console.log("Logs folder already exists in /tmp");
}

const logStream = fs.createWriteStream(
  path.join(logDirectory, `${today}.log`),
  { flags: "a+" } // Dosyaya ekleme modu
);

module.exports = morgan("combined", {
  stream: logStream,
});


// "use strict";
// /* -------------------------------------------------------
//     | FULLSTACK TEAM | NODEJS / EXPRESS |
// ------------------------------------------------------- */
// // $ npm i morgan
// // app.use(logger):

// const morgan = require("morgan");
// const fs = require("node:fs");
// const path = require("node:path");

// const now = new Date();
// const today = now.toISOString().split("T")[0];

// const rootDirectory = path.resolve(__dirname, "../..");
// const logDirectory = path.join(rootDirectory, "logs");

// if (!fs.existsSync(logDirectory)) {
//   console.log("Logs folder has been created ");
//   fs.mkdirSync(logDirectory, { recursive: true });
// } else console.log("Logs folder is exist");

// const logStream = fs.createWriteStream(
//   path.join(logDirectory, `${today}.log`),
//   { flags: "a+" },
// );

// module.exports = morgan("combined", {
//   stream: logStream,
// });
