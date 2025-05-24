import {Link} from 'react-router-dom';
function Footer() {
    return (
        <footer className='border-top' style={{ backgroundColor: "rgb(250, 250, 250)" }}>
            <div className='container'>
                <div className='row mt-3'>
                    <div className='col-3'>
                        <img src='assets/logo.svg' alt='Logo-Image' style={{ width: "50%" }}></img>
                        <p className='mt-3 text-muted'>&copy; 2010 - 2025, Not Zerodha Broking Ltd. All rights reserved.</p>
                        <div className="socials">
                            <Link to="https://github.com/ShanmukhaSatvik/Full-Stack" target="_blank"><i class="fa-brands fa-github"></i></Link>
                            <Link to="https://mail.google.com/mail/?view=cm&fs=1&to=satvikshanmukha27@gmail.com" target="_blank"><i class="fa-solid fa-envelope"></i></Link>
                            <Link to="https://www.linkedin.com/in/satvikshanmukha/" target="_blank"><i class="fa-brands fa-linkedin"></i></Link>
                        </div>
                    </div>
                    <div className='col-3'>
                        <p className='fs-5 mb-4'>Company</p>
                        <div className='top-links'>
                            <Link to='/about'>About</Link> <br />
                            <Link to='/product'>Products</Link> <br />
                            <Link to='/pricing'>Pricing</Link> <br />
                            <a href='#'>Referral programme</a> <br />
                            <a href='#'>Careers</a> <br />
                            <a href='#'>Zerodha.tech</a> <br />
                            <a href='#'>Open source</a> <br />
                            <a href='#'>Press & media</a> <br />
                            <a href='#'>Zerodha cares (CSR)</a> <br />
                        </div>
                    </div>
                    <div className='col-3'>
                        <p className='fs-5 mb-4'>Support</p>
                        <div className='top-links'>
                            <a href='#'>Contact us</a> <br />
                            <a href='#'>Support portal</a> <br />
                            <a href='#'>Z-Connect blog</a> <br />
                            <a href='#'>List of charges</a> <br />
                            <a href='#'>Downloads & resources</a> <br />
                            <a href='#'>Videos</a> <br />
                            <a href='#'>Market overview</a> <br />
                            <a href='#'>How to file a complaint?</a> <br />
                            <a href='#'>Status of your complaints</a> <br />
                        </div>
                    </div>
                    <div className='col-3'>
                        <p className='fs-5 mb-4'>Account</p>
                        <div className='top-links'>
                            <a href='#'>Open an account</a> <br />
                            <a href='#'>Fund transfer</a> <br />
                        </div>
                    </div>
                </div>
                <div className='mt-2 text-muted' style={{ fontSize: "14px" }}>
                    <p>
                        Zerodha Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.:
                        INZ000031633 CDSL: Depository services through Zerodha Securities
                        Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
                        through Zerodha Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
                        no.: INZ000038238 Registered Address: Zerodha Broking Ltd.,
                        #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
                        J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
                        complaints pertaining to securities broking please write to&nbsp;
                        <Link to="https://mail.google.com/mail/u/0/?fs=1&to=complaints@zerodha.com&tf=cm" style={{ textDecoration: "none" }} target="_blank">complaints@zerodha.com</Link>, 
                        for DP related to <Link to="https://mail.google.com/mail/u/0/?fs=1&to=dp@zerodha.com&tf=cm" style={{ textDecoration: "none" }} target="_blank">dp@zerodha.com</Link>.
                        Please ensure you carefully read the Risk Disclosure Document as prescribed
                        by SEBI | ICF
                    </p>
                    <p>
                        Procedure to file a complaint on <Link to="https://scores.sebi.gov.in/" style={{ textDecoration: "none" }} target="_blank">SEBI SCORES</Link>:
                        Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name,
                        PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
                        Communication, Speedy redressal of the grievances
                    </p>
                    <p>
                        Investments in securities market are subject to market risks; read
                        all the scheme related documents carefully before investing.
                    </p>
                    <p>
                        "Prevent unauthorised transactions in your account. Update your
                        mobile numbers/email IDs with your stock brokers. Receive
                        information of your transactions directly from Exchange on your
                        mobile/email at the end of the day. Issued in the interest of
                        investors. KYC is one time exercise while dealing in securities
                        markets - once KYC is done through a SEBI registered intermediary
                        (broker, DP, Mutual Fund etc.), you need not undergo the same
                        process again when you approach another intermediary." Dear
                        Investor, if you are subscribing to an IPO, there is no need to
                        issue a cheque. Please write the Bank account number and sign the
                        IPO application form to authorize your bank to make payment in case
                        of allotment. In case of non allotment the funds will remain in your
                        bank account. As a business we don't give stock tips, and have not
                        authorized anyone to trade on behalf of others. If you find anyone
                        claiming to be part of Zerodha and offering such services, please&nbsp;
                        <a href='#' style={{ textDecoration: "none" }}>create a ticket here.</a>
                    </p>
                    <div className='links text-center mb-4'>
                        <Link to='https://www.nseindia.com/' target="_blank">NSE</Link> &nbsp; &nbsp;
                        <Link to='https://www.bseindia.com/' target="_blank">BSE</Link> &nbsp; &nbsp;
                        <Link to='https://www.mcxindia.com/' target="_blank">MCX</Link> &nbsp; &nbsp;
                        <a href='#'>Terms & conditions</a> &nbsp; &nbsp;
                        <a href='#'>Policies & procedures</a> &nbsp; &nbsp;
                        <a href='#'>Privacy-policy</a> &nbsp; &nbsp;
                        <a href='#'>Disclosure</a> &nbsp; &nbsp;
                        <a href='#'>For investor's attention</a> &nbsp; &nbsp;
                        <a href='#'>Investor charter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;