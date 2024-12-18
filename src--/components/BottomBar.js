// import { HiSpeakerWave } from "react-icons/hi2";
// import { GoDeviceCameraVideo } from "react-icons/go";
// import { MdSettingsVoice, MdOutlineMessage  } from "react-icons/md";
// import { FaRegHandPaper } from "react-icons/fa";
// import { FiBookOpen } from "react-icons/fi";
// import { IoMdExit } from "react-icons/io";

import { BookOpen, HandIcon, LogOut, MessageSquareText, Mic, Video, VideoOff, Volume2, VolumeOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import MeetingContext from "../context/MeetingContext";
import ChatBox from "./Chat";

const BottomBar = () => {
  const { videoOn, setVideoOn, setAudioOn, audioOn } = useContext(MeetingContext);
  const [chatOn, setChatOn] = useState(false);
  
  const toggleAudio = () => {
    setAudioOn(!audioOn);
  }

  const toggleVideo = () => {
    setVideoOn(!videoOn);
  }

  return (
    <>
      <div className="w-full flex h-[60px] p-2 bg-white z-50 relative">      
      {chatOn ? <ChatBox /> : <></>}
        <div className="w-full h-full flex justify-between items-center bg-slate-300 px-2 rounded-[5px] shadow-[gray_0px_0px_5px_3px]">
          <div className="flex gap-2 items-center h-full">          
            <button className="h-full px-2 hover:bg-slate-600 transition-colors" onClick={toggleAudio} >
              {audioOn ? <Volume2 size={20} /> : <VolumeOff size={20} className="text-gray-400" />}
            </button>
            <button className="h-full px-2 hover:bg-slate-600 transition-colors" onClick={toggleVideo}>
              {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>
            <button className="h-full px-2 hover:bg-slate-600 transition-colors"><Mic size={20} /></button>
            <button className="h-full px-2 hover:bg-slate-600 transition-colors" onClick={() => setChatOn(!chatOn)}><MessageSquareText size={20} /></button>
            <button className="h-full px-2 hover:bg-slate-600 transition-colors"><BookOpen size={20} /></button>
            <button className="h-full px-2 hover:bg-slate-600 transition-colors"><HandIcon size={20} /></button>
          </div>
          <button className="px-4 bg-blue-600 transition-colors h-[60%] flex items-center gap-1 font-bold rounded-[8px]">Exit <LogOut size={25} /></button>
        </div>
        </div>
    </>
  )
}

export default BottomBar;