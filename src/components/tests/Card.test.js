/* eslint-disable */

import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Image from '../Image';
import Card from '../Card';

const MOCK_RESPONSE = {
    image: {
        id: 30824250,
        width: 5184,
        height: 3456,
        url: "https://www.pexels.com/photo/playful-seals-on-rocky-san-diego-shore-30824250/",
        photographer: "Hyunbin (Daniel) Lee",
        photographer_url: "https://www.pexels.com/@moonpiczar",
        photographer_id: 366604,
        avg_color: "#999999",
        src: {
            landscape: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
            large: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
            large2x: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            medium: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&h=350",
            original: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg",
            portrait: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
            small: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&h=130",
            tiny: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
        },
        liked: false,
        alt: "Two seals playing on the rocky shoreline of San Diego, California, captured in black and white."
    },
    key: 30824250,
    className: '',
};

jest.mock('../Image')
describe('App infinite scrolling component test', () => {
    it('1. Displays favourite', () => {
        render(<Card {...MOCK_RESPONSE} />);

        const button = screen.getByRole('button');

        expect(button).toHaveTextContent("Favourite");
    });

    it('2. Displays unfavourite', () => {
        const mockResponse = {
            image: {
                id: 30824250,
                width: 5184,
                height: 3456,
                url: "https://www.pexels.com/photo/playful-seals-on-rocky-san-diego-shore-30824250/",
                photographer: "Hyunbin (Daniel) Lee",
                photographer_url: "https://www.pexels.com/@moonpiczar",
                photographer_id: 366604,
                avg_color: "#999999",
                src: {
                    landscape: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
                    large: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                    large2x: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    medium: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&h=350",
                    original: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg",
                    portrait: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
                    small: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&h=130",
                    tiny: "https://images.pexels.com/photos/30824250/pexels-photo-30824250.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
                },
                liked: true,
                alt: "Two seals playing on the rocky shoreline of San Diego, California, captured in black and white."
            },
            key: 30824250,
            className: '',
        };

        render(<Card {...mockResponse} />);

        const button = screen.getByRole('button');

        expect(button).toHaveTextContent("Unfavourite");
    });

    it('3. Displays image', () => {
        render(<Card {...MOCK_RESPONSE} />);

        expect(Image).toHaveBeenCalled()
    });

    it('4. Shows seperator when alt is provider', () => {
        const {container} = render(<Card {...MOCK_RESPONSE} />)

        expect(container.querySelector('.card-overlay-seperator')).toBeInTheDocument();
    });

    it('5. Function called on button click', () => {
        const handleChange = jest.fn();

        render(<Card {...MOCK_RESPONSE} handleFavourite={handleChange}/>);

        const button = screen.getByRole('button');

        fireEvent.click(button);

        expect(handleChange).toHaveBeenCalledWith(30824250, true);
    });
});