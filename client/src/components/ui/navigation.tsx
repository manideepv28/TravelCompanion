import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { PlaneIcon, SearchIcon, Briefcase, Scale3d, User, LogOut, Menu } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Discover", icon: SearchIcon },
    { path: "/trips", label: "My Trips", icon: Briefcase },
    { path: "/compare", label: "Compare", icon: Scale3d },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <PlaneIcon className="h-8 w-8 text-[hsl(var(--travel-blue))] mr-3" />
            <span className="text-xl font-bold text-gray-900">TravelPlanner</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 ${
                      isActive(item.path) 
                        ? "text-[hsl(var(--travel-blue))]" 
                        : "text-gray-700 hover:text-[hsl(var(--travel-blue))]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/profile">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-gray-700 hover:text-[hsl(var(--travel-blue))]"
                >
                  <div className="w-8 h-8 bg-[hsl(var(--travel-blue))] rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span>{user?.firstName || user?.email || "User"}</span>
                </Button>
              </Link>
              <a href="/api/logout">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                  <LogOut className="h-4 w-4" />
                </Button>
              </a>
            </div>

            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.path} href={item.path}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start ${
                            isActive(item.path) 
                              ? "text-[hsl(var(--travel-blue))]" 
                              : "text-gray-700"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {item.label}
                        </Button>
                      </Link>
                    );
                  })}
                  
                  <hr className="my-4" />
                  
                  <Link href="/profile">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  
                  <a href="/api/logout">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
