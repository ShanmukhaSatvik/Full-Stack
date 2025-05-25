import { Route,Routes } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import WatchList from './WatchList';
import Summary from './Summary';
import Orders from './Orders';
import Holdings from './Holdings';
import Positions from './Positions';
import Funds from './Funds';
import { GeneralContextProvider } from "./GeneralContext";
import MarketDataContext from './MarketDataContext'; 
import FundsDataContext from './FundsDataContext';
function Dashboard() {
    const { setFunds } = useContext(FundsDataContext);
    const { marketData } = useContext(MarketDataContext); 
    const [allHoldings, setAllHoldings] = useState([]);
    useEffect(() => {
        const fetchHoldings = () => {
            axios.get("http://localhost:8080/allHoldings")
            .then((res) => setAllHoldings(res.data))
            .catch((err) => console.log("Error fetching holdings:", err));
        };
        fetchHoldings();
        const intervalId = setInterval(fetchHoldings, 1000);
        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        const investment = allHoldings.reduce((sum, stock) => sum + stock.price * stock.qty, 0);
        const currentValue = allHoldings.reduce((sum, stock) => {
            const quote = marketData[stock.name];
            return sum + (quote ? quote.ltp * stock.qty : 0);
        }, 0);
        const pnl = currentValue - investment;
        const pnlPercent = investment > 0 ? (pnl / investment) * 100 : 0;
        const profClass = pnl >= 0 ? "profit" : "loss";
        const holdingsCount = allHoldings.length;
        setFunds(prevFunds => ({
            ...prevFunds,
            investment,
            currentValue,
            pnl,
            pnlPercent,
            profClass,
            holdings: holdingsCount
        }));
    }, [allHoldings, marketData, setFunds]);
    useEffect(() => {
        const fetchFunds = async () => {
            try {
                const res = await axios.get("http://localhost:8080/getfunds", { withCredentials: true });
                const { user, ...fundData } = res.data;
                setFunds(prev => ({
                    ...prev,
                    ...fundData,
                    user
                }));
            } catch (err) {
                console.error("Error fetching funds:", err);
            }
        };
        fetchFunds();
        const intervalId = setInterval(fetchFunds, 1000);
        return () => clearInterval(intervalId);
    }, [setFunds]);
    return (
            <div className="dashboard-container">
                <GeneralContextProvider>
                    <WatchList/>
                </GeneralContextProvider>
                <div className="content">
                    <Routes>
                        <Route exact path='/' element={<Summary />}/>
                        <Route path="/holdings" element={<Holdings allHoldings={allHoldings} />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/positions" element={<Positions />} />
                        <Route path="/funds" element={<Funds />} />
                    </Routes>
                </div>
            </div>
    );
}
export default Dashboard;