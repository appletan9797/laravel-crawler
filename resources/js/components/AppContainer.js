import React from "react";

const AppContainer = ({title,children}) => {
    return (
        <div className="AppContainer">
            <h2>{title}</h2>
            {children}
        </div>
    );
};

export default AppContainer;
