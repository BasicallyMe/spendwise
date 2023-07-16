import React from 'react';
import Google from "./google";
import Twitter from './twitter';
import Microsoft from './microsoft';

const Icon = (props: { icon: string }) => {
    switch(props.icon) {
        case "Google":
            return <Google />;
        case "Twitter": 
            return <Twitter />;
        case "Microsoft":
            return <Microsoft />
    }
}

export default Icon