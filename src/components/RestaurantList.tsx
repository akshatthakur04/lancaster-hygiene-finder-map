
import React from 'react';
import { Restaurant } from '@/types/restaurant';
import RestaurantCard from './RestaurantCard';
import { ScrollArea } from "@/components/ui/scroll-area";

interface RestaurantListProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ 
  restaurants, 
  selectedRestaurant, 
  onRestaurantSelect 
}) => {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {restaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40">
            <p className="text-muted-foreground">No restaurants match your filters</p>
          </div>
        ) : (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={onRestaurantSelect}
              isSelected={selectedRestaurant?.id === restaurant.id}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default RestaurantList;
