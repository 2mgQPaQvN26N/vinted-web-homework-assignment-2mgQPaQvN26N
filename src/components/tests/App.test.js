/* eslint-disable */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from '../App';
import { mockIntersectionObserver } from './__mocks__/IntersectionObserverMock'

const MOCK_RESPONSE = {
    next_page: 1,
    page: 1,
    per_page: 42,
    photos: [
        {
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
        {
            id: 30824251,
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
        }
    ],
    total_results: 8000
};
describe('App infinite scrolling component test', () => {
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(MOCK_RESPONSE)
    });

    beforeEach(() => {
        jest.spyOn(console, "error")
        console.error.mockImplementation(() => {})
    })

    afterEach(() => {
        console.error.mockRestore()
    })

    it('1. Fetch data on render', async () => {
        const [intersectionObserver] = mockIntersectionObserver([true]);
        render(<App />);
        expect(intersectionObserver.observe).toHaveBeenCalled();

        const spy = jest.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith(
                "https://api.pexels.com/v1/curated?page=1&per_page=42",
                {"headers": {"Authorization": "Rt7WjaXUmFUHNRaO9pBCv2ootPuNwZMjUtyxnrdUAYcRw9y86jkX4wJX"}, "method": "GET"}
            );
        });
    });

    it('2. Return error if response not ok', async () => {
        const newError = new Error("Network error");
        const [intersectionObserver] = mockIntersectionObserver([true]);

        global.fetch = jest.fn().mockRejectedValue(
            newError
        );
        render(<App />);

        const logSpy = jest.spyOn(global.console, 'error');

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalled();
            expect(logSpy).toHaveBeenCalledWith( "Error:", newError);
        });
    });
});