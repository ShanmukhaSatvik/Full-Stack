import Topbar from './Topbar';
import Dashboard from "./Dashboard";
import { FundsDataProvider } from "./FundsDataContext";
import { MarketDataProvider } from "./MarketDataContext";
function Home() {
    return (
        <>
            <FundsDataProvider>
                <MarketDataProvider>
                    <Topbar />
                    <Dashboard />
                </MarketDataProvider>
            </FundsDataProvider>
        </>
    );
}
export default Home;