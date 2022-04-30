/// <reference types="react" />
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
export declare const WithVendorSpecificStyled: (Element: JSX.Element) => JSX.Element;
export declare const WithVendorSpecific: (Element: JSX.Element) => any;
