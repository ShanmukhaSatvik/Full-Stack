import { useContext } from 'react';
import FundsDataContext from './FundsDataContext';
import styles from "../index.module.css";
function Summary() {
    const {funds} = useContext(FundsDataContext);
    const safeToFixed = (num) => (typeof num === 'number' && !isNaN(num) ? num.toFixed(2) : '0.00');
    return (
        <>
            <div className={styles["username"]}>
                <h6>Hello, {funds?.user?.charAt(0).toUpperCase() + funds?.user?.slice(1)}!</h6>
                <hr className={styles["divider"]} />
            </div>
            <div className={styles["section"]}>
                <span>
                    <p>Equity</p>
                </span>
                <div className={styles["data"]}>
                    <div className={styles["first"]}>
                        <h3>{safeToFixed(funds?.availableMargin)}</h3>
                        <p>Margin available</p>
                    </div>
                    <hr />
                    <div className={styles["second"]}>
                        <p>
                            Margins used <span>{safeToFixed(funds?.usedMargin)}</span>{" "}
                        </p>
                        <p>
                            Opening balance <span>{safeToFixed(funds?.openingBalance)}</span>{" "}
                        </p>
                    </div>
                </div>
                <hr className={styles["divider"]} />
            </div>
            <div className={styles["section"]}>
                <span>
                    <p>Holdings ({funds?.holdings ?? '0'})</p>
                </span>
                <div className={styles["data"]}>
                    <div className={styles["first"]}>
                        <h3 className={funds?.profClass}>
                            {safeToFixed(funds?.pnl)} <small>{safeToFixed(funds?.pnlPercent)}%</small>{" "}
                        </h3>
                        <p>P&L</p>
                    </div>
                    <hr />
                    <div className={styles["second"]}>
                        <p>
                            Current Value <span>{safeToFixed(funds?.currentValue)}</span>{" "}
                        </p>
                        <p>
                            Investment <span>{safeToFixed(funds?.investment)}</span>{" "}
                        </p>
                    </div>
                </div>
                <hr className={styles["divider"]} />
            </div>
        </>
    );
}
export default Summary;