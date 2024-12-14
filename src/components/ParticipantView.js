import { useEffect, useRef } from "react";
import { Expand } from "lucide-react";

const ParticipantView = ({ stream, className, name }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, [stream]);
  
  return (
    <div className={className}>
      <video ref={videoRef} className="h-full object-fit overflow-hidden relative" autoPlay playsInline></video>
      <div className="px-4 mt-2 bg-slate-100 rounded-[3px] absolute">
        { name }
      </div>
      <Expand cursor={"pointer"} color="white" size={20} className="absolute right-2 top-2" />
    </div>
  )
}

export default ParticipantView;