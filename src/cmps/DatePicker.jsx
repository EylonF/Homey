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
        console.log('ranges', ranges);
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        this.props.onSelectDate(ranges.selection)
        this.setState({ selectionRange: ranges.selection })
    }
    render() {
        const { selectionRange } = this.state
        const { pos,toggleDatePicker } = this.props
        console.log('pos',pos)
        return (
            <div className="date-picker-container" style={{left:pos.left, top:pos.top}}>

                <DateRange
                    classNames="date-picker-2"
                    // rangeColors={"#ff385c"}
                    color={"black"}
                    className="date-pick"
                    ranges={[selectionRange]}
                    onChange={this.handleSelect}
                    months={2}
                    direction='horizontal'
                />
                <div className="close-btn" onClick={(ev)=>toggleDatePicker(ev)}><AiOutlineCloseSquare/></div>
            </div>
        )
    }
}