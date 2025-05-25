function Hero() {
    return (
        <div className="container">
            <div className="row text-center mt-5 mb-5">
                <h1>Charges</h1>
                <h5 className="text-muted mt-3">List of all charges and taxes</h5>
            </div>
            <div className="row text-center">
                <div className="col mt-4">
                    <img src="assets/pricing-eq.svg" alt="Pricing-Image" style={{width:"70%"}}></img>
                    <h1 className="fs-3">Free equity delivery</h1>
                    <p className="text-muted mt-4" style={{lineHeight:"1.8rem"}}>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className="col mt-4">
                    <img src="assets/other-trades.svg" alt="Pricing-Image" style={{width:"70%"}}></img>
                    <h1 className="fs-3">Intraday and F&O trades</h1>
                    <p className="text-muted mt-4" style={{lineHeight:"1.8rem"}}>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                <div className="col mt-4">
                    <img src="assets/pricing-eq.svg" alt="Pricing-Image" style={{width:"70%"}}></img>
                    <h1 className="fs-3">Free direct MF</h1>
                    <p className="text-muted mt-4" style={{lineHeight:"1.8rem"}}>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
        </div>
    );
}
export default Hero;