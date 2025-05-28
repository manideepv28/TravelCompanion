import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Check } from "lucide-react";
import { type TravelOption } from "@/lib/travel-data";

interface TravelOptionCardProps {
  option: TravelOption;
  isSaved: boolean;
  onSave: () => void;
  onRemove: () => void;
}

export function TravelOptionCard({ option, isSaved, onSave, onRemove }: TravelOptionCardProps) {
  const handleToggleSave = () => {
    if (isSaved) {
      onRemove();
    } else {
      onSave();
    }
  };

  const renderStars = (rating: number) => {
    return Array(Math.floor(rating)).fill('★').join('');
  };

  const renderCardContent = () => {
    if (option.type === 'flight') {
      return (
        <>
          <img src={option.image} alt="Flight" className="w-full h-48 object-cover rounded-t-xl" />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{option.airline}</h4>
                <p className="text-gray-600">{option.departure} → {option.arrival}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[hsl(var(--travel-blue))]">${option.price}</p>
                <p className="text-sm text-gray-500">{option.duration}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {renderStars(option.rating)}
                </div>
                <span className="ml-2 text-gray-600">{option.rating}</span>
              </div>
              <Button
                onClick={handleToggleSave}
                className={`p-2 rounded-full transition-colors ${
                  isSaved 
                    ? 'bg-[hsl(var(--travel-green))] hover:bg-green-600' 
                    : 'bg-gray-200 hover:bg-[hsl(var(--travel-blue))]'
                } text-white`}
                size="sm"
              >
                {isSaved ? <Check className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </>
      );
    } else if (option.type === 'hotel') {
      return (
        <>
          <img src={option.image} alt="Hotel" className="w-full h-48 object-cover rounded-t-xl" />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{option.name}</h4>
                <p className="text-gray-600">{option.location}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[hsl(var(--travel-blue))]">${option.price}</p>
                <p className="text-sm text-gray-500">per night</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {option.amenities?.map(amenity => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {renderStars(option.rating)}
                </div>
                <span className="ml-2 text-gray-600">{option.rating}</span>
              </div>
              <Button
                onClick={handleToggleSave}
                className={`p-2 rounded-full transition-colors ${
                  isSaved 
                    ? 'bg-[hsl(var(--travel-green))] hover:bg-green-600' 
                    : 'bg-gray-200 hover:bg-[hsl(var(--travel-blue))]'
                } text-white`}
                size="sm"
              >
                {isSaved ? <Check className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </>
      );
    } else if (option.type === 'activity') {
      return (
        <>
          <img src={option.image} alt="Activity" className="w-full h-48 object-cover rounded-t-xl" />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{option.name}</h4>
                <p className="text-gray-600">{option.location}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[hsl(var(--travel-blue))]">${option.price}</p>
                <p className="text-sm text-gray-500">{option.duration}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {renderStars(option.rating)}
                </div>
                <span className="ml-2 text-gray-600">{option.rating}</span>
              </div>
              <Button
                onClick={handleToggleSave}
                className={`p-2 rounded-full transition-colors ${
                  isSaved 
                    ? 'bg-[hsl(var(--travel-green))] hover:bg-green-600' 
                    : 'bg-gray-200 hover:bg-[hsl(var(--travel-blue))]'
                } text-white`}
                size="sm"
              >
                {isSaved ? <Check className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {renderCardContent()}
    </Card>
  );
}
