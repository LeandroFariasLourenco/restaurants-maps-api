import React, { useEffect, useState } from 'react';
import * as S from './styled';
import Skeleton from '../Skeleton/Skeleton';

import placeholderRestaurant from '../../assets/restaurante-fake.png';

const ImageCard = ({
  restaurant,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const image = restaurant.photos ? restaurant.photos[0].getUrl() : placeholderRestaurant;

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = image;
    imageLoader.onload = () => setImageLoaded(true);
  }, [restaurant.photo, image]);

  return (
    <>
      {imageLoaded ? (
        <S.Card photo={image}>
          <S.Title>{restaurant.name}</S.Title>
        </S.Card>
      ) : <Skeleton width="90px" height="90px" />}
    </>
  );
};

export default ImageCard;
