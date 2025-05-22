
import React from 'react';
import { Button } from "@/components/ui/button";
import { ModeToggle } from './ModeToggle';

interface HeaderProps {
  onViewToggle: () => void;
  isMapView: boolean;
}

const Header: React.FC<HeaderProps> = ({ onViewToggle, isMapView }) => {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Hygiene Finder</h1>
          <span className="hidden md:inline-block text-muted-foreground text-sm ml-2">Lancaster</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewToggle}
            className="hidden sm:flex"
          >
            {isMapView ? "List View" : "Map View"}
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
