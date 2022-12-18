import React from "react";
import SocialLinks from "../SocialLinks";
const image = require("../../images/en.jpg");

const AvatarSection: React.FC = () => {
    return (
        <section id="avatar-section">
            <div className="avatar-block">
                <img 
                    className="avatar-image"
                    src={image} 
                    alt="me"
                />
                <div className="avatar-description">
                    <h2>Balazs Csordas</h2>
                    <p>Web Developer</p>
                    <SocialLinks />
                </div>
            </div>
        </section>
    )
}

export default AvatarSection;