import React from 'react'
import Slide from './Slide.type'

/**
 * UNDER DEVELOPMENT
 * 
 * @param props 
 * @returns 
 */
const Header = (props: Slide) => {

    return (<div> {/*wrapper*/}
        <div style={{position: "sticky", top: 0, border: 0, padding: 0, margin: 0}}>
            {props.header}
        </div>
        {props.children}
    </div>
        )
}

export default Header