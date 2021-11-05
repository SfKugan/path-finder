import React from 'react';

export const ConditionalSection = ({ children, condition }) => {
    return condition 
        ? <>{ children }</>
        : null
}