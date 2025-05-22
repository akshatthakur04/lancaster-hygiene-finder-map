
import React from 'react';
import { Restaurant } from '@/types/restaurant';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHygieneColorClass } from '@/data/restaurantData';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => void;
  isSelected: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick, isSelected }) => {
  return (
    <Card 
      className={`transition-all hover:shadow-md cursor-pointer ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onClick={() => onClick(restaurant)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{restaurant.name}</CardTitle>
            <CardDescription className="line-clamp-1">{restaurant.address}, {restaurant.city}</CardDescription>
          </div>
          <div className={`${getHygieneColorClass(restaurant.hygieneRating)} text-white font-bold rounded-full w-8 h-8 flex items-center justify-center`}>
            {restaurant.hygieneRating}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline">{restaurant.cuisine}</Badge>
          <Badge variant="outline">{restaurant.priceRange}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{restaurant.description}</p>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground">
        <div className="w-full flex justify-between items-center">
          <span>Last inspection: {new Date(restaurant.lastInspection).toLocaleDateString()}</span>
          <Button variant="ghost" size="sm">Details</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
