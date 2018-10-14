import React, { Component } from 'react';

const Required = (props,display) => {
    return (
     <span style={{ color: '#f5222d',display:display, fontSize: 14, fontFamily: 'SimSun'}}>*</span>  
    )
}

export default Required;