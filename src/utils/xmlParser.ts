
/**
 * Utility functions for parsing XML data for restaurant information
 */

import { Restaurant } from "@/types/restaurant";

/**
 * Parse XML string data into Restaurant objects
 */
export const parseRestaurantXml = (xmlString: string): Restaurant[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  const restaurantNodes = xmlDoc.getElementsByTagName("restaurant");
  
  const restaurants: Restaurant[] = [];
  
  for (let i = 0; i < restaurantNodes.length; i++) {
    const node = restaurantNodes[i];
    
    // Get basic restaurant data
    const id = node.getAttribute("id") || `xml-${i}`;
    const name = getElementTextContent(node, "name");
    const address = getElementTextContent(node, "address");
    const city = getElementTextContent(node, "city") || "Lancaster";
    const postcode = getElementTextContent(node, "postcode");
    
    // Get coordinates
    const latitude = parseFloat(getElementTextContent(node, "latitude") || "0");
    const longitude = parseFloat(getElementTextContent(node, "longitude") || "0");
    
    // Get hygiene information
    const hygieneRating = parseInt(getElementTextContent(node, "hygiene_rating") || "0", 10);
    const lastInspection = getElementTextContent(node, "last_inspection") || new Date().toISOString().split('T')[0];
    
    // Get other details
    const cuisine = getElementTextContent(node, "cuisine") || "Other";
    const priceRange = getElementTextContent(node, "price_range") || "££";
    const description = getElementTextContent(node, "description") || "";
    const phone = getElementTextContent(node, "phone");
    const website = getElementTextContent(node, "website");
    
    // Parse opening hours if available
    const openingHoursNode = node.getElementsByTagName("opening_hours")[0];
    let openingHours: {[day: string]: string} | undefined;
    
    if (openingHoursNode) {
      openingHours = {};
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      days.forEach(day => {
        const dayNode = openingHoursNode.getElementsByTagName(day.toLowerCase())[0];
        if (dayNode) {
          openingHours![day] = dayNode.textContent || "Closed";
        }
      });
    }
    
    // Parse reviews if available
    const reviewsNode = node.getElementsByTagName("reviews")[0];
    let reviews = undefined;
    
    if (reviewsNode) {
      const reviewNodes = reviewsNode.getElementsByTagName("review");
      if (reviewNodes.length > 0) {
        reviews = [];
        for (let j = 0; j < reviewNodes.length; j++) {
          const reviewNode = reviewNodes[j];
          reviews.push({
            id: `review-${id}-${j}`,
            userName: getElementTextContent(reviewNode, "user_name") || "Anonymous",
            rating: parseFloat(getElementTextContent(reviewNode, "rating") || "3"),
            comment: getElementTextContent(reviewNode, "comment") || "",
            date: getElementTextContent(reviewNode, "date") || new Date().toISOString().split('T')[0]
          });
        }
      }
    }
    
    // Create restaurant object
    const restaurant: Restaurant = {
      id,
      name,
      address,
      city,
      postcode,
      latitude,
      longitude,
      hygieneRating,
      lastInspection,
      cuisine,
      priceRange,
      description,
      ...(phone && { phone }),
      ...(website && { website }),
      ...(openingHours && { openingHours }),
      ...(reviews && { reviews })
    };
    
    restaurants.push(restaurant);
  }
  
  return restaurants;
};

/**
 * Helper function to get text content from a child element
 */
const getElementTextContent = (parentNode: Element, tagName: string): string | undefined => {
  const element = parentNode.getElementsByTagName(tagName)[0];
  return element ? element.textContent || undefined : undefined;
};

/**
 * Load XML file and parse it
 */
export const loadRestaurantsFromXml = async (xmlFilePath: string): Promise<Restaurant[]> => {
  try {
    const response = await fetch(xmlFilePath);
    const xmlText = await response.text();
    return parseRestaurantXml(xmlText);
  } catch (error) {
    console.error("Error loading XML restaurant data:", error);
    return [];
  }
};
