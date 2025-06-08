import { NavLink } from 'react-router-dom';
function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg border-bottom sticky-top" style={{ backgroundColor: "#FFF" }}>
            <div class="container p-2">
                <NavLink class="navbar-brand" to="/"><img src='assets/logo.svg' alt='Logo-Image' style={{ width: "25%" }}></img></NavLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <form class="d-flex" role="search">
                        <ul class="navbar-nav mb-lg-0">
                            {[
                                { to: '/about', label: 'About' },
                                { to: '/product', label: 'Products' },
                                { to: '/pricing', label: 'Pricing' },
                                { to: '/support', label: 'Support' },
                                { to: '/signup', label: 'Signup' },
                                { to: '/login', label: 'Login' },
                            ].map((link, index) => (
                                <li className="nav-item" key={index}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'text-primary' : 'text-dark'}`
                                        }
                                        to={link.to}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;