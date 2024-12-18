import Peer from "peerjs";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import io from "socket.io-client";
import Spinner from "./components/Spinner";
import ParticipantView from "./components/ParticipantView";
import StudentLayout from "./layout/StudentLayout";
import WhiteBoard from "./components/WhiteBoard/WhiteBoard";
import { LayoutProvider } from "./context/LayoutContext";
import MeetingContext from "./context/MeetingContext";

// const socket = io('http://localhost:5001');
const Waiting = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="flex flex-col items-center">
        <div className="animate-spin h-16 w-16 border-4 border-white border-t-transparent rounded-full mb-4"></div>
        <h1 className="text-3xl font-semibold text-white">Waiting...</h1>
      </div>
    </div>
  );
};

const Student = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  
  const { roomId } = useParams();
  
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const [allMessages, setAllMessages] = useState([]);
  const query = new URLSearchParams(useLocation().search);

  const sendMessage = (message) => {
    // socket.emit('send-message', { lectureId: roomId, userId: query.get("token"), message });
  }

  // const incommingCallHandler = (call, _stream) => {
  //   console.log('Incoming stream from ' + call.peer);
  //   call.answer(_stream);
  //   console.log(localStream);
  //   call.on('stream', (stream) => {
  //     console.log('Incoming stream from ' + call.peer, stream);
  //     setRemoteStream(stream);
  //   });
  // }

  useEffect(() => {
    if(localStream) {
      localStream.getVideoTracks()[0].enabled = videoOn;
      localStream.getAudioTracks()[0].enabled = audioOn;
    }
  }, [videoOn, audioOn]);

  const onCall = ({ peer, peerId, stream }) => {
    console.log('Received request from ' + peerId);
    console.log(stream);
    
    const call = peer.call(peerId, stream)
    console.log(call);
    if(call) {
      call.on('stream', (_stream) => {
        console.log('Incoming stream from ' + peerId, _stream);
        setRemoteStream(_stream);
      });
    }
  }

  const openHandler = (peer, id) => {
    // console.log('My peer ID is: ' + peerId);
    navigator.mediaDevices.getUserMedia({ video: {
      width: 640,
      height: 480,
      frameRate: 15
    }, audio: true })
    .then(stream => {
      setLocalStream(s => stream);
      
      onCall({ peer, peerId: roomId, stream })
      // peer.on('call', (call) => incommingCallHandler(call, stream));

      // socket.emit('join-room', { lectureId: roomId, id });
      // socket.on('message', (messages) => {
      //   const params = messages.map((message) => {
      //     return {
      //       position: message.userId === query.get("token") ? 'right' : 'left',
      //       type: 'text',
      //       text: message.message,
      //       date: message.date,
      //       userId: message.userId
      //     }
      //   });
      //   setAllMessages(params);
      // });
    })
    .catch(err => {
      console.log(err);
    });
  }

  const authorization = () => new Promise((resolve) => {
    resolve(
      { data: { result: "OK" } }
    )
  });

  useEffect(() => {
    const token = query.get("token");
    authorization()
    .then(res => {
      if(res.data.result === "OK") {
        const peer = new Peer(token);    
        peer.on('open', (id) => openHandler(peer, id)); 
      }
    });
  }, []);
  
  return (
    <>
      <MeetingContext.Provider value={{ videoOn, setVideoOn, audioOn, setAudioOn, sendMessage, allMessages, setAllMessages }}>
        {
          localStream ? (
            <StudentLayout>
              <ParticipantView stream={localStream} name={"Me"} />
              <ParticipantView stream={remoteStream} name={"Teacher"} />
              <WhiteBoard role={"teacher"} />
              <WhiteBoard role={"student"} />
            </StudentLayout>
          ) : (
            <Waiting />
          )
        }
      </MeetingContext.Provider>
    </>
  )
}

export default Student;