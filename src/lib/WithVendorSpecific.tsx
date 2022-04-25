import React from "react"
import styled from 'styled-components'



/**
 * HOC that takes a single element, analyzes the styles and adds classes
 * to replace some styles.
 * 
 * Uses css file for now, should add to DOM. TODO
 *  
 * 
 *  [*] position sticky
 * 
 * @param Element JSX.Element
 */
export const WithVendorSpecific = (Element: JSX.Element) => {



    if (Element.props?.style?.position && Element.props.style.position === 'sticky') {
        
        let {position, ...newStyles} = Element.props.style
        // anti pattern? 
        let NewElement:any = styled(({className}) => React.cloneElement(Element,
            {style: newStyles,
            className: Element.props.className ? className + Element.props.className : className})
            )`    position: -webkit-sticky;
            position: -moz-sticky;
            position: -o-sticky;
            position: -ms-sticky;
            position: sticky;
            border: 1px green solid;`


        /*let newClassNames = Element.props.className ? 'sticky ' + Element.props.className : 'sticky'
        const newElement:any = React.cloneElement(Element,{
            style: newStyles,
            className: newClassNames
        })*/
        console.log(Element,NewElement)
        return <NewElement />
    } else {
        return Element
    }
}
