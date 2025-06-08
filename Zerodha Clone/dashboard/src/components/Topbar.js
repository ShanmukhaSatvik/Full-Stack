import Menu from './Menu';
import styles from "../index.module.css";
function Topbar() {
    return (
        <div className={styles["topbar-container"]}>
            <div className={styles["indices-container"]}>
                <div className={styles["nifty"]}>
                    <p className={styles["index"]}>NIFTY 50</p>
                    <p className={styles["index-points"]}>{100.2}</p>
                    <p className={styles["percent"]}></p>
                </div>
                <div className={styles["sensex"]}>
                    <p className={styles["index"]}>SENSEX</p>
                    <p className={styles["index-points"]}>{100.2}</p>
                    <p className={styles["percent"]}></p>
                </div>
            </div>
            <Menu />
        </div>
    );
}
export default Topbar;