
import React from 'react'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom';

import { DatePicker } from './DatePicker.jsx';

import { BiSearch } from "react-icons/bi"



class _SearchFilter extends React.Component {

    state = {
        datePicker: {
            isDatePickerOpen: false,
            pos: null
        },
        userSelection: {
            location: '',
            "check-in": new Date(),
            "check-out": new Date(),
            guests: 0,
        },
        first: true,
        second: true,
        third: true
    }

    componentDidMount() {
        const { currPage } = this.props
        if (currPage !== 'home' ) {
            let { location, checkIn, checkOut, guests } = queryString.parse(this.props.location.search)
            checkIn = new Date(checkIn)
            checkOut = new Date(checkOut)
            this.setState((prevState) => ({ ...prevState,userSelection: {...prevState.userSelection, location: location, ["check-in"]: checkIn, ["check-out"]: checkOut, guests: guests} }))
        }
    }

    onSubmitSearch = () => {
        const { userSelection } = this.state
        // const checkIn = userSelection['check-in'].toLocaleDateString('en-GB')
        // const checkOut = userSelection['check-out'].toLocaleDateString('en-GB')
        const searchValue = { ...userSelection }
        // const searchValue = { ...userSelection,['check-in']:checkIn,['check-out']:checkOut }
        this.props.onSearch(searchValue)
    }

    onSelectDate = (rangeSelection) => {
        // console.log('rangeSelection', rangeSelection)
        // const numOfNights = ((rangeSelection.endDate - rangeSelection.startDate) / 1000 / 60 / 60 / 24)
        // console.log('numOfNights', numOfNights)

        this.setState((prevState) => {

            return ({ ...prevState, userSelection: { ...prevState.userSelection, "check-in": rangeSelection.startDate, "check-out": rangeSelection.endDate } })
        })
    }

    onHandleChange = ({ target }) => {
        console.log(target.value)
        if (target) {
            const field = target.name
            const value = target.value
            if (field === 'guests') {
                if (value < 0) value = 0
            }
            this.setState((prevState) => ({ ...prevState, userSelection: { ...prevState.userSelection, [field]: value } }))
        }
    }

    toggleDatePicker = ({ target }) => {

        const domRect = target.getBoundingClientRect();
        const pos = {
            left: domRect.x,
            top: domRect.y - domRect.height - 5
        }

        this.setState((prevState) => ({ ...prevState, datePicker: { ...prevState.datePicker, isDatePickerOpen: !prevState.datePicker.isDatePickerOpen, pos } }))

    }

    onHover = (prev, next) => {
        this.setState(prevState => ({ ...prevState, [prev]: !this.state[prev], [next]: !this.state[next] }))
    }

    onLeaveHover = (prev, next) => {
        this.setState(prevState => ({ ...prevState, [prev]: !this.state[prev], [next]: !this.state[next] }))
    }



    render() {
        const { datePicker, userSelection } = this.state
        const { location, guests } = userSelection
        console.log('userSelection', userSelection)
        const checkIn = userSelection['check-in'].toLocaleDateString('en-GB')
        const checkOut = userSelection['check-out'].toLocaleDateString('en-GB')
        // const checkIn = this.state["check-in"]
        // const checkOut = this.state["check-out"]
        return (
            <form className="header-filter">
                <div className="filter-container">
                    <label htmlFor="location" onMouseEnter={() => this.onHover('first', null)} onMouseLeave={() => this.onLeaveHover('first', null)}>
                        <span>Location</span>
                        <input name="location" autoComplete="off" id="location" type="text" value={location} placeholder="Where are you going?" onChange={(ev) => this.onHandleChange(ev)} />
                    </label>
                    <div className={`border ${this.state.first ? 'first' : undefined}`}></div>
                    <label htmlFor="check-in" onMouseEnter={() => this.onHover('first', 'second')} onMouseLeave={() => this.onLeaveHover('first', 'second')} onClick={this.toggleDatePicker}>
                        <span>Check in</span>
                        <div className="check-in-input" >{checkIn}</div>

                        {/* <input name="check-in" id="check-in" autoComplete="off" placeholder="Add dates" value={checkIn} type="date" onChange={(ev) => this.onHandleChange(ev)} /> */}
                    </label>
                    <div className={`border ${this.state.second ? 'second' : undefined}`}></div>
                    <label htmlFor="check-out" onMouseEnter={() => this.onHover('second', 'third')} onMouseLeave={() => this.onLeaveHover('second', 'third')} onClick={this.toggleDatePicker}>
                        <span>Check out</span>
                        <div className="check-out-input" >{checkOut}</div>

                        {/* <input name="check-out" id="check-out" autoComplete="off" placeholder="Add dates" value={checkOut} type="date" onChange={(ev) => this.onHandleChange(ev)} /> */}
                    </label>
                    <div className={`border ${this.state.third ? 'third' : undefined}`}></div>
                    <label className="guests" htmlFor="guests" onMouseEnter={() => this.onHover('third', null)} onMouseLeave={() => this.onLeaveHover('third', null)}>
                        <span>Guests</span>
                        <input name="guests" id="guests" placeholder="Add guests" type="number" value={guests} onChange={(ev) => this.onHandleChange(ev)} />
                    </label>

                    <div onClick={() => this.onSubmitSearch()}><BiSearch className='search-icon' /></div>
                </div>
                {datePicker.isDatePickerOpen && <DatePicker toggleDatePicker={this.toggleDatePicker} pos={datePicker.pos} onSelectDate={this.onSelectDate} />}

            </form>
        )
    }
}


export const SearchFilter = withRouter(_SearchFilter)