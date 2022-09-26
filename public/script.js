const socket = io();
const jumlahUser = document.querySelector(".jumlah-user");
const input = document.querySelector(".input-text");
const btnKirim = document.querySelector(".send");
const divpes = document.querySelector(".divchat");
const htmlTag = document.getElementsByTagName("html")[0];
const darkBtn = document.querySelector(".dark");

let dark = false;
darkBtn.addEventListener("click", () => {
  if (dark == false) {
    htmlTag.classList.add("dark");
    dark = true;
  } else {
    htmlTag.classList.remove("dark");
    dark = false;
  }
});

socket.emit("join");
socket.on("jumlahUserOnline", (jumlahUserOnline) => {
  jumlahUser.innerHTML = jumlahUserOnline + " Pengguna Online";
});

const chat = (chat, variant) => {
  const p = document.createElement("p");
  p.classList.add("my-2", "float-right", "border", "border-blue-600", "sm:max-w-md", "max-w-xs", "mx-2", "rounded-t-xl", "rounded-l-xl", "px-4", "text-right", "dark:text-white");
  p.innerHTML = chat;
  return p;
};

const Chat = (chat) => {
  const p = document.createElement("p");
  p.classList.add("my-2", "border", "border-green-500", "sm:max-w-md", "max-w-xs", "mx-2", "rounded-t-xl", "rounded-r-xl", "px-4", "dark:text-white", "float-left", "text-left");
  p.innerHTML = chat;
  return p;
};

btnKirim.addEventListener("click", () => {
  const div = document.createElement("div");
  div.classList.add("w-12/12");
  const boubleChat = chat(input.value);
  divpes.appendChild(div);
  div.appendChild(boubleChat);
  socket.emit("message", input.value);
  input.value = "";
});

socket.on("message", (message) => {
  console.log("res :" + message);
  const div = document.createElement("div");
  div.classList.add("w-12/12");
  const boubleChat = Chat(message);
  divpes.appendChild(div);
  div.appendChild(boubleChat);
});

socket.on("disconnect", (jumlahUserOnline) => {
  jumlahUser.innerHTML = jumlahUserOnline + " Pengguna Online";
});
