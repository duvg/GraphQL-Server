import React, { Fragment } from 'react';
import Clientes from "./Clientes";

const Panel = () => {
    return (
        <Fragment>
            <h1 className="textCenter my-5">Top 10 clientes que más conpran</h1>
            <Clientes></Clientes>
        </Fragment>
    );
};

export default Panel;
