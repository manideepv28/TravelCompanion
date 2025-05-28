import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type TravelOption } from "@/lib/travel-data";

interface ComparisonTableProps {
  options: TravelOption[];
  type: string;
}

export function ComparisonTable({ options, type }: ComparisonTableProps) {
  const renderStars = (rating: number) => {
    return Array(Math.floor(rating)).fill('★').join('');
  };

  const getHeaders = () => {
    const baseHeaders = ['Option', 'Price', 'Rating'];
    
    if (type === 'flight') {
      return [...baseHeaders, 'Duration', 'Airline'];
    } else if (type === 'hotel') {
      return [...baseHeaders, 'Amenities', 'Location'];
    } else if (type === 'activity') {
      return [...baseHeaders, 'Duration', 'Location'];
    }
    
    return baseHeaders;
  };

  const getRowData = (option: TravelOption) => {
    const baseData = [
      {
        key: 'name',
        content: (
          <div>
            <div className="font-medium text-gray-900">
              {option.name || option.airline}
            </div>
            <div className="text-gray-600 text-sm">
              {option.location || (option.departure && option.arrival ? `${option.departure} → ${option.arrival}` : '')}
            </div>
          </div>
        )
      },
      {
        key: 'price',
        content: <span className="text-lg font-bold text-[hsl(var(--travel-blue))]">${option.price}</span>
      },
      {
        key: 'rating',
        content: (
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {renderStars(option.rating)}
            </div>
            <span className="ml-2 text-gray-600">{option.rating}</span>
          </div>
        )
      }
    ];

    if (type === 'flight') {
      baseData.push(
        {
          key: 'duration',
          content: <span className="text-gray-600">{option.duration}</span>
        },
        {
          key: 'airline',
          content: <span className="text-gray-600">{option.airline}</span>
        }
      );
    } else if (type === 'hotel') {
      baseData.push(
        {
          key: 'amenities',
          content: (
            <div className="flex flex-wrap gap-1">
              {option.amenities?.slice(0, 3).map(amenity => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {option.amenities && option.amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{option.amenities.length - 3}
                </Badge>
              )}
            </div>
          )
        },
        {
          key: 'location',
          content: <span className="text-gray-600">{option.location}</span>
        }
      );
    } else if (type === 'activity') {
      baseData.push(
        {
          key: 'duration',
          content: <span className="text-gray-600">{option.duration}</span>
        },
        {
          key: 'location',
          content: <span className="text-gray-600">{option.location}</span>
        }
      );
    }

    return baseData;
  };

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {getHeaders().map(header => (
              <TableHead key={header} className="font-medium text-gray-900">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {options.map((option, index) => {
            const rowData = getRowData(option);
            return (
              <TableRow key={option.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {rowData.map(cell => (
                  <TableCell key={cell.key}>
                    {cell.content}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
