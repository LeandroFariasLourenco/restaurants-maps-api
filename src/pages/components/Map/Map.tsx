import React, { useCallback, useContext, useEffect, useState } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { useObserver } from 'mobx-react-lite';
import { MapContext } from '../../core/contexts/MapContext';

const MapContainer = ({
  google,
  query,
  placeId,
  ...props
}) => {
  const [map, setMap] = useState(null);
  const mapContext = useContext(MapContext);

  const searchNearby = (map, center) => {
    const service = new google.maps.places.PlacesService(map);
    mapContext.setRestaurants([]);

    service.nearbySearch({
      location: center,
      radius: '20000',
      type: ['restaurant'],
    }, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) return;
      mapContext.setRestaurants(results);
    });
  };

  const onMapReady = (_, map) => {
    setMap(map);
    searchNearby(map, map.center);
  };

  const getRestaurantsById = useCallback(() => {
    const service = new google.maps.places.PlacesService(map);
    mapContext.setSelectedRestaurant(null);

    service.getDetails({
      placeId,
      fields: [
        'name',
        'formatted_address',
        'formatted_phone_number',
        'opening_hours',
      ],
    }, (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) return;
      mapContext.setSelectedRestaurant(place);
    });
  }, [google, map, placeId, mapContext]);

  const searchByQuery = useCallback((query) => {
    const service = new google.maps.places.PlacesService(map);
    mapContext.setRestaurants([]);

    service.textSearch({
      location: map.center,
      radius: '20000',
      type: ['restaurant'],
      query,
    }, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) return;
      mapContext.setRestaurants(results);
    });
  }, [google, map, mapContext]);

  useEffect(() => {
    if (!query) return;

    searchByQuery(query);
  }, [query, searchByQuery]);

  useEffect(() => {
    if (!placeId) return;

    getRestaurantsById();
  }, [placeId, getRestaurantsById]);

  return (
    <Map
      google={google}
      centerAroundCurrentLocation
      onReady={onMapReady}
      onRecenter={onMapReady}
      {...props}
    >
      {useObserver(() => (
        mapContext.restaurants.map((restaurant) => (
          <Marker
            key={restaurant.place_id}
            name={restaurant.name}
            position={{
              lat: restaurant.geometry.location.lat(),
              lng: restaurant.geometry.location.lng(),
            }}
          />
        ))
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: 'pt-BR',
})(MapContainer);
