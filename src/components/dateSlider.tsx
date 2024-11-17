import React, { useState, useEffect, useReducer } from "react";
import { RangeSlider } from "./ui/rangeslider";
import { cn } from "~/lib/utils";
import { Input } from "./ui/input";




export const DateSlider = ({minDateRef, maxDateRef}) => {
  const initialMinPrice = 1917;
  const initialMaxPrice = new Date().getFullYear();

  const [sliderMinValue] = useState(initialMinPrice);
  const [sliderMaxValue] = useState(initialMaxPrice);

  const [minMaxValState, setMinMaxValDispatch] = useReducer(minMaxValReducer, { minVal: initialMinPrice, maxVal: initialMaxPrice});

  const [minInput, setMinInput] = useState(initialMinPrice);
  const [maxInput, setMaxInput] = useState(initialMaxPrice);


  const minGap = 2;

  const [range, setRange] = useState<[number, number]>([initialMinPrice, initialMaxPrice]); 



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


////uncalled functions need rework
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


  return (
  <>
    <div className="flex flex-col gap-4">
      <RangeSlider min={initialMinPrice} max={initialMaxPrice} value={range} onValueChange={
        (v) => {
          setRange(v as [number, number]);
          minDateRef.current = range[0];
          maxDateRef.current = range[1];
        }
        }/>
      <div className="flex flex-row justify-between"  >
          <Input className="w-20 text-center"
            type="text"
            value={range[0]}
            onChange=  {(e) => {
              setRange((r) => [e.target.valueAsNumber ?? 0, r[1]]);
              minDateRef.current = range[0];
              maxDateRef.current = range[1];
            }}
            readOnly={true}
            min={initialMinPrice}
            max={range[1]}
          />
          <Input className="w-20 text-center"
            type="text"
            value={range[1]}
            onChange=  {(e) => {
              setRange((r) => [e.target.valueAsNumber ?? 0, r[1]]);
              minDateRef.current = range[0];
              maxDateRef.current = range[1];
            }}
            readOnly={true}
            min={range[0]}
            max={initialMaxPrice}
          />
      </div>
    
    </div>
  </>
  );
};

export default DateSlider;
