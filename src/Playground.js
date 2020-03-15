import React, { useState, useEffect, useRef } from 'react'
import randomColor from 'randomcolor'

export default function Playground() {
    const [count, setCount] = useState(0)

    const [color, setColor] = useState(null)

    const inputRef = useRef()
    useEffect(() => {
        setColor(randomColor())
        inputRef.current.focus()
    }, [count])

    return(
        <div style={{ borderTop: `10px solid ${color}`}}>
            {count}
            <button onClick={() => setCount(currentCount => currentCount + 1)}>+</button>
            <button onClick={() => setCount(currentCount => currentCount - 1)}>-</button>
            <hr />
            <input ref={inputRef} type="range" onChange={e => setCount(e.target.value)} value={count} />
        </div>
    )
}