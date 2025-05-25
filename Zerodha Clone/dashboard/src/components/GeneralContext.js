import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
const GeneralContext = React.createContext({
  openBuyWindow: (uid,ltp) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid,ltp) => {},
  closeSellWindow: () => {},
});
export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockData, setselectedStockData] = useState("");
  const handleOpenBuyWindow = (uid,ltp) => {
    setIsBuyWindowOpen(true);
    setselectedStockData({uid,ltp});
  };
  const handleOpenSellWindow = (uid,ltp) => {
    setIsSellWindowOpen(true);
    setselectedStockData({uid,ltp});
  };
  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setselectedStockData("");
  };
  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setselectedStockData("");
  };
  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockData.uid} ltp={selectedStockData.ltp}/>}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockData.uid} ltp={selectedStockData.ltp} />}
    </GeneralContext.Provider>
  );
};
export default GeneralContext;