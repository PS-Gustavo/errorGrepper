import { TextArea } from "@carbon/react";
import React from "react";


export default function Login () {
    return (
        <React.Fragment>
            <TextArea
                labelText={"testArea"}
                defaultValue={"This is the Login page"}
            />
        </React.Fragment>
    )
}