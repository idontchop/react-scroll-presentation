import React from "react"


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
        let newClassNames = Element.props.className ? 'sticky ' + Element.props.className : 'sticky'
        const newElement = React.cloneElement(Element,{
            style: newStyles,
            className: newClassNames
        })
        console.log(Element,newElement)
        return newElement
    } else {
        return React.cloneElement(Element)
    }
}
