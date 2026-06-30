import pg1 from "@/assets/listing-pg-1.jpg";
import pg2 from "@/assets/listing-pg-2.jpg";
import flat1 from "@/assets/listing-flat-1.jpg";
import flat2 from "@/assets/listing-flat-2.jpg";

export type VerifTier = "college_verified" | "id_verified" | "pending";

export type Listing = {
  id: string;
  type: "pg" | "flat";
  title: string;
  rent: number;
  deposit: number;
  gender: "male" | "female" | "any";
  moveIn: string;
  address: string;
  college: string;
  distance: string;
  amenities: string[];
  photos: string[];
  ownerId: string;
  ownerName: string;
  ownerCollege: string;
  ownerTier: VerifTier;
  responseRate: number;
  status: "active" | "filled";
  description: string;
  inquiries: number;
  sameCollegeMessaged?: number;
};

export const COLLEGES = [
  "Symbiosis Pune",
  "MIT WPU Pune",
  "Christ University, Bangalore",
  "Manipal Institute of Technology",
  "Amity University, Noida",
  "VIT Vellore",
  "KIIT Bhubaneswar",
];

export const LISTINGS: Listing[] = [
  {
    id: "l1",
    type: "pg",
    title: "Sunny single PG, 4 min walk to Symbiosis Viman Nagar",
    rent: 7500,
    deposit: 15000,
    gender: "female",
    moveIn: "2026-07-10",
    address: "Lane 6, Viman Nagar, Pune",
    college: "Symbiosis Pune",
    distance: "0.4 km from campus",
    amenities: ["Wi-Fi", "Meals included", "Laundry", "AC", "Power backup"],
    photos: [pg1, pg2],
    ownerId: "u_anita",
    ownerName: "Anita Mehra",
    ownerCollege: "Symbiosis Pune",
    ownerTier: "college_verified",
    responseRate: 94,
    status: "active",
    description:
      "Quiet, well-lit single PG with home-cooked meals. 5 minute walk to the main gate, supermarket downstairs.",
    inquiries: 23,
    sameCollegeMessaged: 3,
  },
  {
    id: "l2",
    type: "flat",
    title: "2BHK with balcony, 2 flatmates needed near Christ",
    rent: 14500,
    deposit: 28000,
    gender: "any",
    moveIn: "2026-07-15",
    address: "Hosur Road, Bangalore",
    college: "Christ University, Bangalore",
    distance: "1.1 km from campus",
    amenities: ["Wi-Fi", "Furnished", "Lift", "Parking", "24x7 water"],
    photos: [flat1, flat2],
    ownerId: "u_rahul",
    ownerName: "Rahul Iyer",
    ownerCollege: "Christ University, Bangalore",
    ownerTier: "id_verified",
    responseRate: 88,
    status: "active",
    description:
      "Sunny 2BHK on the 6th floor. Looking for two chill flatmates — current tenant graduates in July.",
    inquiries: 41,
    sameCollegeMessaged: 5,
  },
  {
    id: "l3",
    type: "pg",
    title: "Cozy twin sharing PG with study desk, MIT WPU",
    rent: 5800,
    deposit: 10000,
    gender: "male",
    moveIn: "2026-08-01",
    address: "Kothrud, Pune",
    college: "MIT WPU Pune",
    distance: "0.8 km from campus",
    amenities: ["Wi-Fi", "Meals included", "Hot water"],
    photos: [pg2, pg1],
    ownerId: "u_priya",
    ownerName: "Priya S.",
    ownerCollege: "MIT WPU Pune",
    ownerTier: "college_verified",
    responseRate: 76,
    status: "active",
    description:
      "Twin sharing, fairy-lit room, owner aunty cooks great food. Quiet building, mostly students.",
    inquiries: 12,
  },
  {
    id: "l4",
    type: "flat",
    title: "3BHK, looking for 1 more — Manipal end of road",
    rent: 9500,
    deposit: 18000,
    gender: "any",
    moveIn: "2026-06-25",
    address: "End Point Road, Manipal",
    college: "Manipal Institute of Technology",
    distance: "0.6 km from campus",
    amenities: ["Wi-Fi", "Furnished", "Geyser", "Washing machine"],
    photos: [flat2, flat1],
    ownerId: "u_kabir",
    ownerName: "Kabir Shah",
    ownerCollege: "Manipal Institute of Technology",
    ownerTier: "college_verified",
    responseRate: 91,
    status: "active",
    description:
      "Two of us already live here. Looking for a non-smoker, chill flatmate. Rent split 3 ways.",
    inquiries: 18,
    sameCollegeMessaged: 4,
  },
  {
    id: "l5",
    type: "pg",
    title: "Premium single PG with AC and balcony, Amity Noida",
    rent: 11000,
    deposit: 22000,
    gender: "female",
    moveIn: "2026-07-05",
    address: "Sector 125, Noida",
    college: "Amity University, Noida",
    distance: "1.5 km from campus",
    amenities: ["Wi-Fi", "Meals included", "AC", "Housekeeping", "Power backup"],
    photos: [pg1, flat1],
    ownerId: "u_meera",
    ownerName: "Meera Aunty",
    ownerCollege: "—",
    ownerTier: "id_verified",
    responseRate: 97,
    status: "active",
    description:
      "Run by Meera Aunty for 7 years, mostly Amity girls. Strict but warm — meals are amazing.",
    inquiries: 56,
    sameCollegeMessaged: 8,
  },
  {
    id: "l6",
    type: "flat",
    title: "1BHK studio, walk to KIIT — graduating, handing off",
    rent: 8200,
    deposit: 16000,
    gender: "any",
    moveIn: "2026-06-20",
    address: "Patia, Bhubaneswar",
    college: "KIIT Bhubaneswar",
    distance: "0.9 km from campus",
    amenities: ["Wi-Fi", "Furnished", "Geyser"],
    photos: [flat1, pg2],
    ownerId: "u_aarav",
    ownerName: "Aarav Patnaik",
    ownerCollege: "KIIT Bhubaneswar",
    ownerTier: "college_verified",
    responseRate: 82,
    status: "active",
    description:
      "Graduating in July, handing off my studio. Deposit transfer simple — landlord is super reasonable.",
    inquiries: 9,
  },
];

export type Roommate = {
  id: string;
  name: string;
  age: number;
  college: string;
  gender: "male" | "female" | "other";
  year: number;
  tier: VerifTier;
  compatibility: number;
  traits: string[];
  bio: string;
  budget: string;
  avatarSeed: string;
};

export const ROOMMATES: Roommate[] = [
  {
    id: "r1",
    name: "Ananya R.",
    age: 20,
    college: "Symbiosis Pune",
    gender: "female",
    year: 2,
    tier: "college_verified",
    compatibility: 92,
    traits: ["Early riser", "Non-smoker", "Loves a clean kitchen"],
    bio: "Design student. Quiet weekdays, occasional weekend trips.",
    budget: "₹7k–₹9k",
    avatarSeed: "ananya",
  },
  {
    id: "r2",
    name: "Vikram J.",
    age: 21,
    college: "MIT WPU Pune",
    gender: "male",
    year: 3,
    tier: "id_verified",
    compatibility: 84,
    traits: ["Night owl", "Cooks often", "Gym 5x/week"],
    bio: "CS major, looking for a flat near Kothrud with one chill flatmate.",
    budget: "₹8k–₹11k",
    avatarSeed: "vikram",
  },
  {
    id: "r3",
    name: "Sara K.",
    age: 19,
    college: "Christ University, Bangalore",
    gender: "female",
    year: 1,
    tier: "college_verified",
    compatibility: 78,
    traits: ["Vegetarian", "Early riser", "Studies at home"],
    bio: "First year, looking for a verified PG with one roommate from Christ.",
    budget: "₹6k–₹8k",
    avatarSeed: "sara",
  },
  {
    id: "r4",
    name: "Dev P.",
    age: 22,
    college: "Manipal Institute of Technology",
    gender: "male",
    year: 4,
    tier: "college_verified",
    compatibility: 71,
    traits: ["Non-smoker", "Likes plants", "Quiet"],
    bio: "Mech final year, low-key, big football fan on weekends.",
    budget: "₹8k–₹10k",
    avatarSeed: "dev",
  },
  {
    id: "r5",
    name: "Tara M.",
    age: 20,
    college: "Amity University, Noida",
    gender: "female",
    year: 2,
    tier: "pending",
    compatibility: 66,
    traits: ["Night owl", "Vegetarian", "Loves a clean kitchen"],
    bio: "BBA student, looking for 1 flatmate to split a 2BHK in Sector 125.",
    budget: "₹10k–₹12k",
    avatarSeed: "tara",
  },
];

export type Conversation = {
  id: string;
  withName: string;
  withCollege: string;
  withTier: VerifTier;
  listingTitle?: string;
  lastMessage: string;
  lastAt: string;
  unread: number;
  avatarSeed: string;
  messages: { id: string; from: "me" | "them"; body: string; at: string }[];
};

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    withName: "Anita Mehra",
    withCollege: "Symbiosis Pune",
    withTier: "college_verified",
    listingTitle: "Sunny single PG, 4 min walk to Symbiosis Viman Nagar",
    lastMessage: "Yes, the room is still available! Want to visit Saturday?",
    lastAt: "2m",
    unread: 2,
    avatarSeed: "anita",
    messages: [
      { id: "m1", from: "me", body: "Hi! Is this PG still available for July?", at: "10:14" },
      { id: "m2", from: "them", body: "Hey :) yes it is, female-only.", at: "10:16" },
      { id: "m3", from: "me", body: "Great. Could I see it this weekend?", at: "10:20" },
      { id: "m4", from: "them", body: "Yes, the room is still available! Want to visit Saturday?", at: "10:21" },
    ],
  },
  {
    id: "c2",
    withName: "Rahul Iyer",
    withCollege: "Christ University, Bangalore",
    withTier: "id_verified",
    listingTitle: "2BHK with balcony, 2 flatmates needed near Christ",
    lastMessage: "We're 2 guys, looking for 1 more chill flatmate.",
    lastAt: "1h",
    unread: 0,
    avatarSeed: "rahul",
    messages: [
      { id: "m1", from: "them", body: "Hey, saw you saved the listing :)", at: "Yesterday" },
      { id: "m2", from: "them", body: "We're 2 guys, looking for 1 more chill flatmate.", at: "Yesterday" },
    ],
  },
  {
    id: "c3",
    withName: "Ananya R.",
    withCollege: "Symbiosis Pune",
    withTier: "college_verified",
    lastMessage: "92% compatibility — coffee this week?",
    lastAt: "3h",
    unread: 1,
    avatarSeed: "ananya",
    messages: [
      { id: "m1", from: "them", body: "Hey! We matched at 92%, would love to chat.", at: "Mon" },
      { id: "m2", from: "them", body: "92% compatibility — coffee this week?", at: "Mon" },
    ],
  },
];

export const ME = {
  id: "u_me",
  name: "Aditya Sharma",
  college: "Symbiosis Pune",
  year: 2,
  gender: "male" as const,
  tier: "college_verified" as VerifTier,
  bio: "Looking for a quiet PG near campus from July. Early riser, non-smoker.",
  traits: ["Early riser", "Non-smoker", "Vegetarian"],
};
