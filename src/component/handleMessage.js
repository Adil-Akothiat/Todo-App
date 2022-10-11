import React from "react";

export default function HandleMessage (props) {
    return (
        <div className="message">
            <div className="blur"></div>
            <div className="card">
                <p>DOESN'T MAKE SENSE! TYPE A TASK TODO!</p>
                <button onClick={props.onClick}>
                    OK!
                </button>
            </div>
        </div>
    );
}