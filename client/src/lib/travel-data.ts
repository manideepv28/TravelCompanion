export interface TravelOption {
  id: string;
  type: 'flight' | 'hotel' | 'activity';
  name?: string;
  airline?: string;
  departure?: string;
  arrival?: string;
  location?: string;
  price: number;
  duration?: string;
  rating: number;
  amenities?: string[];
  image: string;
}

export const mockFlights: TravelOption[] = [
  {
    id: 'flight1',
    type: 'flight',
    airline: 'SkyWings',
    departure: 'New York (JFK)',
    arrival: 'Paris (CDG)',
    price: 599,
    duration: '7h 30m',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'
  },
  {
    id: 'flight2',
    type: 'flight',
    airline: 'AirGlobal',
    departure: 'New York (JFK)',
    arrival: 'Paris (CDG)',
    price: 649,
    duration: '8h 15m',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1556388158-158dc0cd181c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'
  },
  {
    id: 'flight3',
    type: 'flight',
    airline: 'EuroJet',
    departure: 'New York (JFK)',
    arrival: 'Paris (CDG)',
    price: 575,
    duration: '7h 45m',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1544031897-6bf37807e2fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'
  }
];

export const mockHotels: TravelOption[] = [
  {
    id: 'hotel1',
    type: 'hotel',
    name: 'Le Grand Hotel',
    location: 'Paris, France',
    price: 250,
    rating: 4.8,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'
  },
  {
    id: 'hotel2',
    type: 'hotel',
    name: 'Hotel Moderne',
    location: 'Paris, France',
    price: 180,
    rating: 4.3,
    amenities: ['WiFi', 'Gym', 'Restaurant'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'
  },
  {
    id: 'hotel3',
    type: 'hotel',
    name: 'Boutique Paris',
    location: 'Paris, France',
    price: 320,
    rating: 4.6,
    amenities: ['WiFi', 'Concierge', 'Bar', 'Room Service'],
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'
  },
  {
    id: 'hotel4',
    type: 'hotel',
    name: 'Paris Palace',
    location: 'Paris, France',
    price: 450,
    rating: 4.9,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Valet', 'Butler'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'
  }
];

export const mockActivities: TravelOption[] = [
  {
    id: 'activity1',
    type: 'activity',
    name: 'Eiffel Tower Tour',
    location: 'Paris, France',
    price: 45,
    duration: '2 hours',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1471623432079-b009d30b6729?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'
  },
  {
    id: 'activity2',
    type: 'activity',
    name: 'Seine River Cruise',
    location: 'Paris, France',
    price: 35,
    duration: '1.5 hours',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'
  },
  {
    id: 'activity3',
    type: 'activity',
    name: 'Louvre Museum Visit',
    location: 'Paris, France',
    price: 25,
    duration: '3 hours',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'
  },
  {
    id: 'activity4',
    type: 'activity',
    name: 'Montmartre Walking Tour',
    location: 'Paris, France',
    price: 30,
    duration: '2.5 hours',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'
  }
];
