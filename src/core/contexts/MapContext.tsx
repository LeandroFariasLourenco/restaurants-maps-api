import { useLocalStore } from 'mobx-react-lite';
import React, { createContext } from 'react';

const initialStore = {
  restaurants: [],
  setRestaurants(restaurants) {
    this.restaurants = restaurants;
  },
  selectedRestaurant: null,
  setSelectedRestaurant(restaurant) {
    this.selectedRestaurant = restaurant;
  },
};

export const MapContext = createContext(initialStore);

const MapProvider = ({
  children,
}) => {
  const mapLocalStore = useLocalStore(() => initialStore);

  return (
    <MapContext.Provider value={mapLocalStore}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
