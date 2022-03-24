import React from 'react';
import { DateRange } from 'react-date-range';
import { AiOutlineCloseSquare } from 'react-icons/ai';


export class DatePicker extends React.Component {

    state = {
        selectionRange: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    }

    handleSelect = (ranges) => {
        
        this.props.onSelectDate(ranges.selection)
        this.setState({ selectionRange: ranges.selection })
    }
    render() {
        const { selectionRange } = this.state
        const { pos,toggleDatePicker } = this.props
        const monthsNum = (window.innerWidth<800)?1:2

        // console.log('pos',pos)
        return (
            // <div className="date-picker-container" style={{left:pos.left, top:pos.top}}>
            <div className="date-picker-container">

                <DateRange
                    classNames="date-picker-2"
                    // rangeColors={"#ff385c"}
                    color={"black"}
                    className="date-pick"
                    ranges={[selectionRange]}
                    onChange={this.handleSelect}
                    months={monthsNum}
                    direction='horizontal'
                    // direction={monthsDirection}
                />
                <div className="close-btn" onClick={(ev)=>toggleDatePicker(ev)}><AiOutlineCloseSquare/></div>
            </div>
        )
    }
}