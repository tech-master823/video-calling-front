import { useEffect, useState } from "react";
import { createContext } from "react";


const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  
  // const []
  const [mainPaneComponents, setMainPaneComponents] = useState(null);
  const [secondPaneComponents, setSecondPaneComponents] = useState(null);

  useEffect(() => {

  }, []);

  return (
    <LayoutContext.Provider 
      value={{ 
        mainPaneComponents,
        secondPaneComponents,
        setMainPaneComponents,
        setSecondPaneComponents,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export { LayoutContext, LayoutProvider };