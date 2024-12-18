import WhiteBoard from "../components/WhiteBoard/WhiteBoard";
import SplitPane from "react-split-pane";
import { Children, cloneElement, useState } from "react";
import { useContext } from "react";
import { LayoutContext } from "../context/LayoutContext";
import BottomBar from "../components/BottomBar";

const TeacherLayout = ({ children }) => {

  const { layoutMode } = useContext(LayoutContext);

  const childrenArray = Children.toArray(children);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  return (
    <>
      <div className="relative h-[100vh]">
        <SplitPane split="horizontal" minSize={200} maxSize={-210} defaultSize={windowSize.height - 210} pane2Style={{ height: "0px"}}>
          <SplitPane split="vertical" minSize={350} maxSize={-250} defaultSize={windowSize.width - 350}>  
            <div className="bg-blue-500 h-full w-full">
              { cloneElement(childrenArray.at(-2)) }
            </div>
            <div className="bg-red-500 h-full w-full">
              <div className="h-[50%] w-full flex flex-col bg-black relative">
                { cloneElement(childrenArray[0], { className: "w-full h-full flex justify-center relative" }) }
              </div>
              <div className="h-[50%] w-full flex flex-col bg-white">
                { cloneElement(childrenArray.at(-1)) }
              </div>
            </div>
          </SplitPane>
          <div className="bg-green-500 w-full" style={{ height: "100%" }}>
            <div style={{height:"calc(100% - 60px)"}} className="w-full flex flex-col bg-white">
            <div className="w-full h-full flex gap-1 items-center">
              {
                childrenArray.slice(1, -2).map((child, index) => cloneElement(child, { key: index, className: "h-full flex relative" }) )
              }
            </div>
            </div>
            <BottomBar />
          </div>
        </SplitPane>
      </div>
      
    </>
  )
}

export default TeacherLayout;
