import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

import restaurantPlaceholder from '../../assets/restaurante-fake.png';

import Skeleton from '../Skeleton/Skeleton';

import * as S from './styled';

const RestaurantCard = ({
  restaurant,
  onClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <S.Restaurant
      onClick={onClick}
    >
      <S.RestaurantInfo>
        <S.Title>{restaurant.name}</S.Title>
        <ReactStars
          count={5}
          value={restaurant.rating}
          isHalf
          activeColor="#e7711c"
          edit={false} />
        <S.Address>{restaurant.formatted_address || restaurant.vicinity}</S.Address>
      </S.RestaurantInfo>
      <S.RestaurantImage
        src={restaurant.photos ? restaurant.photos[0].getUrl() : restaurantPlaceholder}
        alt="Foto do restaurante"
        onLoad={() => setImageLoaded(true)}
        imageLoaded={imageLoaded}
      />
      {!imageLoaded && <Skeleton width="100px" height="100px" />}
    </S.Restaurant>
  );
};

export default RestaurantCard;
