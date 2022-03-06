
import React from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: "#ddd",
    height: 3,
    padding: "13px 0",
    "& .MuiSlider-thumb": {
        height: 27,
        width: 27,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        "&:hover": {
            boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)"
        },
        "& .airbnb-bar": {
            height: 9,
            width: 1,
            backgroundColor: "currentColor",
            marginLeft: 1,
            marginRight: 1
        }
    },
    "& .MuiSlider-track": {
        height: 3
    },
    "& .MuiSlider-rail": {
        color: theme.palette.mode === "dark" ? "#BFBFBF" : "#D8D8D8",
        opacity: theme.palette.mode === "dark" ? undefined : 1,
        height: 3
    }
}));

function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
        <SliderThumb {...other}>
            {children}
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    );
}

export class FilterSlider extends React.Component {

    state = {
        values:[50,250]
    }

    onHandleChange= (ev, newVal)=>{
        ev.stopPropagation()
        this.setState({...this.state, values:newVal},()=>{this.props.onSetPriceRange(this.state.values)})
    }

    render(){
        return (
            <Box sx={{ width: 320 }}>
                <Box sx={{ m: 3 }} />
                <AirbnbSlider
                    min={0}
                    max={500}
                    onChange={(ev, newVal) => {
                        this.onHandleChange(ev, newVal)
                    }}
                    valueLabelDisplay="auto"
                    components={{ Thumb: AirbnbThumbComponent }}
                    getAriaLabel={(index) =>
                        index === 0 ? "Minimum price" : "Maximum price"
                    }
                    value={this.state.values ? this.state.values : [0, 500]}
                />
            </Box>
        );

    }
    
}