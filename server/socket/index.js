import { Server } from "socket.io";

const io = new Server(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const findUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // on user connect
  console.log("a user connected");

  //add user to online users
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //remove user from online users
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  //custom logout
  socket.on("logout", (userId) => {
    const user = findUser(userId);
    if (user) {
      removeUser(user.socketId);
      io.emit("getUsers", users);
    }
  });

  //send message to a user
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const user = findUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("receiveMessage", { senderId, message });
    }
  });
});
