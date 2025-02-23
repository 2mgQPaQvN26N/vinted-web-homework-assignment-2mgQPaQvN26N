import React from 'react';
import { useState, useEffect, useRef, useCallback } from "react";
import Card from './Card';
import { ImageT } from './Image';
import Container from "./Container";

import '../assets/scss/base.scss';
import '../assets/scss/reset.scss';

const API_URL = 'https://api.pexels.com';
const KEY = 'Rt7WjaXUmFUHNRaO9pBCv2ootPuNwZMjUtyxnrdUAYcRw9y86jkX4wJX';
const STORAGE_KEY = 'likedImages';

const App = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [data, setData] = useState<ImageT[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [likedImages, setLikedImages] = useState<number[]>([]);
    const loaderRef = useRef(null);

    const curatedApi = `${API_URL}/v1/curated?page=${currentPage}&per_page=42`;
    const options = {
      method: 'GET',
      headers: {
          Authorization: KEY
      }
    };

    const getApiResponse = async () => {
        const response = await fetch(curatedApi, options);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    };

    const updateLikedPhotos = (photos: ImageT[]) => {
        return photos.map((item) => {
            item.liked = likedImages.some((id) => {
                return item.id === id;
            });

            return item;
        });
    };

    const handleFavourite = (id: number, isAdd: boolean) => {
        setData((prevData) => {
            let newData = [...prevData];

            newData = newData.map((item: ImageT) => {
                if(item.id === id) {
                    item.liked = !item.liked;
                }

                return item;
            });

            return newData;
        });
        setLikedImages((prevState) => {
            let newState = [...prevState];

            if (isAdd) {
                newState = [...newState, id];
            } else {
                newState = newState.filter((item) => {
                    return item !== id;
                })
            }

            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

            return newState;
        });
    }

    const fetchData = useCallback(async () => {
        if (isLoading) {
            return;
        }

        try {
            setIsLoading(true);
            const responseData = await getApiResponse();

            setCurrentPage((prevIndex) => prevIndex + 1);
            setData((prevState) => {
                let newData = prevState ? [...prevState, ...responseData.photos] : [...responseData.photos];

                newData = updateLikedPhotos(newData);

                return newData;
            });
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    }, [currentPage, isLoading, likedImages]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];

            if (target.isIntersecting) {
                fetchData();
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [fetchData]);

    useEffect(() => {
        const likedPhotos = JSON.parse(window.localStorage.getItem(STORAGE_KEY) as string);

        setLikedImages(likedPhotos);
    }, []);

    return (
        <>
            <Container children={
                data && data.map((item: ImageT) => {
                    return <Card key={item.id} className='container-item' image={item} handleFavourite={handleFavourite}/>;
                })
            } />
            <div ref={loaderRef} />
        </>
    );
};

export default App;