import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPinIcon, PlaneIcon, SearchIcon, UsersIcon, HotelIcon, MapIcon } from "lucide-react";

export default function Landing() {
  const [destination, setDestination] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [travelers, setTravelers] = useState("1");

  const handleSearch = () => {
    // For landing page, just show a message to sign in
    alert("Please sign in to start searching for travel options!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <PlaneIcon className="h-8 w-8 text-[hsl(var(--travel-blue))] mr-3" />
              <span className="text-xl font-bold text-gray-900">TravelPlanner</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/signin" 
                className="text-[hsl(var(--travel-blue))] hover:text-blue-700 font-medium"
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="bg-[hsl(var(--travel-blue))] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen sm:min-h-[600px] bg-gradient-to-r from-[hsl(var(--travel-blue))] to-blue-600">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-blend-overlay opacity-30" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600')"
          }}
        />
        <div className="relative z-10 flex items-center justify-center min-h-screen sm:min-h-[600px] py-12">
          <div className="text-center text-white max-w-4xl mx-auto px-4 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Discover Your Next Adventure</h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 opacity-90">Find flights, hotels, and activities tailored to your dreams</p>
            
            {/* Search Form */}
            <Card className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl max-w-4xl mx-auto">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                    <Label className="block text-gray-700 text-sm font-medium mb-2">Destination</Label>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                      <Input 
                        type="text" 
                        placeholder="Where do you want to go?" 
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    <Label className="block text-gray-700 text-sm font-medium mb-2">Check-in</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                      <Input 
                        type="date" 
                        value={checkin}
                        onChange={(e) => setCheckin(e.target.value)}
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    <Label className="block text-gray-700 text-sm font-medium mb-2">Check-out</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                      <Input 
                        type="date" 
                        value={checkout}
                        onChange={(e) => setCheckout(e.target.value)}
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-6 sm:mt-8 gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <Label className="text-gray-700 text-sm font-medium">Travelers:</Label>
                    <Select value={travelers} onValueChange={setTravelers}>
                      <SelectTrigger className="w-full sm:w-36 h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Adult</SelectItem>
                        <SelectItem value="2">2 Adults</SelectItem>
                        <SelectItem value="3">3 Adults</SelectItem>
                        <SelectItem value="4">4+ Adults</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={handleSearch}
                    className="w-full sm:w-auto bg-[hsl(var(--travel-blue))] hover:bg-blue-600 h-11 px-8"
                  >
                    <SearchIcon className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Plan Your Perfect Trip</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations, compare options, and save your favorites all in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <CardContent>
              <div className="bg-[hsl(var(--travel-blue))] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Options</h3>
              <p className="text-gray-600">Search and explore flights, hotels, and activities from around the world</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent>
              <div className="bg-[hsl(var(--travel-green))] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HotelIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save & Compare</h3>
              <p className="text-gray-600">Save your favorite options and compare them side-by-side to make the best choice</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent>
              <div className="bg-[hsl(var(--travel-amber))] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plan Your Trip</h3>
              <p className="text-gray-600">Organize your saved options into a comprehensive trip plan</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/signup"
            className="bg-[hsl(var(--travel-blue))] text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}
