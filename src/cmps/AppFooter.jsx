import { Link } from "react-router-dom";
// import { FooterLinks } from './app/FooterLinks'

export function AppFooter({ onSearch, topRatedStays, nearbayStays }) {
    return (
        <footer className="main-footer full">

            <section>
                {/* <FooterLinks onSearch={onSearch} topRatedStays={topRatedStays} nearbayStays={nearbayStays} /> */}

                <section className="footer-nav-container">
                    <div >
                        <span>© 2022 homey, <span>Inc.</span></span>
                        <span>·</span>
                        <Link to="/login">Login</Link>
                        <span>·</span>
                        <Link to="/host">Become a host</Link>
                    </div>
                    <div>
                        <span>
                            <i className="fas fa-globe"></i>
                            <span>English (US)</span>
                            <span>$ US</span>
                        </span>
                        <span>
                            <i className="fab fa-facebook-f"></i>
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-instagram"></i>
                        </span>
                    </div>
                </section>
            </section>
        </footer>
    )
}