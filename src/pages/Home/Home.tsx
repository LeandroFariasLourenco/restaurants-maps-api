import React, { useContext, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Logo from '../../assets/logo.svg';
import { MapContext } from '../../core/contexts/MapContext';
import { Modal, Skeleton, Map, Loader, RestaurantCard, ImageCard } from '../../components';

import * as S from './styled';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [placeId, setPlaceId] = useState(null);
  const mapContext = useContext(MapContext);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
  };

  const handleKeyPress = (event) => {
    if (event.key !== 'Enter') return;
    setQuery(inputValue);
  };

  const handleOpenModal = (placeId) => {
    setPlaceId(placeId);
    setModalOpen(true);
  };

  return useObserver(() => (
    <S.Wrapper>
      <S.Container>
        <S.Search>
          <S.Logo src={Logo} alt="Logo do restaurante" />
          <TextField
            label="Pesquisar restaurantes"
            outlined
            onTrailingIconSelect={() => {
              setInputValue('');
              setQuery('');
            }}
            trailingIcon={(
              !inputValue ? <MaterialIcon icon="search" /> : <MaterialIcon icon="close" />
            )}
          >
            <Input
              value={inputValue}
              onKeyPress={handleKeyPress}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            />
          </TextField>
          {mapContext.restaurants.length > 0 ? (
            <>
              <S.CarouselTitle>
                Na sua área
              </S.CarouselTitle>
              <S.Carousel {...settings}>
                {mapContext.restaurants.map((restaurant) => (
                  <ImageCard
                    key={restaurant.place_id}
                    restaurant={restaurant}
                  />
                ))}
              </S.Carousel>
            </>
          ) : <Loader />}
        </S.Search>

        {mapContext.restaurants.map((restaurant) => (
          <RestaurantCard
            restaurant={restaurant}
            onClick={() => handleOpenModal(restaurant.place_id)}
          />
        ))}
      </S.Container>
      <Map
        query={query}
        placeId={placeId}
      />
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        {mapContext.selectedRestaurant ? (
          <>
            <S.ModalTitle>
              {mapContext.selectedRestaurant?.name}
            </S.ModalTitle>
            <S.ModalContent>
              {mapContext.selectedRestaurant?.formatted_phone_number}
            </S.ModalContent>
            <S.ModalContent>
              {mapContext.selectedRestaurant?.formatted_address}
            </S.ModalContent>
            <S.ModalContent>
              {mapContext.selectedRestaurant?.opening_hours?.open_now ? 'Aberto no momento' : 'Fechado no momento :('}
            </S.ModalContent>
          </>
        ) : (
          <>
            <Skeleton width="10px" height="20px" />
            <Skeleton width="10px" height="10px" />
            <Skeleton width="10px" height="10px" />
            <Skeleton width="10px" height="10px" />
          </>
        )}
      </Modal>
    </S.Wrapper>
  ));
};

export default Home;
