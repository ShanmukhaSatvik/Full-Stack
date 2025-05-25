import { useState,useEffect, useContext } from "react";
import axios from "axios";
import MarketDataContext from "./MarketDataContext";
function Positions() {
    const [allPositions,setAllPositions]=useState([]);
    const { marketData } = useContext(MarketDataContext);
    useEffect(()=>{
        const fetchPositions=()=>{
        axios.get("http://localhost:8080/allHoldings")
            .then((res)=>{
                setAllPositions(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
        };
        fetchPositions();
        const intervalId = setInterval(fetchPositions, 1000);
        return () => clearInterval(intervalId);
    },[]);
    const positions = allPositions.filter(p => {
    const dayChange = marketData[p.name]?.percent;
    return dayChange < 0;
    });
    return (
        <>
            <h3 className="title">Positions ({positions.length})</h3>
            <div className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Instrument</th>
                            <th>Qty.</th>
                            <th>Buy Price</th>
                            <th>LTP</th>
                            <th>P&L</th>
                            <th>Chg.</th>
                        </tr>
                    </thead>
                    <tbody>
                    {positions.map((stock, index) => {
                        const quote = marketData[stock.name];
                        const currValue = quote.ltp * stock.qty;
                        const cost= stock.price * stock.qty;
                        const pnlRaw = currValue - cost;
                        const pnl = Math.abs(pnlRaw) < 0.01 ? 0 : pnlRaw;
                        const isProfit = pnl >= 0;
                        const profClass = isProfit ? "profit" : "loss";
                        const quoteClass = quote.percent>=0? "profit" : "loss";
                        return (
                            <tr key={index}>
                                <td>{stock.name}</td>
                                <td>{stock.qty}</td>
                                <td>{stock.price.toFixed(2)}</td>
                                <td>{quote.ltp.toFixed(2)}</td>
                                <td className={profClass}>{pnl.toFixed(2)}</td>
                                <td className={quoteClass}>{quote.percent.toFixed(2)}%</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Positions;