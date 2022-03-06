import React from 'react'
import { connect } from 'react-redux'

import { Hero } from '../cmps/home/Hero.jsx'
import { PopDestination } from '../cmps/home/PopDestination.jsx'
import { TopRated } from '../cmps/home/TopRated.jsx'
import { BecomeHost } from '../cmps/home/BecomeHost.jsx'
import { setCurrPage, setHeaderSize, setAppState } from '../store/app.action.js'


class _HomePage extends React.Component {

    componentDidMount() {
        // this.props.setHeaderSize(true);
        // this.props.setCurrPage('home');   
        this.props.setAppState({ currPage: 'home', isHomePageTop: true, isFullHeader: true });
    }

    render() {

        return (
            <section className="home-page main-container full">

                <Hero />
                <PopDestination />
                <TopRated />
                <BecomeHost />
            </section>
        )
    }
}

function mapStateToProps({ appModule }) {
    return {
        currPage: appModule.currPage,
        isFullHeader: appModule.isFullHeader,


    }
}

const mapDispatchToProps = {
    setCurrPage,
    setHeaderSize,
    setAppState

}


export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)

