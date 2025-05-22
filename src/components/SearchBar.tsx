
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { FilterOptions } from '@/types/restaurant';
import { getCuisines, getPriceRanges } from '@/data/restaurantData';

interface SearchBarProps {
  onSearchChange: (term: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    minRating: 0,
    cuisine: null,
    priceRange: null
  });

  const cuisines = getCuisines();
  const priceRanges = getPriceRanges();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const updateFilters = (partialFilter: Partial<FilterOptions>) => {
    const newFilters = { ...filters, ...partialFilter };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-background sticky top-0 z-10 py-4 border-b border-border shadow-sm animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search restaurants by name or address..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pr-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Hygiene Rating Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  Hygiene: {filters.minRating > 0 ? `${filters.minRating}+` : "Any"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Minimum Hygiene Rating</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">0</span>
                    <span className="text-sm font-medium">{filters.minRating}</span>
                    <span className="text-sm text-muted-foreground">5</span>
                  </div>
                  <Slider 
                    defaultValue={[filters.minRating]}
                    max={5}
                    step={1}
                    onValueChange={(value) => updateFilters({ minRating: value[0] })}
                  />
                </div>
              </PopoverContent>
            </Popover>

            {/* Cuisine Filter */}
            <Select
              value={filters.cuisine || undefined}
              onValueChange={(value) => updateFilters({ cuisine: value || null })}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Cuisine</SelectItem>
                {cuisines.map(cuisine => (
                  <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range Filter */}
            <Select
              value={filters.priceRange || undefined}
              onValueChange={(value) => updateFilters({ priceRange: value || null })}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Price</SelectItem>
                {priceRanges.map(price => (
                  <SelectItem key={price} value={price}>{price}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Reset Filters */}
            <Button
              variant="ghost"
              onClick={() => {
                setFilters({
                  minRating: 0,
                  cuisine: null,
                  priceRange: null
                });
                onFilterChange({
                  minRating: 0,
                  cuisine: null,
                  priceRange: null
                });
              }}
              className="text-sm"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
