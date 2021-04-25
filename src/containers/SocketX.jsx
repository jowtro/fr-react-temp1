import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let endPoint = "http://192.168.1.83:5000";
let socket = io.connect(`${endPoint}`);
var room = "project";

const SocketX = () => {
  const [messages, setMessages] = useState(["Hello And Welcome"]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const init = () => {
      socket.on('connect', () => {
        socket.emit('join', { "room": room, "username": "jowtro" });
        console.log(`I'm connected with the back-end`);
      });
    };

    const getMessages = () => {
      socket.on("message", msg => {
        //   let allMessages = messages;
        //   allMessages.push(msg);
        //   setMessages(allMessages);
        setMessages([...messages, msg]);
      });
    };
    init();
    getMessages();
  }, [messages, messages.length]);




  // On Change
  const onChange = e => {
    setMessage(e.target.value);
  };

  // On Click
  const onClick = () => {
    if (message !== "") {
      socket.emit('message', { "room": room, "username": "jowtro", "msg": message });
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  return (
    <div>
      {messages.length > 0 &&
        messages.map((msg, i) => (
          <div key={i}>
            <p>{msg}</p>
          </div>
        ))}
      <input value={message} name="message" onChange={e => onChange(e)} />
      <button onClick={() => onClick()}>Send Message</button>
    </div>
  );
};

export default SocketX;