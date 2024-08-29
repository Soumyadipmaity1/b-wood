'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FaLocationDot } from "react-icons/fa6";

const LocationSelector = ({ onSelectLocation }) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [locationSelected, setLocationSelected] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!locationSelected) { // Only fetch the live location if no location is selected
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                    const data = await response.json();
                    const city = data.address?.city || data.address?.town || data.address?.village || data.address?.hamlet || ''; // Extract city name
                    setInputValue(city);
                    onSelectLocation(city);
                } catch (error) {
                    console.error("Error fetching current location:", error);
                }
            });
        }

        // Event listener for detecting clicks outside the dropdown
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onSelectLocation, locationSelected]); // Include locationSelected in the dependency array

    useEffect(() => {
        if (inputValue.length > 2) {
            fetchLocations(inputValue);
        } else {
            setShowSuggestions(false);
        }
    }, [inputValue]);

    const fetchLocations = async (query) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`);
            const data = await response.json();
            const locations = data
                .map(item => {
                    const city = item.address?.city || item.address?.town || item.address?.village || item.address?.hamlet || ''; // Extract city name
                    return city;
                })
                .filter(city => city); // Remove empty strings
            setSuggestions(locations);
            setShowSuggestions(locations.length > 0);
        } catch (error) {
            console.error("Error fetching location suggestions:", error);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setLocationSelected(false); // Reset selection state on manual input
    };

    const handleSuggestionClick = (location) => {
        setInputValue(location);
        setShowSuggestions(false);
        setLocationSelected(true); // Mark that a location has been selected
        onSelectLocation(location);
        inputRef.current.blur();
    };

    return (
        <div className="relative" ref={containerRef}> {/* Attach ref to the container */}
            <FaLocationDot className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Select location"
                className="pl-12 w-full bg-gray-200 rounded-lg p-2 outline-none text-black"
                onFocus={() => inputValue.length > 2 && setShowSuggestions(true)}
            />
            {showSuggestions && (
                <ul className="absolute left-0 right-0 text-black bg-white border border-gray-300 rounded-md mt-2 max-h-40 overflow-y-auto z-10">
                    {suggestions.map((location, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(location)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                            {location}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LocationSelector;