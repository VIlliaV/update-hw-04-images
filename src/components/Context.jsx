import { createContext, useContext, useState } from 'react';

const QueryContext = createContext();

export const useContextQuery = () => useContext(QueryContext);

export const Context = ({ children }) => {
  const [queryContext, setQueryContext] = useState('');
  return (
    <QueryContext.Provider
      value={{ searchWord: queryContext, setQueryContext }}
    >
      {children}
    </QueryContext.Provider>
  );
};
