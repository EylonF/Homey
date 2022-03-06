import { Component } from 'react'
import { utilService } from '../../services/util.service.js'
import { withRouter } from 'react-router-dom';
import queryString from 'query-string'

import { DatePicker } from '../DatePicker.jsx';
import { AiFillStar } from 'react-icons/ai';





class _StayOrder extends Component {

    state = {
        stay: null,
        datePicker: {
            isDatePickerOpen: false,
            pos: null
        },
        userSelection: {
            "check-in": new Date(),
            "check-out": new Date(),
            guests: 0,
            numOfNights: null
        },
    }

    componentDidMount() {
        const { stay } = this.props

        let { checkIn, checkOut, guests } = queryString.parse(this.props.location.search)
        guests = (guests === 'undefined') ? 0 : guests
        checkIn = (checkIn === 'undefined') ? this.state.userSelection['check-in'] : new Date(checkIn)
        checkOut = (checkOut === 'undefined') ? this.state.userSelection['check-out'] : new Date(checkOut)
        // checkIn =(!checkOut)? new Date() :new Date(checkOut)
        // checkIn = new Date(checkIn)
        // checkOut = new Date(checkOut)
        console.log('this.props order', this.props)
        const numOfNights = ((checkOut - checkIn) < (1000 * 60 * 60 * 23)) ? null : ((checkOut - checkIn) / 1000 / 60 / 60 / 24)

        // this.setState({ stay: { ...stay },userSelection:{...this.state.userSelection, guests} })
        this.setState({ stay: { ...stay }, userSelection: { ...this.state.userSelection, ["check-in"]: checkIn, ["check-out"]: checkOut, guests: guests, numOfNights } })


    }

    onHandleChange = ({ target }) => {
        if (target) {
            let field = target.name
            let value = +target.value
            if (field === 'guests') {
                if (value < 0) value = 0
                else if (value > this.state.stay.capacity) value = this.state.stay.capacity
            }
            this.setState((prevState) => {
                return ({ ...prevState, userSelection: { ...prevState.userSelection, [field]: value } })
            })
        }
    }

    onSelectDate = (rangeSelection) => {
        // console.log('rangeSelection', rangeSelection)
        const numOfNights = ((rangeSelection.endDate - rangeSelection.startDate) / 1000 / 60 / 60 / 24)
        console.log('numOfNights', numOfNights)

        this.setState((prevState) => {

            return ({ ...prevState, userSelection: { ...prevState.userSelection, "check-in": rangeSelection.startDate, "check-out": rangeSelection.endDate, numOfNights } })
        })
    }

    toggleDatePicker = ({ target }) => {

        const domRect = target.getBoundingClientRect();
        console.log('domRect', domRect)
        const pos = {
            left: domRect.x,
            top: domRect.y - domRect.height - 5
        }

        this.setState((prevState) => ({ ...prevState, datePicker: { ...prevState.datePicker, isDatePickerOpen: !prevState.datePicker.isDatePickerOpen, pos } }))

    }

    onReserve = () => {
        const { stay, userSelection } = this.state
        const { loggedinUser } = this.props

        const order = {
            host: stay.host,
            createdAt: new Date(),
            buyer: loggedinUser,
            totalPrice: (stay.price * userSelection.numOfNights + 9),
            startDate: userSelection["check-in"],
            endDate: userSelection["check-out"],
            guests :userSelection.guests,
            stay:stay,
            status:'pending'
        }
        // console.log('reserving')
        console.log('order', order)
        this.props.addOrder(order)
    }

    render() {
        const { stay, datePicker, userSelection } = this.state
        const checkIn = userSelection['check-in'].toLocaleDateString('en-GB')
        const checkOut = userSelection['check-out'].toLocaleDateString('en-GB')

        if (!stay) return <h1>Loading...</h1>
        const { reviewsAvg } = this.props

        console.log(stay)
        return (
            <section className="order-container">
                <div className="order-form-container">
                    <div className="order-form">
                        <div className="order-form-header">
                            <h2>${stay.price} <span>/night</span></h2>
                            <p> <AiFillStar /> {reviewsAvg} ({stay.reviews.length} reviews)</p>

                        </div>
                        <form>
                            <div className="order-form-date" onClick={this.toggleDatePicker}>
                                <label htmlFor="check-in" >
                                    <span>Check-in</span>
                                    <div className="check-in-input" >{checkIn}</div>
                                </label>
                                <label htmlFor="check-out">
                                    <span>Check-out</span>
                                    <div className="check-in-input" >{checkOut}</div>
                                </label>
                            </div>
                            <div className="order-form-guest">
                                <label htmlFor="guest">
                                    <span>guest</span>
                                    <input name="guests" id="guest" type="number" value={userSelection.guests} onChange={(ev) => this.onHandleChange(ev)} />
                                </label>

                            </div>
                            {datePicker.isDatePickerOpen && <DatePicker toggleDatePicker={this.toggleDatePicker} pos={datePicker.pos} onSelectDate={this.onSelectDate} />}
                            <div className="btn-container" onClick={this.onReserve}>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="cell"></div>
                                <div className="content">
                                    <button className="action-btn"><span>Reserve</span></button>
                                </div>
                            </div>
                            {userSelection.numOfNights &&
                                <div className='price-container'>
                                    <p className='info'>You won't be charged yet</p>
                                    <div className='price'><p>${stay.price} ⨉ {userSelection.numOfNights} nights</p><p>${stay.price * userSelection.numOfNights}</p></div>
                                    <div className='price'><p>Service fee</p><p>$0</p></div>
                                    <div className='price'><p>Occupancy taxes and fees</p><p>$9</p></div>
                                    <div className='total-price'><p>Total</p><p>${stay.price * userSelection.numOfNights + 9}</p></div>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}


export const StayOrder = withRouter(_StayOrder)