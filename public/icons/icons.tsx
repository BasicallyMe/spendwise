import React from 'react';
import Google from "./google";
import Twitter from './twitter';
import Microsoft from './microsoft';
import Logo from './logo';
import LogoIcon from './logoicon';

const Icon = (props: { icon: string }) => {
    switch(props.icon) {
        case "Google":
            return <Google />;
        case "Twitter": 
            return <Twitter />;
        case "Microsoft":
            return <Microsoft />;
        case "Logo":
            return <Logo />;
        case "Icon": 
            return <LogoIcon />;
    }
}

export default Icon