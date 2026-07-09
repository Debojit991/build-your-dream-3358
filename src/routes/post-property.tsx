import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState, useEffect } from "react";
import { Camera, Check, ChevronLeft, MapPin, X } from "lucide-react";
import { toast } from "sonner";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

export const Route = createFileRoute("/post-property")({
  head: () => ({ meta: [{ title: "Post a Property — Rento Flats" }] }),
  component: PostProperty,
});

const STEPS = ["Basic Specs", "Preferences", "Amenities", "Media"];

const AMENITIES_LIST = [
  "Parking", "Lift", "Power Backup", "Park", "Gated Society",
  "Gymnasium", "Vaastu Compliant", "Club house", "Swimming", "Guard",
  "Gas Pipeline", "With Roof Rights", "24/7 Security", "Private Lift",
  "Pets Allowed", "AC Room", "Wheelchair Friendly", "Food Service",
  "Wifi", "Laundry Available"
];

function PostProperty() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Form State (Schema Matched)
  const [propertyType, setPropertyType] = useState<"Flat" | "PG" | "Independent House">("Flat");
  const [roomConfig, setRoomConfig] = useState("1 BHK");
  const [rooms, setRooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [areaSqFt, setAreaSqFt] = useState<string>("");
  const [propertyAge, setPropertyAge] = useState("0-1 years old");
  
  const [availableFor, setAvailableFor] = useState<string[]>([]);
  const [furnishingStatus, setFurnishingStatus] = useState("Semi-Furnished");
  const [availableFrom, setAvailableFrom] = useState("Any Time");
  
  const [amenities, setAmenities] = useState<string[]>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  const handleNext = () => {
    // Validation for Tab 1
    if (step === 0) {
      if (!propertyType || !roomConfig || !rooms || !bathrooms || !areaSqFt || !propertyAge) {
        return toast.error("Please fill all mandatory basic specifications.");
      }
    }
    // Validation for Tab 2
    if (step === 1) {
      if (availableFor.length === 0 || !furnishingStatus || !availableFrom) {
        return toast.error("Please provide tenant preferences and availability.");
      }
    }
    setStep(step + 1);
  };

  const handlePublish = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to post a property.");
      return;
    }

    if (mediaUrls.length === 0) {
      // In a real app, we'd enforce this, but for now we'll mock if empty
      // toast.error("Please upload at least 1 photo.");
      // return;
    }

    setSaving(true);
    try {
      const payload = {
        listerId: currentUser.uid,
        propertyType,
        rooms: Number(rooms),
        bathrooms: Number(bathrooms),
        areaSqFt: Number(areaSqFt),
        propertyAge,
        availableFor,
        furnishingStatus,
        availableFrom,
        amenities,
        mediaUrls: mediaUrls.length > 0 ? mediaUrls : ["https://placehold.co/600x400?text=Mock+Image"],
        createdAt: serverTimestamp(),
        status: "pending_verification"
      };

      const newDocRef = doc(collection(db, "properties"));
      await setDoc(newDocRef, payload);

      toast.success("Property published successfully and is pending verification!");
      nav({ to: "/home" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish property.");
    } finally {
      setSaving(false);
    }
  };

  const toggleAmenity = (a: string) => {
    if (amenities.includes(a)) {
      setAmenities(amenities.filter((i) => i !== a));
    } else {
      setAmenities([...amenities, a]);
    }
  };

  const toggleAvailableFor = (a: string) => {
    if (availableFor.includes(a)) {
      setAvailableFor(availableFor.filter((i) => i !== a));
    } else {
      setAvailableFor([...availableFor, a]);
    }
  };

  const handleMockUpload = () => {
    // Simulate image upload
    const mockUrl = `https://placehold.co/600x400?text=Property+Image+${mediaUrls.length + 1}`;
    setMediaUrls([...mediaUrls, mockUrl]);
  };

  const removeMedia = (index: number) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index));
  };

  return (
    <AppShell title="Post a property">
      <div className="max-w-3xl mx-auto pb-24">
        <div className="flex items-center gap-2 mb-1">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="-ml-2 h-9 w-9 grid place-items-center rounded-full hover:bg-cloud transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <span className="text-xs font-semibold text-slate-text uppercase tracking-wider">
            Step {step + 1} of {STEPS.length} · {STEPS[step]}
          </span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-8">
          <div className="h-full bg-indigo-600 transition-all duration-300 ease-in-out" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>

        {/* STEP 0: Basic Specs */}
        {step === 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Basic Specifications</h1>
            
            <div>
              <p className="text-sm font-semibold mb-3 text-slate-700">Property Type</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(["Flat", "PG", "Independent House"] as const).map((t) => (
                  <button key={t} onClick={() => setPropertyType(t)} className={`rounded-xl border p-4 font-medium transition-all duration-200 ${propertyType === t ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm" : "bg-white hover:border-indigo-300 hover:bg-slate-50 text-slate-600"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 text-slate-700">Room Configuration</p>
              <select value={roomConfig} onChange={(e) => setRoomConfig(e.target.value)} className="w-full md:w-1/2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm">
                {["1 RK", "1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-semibold mb-3 text-slate-700">Number of Rooms</p>
                <select value={rooms} onChange={(e) => setRooms(Number(e.target.value))} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm">
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n === 5 ? "5+" : n}</option>)}
                </select>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3 text-slate-700">Number of Bathrooms</p>
                <select value={bathrooms} onChange={(e) => setBathrooms(Number(e.target.value))} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm">
                  {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n === 4 ? "4+" : n}</option>)}
                </select>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3 text-slate-700">Super / Built-up Area</p>
                <div className="flex relative shadow-sm rounded-lg">
                  <input type="number" value={areaSqFt} onChange={(e) => setAreaSqFt(e.target.value)} placeholder="0" className="w-full rounded-l-lg border border-r-0 border-slate-300 bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                  <span className="flex items-center justify-center bg-slate-100 border border-slate-300 border-l-0 rounded-r-lg px-4 text-slate-500 font-medium text-sm">sq. ft.</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 text-slate-700">Age of Property</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {["0-1 years old", "1-5 years old", "5-10 years old", "10+ years old", "20+ years old"].map((a) => (
                  <button key={a} onClick={() => setPropertyAge(a)} className={`rounded-lg border px-3 py-3 text-[13px] font-medium transition-all duration-200 ${propertyAge === a ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm" : "bg-white hover:border-indigo-300 hover:bg-slate-50 text-slate-600"}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Tenant Preferences & Availability */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Tenant Preferences & Availability</h1>
            
            <div>
              <p className="text-sm font-semibold mb-3 text-slate-700">Available For (Select all that apply)</p>
              <div className="flex flex-wrap gap-3">
                {["Family", "Single Men", "Single Women", "LGBTQ+"].map((a) => (
                  <button key={a} onClick={() => toggleAvailableFor(a)} className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${availableFor.includes(a) ? "border-indigo-600 bg-indigo-600 text-white shadow-sm" : "bg-white border-slate-300 hover:border-indigo-400 text-slate-700"}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 text-slate-700">Furnishing Status</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {["Fully Furnished", "Semi-Furnished", "Unfurnished"].map((f) => (
                  <button key={f} onClick={() => setFurnishingStatus(f)} className={`rounded-xl border p-4 font-medium transition-all duration-200 ${furnishingStatus === f ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm" : "bg-white hover:border-indigo-300 hover:bg-slate-50 text-slate-600"}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 text-slate-700">Available From</p>
              <select value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} className="w-full md:w-1/2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm">
                {["Any Time", "Immediately", "Within 15 Days", "Within 1 Month", "Within 3 Months", "After 3 Months"].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* STEP 2: Amenities Grid */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900">Amenities & Features</h1>
            <p className="text-sm text-slate-500 mb-6">Select all the amenities and features available with this property.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {AMENITIES_LIST.map((a) => (
                <label key={a} className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-all duration-200 ${amenities.includes(a) ? "border-indigo-600 bg-indigo-50 shadow-sm" : "bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50"}`}>
                  <input type="checkbox" checked={amenities.includes(a)} onChange={() => toggleAmenity(a)} className="mt-0.5 w-4 h-4 accent-indigo-600 rounded cursor-pointer" /> 
                  <span className={`text-[13px] font-medium leading-tight ${amenities.includes(a) ? "text-indigo-900" : "text-slate-700"}`}>{a}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Media Upload */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900">High-Resolution Media</h1>
            
            <div 
              onClick={handleMockUpload}
              className="w-full border-2 border-dashed border-indigo-300 bg-indigo-50/50 hover:bg-indigo-50 rounded-2xl p-10 text-center cursor-pointer transition-colors"
            >
              <div className="mx-auto w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Drag & Drop Photos Here</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Upload well-lit, high-resolution photos showing every angle of the rooms, kitchen, and bathrooms to get verified faster.
              </p>
              <button className="mt-6 px-6 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
                Browse Files
              </button>
            </div>

            {mediaUrls.length > 0 && (
              <div className="pt-6">
                <h3 className="font-semibold text-slate-800 mb-4">Uploaded Photos ({mediaUrls.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mediaUrls.map((url, idx) => (
                    <div key={idx} className="relative group aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                      <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <div className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow">
                          COVER
                        </div>
                      )}
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeMedia(idx); }}
                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="fixed bottom-0 inset-x-0 md:relative bg-white md:bg-transparent border-t border-slate-200 md:border-none p-4 md:p-0 mt-10 md:mt-12 z-20">
          <div className="max-w-3xl mx-auto flex gap-4">
            {step < 3 ? (
              <button onClick={handleNext} className="w-full rounded-xl bg-slate-900 text-white py-4 font-bold text-[15px] hover:bg-slate-800 transition-colors shadow-md">
                Continue to {STEPS[step + 1]}
              </button>
            ) : (
              <button disabled={saving} onClick={handlePublish} className="w-full rounded-xl bg-indigo-600 text-white py-4 font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                {saving ? "Publishing..." : <><Check className="h-5 w-5" /> Publish Property</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
