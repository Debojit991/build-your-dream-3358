import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, MapPin, Target, ChevronDown, ChevronUp, Map, Building2, Building, LocateFixed } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const POPULAR_CITIES = [
  { name: "Kolkata", icon: Building2 },
  { name: "Mumbai", icon: Building },
  { name: "Bengaluru", icon: Map },
];

const OTHER_CITIES = [
  "Ahmedabad",
  "Chandigarh",
  "Chennai",
  "Delhi-NCR",
  "Hyderabad",
  "Indore",
  "Jaipur",
  "Lucknow",
  "Pune",
].sort();

interface RegionSelectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegionSelectModal({ open, onOpenChange }: RegionSelectModalProps) {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleSelectRegion = (region: string) => {
    if (region !== "Kolkata") {
      toast.info("We are still expanding our services here!");
      return;
    }
    localStorage.setItem("userRegion", region);
    onOpenChange(false);
    toast.success(`Region set to ${region}`);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        // For demonstration, we'll mock that they are in Kolkata
        handleSelectRegion("Kolkata");
      },
      (error) => {
        setIsLocating(false);
        let errorMsg = "Unable to retrieve your location";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Location permission was denied";
        }
        toast.error(errorMsg);
      }
    );
  };

  const filteredOtherCities = OTHER_CITIES.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header & Search */}
          <div className="p-6 pb-4 border-b">
            <Dialog.Title className="text-xl font-display font-bold text-slate-900 text-center mb-4">
              Where are you looking for a flat?
            </Dialog.Title>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for your city"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all text-[15px]"
              />
            </div>
          </div>

          <div className="p-6 overflow-y-auto no-scrollbar">
            {/* Detect Location */}
            <button
              onClick={detectLocation}
              disabled={isLocating}
              className="w-full flex items-center justify-center gap-2 py-3.5 mb-6 bg-coral/10 hover:bg-coral/15 text-coral rounded-xl font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <LocateFixed className={cn("h-5 w-5", isLocating && "animate-pulse")} />
              {isLocating ? "Detecting..." : "Detect my location"}
            </button>

            {/* Popular Cities */}
            {search === "" && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Popular Cities
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {POPULAR_CITIES.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => handleSelectRegion(city.name)}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-xl transition-all group",
                        city.name === "Kolkata" 
                          ? "hover:border-coral hover:bg-coral/5 cursor-pointer" 
                          : "opacity-60 cursor-not-allowed hover:bg-slate-50"
                      )}
                    >
                      <city.icon className={cn("h-8 w-8 mb-2 transition-colors stroke-1", city.name === "Kolkata" ? "text-slate-400 group-hover:text-coral" : "text-slate-400")} />
                      <span className={cn("text-[13px] font-medium", city.name === "Kolkata" ? "text-slate-700 group-hover:text-slate-900" : "text-slate-500")}>
                        {city.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Other Cities */}
            {(showAll || search !== "") && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Other Cities
                </h3>
                {filteredOtherCities.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                    {filteredOtherCities.map((city) => (
                      <button
                        key={city}
                        onClick={() => handleSelectRegion(city)}
                        className={cn(
                          "text-left py-2 px-3 text-[14px] rounded-lg transition-colors",
                          city === "Kolkata" 
                            ? "text-slate-600 hover:text-coral hover:bg-coral/5 cursor-pointer" 
                            : "text-slate-400 cursor-not-allowed hover:bg-slate-50 opacity-60"
                        )}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-sm text-slate-500 py-4">
                    No cities found matching "{search}"
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Toggle Footer */}
          {search === "" && (
            <div className="p-4 border-t bg-slate-50">
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-2"
              >
                {showAll ? (
                  <>
                    Hide all cities <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    View All Cities <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
