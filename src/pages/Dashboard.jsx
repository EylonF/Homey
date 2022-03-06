import { Component } from 'react';
import { connect } from 'react-redux';

import Avatar from '@mui/material/Avatar';

import { setAppState } from '../store/app.action.js'
import { loadStays } from '../store/stay.action.js'


import { DashHeader } from '../cmps/dashboard/DashHeader.jsx'
import { MyStays } from '../cmps/dashboard/MyStay.jsx'
// import { RateStatistic } from '../cmps/dashboard/RateStatistic'
// import { StayEdit } from '../cmps/dashboard/SaveStay'
// import { HostOrders } from '../cmps/dashboard/HostOrders'
// import { loadHostStays, removeStay } from '../store/actions/stayActions'
// import { utilService } from '../services/util-service.js'
import BeatLoader from "react-spinners/BeatLoader";
// import Cash from '../assets/img/user-cash.PNG'

export class _Dashboard extends Component {

    state = {
        action: '',
        loggedinUser: null,
        selsctedEditStay: null,
        orderChangeStatus: 0
    }

    componentDidMount() {
        // const { loggedinUser, stays } = this.props

        // if (loggedinUser) {
        //     const hostStays = stays.map(stay => {
        //         if (stay.host._id === loggedinUser._id) return stay
        //     })
        //     this.setState({ loggedinUser: { ...loggedinUser, stays: hostStays } })
        // }
        this.loadHostStays();

        this.props.setAppState({ isFullHeader: false, isHomePageTop: false, currPage: 'dashboard' })
    }

    // componentWillUnmount(prevProps, prevState) {
    //     this.props.setFooterDisplay(true)
    // }

    // getRateChangStatus = () => {
    //     return utilService.getRandomIntInclusive(0, 5)
    // }

    loadHostStays = async () => {
        // await this.props.loadHostStays(this.state.loggedinUser._id);
        // if (this.props.stays.length === 0) {
        //     this.setState({ action: 'add stay' })
        // }

        const filterBy = { hostId: this.props.loggedinUser._id }
        this.props.loadStays(filterBy)
    }

    onSelectAction = async (ev) => {
        const action = ev.target.value;
        this.setState({ action })
    }

    onSelectedEditStay = (stay) => {
        this.setState({ selsctedEditStay: stay }, () => {
            this.setState({ action: 'edit stay' })
        })
    }

    render() {
        const { action, selsctedEditStay, orderChangeStatus } = this.state
        const { removeStay, toggleMsgModal, orders, stays, updateOrder, loggedinUser } = this.props
        return (
            <section className="dashboard-container">
                <section className="dash-nav-container">
                    <div className="host-info-container">
                        <h2>{loggedinUser.fullname}</h2>
                        <Avatar src={loggedinUser.imgUrl} />

                        {/* <img src={loggedinUser.imgUrl} alt="" /> */}
                        {/* <h2>Make all payments through Home & go</h2>
                            <p>Always pay and communicate through Home & go to ensure you're protected under our Terms of Service, Payments Terms of Service, cancellation, and other safeguards.</p> */}
                    </div>
                    <div className="nav-btn-container">
                        <button className="add-stay-btn" value="add stay" onClick={this.onSelectAction}><i className="fas fa-plus"></i>Add Stay</button>
                        <button value="my Stays" onClick={this.onSelectAction}><i className="fas fa-house-user"></i>My Stays</button>
                        <button value="orders" onClick={this.onSelectAction}><i className="fas fa-clipboard-list"></i>Orders</button>
                        <button value="rate stat" onClick={this.onSelectAction}><i className="fas fa-star"></i>Reviwes</button>
                    </div>
                    {/* <DashSideNav onSelectAction={this.onSelectAction} /> */}
                </section>
                {/* {!stays && <div className='loader'> <BeatLoader size={30} color={'#ff385c'} /></div>} */}

                <section className="dash-main-container">
                    <DashHeader stays={stays} orders={orders} orderChangeStatus={orderChangeStatus} />
                    <section className="dash-info-container">
                        {/* <div className='loader'> <BeatLoader size={30} color={'#ff385c'} /></div> */}
                        {(action === '' || action === 'my Stays') && <MyStays stays={stays} onSelectedEditStay={this.onSelectedEditStay} onSelectAction={this.onSelectAction} />}
                        {/* {action === 'rate stat' && <RateStatistic stays={stays} />}
                            {action === 'edit stay' && <StayEdit stayEdit={selsctedEditStay} removeStay={removeStay} onSelectAction={this.onSelectAction} loggedInUser={loggedInUser} toggleMsgModal={toggleMsgModal} />}
                            {action === 'add stay' && <StayEdit onSelectAction={this.onSelectAction} loggedInUser={loggedInUser} toggleMsgModal={toggleMsgModal} />}
                            {action === 'orders' && <HostOrders loggedInUser={loggedInUser} orders={orders} updateOrder={updateOrder} onSelectAction={this.onSelectAction} />} */}
                    </section>
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stays: state.stayModule.stays,
        loggedinUser: state.userModule.loggedinUser,

    }
}

const mapDispatchToProps = {
    setAppState,
    loadStays,


    // loadHostStays,
    // removeStay
}

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)