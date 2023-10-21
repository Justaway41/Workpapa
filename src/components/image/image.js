import React from 'react';
import Globals from '../../helpers/constant';

const Img = props =>
    (
        <img rel="preload" src={`${Globals.publicUrl}${props.src}`} className={props.classname} alt="" height={props.size} width={props.size} />
    );
export default Img;
