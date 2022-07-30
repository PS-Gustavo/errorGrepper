import { LogoLinkedin, LogoFacebook, TrashCan } from "@carbon/icons-react";
import { Button, IconButton } from "@carbon/react";
import React from "react";

import './login.css';

export default function Login() {
    return (
        <div className="login-container">
            <div className="login-buttons-container">
                <Button
                    hasIconOnly
                    iconDescription="Google Login"
                    renderIcon={TrashCan}
                    onClick={() => {
                        console.log("cheese");
                    }}
                    className="login-button"
                />
                <Button
                    hasIconOnly
                    iconDescription="Facebook Login"
                    renderIcon={LogoFacebook}
                    onClick={() => {
                        console.log("cheese");
                    }}
                    className="login-button"
                />
                <Button
                    hasIconOnly
                    iconDescription="LinkedIn Login"
                    renderIcon={LogoLinkedin}
                    onClick={() => {
                        console.log("cheese");
                    }}
                    className="login-button"
                />
            </div>

        </div>
    )
}