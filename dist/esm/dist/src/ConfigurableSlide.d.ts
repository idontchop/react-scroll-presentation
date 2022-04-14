/// <reference types="react" />
import Slide from './components/Slide.type';
interface ConfigureableSlideProps {
    children?: JSX.Element | JSX.Element[];
    slideIn?: any;
    slideMe?: Slide;
    transition?: any;
    testOverWrite?: {};
}
declare const ConfigurableSlide: (props: ConfigureableSlideProps) => JSX.Element;
export default ConfigurableSlide;
