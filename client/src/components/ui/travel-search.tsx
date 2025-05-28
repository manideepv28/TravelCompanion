import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPinIcon, SearchIcon } from "lucide-react";

interface TravelSearchProps {
  onSearch: (data: any) => void;
}

export function TravelSearch({ onSearch }: TravelSearchProps) {
  const form = useForm({
    defaultValues: {
      destination: "",
      checkin: "",
      checkout: "",
      travelers: "1",
    },
  });

  const onSubmit = (data: any) => {
    if (!data.destination) {
      return;
    }
    onSearch(data);
  };

  return (
    <Card className="bg-gradient-to-r from-[hsl(var(--travel-blue))] to-blue-600 p-1">
      <CardContent className="bg-white rounded-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          {...field}
                          placeholder="Where do you want to go?" 
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="checkin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check-in</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          {...field}
                          type="date" 
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="checkout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check-out</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          {...field}
                          type="date" 
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <FormField
                control={form.control}
                name="travelers"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-4">
                      <FormLabel>Travelers:</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Adult</SelectItem>
                          <SelectItem value="2">2 Adults</SelectItem>
                          <SelectItem value="3">3 Adults</SelectItem>
                          <SelectItem value="4">4+ Adults</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit"
                className="w-full sm:w-auto bg-[hsl(var(--travel-blue))] hover:bg-blue-600"
              >
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
