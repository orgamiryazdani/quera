import { createContext, useContext, useState } from "react";

export const createGlobalState = (instructions) => {
  const StateContext = createContext(null);

  const [stateName] = Object.keys(instructions(() => { }));

  const Provider = ({ children }) => {
    const [state, setState] = useState(() => {
      const initial = instructions(() => { });
      return initial[stateName];
    });

    const set = (updater) => {
      setState(currentState => {
        if (typeof updater === 'function') {
          return updater(currentState);
        }
        return updater;
      });
    };

    const value = {
      ...instructions(set),
      [stateName]: state
    };

    return (
      <StateContext.Provider value={value}>
        {children}
      </StateContext.Provider>
    );
  };

  const useValue = () => {
    const context = useContext(StateContext);
    if (context === null) {
      throw new Error(`The '${stateName}' global state must be used within it's relevant context provider`);
    }
    return context;
  };

  return [Provider, useValue];
};
