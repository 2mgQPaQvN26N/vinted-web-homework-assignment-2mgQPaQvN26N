import React from 'react';

import '../assets/scss/image.scss';

export interface ImageT {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
    },
    liked: boolean;
    alt: string;
}
const Image = ({...props}:ImageT) => {
    return (
        <picture>
            <source
                media="(max-width: 576px)"
                srcSet={`${props.src.medium} 576w`}
            />
            <source
                media="(max-width: 992px)"
                srcSet={`${props.src.large} 992w`}
            />
            <source
                media="(min-widht: 993px)"
                srcSet={`${props.src.landscape}`}
            />
            <img
                loading='lazy'
                src={props.src.landscape}
                alt={props.alt}
                className='image'
            />
        </picture>
    );
};

export default Image;