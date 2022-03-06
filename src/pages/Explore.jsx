import React from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'

import { StayList } from '../cmps/StayList.jsx'
import { Filter } from '../cmps/StayFilter.jsx'
import { loadStays } from '../store/stay.action.js'
import { setCurrPage, setHeaderSize, setAppState } from '../store/app.action.js'




class _Explore extends React.Component {

    componentDidMount() {
        this.scrollUp();
        this.getStays();
        this.props.setAppState({ isFullHeader: false, isHomePageTop: false, currPage: 'explore' })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.getStays()
        }
    }

    scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    getStays = () => {
        const filterBy = queryString.parse(this.props.location.search)
        console.log('filter',filterBy)
        if(+filterBy.minPrice === -Infinity){
            filterBy.minPrice = -100000
        }
        if(+filterBy.maxPrice === Infinity){
            filterBy.maxPrice = 100000
        }
        // filterBy.minPrice = +filterBy.minPrice
        // filterBy.maxPrice = +filterBy.maxPrice
        this.props.loadStays(filterBy)
    }

    onSetPriceRange = (filterBy) => {
        this.props.history.push(`/explore?location=${filterBy.location}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}`);
    }

    onSetAmenitie = (filterBy)=>{
        console.log('fikter explor',filterBy)
        this.props.history.push(`/explore?location=${filterBy.location}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&Wifi=${filterBy['Wifi']}&TV=${filterBy['TV']}&Kitchen=${filterBy['Kitchen']}&AC=${filterBy['AC']}&Smoking allowed=${filterBy['Smoking allowed']}&Pets allowed = ${filterBy['Pets allowed']}`);
    }

    render() {
        const { stays} = this.props
        const {location} = queryString.parse(this.props.location.search)
        console.log(location)
        // const trip = ''
        
        if (!stays) return <React.Fragment />
        else{
            return (
                <section className="explore-container">
                    <span className="stays-number">{stays.length} stays </span>
                    {(location)?<h1>Find place to stay in {location}</h1>:<h1>Find place to stay</h1>}
                    <Filter onSetPriceRange={this.onSetPriceRange} onSetAmenitie={this.onSetAmenitie} location={location}/>
                    {(stays.length)?<StayList stays={stays}/>:<h2>No search results, find other place to stay</h2>}
                </section>
            )
        }
    }
}

function mapStateToProps({ stayModule, appModule }) {
    return {
        stays: stayModule.stays,
        currPage: appModule.currPage,
        isFullHeader: appModule.isFullHeader,


    }
}

const mapDispatchToProps = {
    loadStays,
    setCurrPage,
    setHeaderSize,
    setAppState,
}


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)

