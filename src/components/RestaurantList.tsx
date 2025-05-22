
import React from 'react';
import { Restaurant } from '@/types/restaurant';
import RestaurantCard from './RestaurantCard';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface RestaurantListProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onRestaurantSelect: (restaurant: Restaurant) => void;
  isLoading?: boolean;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ 
  restaurants, 
  selectedRestaurant, 
  onRestaurantSelect,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  }

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
