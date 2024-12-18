import WhiteBoard from "../components/WhiteBoard/WhiteBoard";
import SplitPane from "react-split-pane";
import { Children, cloneElement, useState } from "react";
// import { useContext } from "react";
import { LayoutContext } from "../context/LayoutContext";
import BottomBar from "../components/BottomBar";

const StudentLayout = ({ children }) => {

  // const { layoutMode } = useContext(LayoutContext);

  const childrenArray = Children.toArray(children);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // const verticalDefaultSize = layoutMode  === 1 ? windowSize.width - 350 : "50%";

  return (
    <>
      <div className="relative h-[100vh]">
        <SplitPane split="horizontal" minSize={200} maxSize={-210} defaultSize={windowSize.height - 210} pane2Style={{ height: "0px"}}>
          <SplitPane split="vertical" minSize={350} maxSize={-250} defaultSize={windowSize.width - 350}>  
            <div className="bg-blue-500 h-full w-full">
              { cloneElement(childrenArray[2]) }
            </div>
            <div className="bg-red-500 h-full w-full">
              {/* {layoutMode === 1 ?
                <>
                  <div className="h-[50%] w-full flex flex-col bg-black relative">
                    { cloneElement(childrenArray[1], { className: "w-full h-full flex justify-center relative" }) }
                  </div>
                  <div className="h-[50%] w-full flex flex-col bg-white">
                    { cloneElement(childrenArray[3]) }
                  </div>
                </> :
                layoutMode === 2 ? cloneElement(childrenArray[3]) : <></>
              } */}
              <div className="h-[50%] w-full flex flex-col bg-black relative">
                { cloneElement(childrenArray[1], { className: "w-full h-full flex justify-center relative" }) }
              </div>
              <div className="h-[50%] w-full flex flex-col bg-white">
                { cloneElement(childrenArray[3]) }
              </div>
            </div>
          </SplitPane>
          <div className="bg-green-500 w-full" style={{ height: "100%" }}>
            <div style={{height:"calc(100% - 60px)"}} className="w-full flex flex-col bg-white">
            <div className="w-full h-full flex gap-1 items-center">
              { cloneElement(childrenArray[0], { className: "h-full flex relative" }) }
              {/* {
               layoutMode !== 1 && cloneElement(childrenArray[1], { className: "h-full flex relative" })
              } */}
            </div>
            </div>
            <BottomBar />
          </div>
        </SplitPane>
      </div>
      
    </>
  )
}

export default StudentLayout;
