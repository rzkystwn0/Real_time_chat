const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3001;
// const cors = require("cors");

// app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let jumlahUserOnline = 1;
io.on("connection", (socket) => {
  socket.on("join", (params) => {
    io.emit("jumlahUserOnline", jumlahUserOnline++);
    // console.log(jumlahUserOnline)
  });
  socket.on("message", (params) => {
    // console.log("Usermengirim pesan");
    socket.broadcast.emit("message", params);
    console.log(params);
  });
  socket.on("disconnect", (params) => {
    io.emit("jumlahUserOnline", jumlahUserOnline--);
    // console.log(jumlahUserOnline)
  });
  
});

server.listen(PORT, () => console.log("Server Runnning"));
