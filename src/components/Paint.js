import React, { useState, useEffect, useRef, useCallback } from 'react'
import Name from './Name'
import randomColor from 'randomcolor'
import Canvas from './Canvas'
import useWindowSize from './WindowSize'
import ColorPicker from './ColorPicker'
import RefreshButton from './RefreshButton'

export default function Paint() {
    const [colors, setColors] = useState([])
    const [activeColor, setActiveColor] = useState(null)
    const [visible, setVisible] = useState(false)
    let timeoutId = useRef()
    const [windowWidth, windowHeight] = useWindowSize(() => {
        setVisible(true)
        clearTimeout(timeoutId.current)
        timeoutId.current = setTimeout(() => setVisible(false), 500)
    })
    const headerRef = useRef({offsetHeight: 0})
    const getColors = useCallback(() => {
        // get the random colors in array but copying and choose the first on in the origianl array by slice(1) function
        const baseColor = randomColor().slice(1);
        // chose that one color and scheme mode quad is generating different colors based on it
        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=quad`)
        .then(res => res.json())
        .then(res => {
            setColors(res.colors.map(color => color.hex.value))
            setActiveColor(res.colors[0].hex.value)
        })
    })
    
    useEffect(getColors, [])
    return (
        <div className="app">
            <header ref={headerRef} style={{ borderTop: `10px solid ${activeColor}`}}>
                <div>
                    <Name />
                </div>
                <div style={{ marginTop: 10}}>
                    <ColorPicker 
                        colors={colors}
                        activeColor={activeColor}
                        setActiveColor={setActiveColor}
                    />
                    <RefreshButton cb={getColors}/>
                </div>
            </header>
            {activeColor && (
                  <Canvas
                    color={activeColor}
                    height={window.innerHeight - headerRef.current.offsetHeight}
                  />
                )}
                <div className={`window-size ${visible ? '' : 'hidden'}`}>
                   {windowWidth} x {windowHeight}
                 </div>
        </div>

    )
}