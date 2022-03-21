import React from 'react';
import { SiAirbnb } from 'react-icons/si';
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"
import { Link } from "react-router-dom"
import { withRouter } from 'react-router-dom';
import { SearchFilter } from './SearchFilter.jsx';
import { BiSearch } from "react-icons/bi"
import Avatar from '@mui/material/Avatar';



class _AppHeader extends React.Component {

    state = {
        isUserActionOpen: false,
        isNarrowScreen: false,
        isWideScreen:true
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
        if (window.innerWidth < 800) {
            this.setState({ isNarrowScreen: true })
        }else if (window.innerWidth < 1180){
            this.setState({ isWideScreen: false })

        }
    }

    handleScroll = (event) => {
        const { scrollY } = window
        let action = null
        if ((scrollY < 100) && (this.props.currPage === "home")) {
            action = { isHomePageTop: true, isFullHeader: true }
        } else {
            action = { isHomePageTop: false, isFullHeader: false }
        }
        if ((action.isHomePageTop !== this.props.isHomePageTop) ||
            (action.isFullHeader !== this.props.isFullHeader)) {
            this.props.onSetAppState(action)

        }
    }



    onSearch = (searchValue) => {
        console.log('searchValue', searchValue)

        this.props.history.push(`/explore?location=${searchValue.location}&minPrice=-Infinity&maxPrice=Infinity&checkIn=${searchValue["check-in"]}&checkOut=${searchValue["check-out"]}&guests=${searchValue.guests}`)
    }

    onOpenFullHeader = () => {
        const action = { isHomePageTop: false, isFullHeader: true }
        this.props.onSetAppState(action)

    }
    toggleUserAction = () => {
        this.setState((prevState) => ({ isUserActionOpen: !prevState.isUserActionOpen }))

    }


    render() {
        const { isUserActionOpen, isNarrowScreen,isWideScreen } = this.state
        const { isFullHeader, isHomePageTop, currPage, loggedinUser } = this.props
        const headerColor = (isHomePageTop) ? "header-dark" : "header-bright"
        const headerLogoColor = (isHomePageTop) ? "white" : "#ff385c"
    const {innerWidth}=window
        console.log('innerWidth', innerWidth)

        return (
            <section className={`main-container ${isFullHeader && 'full-header'} ${headerColor} header-container full`}>
                <div className="header">
                    <div className="header-details">
                        <Link className='homey clean-link' to="/" color={headerLogoColor}>
                            <div className='header-left'>
                                <SiAirbnb size="2em" color={headerLogoColor} />
                            </div>
                            homey
                        </Link>
                        {!isNarrowScreen && !isFullHeader && <div className='header-center' onClick={() => this.onOpenFullHeader()}>
                            <input type="text" placeholder='Start your search' />
                            <BiSearch className='search-icon' />
                        </div>}
                        {isNarrowScreen && !isFullHeader && <div className='header-center' onClick={() => this.onOpenFullHeader()}>
                          
                            <BiSearch className='search-icon' />
                        </div>}
                        {isNarrowScreen && isHomePageTop && <div className='header-center' onClick={() => this.onOpenFullHeader()}>
                          <input type="text" placeholder='Start your search' />
                            <BiSearch className='search-icon' />
                        </div>}
                        <div className='header-right'>
                            {innerWidth >1180 && <React.Fragment>
                                <Link className='btn-explore clean-link' to={`/explore?location=&minPrice=-Infinity&maxPrice=Infinity`} >Explore</Link>
                                <Link className='btn-host clean-link' to="/host">Become a host</Link>
                            </React.Fragment>
                            }
                            <button className='user-icon' onClick={this.toggleUserAction}><GiHamburgerMenu className='ham-icon' size="1.05rem" color="black" /><Avatar src={(loggedinUser) ? loggedinUser.imgUrl : '/broken-image.jpg'} /></button>
                        </div>
                    </div>
                    {isUserActionOpen && <section className='user-action'>
                        <div className='btn-header-container'>
                            {!loggedinUser && <Link className='btn-login clean-link' to="/login">Log In</Link>}
                            {loggedinUser && <Link className='btn-login clean-link' to="/dashboard">Dashboard</Link>}
                            {innerWidth <= 1180 && <React.Fragment>
                                <Link className='btn-explore clean-link' to={`/explore?location=&minPrice=-Infinity&maxPrice=Infinity`} >Explore</Link>
                                <Link className='btn-host clean-link' to="/host">Become a host</Link>
                            </React.Fragment>
                            }
                        </div>
                        <div className='btn-container'>
                            {loggedinUser && <Link className='btn-login clean-link' to="/login">Log Out</Link>}
                            <Link className='btn-about clean-link' to="/">About</Link>
                            <Link className='btn-help clean-link' to="/">Help</Link>
                        </div>
                    </section>}
                    {isNarrowScreen && isFullHeader && !isHomePageTop && <SearchFilter onSearch={this.onSearch} currPage={currPage} />}

                    {!isNarrowScreen && isFullHeader && <SearchFilter onSearch={this.onSearch} currPage={currPage} />}

                </div>
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)