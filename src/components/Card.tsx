import React from 'react';
import Image, { ImageT } from './Image';

import '../assets/scss/card.scss';
import '../assets/scss/button.scss';

export interface CardT {
    image: ImageT;
    key: number;
    className: string;
    handleFavourite(id: number, state: boolean): void;
}

const Card = ({...props}:CardT) => {
    return (
        <div className={`${props.className} card-wrapper`}>
            <Image {...props.image} />
            <div className='card-overlay'>
                <div className='card-overlay-text'>{props.image.alt}</div>
                {props.image.alt && <div className='card-overlay-seperator'></div>}
                <div className='card-overlay-author'>{props.image.photographer}</div>
                <button className='button' onClick={() => props.handleFavourite(props.image.id, !props.image.liked)}>
                    {props.image.liked ? 'Unfavourite' : 'Favourite'}
                </button>
            </div>
        </div>
    );
};

export default Card;