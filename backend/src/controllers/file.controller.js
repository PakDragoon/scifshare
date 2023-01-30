const pool = require("../db/mysql").pool
const fs = require("fs")
const path = require("path")
const controller = {}

controller.create = async (req, res) => {
  const { filename, path } = req.file
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      connection.query(`INSERT INTO files (filename, path) VALUES ('${filename}', '${path}')`, function (error, results, fields) {
        connection.release();
        if (error) throw error;
        res.status(201).send({ filename, path })
      });
    });
}

controller.get = async (req, res) => {
    const { filename, path: pathname } = req.body
    // const filePath = path.join(`${__dirname}../../../`, pathname).split("%20").join(" ")
    // fs.exists(filePath, function (exists) {
    //     if (!exists) {
    //     res.writeHead(404, {"Content-Type": "text/plain",})
    //     res.end("404 Not Found")
    //     return
    //     }

    //     var ext = path.extname(pathname)
    //     var contentType = "text/plain"
    //     if (ext === ".png") contentType = "image/png"
    //     res.writeHead(200, {"Content-Type": contentType,})
    //     fs.readFile(filePath, function (err, content) {
    //     res.end(content)
    //     })
    // })
    //   fs.readFile(filePath, function (err, content) {
    //     res.end(content)
    //   })

    //   pool.getConnection(function(err, connection) {
    //     if (err) throw err;
    //     connection.query(`INSERT INTO file (filename, path) VALUES ('${filename}', '${path}')`, function (error, results, fields) {
    //       connection.release();
    //       if (error) throw error;
    //       res.status(201).send('file created')
    //     });
    //   });
}

module.exports = controller
