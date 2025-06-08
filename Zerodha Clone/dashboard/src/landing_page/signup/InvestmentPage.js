import { useState } from "react";
import { Link } from "react-router-dom";
import OpenAccount from "../OpenAccount";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
function InvestmentPage() {
  const [isVideoVisible, setVideoVisible] = useState(false);
  const videoUrl = "https://www.youtube.com/embed/hpECGCr-oe8?autoplay=1";
  const handleThumbnailClick = () => {
    setVideoVisible(true);
  };
  return (
    <div>
      <div className="text-center text-muted mt-5">
        <h1>Investments</h1>
        <h5 className="mt-2 mb-4">
          Everything from equities and derivatives to mutual funds and fixed income
        </h5>
        <h6>
          Check out our{" "}
          <Link to={"/product"} style={{ textDecoration: "none" }} target="_blank">
            technology offerings <i className="fa-solid fa-long-arrow-right"></i>
          </Link>
        </h6>
        {isVideoVisible ? (
          <iframe
            width="47%"
            height="300"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="mt-5 mb-5"
          />
        ) : (
          <div
            className="thumbnail-container"
            style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
            onClick={handleThumbnailClick}
          >
            <img
              src="/assets/investments-head.png"
              alt="Investments-Image"
              className="mt-5 mb-5"
              style={{ width: "80%" }}
            />
            <div
              className="play-icon"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "50px",
                color: "rgba(255, 255, 255, 0.7)",
                pointerEvents: "none",
              }}
            >
              <i className="fa-solid fa-play"></i>
            </div>
          </div>
        )}
      </div>
      <LeftSection
        imageURL="assets/investments-stocks.png"
        productName="Stocks"
        productDescription="Trade stocks for delivery or intraday on over 5000 stocks listed on National Stock Exchange (NSE) and Bombay Stock exchange (BSE)."
        label="Kite"
      />
      <RightSection
        imageURL="assets/investments-mf.png"
        productName="Direct mutual funds"
        productDescription="Invest in over 2000 direct mutual funds directly without a distributor. Save up to 1.5% in commissions every year."
        label="Coin"
      />
      <LeftSection
        imageURL="assets/investments-fo.png"
        productName="Futures & Options"
        productDescription="Trade metals, oil, and agri commodities on MCX and stock and index futures and options on NSE."
        label="Kite"
      />
      <RightSection
        imageURL="assets/ipo-products.png"
        productName="IPO"
        productDescription="Now apply online and invest in companies listing on the Indian exchanges with an IPO (Initial Public Offering) with your BHIM UPI app."
        label="Kite"
      />
      <LeftSection
        imageURL="assets/gift-illustration.png"
        productName="Gift stocks"
        productDescription="Introduce your friends and family to the habit of investing for the long term by gifting them stocks, ETFs, mutual funds and gold bonds. A gift that keeps on giving."
        label="Send a gift"
      />
      <RightSection
        imageURL="assets/investments-income.png"
        productName="Fixed income"
        productDescription="Invest in Gold electronically and gain market returns + fixed 2.5% per year on the invested amount, guaranteed by the Government of India."
        label="Sovereign Gold Bond (SGB)"
      />
      <OpenAccount />
    </div>
  );
}
export default InvestmentPage;
