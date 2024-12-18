import { useContext, useEffect, useRef, useState } from "react";
import { MessageList, Input, Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import MeetingContext from "../context/MeetingContext";

const messages = [
  {
    position: 'right',
    type: 'text',
    text: 'Hi, how are you?',
    date: new Date(),
  },
  {
    position: 'left',
    type: 'text',
    text: 'Nice to meet you!',
    date: new Date(),
  },
];

const ChatBox = () => {
  const { sendMessage, allMessages } = useContext(MeetingContext);
  const [message, setMessage] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.onkeydown = (e) => {
      if (e.key === "Enter") {
        sendMessage(message);
        setMessage("");
      }
    };
  }, [message]);

  return (
    <div className='absolute top-0 left-2 w-[500px] h-[500px] bg-slate-500 shadow-lg rounded-lg -translate-y-full flex flex-col'>
      <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 class="text-xl font-semibold">Chat Room</h1>
        <button class="focus:outline-none hover:bg-blue-700 rounded-full p-2 transition duration-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="p-2 flex-grow overflow-y-auto">
        <MessageList className="message-list" toBottomHeight={"100%"} dataSource={allMessages} themeColor="blue" lockable={true} />
      </div>
      <div className="p-2 flex gap-2">
        <input ref={inputRef} className="rounded-[5px] flex-grow p-2" placeholder="Type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="bg-[#007bff] px-3 py-1 rounded-[5px]" onClick={() => { sendMessage(message); setMessage("") }}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;