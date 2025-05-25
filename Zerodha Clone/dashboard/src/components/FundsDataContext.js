import { createContext, useState } from 'react';
const FundsDataContext = createContext();
const defaultFunds = {
  pnl: 0,
  pnlPercent: 0,
  investment: 0,
  currentValue: 0,
  profClass: "",
  holdings: 0,
  availableMargin: 0,
  usedMargin: 0,
  openingBalance: 0,
  user: "Guest",
};
export const FundsDataProvider = ({ children }) => {
  const [ funds, setFunds] = useState(defaultFunds);
  return (
    <FundsDataContext.Provider value={{ funds, setFunds}}>
      {children}
    </FundsDataContext.Provider>
  );
};
export default FundsDataContext;
