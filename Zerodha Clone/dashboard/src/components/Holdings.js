import MarketDataContext from './MarketDataContext';
import { useState,useEffect,useContext } from "react";
import { VerticalGraph } from './VerticalGraph';
import FundsDataContext from './FundsDataContext';
import styles from "../index.module.css";
function Holdings({ allHoldings: propAllHoldings = [] }) {
    const { marketData } = useContext(MarketDataContext);
    const { funds={} } = useContext(FundsDataContext);
    const [localAllHoldings, setLocalAllHoldings] = useState(propAllHoldings);
    useEffect(() => {
        setLocalAllHoldings(propAllHoldings);
    }, [propAllHoldings]);
    const safeFixed = (value, digits = 2) =>
        typeof value === 'number' && !isNaN(value) ? value.toFixed(digits) : '0.00';
    const labels=localAllHoldings.map((holding)=>holding["name"]);
    const data={
        labels,
        datasets:[
            {
                label: "Buy Price",
                data: localAllHoldings.map((stock) => {
                    const price = typeof stock.price === 'number' ? stock.price : 0;
                    return parseFloat(price.toFixed(2));
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: "LTP",
                data: localAllHoldings.map((stock) => {
                    const marketDataForStock = marketData[stock.name];
                    const ltp = marketDataForStock && typeof marketDataForStock.ltp === 'number'
                        ? marketDataForStock.ltp
                        : 0;
                    return parseFloat(ltp.toFixed(2));
                }),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]
    }
    const formatWithDecimalSpan = (value) => {
        const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
        const [intPart, decPart = "00"] = safeValue.toFixed(2).split(".");
        return (
            <>
                {Number(intPart).toLocaleString()}.<span>{decPart}</span>
            </>
        );
    };
    return (
        <>
            <h3 className={styles["title"]}>Holdings ({funds.holdings})</h3>
            <div className={styles["order-table"]}>
                <table>
                    <thead>
                        <tr>
                            <th>Instrument</th>
                            <th>Qty.</th>
                            <th>Buy Price</th>
                            <th>LTP</th>
                            <th>Cur. val</th>
                            <th>P&L</th>
                            <th>Return %</th>
                            <th>Day chg.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localAllHoldings.map((stock, uid) => {
                            const quote = marketData[stock.name];
                            if (!quote) {
                                return (
                                    <tr key={uid}>
                                        <td>{stock.name}</td>
                                        <td>{stock.qty}</td>
                                        <td>{safeFixed(stock.price)}</td>
                                        <td colSpan="5">Loading market data...</td>
                                    </tr>
                                );
                            };
                            const ltp = typeof quote.ltp === 'number' ? quote.ltp : 0;
                            const price = typeof stock.price === 'number' ? stock.price : 0;
                            const qty = typeof stock.qty === 'number' ? stock.qty : 0;
                            const currValue = ltp*qty;
                            const cost= price*qty;
                            const pnlRaw= currValue-cost;
                            const pnl = Math.abs(pnlRaw) < 0.01 ? 0 : pnlRaw;
                            const isProfit = pnl >= 0;
                            const profClass = isProfit ? styles.profit : styles.loss;
                            const returnRaw = (pnl / cost) * 100;
                            const returnPercent = Math.abs(returnRaw) < 0.01 ? 0 : returnRaw;
                            const quoteClass = typeof quote.percent === 'number' && quote.percent >= 0 ? styles.profit : styles.loss;
                            return (
                                <tr key={uid}>
                                    <td>{stock.name}</td>
                                    <td>{stock.qty}</td>
                                    <td>{safeFixed(price)}</td>
                                    <td>{safeFixed(ltp)}</td>
                                    <td>{safeFixed(currValue)}</td>
                                    <td className={profClass}>{safeFixed(pnl)}</td>
                                    <td className={profClass}>{safeFixed(returnPercent)}</td>
                                    <td className={quoteClass}>{safeFixed(quote.percent)}%</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className={styles["row"]}>
                <div className={styles["col"]}>
                    <h5>
                        {formatWithDecimalSpan(funds.investment)} 
                    </h5>
                    <p>Total investment</p>
                </div>
                <div className={styles["col"]}>
                    <h5>
                        {formatWithDecimalSpan(funds.currentValue)} 
                    </h5>
                    <p>Current value</p>
                </div>
                <div className={styles["col"]}>
                    <h5 className={funds.profClass}> 
                        {formatWithDecimalSpan(funds.pnl)} ({safeFixed(funds.pnlPercent)}%) 
                    </h5>
                    <p>P&L</p>
                </div>
            </div>
            <VerticalGraph data={data}/>
        </>
    );
}
export default Holdings;