import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navigation } from "@/components/ui/navigation";
import { TravelSearch } from "@/components/ui/travel-search";
import { TravelOptionCard } from "@/components/ui/travel-option-card";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, Briefcase, Scale3d } from "lucide-react";
import { mockFlights, mockHotels, mockActivities, type TravelOption } from "@/lib/travel-data";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [activeTab, setActiveTab] = useState("search");
  const [searchResults, setSearchResults] = useState<TravelOption[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Fetch saved options
  const { data: savedOptions = [], isLoading: loadingSaved } = useQuery({
    queryKey: ["/api/saved-options"],
  });

  // Save option mutation
  const saveOptionMutation = useMutation({
    mutationFn: async (option: TravelOption) => {
      return apiRequest("POST", "/api/saved-options", {
        optionId: option.id,
        optionType: option.type,
        optionData: option,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-options"] });
      toast({ title: "Added to trip plan" });
    },
    onError: () => {
      toast({ title: "Failed to save option", variant: "destructive" });
    },
  });

  // Remove option mutation
  const removeOptionMutation = useMutation({
    mutationFn: async (optionId: string) => {
      return apiRequest("DELETE", `/api/saved-options/${optionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-options"] });
      toast({ title: "Removed from trip plan" });
    },
    onError: () => {
      toast({ title: "Failed to remove option", variant: "destructive" });
    },
  });

  const handleSearch = async (searchData: any) => {
    setIsSearching(true);
    setActiveTab("search");

    // Simulate API delay
    setTimeout(() => {
      const allOptions = [...mockFlights, ...mockHotels, ...mockActivities];
      setSearchResults(allOptions);
      setIsSearching(false);
      toast({ title: "Search completed!" });
    }, 2000);

    // Save search history
    try {
      await apiRequest("POST", "/api/search-history", searchData);
    } catch (error) {
      console.error("Failed to save search history:", error);
    }
  };

  const handleSaveOption = (option: TravelOption) => {
    saveOptionMutation.mutate(option);
  };

  const handleRemoveOption = (optionId: string) => {
    removeOptionMutation.mutate(optionId);
  };

  const isSaved = (optionId: string) => {
    return savedOptions.some((saved: any) => saved.optionId === optionId);
  };

  const getSavedOptionsByType = (type: string) => {
    return savedOptions
      .filter((saved: any) => saved.optionType === type)
      .map((saved: any) => saved.optionData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">
              <SearchIcon className="h-4 w-4 mr-2" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="trips">
              <Briefcase className="h-4 w-4 mr-2" />
              My Trips
            </TabsTrigger>
            <TabsTrigger value="compare">
              <Scale3d className="h-4 w-4 mr-2" />
              Compare
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-8">
            <TravelSearch onSearch={handleSearch} />
            
            {isSearching && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--travel-blue))] mx-auto mb-4"></div>
                <p className="text-gray-600">Finding amazing deals for you...</p>
              </div>
            )}

            {searchResults.length > 0 && !isSearching && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Flights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults
                      .filter(option => option.type === 'flight')
                      .map(option => (
                        <TravelOptionCard
                          key={option.id}
                          option={option}
                          isSaved={isSaved(option.id)}
                          onSave={() => handleSaveOption(option)}
                          onRemove={() => handleRemoveOption(option.id)}
                        />
                      ))
                    }
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Hotels</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults
                      .filter(option => option.type === 'hotel')
                      .map(option => (
                        <TravelOptionCard
                          key={option.id}
                          option={option}
                          isSaved={isSaved(option.id)}
                          onSave={() => handleSaveOption(option)}
                          onRemove={() => handleRemoveOption(option.id)}
                        />
                      ))
                    }
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Activities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults
                      .filter(option => option.type === 'activity')
                      .map(option => (
                        <TravelOptionCard
                          key={option.id}
                          option={option}
                          isSaved={isSaved(option.id)}
                          onSave={() => handleSaveOption(option)}
                          onRemove={() => handleRemoveOption(option.id)}
                        />
                      ))
                    }
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trips" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">My Trip Plans</h2>
              <p className="text-gray-600">Manage your saved travel options and create the perfect itinerary</p>
            </div>

            {loadingSaved && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--travel-blue))] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your trips...</p>
              </div>
            )}

            {!loadingSaved && savedOptions.length === 0 && (
              <div className="text-center py-16">
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No trips planned yet</h3>
                <p className="text-gray-500 mb-6">Start discovering amazing destinations and save your favorites</p>
                <Button onClick={() => setActiveTab('search')} className="bg-[hsl(var(--travel-blue))] hover:bg-blue-600">
                  Start Planning
                </Button>
              </div>
            )}

            {!loadingSaved && savedOptions.length > 0 && (
              <div className="space-y-8">
                {['flight', 'hotel', 'activity'].map(type => {
                  const typeOptions = getSavedOptionsByType(type);
                  if (typeOptions.length === 0) return null;

                  return (
                    <div key={type}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 capitalize">{type}s</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {typeOptions.map((option: TravelOption) => (
                          <Card key={option.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {option.name || option.airline}
                                  </h4>
                                  <p className="text-gray-600 text-sm">
                                    {option.location || `${option.departure} → ${option.arrival}`}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveOption(option.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  ×
                                </Button>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-[hsl(var(--travel-blue))]">
                                  ${option.price}
                                </span>
                                <div className="flex items-center">
                                  <div className="flex text-yellow-400 text-sm">
                                    {Array(Math.floor(option.rating)).fill('★').join('')}
                                  </div>
                                  <span className="ml-1 text-gray-600 text-sm">{option.rating}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="compare" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Options</h2>
              <p className="text-gray-600">Side-by-side comparison of your saved travel options</p>
            </div>

            {savedOptions.length < 2 && (
              <div className="text-center py-16">
                <Scale3d className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">Not enough options to compare</h3>
                <p className="text-gray-500 mb-6">Save at least 2 options to start comparing</p>
                <Button onClick={() => setActiveTab('search')} className="bg-[hsl(var(--travel-blue))] hover:bg-blue-600">
                  Discover Options
                </Button>
              </div>
            )}

            {savedOptions.length >= 2 && (
              <div className="space-y-12">
                {['flight', 'hotel', 'activity'].map(type => {
                  const typeOptions = getSavedOptionsByType(type);
                  if (typeOptions.length < 2) return null;

                  return (
                    <div key={type}>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6 capitalize">
                        {type}s Comparison
                      </h3>
                      <ComparisonTable options={typeOptions} type={type} />
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
