/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../Image';

describe('App infinite scrolling component test', () => {
    it('1. Displays image with alt', () => {
        const mockResponse = {
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
        };

        render(<Image {...mockResponse} />);

        const image = screen.getByRole('img');

        expect(image.alt).toContain("Two seals playing on the rocky shoreline of San Diego, California, captured in black and white.");
    });
});