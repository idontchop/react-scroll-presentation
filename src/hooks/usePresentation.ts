import React, { useContext } from 'react';
import { PresentationContext } from "../components/Presentation";

export const usePresentation = () => {

    const context = useContext(PresentationContext);

    return context;

}