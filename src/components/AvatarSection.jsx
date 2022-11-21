import React from "react";
import image from '../images/en.jpg';
import SocialLinks from "./SocialLinks";

function AvatarSection () {
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
                    <p>Full Stack Web Developer</p>
                    <SocialLinks />
                </div>
            </div>
        </section>
    )
}

export default AvatarSection;