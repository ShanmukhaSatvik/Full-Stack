import { createContext, useState } from 'react';
const MarketDataContext = createContext();
export const MarketDataProvider = ({ children }) => {
  const [marketData, setMarketData] = useState({});
  return (
    <MarketDataContext.Provider value={{ marketData, setMarketData }}>
      {children}
    </MarketDataContext.Provider>
  );
};
export default MarketDataContext;
