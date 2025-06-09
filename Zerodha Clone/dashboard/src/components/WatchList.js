import { useState, useContext, useEffect, } from 'react';
import { Tooltip, Grow } from '@mui/material';
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import GeneralContext from "./GeneralContext";
import MarketDataContext from './MarketDataContext';
import axios from 'axios';
import styles from "../index.module.css";
import { DoughnutChart } from './DoughnutChart';
const API_KEY = `867975976792493c927f6284d75c94a1`;
const symbols = ["AAPL", "MSFT", "GOOG", "TSLA", "AMZN", "META", "NVDA", "NFLX"];
function WatchList() {
    const {setMarketData} = useContext(MarketDataContext);
    const [watchlistData, setWatchlistData] = useState([]);
    const [chartData, setChartData] = useState({});
    useEffect(() => {
        async function fetchQuotes() {
            try {
                const symbolStr = symbols.join(",");
                const response = await axios.get("https://api.twelvedata.com/quote", {
                    params: {
                        symbol: symbolStr,
                        apikey: API_KEY,
                    },
                });
                const data = response.data;
                if (data.status === "error") return;
                const stockMap = {};
                for (let key in data) {
                  const item = data[key];
                  if (item.close && item.percent_change) {
                    stockMap[key] = {
                      ltp: parseFloat(item.close),
                      percent: parseFloat(item.percent_change),
                      open: parseFloat(item.open),
                      low: parseFloat(item.low),
                      high: parseFloat(item.high),
                      previous_close: parseFloat(item.previous_close)
                    };
                  }
                }
                setMarketData(stockMap);
                const formattedData = symbols.map(symbol => {
                    return {
                        name: symbol,
                        ltp: stockMap[symbol]?.ltp,
                        price: `$${stockMap[symbol]?.ltp.toFixed(2)}`,
                        percent: `${stockMap[symbol]?.percent > 0 ? '+' : ''}${stockMap[symbol]?.percent.toFixed(2)}%`,
                        isDown: stockMap[symbol]?.percent < 0,
                        open: stockMap[symbol]?.open, 
                        high: stockMap[symbol]?.high, 
                        low: stockMap[symbol]?.low,   
                        previous_close: stockMap[symbol]?.previous_close
                    };
                });
                setWatchlistData(formattedData);
                const ChartData={
                    labels: symbols,
                    datasets:[
                        {
                            label:"Price",
                            data:symbols.map((symbol)=>stockMap[symbol]?.ltp ?? 0),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                };
                setChartData(ChartData);
            } catch (err) {
                console.error(err);
            }
        }
        fetchQuotes();
    }, [setMarketData]);
    return (
        <div className={styles["watchlist-container"]}>
            <div className={styles["search-container"]}>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
                    className={styles["search"]}
                />
                <span className={styles["counts"]}> {watchlistData.length} / 50</span>
            </div>
            <ul className={styles["list"]}>
                {watchlistData.map((stock, uid) => {
                    return (
                        <WatchListItem stock={stock} key={uid} ltp={stock.ltp}/>
                    );
                })}
            </ul>
            {chartData?.datasets?.[0]?.data?.length > 0 && (
                <DoughnutChart data={chartData} />
            )}
        </div>
    );
}
export default WatchList;
function WatchListItem({ stock }) {
    const [showWatchListActions, setShowWatchListActions] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const handleMouseEnter = () => setShowWatchListActions(true);
    const handleMouseLeave = () => setShowWatchListActions(false);
    const toggleAnalytics = () => setShowAnalytics(prev => !prev);
    return (
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={styles['item']}>
                <p className={stock.isDown ? styles.down : styles.up }>{stock.name}</p>
                <div className={styles['itemInfo']}>
                    <span className={styles['percent']}>{stock.percent}</span>
                    {stock.isDown ? (
                        <KeyboardArrowDown className={styles["down"]} />
                    ) : (
                        <KeyboardArrowUp className={styles["up"]} />
                    )}
                    <span className={styles['price']}>{stock.price}</span>
                </div>
            </div>
            {showWatchListActions && (
                <WatchListActions
                    uid={stock.name}
                    ltp={stock.ltp}
                    toggleAnalytics={toggleAnalytics} 
                />
            )}
            {showAnalytics && ( 
                <div className={styles['analytics']}>
                    <p>Open: ${stock.open?.toFixed(2)}</p>
                    <p>High: ${stock.high?.toFixed(2)}</p>
                    <p>Low: ${stock.low?.toFixed(2)}</p>
                    <p>Previous Close: ${stock.previous_close?.toFixed(2)}</p>
                </div>
            )}    
        </li>
    );
};
function WatchListActions({ uid,ltp,toggleAnalytics }) {
    const generalContext = useContext(GeneralContext);
    const handleBuyClick = () => {
        generalContext.openBuyWindow(uid,ltp);
    };
    const handleSellClick = () => {
        generalContext.openSellWindow(uid,ltp);
    };
    return (
        <span className={styles['actions']}>
            <span>
                <Tooltip title="Buy (B)" placement='top' arrow TransitionComponent={Grow} onClick={handleBuyClick}>
                    <button className={styles['buy']}>Buy</button>
                </Tooltip>
                <Tooltip title="Sell (S)" placement='top' arrow TransitionComponent={Grow} onClick={handleSellClick}>
                    <button className={styles['sell']}>Sell</button>
                </Tooltip>
                <Tooltip title="Analytics (A)" placement='top' arrow TransitionComponent={Grow}>
                    <button className={styles['action']} onClick={toggleAnalytics}>
                        <BarChartOutlined className={styles['icon']} />
                    </button>
                </Tooltip>
            </span>
        </span>
    );
}

