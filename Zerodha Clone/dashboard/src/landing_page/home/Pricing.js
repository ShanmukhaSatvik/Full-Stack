function Pricing() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-5'>
                    <h1 className='mb-3 fs-2'>Unbeatable Pricing</h1>
                    <p>We pioneered the concept of discout broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <a href='#' style={{ textDecoration: "none" }}>See pricing <i class="fa-solid fa-long-arrow-right"></i></a>
                </div>
                <div className='col-7 mb-5'>
                    <div className='row text-center'>
                        <div className='col p-3'>
                            <img src='assets/pricing-eq.svg' alt='Pricing-Image' style={{ width: "60%" }}></img>
                            <p className='text-muted'>Free account<br />opening</p>
                        </div>
                        <div className='col p-3'>
                            <img src='assets/pricing-eq.svg' alt='Pricing-Image' style={{ width: "60%" }}></img>
                            <p className='text-muted'>Free equity delivery and direct mutual funds</p>
                        </div>
                        <div className='col p-3'>
                            <img src='assets/other-trades.svg' alt='Pricing-Image' style={{ width: "60%" }}></img>
                            <p className='text-muted'>Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Pricing;