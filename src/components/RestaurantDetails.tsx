
import React from 'react';
import { Restaurant } from '@/types/restaurant';
import { getHygieneColorClass } from '@/data/restaurantData';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface RestaurantDetailsProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ restaurant, isOpen, onClose }) => {
  if (!restaurant) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle>{restaurant.name}</SheetTitle>
              <SheetDescription className="mt-1">
                {restaurant.address}, {restaurant.city}, {restaurant.postcode}
              </SheetDescription>
            </div>
            <div className={`${getHygieneColorClass(restaurant.hygieneRating)} text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg`}>
              {restaurant.hygieneRating}
            </div>
          </div>
        </SheetHeader>
        
        <div className="py-4 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Cuisine & Price</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{restaurant.cuisine}</Badge>
              <Badge variant="outline">{restaurant.priceRange}</Badge>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
            <p className="text-sm">{restaurant.description}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Hygiene Information</h3>
            <div className="text-sm">
              <p><span className="font-medium">Food Hygiene Rating:</span> {restaurant.hygieneRating}/5</p>
              <p><span className="font-medium">Last Inspection Date:</span> {new Date(restaurant.lastInspection).toLocaleDateString()}</p>
            </div>
          </div>
          
          {restaurant.openingHours && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Opening Hours</h3>
              <div className="text-sm grid grid-cols-2 gap-x-4 gap-y-1">
                {Object.entries(restaurant.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="font-medium">{day}:</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
            <div className="text-sm space-y-1">
              {restaurant.phone && <p><span className="font-medium">Phone:</span> {restaurant.phone}</p>}
              {restaurant.website && (
                <p>
                  <span className="font-medium">Website:</span>{" "}
                  <a 
                    href={restaurant.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Visit Website
                  </a>
                </p>
              )}
            </div>
          </div>
          
          {restaurant.reviews && restaurant.reviews.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Customer Reviews</h3>
              <div className="space-y-3">
                {restaurant.reviews.map(review => (
                  <Card key={review.id}>
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{review.userName}</h4>
                        <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <div className="mt-1 text-sm flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < Math.round(review.rating) ? 'text-yellow-500' : 'text-muted'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm">{review.rating}/5</span>
                      </div>
                      <p className="mt-2 text-sm">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex gap-3 justify-end">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          
          {restaurant.latitude && restaurant.longitude && (
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default">Directions</Button>
            </a>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RestaurantDetails;
