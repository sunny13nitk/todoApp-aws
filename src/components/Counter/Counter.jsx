
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import './Counter.css';
import CounterButton from './CounterButton';

export default function Counter()
{
    /*
        --Deconstructing useState hook that holds Current State and f(x) as an Array 
        //[0,f]
    */
    //const[firstEl, secondEl] = array
    //Current State goes to count element and f(x)from Use State to setCount element

    const [totalcount, setCount] = useState(0);

    function incrementCounterParentFunction(by)
    {
        setCount(totalcount + by);
    }

    function decrementCounterParentFunction(by)
    {
        if (totalcount > 0)
        {
            setCount(totalcount - by);
        }
    }

    function resetCounter()
    {
        setCount(0);
    }


    return (
        <>
            <span className="totalcount">{totalcount}</span>
            <CounterButton
                incrementMethod={incrementCounterParentFunction}
                decrementMethod={decrementCounterParentFunction} />
            <CounterButton
                by={2}
                incrementMethod={incrementCounterParentFunction}
                decrementMethod={decrementCounterParentFunction} />
            <CounterButton
                by={5}
                incrementMethod={incrementCounterParentFunction}
                decrementMethod={decrementCounterParentFunction} />

            <button className="resetButton"
                onClick={resetCounter}>Reset</button>

        </>
    );
}


Counter.propTypes = {
    iniVal: PropTypes.number
}

Counter.defaultProps = {
    iniVal: 0
}

