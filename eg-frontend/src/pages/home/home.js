import { TextArea } from "@carbon/react";
import React from "react";


export default function Home () {
    return (
        <React.Fragment>
            <TextArea
                labelText="testArea"
                defaultValue={"This is the Home page"}
            />
        </React.Fragment>
    )
}