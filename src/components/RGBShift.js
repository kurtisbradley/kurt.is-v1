import React, { Component } from "react";
import { rgbShift } from '../utils/libs/rgb-shift'
import displace from '../../content/images/displace-circle.png'

export default class Scene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: props.image
        }
    }
    
    componentDidMount = () => {
        const { image } = this.state;
        const images = [
            image.src,
        ]
        
        new rgbShift({
            nav : true,
            navElement: '.scene-nav',
            slideImages: images,
            displacementImage: displace,
            fullScreen: false,
            transitionDuration: 0.25, // must be 0.1 > transitionGhostDuration
            transitionGhostDuration : 0.15,
            transitionFilterIntensity: 100,
            transitionSpriteIntensity: 1,
            mouseDispIntensity: 10,
            interactive : true,
            autoPlay : false,
            autoPlaySpeed : 5000,
        });
    };

    render() {
        return (
            <>
            <div className="rgbShift"></div>
            <style jsx>{`
                .rgbShift {
                    margin-left: calc(-0.25 * var(--main-content));
                    margin-right: calc(-0.25 * var(--main-content));
                    margin-top: var(--small-gap);
                }

                @media (max-width: 1100px) {
                    .rgbShift {
                        margin-left: calc(-0.125 * var(--main-content));
                        margin-right: calc(-0.125 * var(--main-content));
                    }   
                }
                
                @media (max-width: 960px) {
                    .rgbShift {
                        margin-left: 0;
                        margin-right: 0;
                    } 
                }
            `}</style>
            </>
        );
    }
}
