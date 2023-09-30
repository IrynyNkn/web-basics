if ("WebSocket" in window) {
  let name = '';
  const sendBtn = document.querySelector("#send");
  const messageBox = document.querySelector("#messageBox");
  const messageContainer = document.getElementById("msg-box");

  function showMyMessage(message) {
    const myDiv = document.createElement('div');
    const pre = document.createElement('pre');
    myDiv.classList.add('msg', 'my-message');
    pre.textContent += message;
    pre.scrollTop = pre.scrollHeight;
    myDiv.append(pre);

    messageContainer.append(myDiv);
    messageBox.value = "";
  }

  function showFriendMessage(message) {
    const friendDiv = document.createElement('div');
    const pre = document.createElement('pre');
    friendDiv.classList.add('msg', 'friend-message');
    pre.textContent += message;
    pre.scrollTop = pre.scrollHeight;
    friendDiv.append(pre);

    messageContainer.append(friendDiv);
    messageBox.value = "";
  }

  let ws = new WebSocket("ws://localhost:8082");

  ws.onopen = function () {
    console.log("Connected to Server");
  };

  sendBtn.onclick = function () {
    if (ws) {
      ws.send(JSON.stringify({
        name,
        message: messageBox.value
      }));
      showMyMessage(`${name || 'ME'}: ${messageBox.value}`);
    } else {
      alert("ERROR: Not connected... refresh to try again!");
    }
  };

  ws.onmessage = function ({ data }) {
    showFriendMessage(data);
  };

  ws.onclose = function () {
    ws = null;
    alert("Connection closed... refresh to try again!");
  };


  name = prompt('Enter your name:')

  if(!name) {
    const error = document.getElementById("error");
    const container = document.querySelector(".container");

    error.classList.add('visible');
    error.classList.remove('hidden');
    container.classList.add('hidden');
    container.classList.remove('visible');
  } else {
    const error = document.getElementById("error");
    const container = document.querySelector(".container");

    error.classList.remove('visible');
    error.classList.add('hidden');
    container.classList.remove('hidden');
    container.classList.add('visible');
  }
} else {
  alert("WebSocket NOT supported by your Browser!");
}
