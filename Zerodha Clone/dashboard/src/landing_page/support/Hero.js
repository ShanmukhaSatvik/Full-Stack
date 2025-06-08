function Hero() {
    return (
        <section className="container-fluid mb-5" id="supportHero"> 
            <div className="p-5" id="supportWrapper">
                <h5>Support Portal</h5>
                <a href="#" style={{color:"white"}}>Track Tickets</a>
            </div>
            <div className="row">
                <div className="col mb-5 supportLeft">
                    <h4 className="mb-3">Search for an answer or browse help topics to create a ticket</h4>
                    <input placeholder="Eg: how do I activate F&O, why is my order getting rejected..." className="mb-2"/><br/>                        
                    <a href="#">Track account opening</a> &nbsp;&nbsp;
                    <a href="#">Track segment activation</a> &nbsp;&nbsp;
                    <a href="#">Intraday margins</a> <br/>  
                    <a href="#">Kite user manual</a>
                </div>
                <div className="col mb-5">
                    <h5>Featured</h5>
                    <ol>
                        <li className="mb-3"><a href="#">Change in mutual fund settlement cycle due to <br/>settlement holiday on account of Buddha Pournima<br/> on May 12, 2025</a></li>
                        <li><a href="#">Current Takeovers and Delisting – May 2025</a></li>
                    </ol>
                </div>
            </div>
        </section>
    );
}
export default Hero;