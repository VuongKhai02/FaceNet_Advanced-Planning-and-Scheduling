import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";

const ROUTING_PATH = "/";

export const HomePage = () => (
    <div>
        <h1>MK APS FRONTEND</h1>
        {/*<Dashboard/>*/}
        <svg width='1000' height='500'>
            <line x1='50' y1='250' x2='350' y2='250' stroke='black' />
            <line x1='50' y1='250' x2='50' y2='50' stroke='black' />
            <rect x='80' y='200' width='50' height='50' fill='blue' />
            <rect x='160' y='150' width='50' height='100' fill='green' />
            <rect x='240' y='100' width='50' height='150' fill='red' />
            <circle cx='500' cy='300' r='80' fill='yellow' />
            <circle cx='460' cy='280' r='10' fill='black' />
            <circle cx='520' cy='280' r='10' fill='black' />
            <path d='M460 320 Q500 340 540 320' stroke='black' fill='transparent' />
            <circle cx='700' cy='300' r='80' fill='pink' />
            <circle cx='660' cy='280' r='10' fill='black' />
            <circle cx='720' cy='280' r='10' fill='black' />
            <path d='M660 320 Q700 340 740 320' stroke='black' fill='transparent' />
        </svg>
    </div>
);

registerScreen({
    component: HomePage,
    caption: "screen.home",
    screenId: "HomePage",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});

export default HomePage;
