
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import RestaurantMap from '@/components/RestaurantMap';
import RestaurantList from '@/components/RestaurantList';
import RestaurantDetails from '@/components/RestaurantDetails';
import Footer from '@/components/Footer';
import { restaurants, loadRestaurantsData } from '@/data/restaurantData';
import { Restaurant, FilterOptions } from '@/types/restaurant';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
  const [isMapView, setIsMapView] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    minRating: 0,
    cuisine: null,
    priceRange: null
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load XML data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await loadRestaurantsData("/restaurants.xml");
        setFilteredRestaurants(restaurants);
        toast({
          title: "Data Loaded",
          description: `Loaded ${restaurants.length} restaurants from data source`,
        });
      } catch (error) {
        console.error("Failed to load restaurant data:", error);
        toast({
          title: "Data Load Error",
          description: "Failed to load restaurant data. Using default data instead.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Apply filters when search term or filters change
  useEffect(() => {
    const filtered = restaurants.filter(restaurant => {
      // Search term filter
      const matchesSearch = searchTerm === "" || 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (restaurant.description && restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Hygiene rating filter
      const matchesRating = restaurant.hygieneRating >= filters.minRating;
      
      // Cuisine filter
      const matchesCuisine = !filters.cuisine || restaurant.cuisine === filters.cuisine;
      
      // Price range filter
      const matchesPrice = !filters.priceRange || restaurant.priceRange === filters.priceRange;
      
      return matchesSearch && matchesRating && matchesCuisine && matchesPrice;
    });
    
    setFilteredRestaurants(filtered);
  }, [searchTerm, filters]);

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const toggleView = () => {
    setIsMapView(!isMapView);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onViewToggle={toggleView} isMapView={isMapView} />
      
      <main className="flex-1 flex flex-col">
        <SearchBar 
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
        />
        
        <div className="flex-1 overflow-hidden">
          {isMapView ? (
            <RestaurantMap 
              restaurants={filteredRestaurants}
              selectedRestaurant={selectedRestaurant}
              onRestaurantSelect={handleRestaurantSelect}
              isLoading={isLoading}
            />
          ) : (
            <RestaurantList 
              restaurants={filteredRestaurants}
              selectedRestaurant={selectedRestaurant}
              onRestaurantSelect={handleRestaurantSelect}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>
      
      <Footer />
      
      <RestaurantDetails 
        restaurant={selectedRestaurant}
        isOpen={isDetailsOpen}
        onClose={handleDetailsClose}
      />
    </div>
  );
};

export default Index;
