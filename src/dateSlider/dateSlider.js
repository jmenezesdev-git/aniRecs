import React, { useState, useEffect, useReducer } from "react";
import "./dateSlider.css";



export const DateSlider = ({minDateRef, maxDateRef}) => {
  const initialMinPrice = 1917;
  const initialMaxPrice = new Date().getFullYear();

  const [sliderMinValue] = useState(initialMinPrice);
  const [sliderMaxValue] = useState(initialMaxPrice);

  const [minMaxValState, setMinMaxValDispatch] = useReducer(minMaxValReducer, { minVal: initialMinPrice, maxVal: initialMaxPrice});

  const [minInput, setMinInput] = useState(initialMinPrice);
  const [maxInput, setMaxInput] = useState(initialMaxPrice);

  const [isDragging, setIsDragging] = useState(false);

  const minGap = 2;
  const slideMin = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= sliderMinValue && minMaxValState.maxVal - value >= minGap) {
      setMinMaxValDispatch({type:'min', value:value});
      setMinInput(value);
    }
  };

  function minMaxValReducer(state, action) {
    if (action.type === 'min') {
      minDateRef.current = action.value;
      return {
        maxVal: state.maxVal,
        minVal: action.value
      };
    }
    if (action.type === 'max') {
      maxDateRef.current = action.value; 
      return {
        maxVal: action.value,
        minVal: state.minVal
      };
    }
    throw Error('Unknown action.');
  }

  const handleMinDateRangeChange = (val) => {
    setMinVal(val);
    minDateRef.current = minVal; 
  }
  
  const handleMaxDateRangeChange = (val) => {
    setMaxVal(val);
    maxDateRef.current = maxVal; 
  }

  const slideMax = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value - minMaxValState.minVal >= minGap) {
      setMinMaxValDispatch({type:'max', value:value});
      setMaxInput(value);
    }
  };
  const setSliderTrack = () => {
    const range = document.querySelector(".slider-track");

    if (range) {
      const minPercent =
        ((minMaxValState.minVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
      const maxPercent =
        ((minMaxValState.maxVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

      range.style.left = `${minPercent}%`;
      range.style.right = `${100 - maxPercent}%`;
    }
  };

  useEffect(() => {
    setSliderTrack();
  }, [minMaxValState.minVal, minMaxValState.maxVal]);

  const handleMinInput = (e) => {
    const value =
      e.target.value === "" ? sliderMinValue : parseInt(e.target.value, 10);
    if (value >= sliderMinValue && value < minMaxValState.maxVal - minGap) {
      setMinInput(value);
      setMinMaxValDispatch({type:'min', value:value});
    }
  };

  const handleMaxInput = (e) => {
    const value =
      e.target.value === "" ? sliderMaxValue : parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value > minMaxValState.minVal + minGap) {
      setMaxInput(value);
      setMinMaxValDispatch({type:'max', value:value});
    }
  };

  const handleInputKeyDown = (e, type) => {
    if (e.key === "Enter") {
      const value = parseInt(e.target.value, 10);
      if (
        type === "min" &&
        value >= sliderMinValue &&
        value < minMaxValState.maxVal - minGap
      ) {
        setMinMaxValDispatch({type:'min', value:value});
      } else if (
        type === "max" &&
        value <= sliderMaxValue &&
        value > minMaxValState.minVal + minGap
      ) {
        setMinMaxValDispatch({type:'max', value:value});
      }
    }
  };

  const startDrag = () => {
    setIsDragging(true);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <div className="double-slider-box">
      
      <div className="range-slider">
        <div className="slider-track"></div>
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={minMaxValState.minVal}
          onChange={slideMin}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="min-val"
        />
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={minMaxValState.maxVal}
          onChange={slideMax}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="max-val"
        />
      </div>
      <div className="input-box">
        <div className="min-box">
          <input
            type="number"
            value={minInput}
            onChange={handleMinInput}
            onKeyDown={(e) => handleInputKeyDown(e, "min")}
            className="min-input"
            min={sliderMinValue}
            max={minMaxValState.maxVal - minGap}
          />
        </div>
        <div className="max-box">
          <input
            type="number"
            value={maxInput}
            onChange={handleMaxInput}
            onKeyDown={(e) => handleInputKeyDown(e, "max")}
            className="max-input"
            min={minMaxValState.minVal + minGap}
            max={sliderMaxValue}
          />
        </div>
      </div>
    </div>
  );
};

export default DateSlider;
