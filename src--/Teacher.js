import { useEffect, useState } from "react";
import Peer from "peerjs";
import io from 'socket.io-client'
import { useLocation, useParams } from "react-router-dom";
import ParticipantView from "./components/ParticipantView";
import Spinner from "./components/Spinner";
import TeacherLayout from "./layout/TeacherLayout";
import WhiteBoard from "./components/WhiteBoard/WhiteBoard";
import MeetingContext from "./context/MeetingContext";

// const socket = io('http://localhost:8001');

const Teacher = () => {

  const [peerStream, setPeerStream] = useState({});
  const [localStream, setLocalStream] = useState(null);
  const { roomId } = useParams();
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  const query = new URLSearchParams(useLocation().search);
  
  const [chatOn, setChatOn] = useState(false);
  const [allMessages, setAllMessages] = useState([]);

  const sendMessage = (message) => {
    // socket.emit('send-message', { lectureId: roomId, userId: roomId, message });
  }

  const incommingCallHandler = (call, _stream) => {
    console.log('Incoming stream from ' + call.peer.id);
    call.answer(_stream);
    call.on('stream', (stream) => {
      console.log('Incoming stream from ' + call.peer, stream);
      // setRemoteStream(stream);
      setPeerStream(s => ({ ...s, [call.peer]: stream }));
      // call.on('close', () => {
      //   console.log('Peer ' + call.peer + ' has left the room');
      //   setPeerStream(s => Object.keys(s).filter(key => key !== call.peer).reduce((acc, key) => ({ ...acc, [key]: s[key] }), {}));
      // });
    });
  }

  // const onRequest = ({ peer, peerId, stream }) => {
  //   console.log('Received request from ' + peerId);
  //   console.log(stream);

  //   const call = peer.call(peerId, stream)
  //   console.log(call);
  //   if(call) {
  //     call.on('stream', (_stream) => {
  //       console.log('Incoming stream from ' + peerId, _stream);
  //       setPeerStream(s => ({ ...s, [peerId]: _stream }));
  //     });
  //   }
  // }
  useEffect(() => {
    if(localStream) {
      localStream.getVideoTracks()[0].enabled = videoOn;
      localStream.getAudioTracks()[0].enabled = audioOn;
    }
  }, [videoOn, audioOn]);

  useEffect(() => {
    const peer = new Peer(roomId);
  
    peer.on('open', function (id) {
      console.log('My peer ID is: ' + id);
      try {
        navigator.mediaDevices.getUserMedia({ video: {
          width: 640,
          height: 480,
          frameRate: 15
        }, audio: true })
        .then(stream => {
          setLocalStream(s => stream);
          peer.on('call', (call) => incommingCallHandler(call, stream));
          // socket.emit('create-room', { roomId });
          // socket.on('message', (messages) => {
          //   const params = messages.map((message) => {
          //     return {
          //       position: message.userId === roomId ? 'right' : 'left',
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
      } catch (error) {
        console.log(error)
      }
    });

  }, []);

  return (
    // <div>
    //   <h1>Teacher</h1>
    //   <div className="flex justify-center mb-5">
    //     {
    //       localStream ? <ParticipantView stream={localStream} className="w-[250px] h-[150px]" /> : <Spinner />
    //     }
    //   </div>
    //   <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
    //     {
    //       peerStream && Object.keys(peerStream).map((key) => 
    //           <ParticipantView key={key} stream={peerStream[key]} className="w-[300px] h-[200px]" />
    //        )
    //     }
    //   </div>
    // </div>
    <>
      <MeetingContext.Provider value={{ videoOn, setVideoOn, audioOn, setAudioOn, sendMessage, allMessages, chatOn, setChatOn }}>
        {
          localStream ? (
            <TeacherLayout>
              <ParticipantView stream={localStream} name={"Me"} />
              {
                Object.keys(peerStream).map((key) => 
                  <ParticipantView key={key} stream={peerStream[key]} name="Student" />
              )
              }
              <WhiteBoard role={"teacher"} />
              <WhiteBoard role={"student"} />
            </TeacherLayout>
          ) : (
            <Spinner />
          )
        }
      </MeetingContext.Provider>
    </>
  )
}

export default Teacher;