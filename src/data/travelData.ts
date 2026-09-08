export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights?: string[];
  meals?: string;
  stay?: string;
}

export interface DetailedTravelItem {
  id: string;
  name: string;
  title: string;
  slogan: string;
  category: "international" | "domestic" | "trek";
  duration: string;
  badge: string;
  price: string;
  rawPrice: number;
  image: string;
  highlights: string[];
  description: string;
  location: string;
  bestTimeToVisit: string;
  groupSize: string;
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  gallery: string[];
  faqs: { question: string; answer: string }[];
  isFixedDeparture?: boolean;
  pricingTiers?: { name: string; price: string; rawPrice: number; details?: string }[];
  pdfItineraryUrl?: string;
}

export interface FixedDeparture {
  id: string;
  destination: string;
  slogan: string;
  highlights: string[];
  price: string;
  image: string;
  duration?: string;
  description?: string;
}

export interface DestinationPackage {
  id: string;
  name: string;
  subtext: string;
  category: "international" | "domestic" | "trek";
  duration: string;
  badge: string;
  price: string;
  rawPrice: number;
  image: string;
  highlights: string[];
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  features: string[];
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  trip: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: "international" | "trek" | "community";
  image: string;
  caption: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "departures" | "visas" | "payments" | "solo" | "catering";
}

// ==========================================
// DETAILED TRAVEL CATALOG DATA (FOR DETAIL PAGES)
// ==========================================
export const detailedTravelItems: Record<string, DetailedTravelItem> = {
"deluxe-kerala-tours": {
    "title": "Delux Kerala",
    "name": "Deluxe Kerala Tours",
    "slogan": "Celebrate Diwali in the serene landscapes of God’s Own Country, Kerala, on this deluxe 7-day tour.",
    "category": "domestic",
    "duration": "7 Days / 6 Nights",
    "badge": "",
    "price": "₹27,999 PP",
    "rawPrice": 27999,
    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800",
    "highlights": [
      "Arrival in Cochin",
      "Cochin to Athirappilly Waterfalls & Munnar",
      "Munnar Local Sightseeing & Rajamalai Forest",
      "Munnar to Thekkady (Wildlife & Spices)"
    ],
    "description": "Celebrate Diwali in the serene landscapes of God’s Own Country, Kerala, on this deluxe 7-day tour. Your journey takes you from Cochin to the majestic Athirappilly Waterfalls, the tea hills of Munnar, the spice gardens of Thekkady, the backwaters of Alleppey, and the heritage sights of Trivandrum. Traveling in a comfortable 2×2 A.C. Pushback Bus, this tour includes 3rd Tier AC Sleeper Class rail tickets, premium stays, and hot meals served by our personal Cooks.",
    "location": "Arrival in Cochin",
    "bestTimeToVisit": "",
    "groupSize": "15 - 25 Guests",
    "included": [
      "Round-trip 3rd Tier AC Sleeper Class rail tickets (Ahmedabad to Ahmedabad)",
      "Local transport by private 2x2 A.C. Pushback Bus",
      "Accommodation in premium hotels",
      "Delicious, hygienic meals prepared by our personal cooks",
      "Services of a professional and experienced tour manager"
    ],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Cochin",
        "description": "Arrive in Cochin according to your convenience. Transfer to the Cochin hotel, check in around 12:00 PM. Enjoy free time for leisure and local shopping in the afternoon. Dinner and overnight stay in Cochin (AC Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Cochin to Athirappilly Waterfalls & Munnar",
        "description": "After breakfast, checkout and drive to the spectacular Athirappilly Waterfalls, the largest waterfall in Kerala. Later, start the scenic drive to Munnar. Arrive in Munnar in the evening, check in at the hotel. Dinner and overnight stay in Munnar.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Munnar Local Sightseeing & Rajamalai Forest",
        "description": "After breakfast, visit Rajamalai (Eravikulam National Park) Forest, traveling by forest vehicle. After lunch, visit Mattupetty Dam and Echo Point. Dinner and overnight stay in Munnar.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Munnar to Thekkady (Wildlife & Spices)",
        "description": "After breakfast, checkout and drive to Thekkady (approx. 135 km, 5 hours). Check in at the hotel. After lunch, visit Periyar Lake, enjoy a Spice Garden walk, and attend the evening Kathakali & Kalaripayattu Martial Arts shows. Note: book lake boating slots online in advance. Dinner and overnight stay in Thekkady.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Thekkady to Alleppey Backwaters Boating",
        "description": "After breakfast, checkout and proceed to Alleppey (approx. 140 km, 4 hours). Check in at the hotel. After lunch, enjoy a backwaters boating tour. Dinner and overnight stay in Alleppey (AC Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Alleppey to Trivandrum via Jatayu Earth's Center",
        "description": "After breakfast, checkout and drive to Trivandrum (approx. 160 km, 6 hours). Stop en-route to visit Jatayu Earth's Center (ropeway on self-expense). Arrive in Trivandrum, visit Kovalam Beach, and check in at the hotel. Dinner and overnight stay in Trivandrum (AC Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Sree Padmanabhaswamy Temple & Departure",
        "description": "After breakfast, checkout and visit the famous Sree Padmanabhaswamy Temple. Transfer to railway station or airport as per convenience for return journey. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹28,999",
        "rawPrice": 28999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹27,999",
        "rawPrice": 27999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹29,999",
        "rawPrice": 29999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹19,999",
        "rawPrice": 19999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "deluxe-kerala-tours"
  },
  "royal-kerala": {
    "title": "Royal Kerala",
    "name": "Royals Kerala",
    "slogan": "Celebrate Diwali in God’s Own Country, Kerala, with this royal 8-day package.",
    "category": "domestic",
    "duration": "8 Days / 7 Nights",
    "badge": "",
    "price": "₹29,999 PP",
    "rawPrice": 29999,
    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800",
    "highlights": [
      "Arrival in Cochin",
      "Cochin to Athirappilly Waterfalls & Munnar",
      "Munnar Local Sightseeing & Rajamalai Forest",
      "Munnar to Thekkady (Wild Elephant & Cultural Shows)"
    ],
    "description": "Celebrate Diwali in God’s Own Country, Kerala, with this royal 8-day package. Journeying from Cochin, you will explore the majestic Athirappilly Waterfalls, the lush tea gardens of Munnar, the spice plantations of Thekkady, the backwaters of Alleppey (including an overnight stay in an A.C. Houseboat), the colossal Jatayu Earth’s Center, Kovalam Beach in Trivandrum, Poovar Island, and the holy confluence in Kanyakumari. Travel in a comfortable 2×1 A.C. Tempo Traveler with hot meals prepared by our personal Cooks.",
    "location": "Arrival in Cochin",
    "bestTimeToVisit": "",
    "groupSize": "12 - 18 Guests",
    "included": [
      "Pick up from Cochin Station/Airport & drops at Trivendrum Station/Airport",
      "Local transport by private 2x1 A.C. Tempo Traveler",
      "Accommodation in premium hotels & AC Houseboat stay",
      "Delicious, hygienic meals prepared by our personal cooks",
      "Complimentary: Alleppey boating, Kathakali show, Elephant ride, Spice Garden entry",
      "Services of a professional and experienced tour manager"
    ],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Cochin",
        "description": "Arrive at Cochin railway station or airport (pickup compiled at a single time). Transfer to the Cochin hotel, check in around 12:00 PM. Enjoy free time for leisure and local shopping in the afternoon. Dinner and overnight stay in Cochin (AC Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Cochin to Athirappilly Waterfalls & Munnar",
        "description": "After breakfast, checkout and drive to the spectacular Athirappilly Waterfalls, the largest waterfall in Kerala. Later, start the scenic drive to Munnar. Arrive in Munnar in the evening, check in at the hotel. Dinner and overnight stay in Munnar.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Munnar Local Sightseeing & Rajamalai Forest",
        "description": "After breakfast, visit Rajamalai (Eravikulam National Park) Forest, traveling by forest vehicle. After lunch, visit Mattupetty Dam, Echo Point, and enjoy a complimentary Elephant Ride. Dinner and overnight stay in Munnar.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Munnar to Thekkady (Wild Elephant & Cultural Shows)",
        "description": "After breakfast, checkout and drive to Thekkady (approx. 135 km, 5 hours). Check in at the hotel. After lunch, visit Periyar Lake, enjoy a Spice Garden walk, and attend the evening Kathakali & Kalaripayattu Martial Arts shows. Note: book lake boating slots online in advance. Dinner and overnight stay in Thekkady.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Thekkady to Alleppey Houseboat Stay",
        "description": "After breakfast, checkout and proceed to Alleppey (approx. 140 km, 4 hours). After lunch, enjoy a backwaters boating tour. Check in at your A.C. Houseboat in the evening around 6:30 PM. Dinner and overnight stay in Alleppey Houseboat (AC Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Alleppey to Trivandrum via Jatayu Earth's Center",
        "description": "After breakfast, checkout and drive to Trivandrum (approx. 160 km, 6 hours). Stop en-route to visit Jatayu Earth's Center (ropeway on self-expense). Arrive in Trivandrum, visit Kovalam Beach, and check in at the hotel. Dinner and overnight stay in Trivandrum (AC Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Poovar Island & Kanyakumari Excursion",
        "description": "After breakfast, visit Poovar Island. Later, drive to Kanyakumari (approx. 100 km, 4 hours). Visit the Swami Vivekananda Memorial Rock via boat. Return to Trivandrum in the evening. Dinner and overnight stay in Trivandrum (AC Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Sree Padmanabhaswamy Temple & Departure",
        "description": "After breakfast, checkout and visit the famous Sree Padmanabhaswamy Temple. Transfer to railway station or airport as per convenience for return journey. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹29,999",
        "rawPrice": 29999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹31,999",
        "rawPrice": 31999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹34,999",
        "rawPrice": 34999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹23,999",
        "rawPrice": 23999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "royal-kerala"
  },
  "south-india": {
    "title": "Delux South",
    "name": "South India",
    "slogan": "Embark on a delightful 9-day journey across the scenic hill stations and royal cities of South India.",
    "category": "domestic",
    "duration": "9 Days / 8 Nights",
    "badge": "",
    "price": "₹26,999 PP",
    "rawPrice": 26999,
    "image": "https://images.unsplash.com/photo-1600100397608-f010e445b91b?q=80&w=800",
    "highlights": [
      "Arrival in Bangalore & Travel to Coorg",
      "Coorg Local Sightseeing",
      "Coorg Sightseeing & Depart for Mysore",
      "Mysore Sightseeing & Travel to Ooty"
    ],
    "description": "Embark on a delightful 9-day journey across the scenic hill stations and royal cities of South India. This tour takes you through the verdant coffee gardens of Coorg, the regal palaces of Mysore, the sprawling tea estates of Ooty, and the misty pine forests of Kodaikanal. Travel in a comfortable 2×2 A.C. coach with a dedicated tour manager and personal chefs serving hot, delicious meals throughout the tour.",
    "location": "Arrival in Bangalore & Travel to Coorg",
    "bestTimeToVisit": "",
    "groupSize": "20 - 30 Guests",
    "included": [
      "Travel by comfortable 2x2 A.C. coach from Bangalore",
      "Accommodation in premium, well-maintained hotels (A.C. rooms at selected locations)",
      "Delicious, hygienic meals prepared by our personal cooks",
      "Local sightseeing according to the itinerary",
      "Services of a professional and experienced tour manager"
    ],
    "excluded": [
      "Railway or Air tickets to/from Bangalore",
      "Entrance tickets to parks, monuments, and museums (on self-expense)",
      "Tirupati Balaji Darshan entry fees (optional, on self-expense)",
      "Personal shopping, laundry, tips, and items of personal nature"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Bangalore & Travel to Coorg",
        "description": "Arrive in Bangalore according to your convenience. After lunch in the afternoon, depart for the scenic hill station of Coorg (approx. 240 km, 6 hours). Upon arrival in Coorg, check in at the hotel, enjoy some free time for leisure/relaxation, and have dinner. Overnight stay in Coorg (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Coorg Local Sightseeing",
        "description": "After breakfast, explore the beauty of Coorg including visits to the spectacular Abbey Falls, historical Omkareshwar Temple, and other scenic points. After lunch, enjoy free time for shopping, relaxing, and walking around. Dinner and overnight stay in Coorg (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Coorg Sightseeing & Depart for Mysore",
        "description": "After breakfast, check out and visit Kaveri Nisargadhama, Raja's Seat, Dubare Elephant Forest Camp, and the Golden Temple. After lunch, depart for Mysore (approx. 120 km, 3 hours). Visit the famous illuminated Vrindavan Gardens in the evening before checking in at the hotel. Dinner and overnight stay in Mysore (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Mysore Sightseeing & Travel to Ooty",
        "description": "After breakfast, visit the majestic Mysore Palace, Chamundi Hills, and Nandi bull statue. After lunch, check out and depart for Ooty (approx. 165 km, 6 hours). Arrive in Ooty in the evening and check in at the hotel. Dinner and overnight stay in Ooty.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Ooty Local Sightseeing & Shopping",
        "description": "After breakfast, proceed for a local sightseeing tour in Ooty (entry fees on self-expense). Enjoy lunch, followed by shopping for local tea, eucalyptus oil, and chocolates. Free time for leisure walks. Dinner and overnight stay in Ooty.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Ooty to Kodaikanal Hill Station",
        "description": "After breakfast, check out and start the journey to Kodaikanal (approx. 300 km, 10 hours). Enjoy lunch en-route. Upon arrival in Kodaikanal in the evening, check in at the hotel and relax. Dinner and overnight stay in Kodaikanal.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Kodaikanal Local Sightseeing",
        "description": "After breakfast, set out to visit Kodaikanal Lake, Coaker's Walk, and Pillar Rocks (some entry fees on self-expense). Have lunch, followed by shopping for local chocolates, cashews, and spices. Dinner and overnight stay in Kodaikanal.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Kodaikanal to Bangalore",
        "description": "After breakfast, check out and depart for Bangalore (approx. 450 km, 10 hours). Have lunch en-route. Arrive in Bangalore in the evening/night and check in at the hotel. Dinner and overnight stay in Bangalore (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 9,
        "title": "Bangalore Sightseeing & Tour Ends",
        "description": "After breakfast, check out and enjoy local sightseeing in Bangalore. After lunch, transfer to the railway station or airport as per your convenience for your return journey hometown. Tour ends with beautiful memories!",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹26,999",
        "rawPrice": 26999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹29,999",
        "rawPrice": 29999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹31,999",
        "rawPrice": 31999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹20,999",
        "rawPrice": 20999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "south-india"
  },
  "south-india-tours": {
    "title": "Royal South",
    "name": "South India Tours",
    "slogan": "Explore the mystical beauty, majestic heritage, and serene landscapes of South India on this comprehensive 11-day A.",
    "category": "domestic",
    "duration": "11 Days / 10 Nights",
    "badge": "",
    "price": "₹29,999 PP",
    "rawPrice": 29999,
    "image": "https://images.unsplash.com/photo-1600100397608-f010e445b91b?q=80&w=800",
    "highlights": [
      "Arrival in Bangalore & Local Sightseeing",
      "Tirupati Balaji Darshan & Return to Bangalore",
      "Bangalore to Coorg & Abbey Falls Visit",
      "Coorg Sightseeing & Depart for Mysore"
    ],
    "description": "Explore the mystical beauty, majestic heritage, and serene landscapes of South India on this comprehensive 11-day A.C. Coach tour. Journeying from the bustling garden city of Bangalore, you will travel to the sacred hills of Tirupati, the scenic coffee estates of Coorg, the royal monuments of Mysore, the pleasant hill stations of Ooty and Kodaikanal, the holy island temple of Rameshwaram, and finally the sunset-sunrise point at Kanyakumari.",
    "location": "Arrival in Bangalore & Local Sightseeing",
    "bestTimeToVisit": "",
    "groupSize": "20 - 30 Guests",
    "included": [
      "Travel by comfortable 2x2 A.C. Coach from Bangalore to Kanyakumari",
      "Accommodation in premium, well-maintained hotels (A.C. rooms at selected locations)",
      "Delicious, hygienic meals prepared by our personal cooks",
      "Local sightseeing according to the itinerary",
      "Services of a professional and experienced tour manager"
    ],
    "excluded": [
      "Railway or Air tickets to Bangalore / from Kanyakumari",
      "Tirupati Balaji Darshan entry fees & personal donation (on self-expense)",
      "Lunch in Tirupati (on self-expense)",
      "Entrance tickets to parks, monuments, and museums (on self-expense)",
      "Personal shopping, laundry, tips, and drinks"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Bangalore & Local Sightseeing",
        "description": "Arrive in Bangalore according to your convenience. Enjoy lunch in the afternoon followed by a local sightseeing tour of Bangalore (including Lalbagh Glasshouse and gardens). After dinner, begin the overnight journey to the holy city of Tirupati (approx. 240 km, 6 hours).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Tirupati Balaji Darshan & Return to Bangalore",
        "description": "Arrive in Tirupati in the morning. Proceed for the sacred Tirupati Balaji Darshan (entry on self-expense). Have lunch in the afternoon (on self-expense). In the evening at 6:00 PM, depart from Tirupati to return to Bangalore. Dinner and overnight stay in Bangalore.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Bangalore to Coorg & Abbey Falls Visit",
        "description": "After morning tea and breakfast, depart from Bangalore to the scenic hill station of Coorg (approx. 264 km, 6 hours). On arrival, check in at the hotel. After lunch, visit the spectacular Abbey Falls and the historical Omkareshwar Temple. Dinner and overnight stay in Coorg.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Coorg Sightseeing & Depart for Mysore",
        "description": "After breakfast, visit Kaveri Nisargadhama, Raja's Seat, Dubare Elephant Camp, and the Golden Temple (Bylakuppe Tibetan Settlement). After lunch, depart for the royal city of Mysore (approx. 120 km, 3 hours). Visit the famous Vrindavan Gardens in the evening before checking in at the hotel. Dinner and overnight stay in Mysore.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Mysore to Ooty Journey via Bandipur",
        "description": "After breakfast, check out from the hotel and enjoy the scenic drive to Ooty (approx. 160 km, 5 hours) via the Bandipur National Forest. On arrival in Ooty, check in at the hotel. Spend a relaxing evening by Ooty Lake or exploring the town. Dinner and overnight stay in Ooty.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Ooty Local Sightseeing & Shopping",
        "description": "After breakfast, set out for a sightseeing tour of Ooty including Doddabetta Peak, the Botanical Garden, and other local points (some entry fees on self-expense). After lunch, enjoy free time for shopping (local tea, eucalyptus oils, spices) and leisure walks. Dinner and overnight stay in Ooty.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Ooty to Kodaikanal Hill Station",
        "description": "After breakfast, depart for the beautiful hill station of Kodaikanal (approx. 300 km, 10 hours). Enjoy lunch en-route. Upon arrival in Kodaikanal in the evening, check in at the hotel and relax. Dinner and overnight stay in Kodaikanal.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Kodaikanal Local Sightseeing",
        "description": "After breakfast, explore Kodaikanal's prime tourist points including Kodaikanal Lake, Coaker's Walk, and Pillar Rocks (some entry fees on self-expense). Have lunch, followed by shopping for local chocolates, cashews, and spices. Dinner and overnight stay in Kodaikanal.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 9,
        "title": "Kodaikanal to Rameshwaram via Madurai",
        "description": "After breakfast, start the journey to Rameshwaram (approx. 380 km, 11 hours). En-route, stop in Madurai to visit the magnificent Meenakshi Amman Temple. After lunch, proceed to Rameshwaram, arriving in the evening to check in at the hotel. Dinner and overnight stay in Rameshwaram.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 10,
        "title": "Rameshwaram to Kanyakumari",
        "description": "After breakfast, depart for Kanyakumari (approx. 390 km, 12 hours) at the southernmost tip of India. Enjoy lunch en-route. On arrival, check in at the hotel. Witness a beautiful sunset and enjoy a relaxed evening. Dinner and overnight stay in Kanyakumari.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 11,
        "title": "Kanyakumari Sightseeing & Tour Ends",
        "description": "After breakfast, visit the Gandhi Memorial, Vivekananda Rock Memorial (by ferry), and the local Wax Museum. After lunch, check out from the hotel and depart for your hometown according to your convenience. Tour ends with happy memories!",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹29,999",
        "rawPrice": 29999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹31,999",
        "rawPrice": 31999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹34,999",
        "rawPrice": 34999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹22,999",
        "rawPrice": 22999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "south-india-tours"
  },
  "himanchal": {
    "title": "Delux Himachal",
    "name": "Himanchal",
    "slogan": "Experience the snow-capped peaks, pine valleys, and spiritual heritage of Himachal Pradesh and Amritsar on this premium 9-day tour.",
    "category": "domestic",
    "duration": "8 Days / 7 Nights",
    "badge": "",
    "price": "₹25,999 PP",
    "rawPrice": 25999,
    "image": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800",
    "highlights": [
      "Arrival in Chandigarh & Travel to Shimla",
      "Shimla & Kufri Excursion",
      "Shimla to Manali via Kullu Vaishno Devi Temple",
      "Snow Point & Rohtang Pass Road Visit"
    ],
    "description": "Experience the snow-capped peaks, pine valleys, and spiritual heritage of Himachal Pradesh and Amritsar on this premium 9-day tour. Starting from Chandigarh, you will travel in a comfortable 2×1 A.C. Tempo Traveler to the scenic hill stations of Shimla, Kullu, Manali, and Dalhousie, concluding in the holy city of Amritsar. This package includes premium accommodation, delicious meals prepared by our personal cooks, and complete local sightseeing support.",
    "location": "Arrival in Chandigarh & Travel to Shimla",
    "bestTimeToVisit": "",
    "groupSize": "10 - 15 Guests",
    "included": [
      "Travel by comfortable 2x1 A.C. Tempo Traveler from Chandigarh to Amritsar",
      "Accommodation in premium, well-maintained hotels (A.C. rooms at selected locations)",
      "Delicious, hygienic meals prepared by our personal cooks",
      "Local sightseeing according to the itinerary",
      "Services of a professional and experienced tour manager"
    ],
    "excluded": [
      "Railway or Air tickets to Chandigarh / from Amritsar",
      "Entrance tickets to parks, monuments, and gardens (on self-expense)",
      "Optional activities: River rafting in Kullu, horse riding in Kufri/Khajjiar (on self-expense)",
      "Rohtang Pass vehicle permits & local sightseeing (on self-expense)",
      "Personal shopping, laundry, tips, room heater charges, and mineral water"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Chandigarh & Travel to Shimla",
        "description": "Arrive in Chandigarh according to your convenience. Start the drive to the beautiful hill station of Shimla (approx. 115 km, 4 hours). Stop en-route for lunch and enjoy a visit to the famous Pinjore Gardens. Arrive in Shimla in the evening, check in at the hotel. Dinner and overnight stay in Shimla.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Shimla & Kufri Excursion",
        "description": "After breakfast, take a trip to Kufri (approx. 25 km away), a beautiful natural park. Enjoy horse riding and snow valley views. Return to Shimla in the afternoon for shopping on Mall Road and leisure walking. Dinner and overnight stay in Shimla.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Shimla to Manali via Kullu Vaishno Devi Temple",
        "description": "After breakfast, depart for Manali, the most scenic valley in Himachal (approx. 240 km, 12 hours). Enjoy lunch en-route. Stop in Kullu to visit the famous Vaishno Devi Temple and enjoy river rafting (on self-expense). Arrive in Manali, check in at the hotel. Dinner and overnight stay in Manali.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Snow Point & Rohtang Pass Road Visit",
        "description": "After breakfast, enjoy a drive towards Rohtang Pass and visit the Snow Point (entry & snow activities on self-expense). Return to the Manali hotel in the evening. Dinner and overnight stay in Manali.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Manali Local Sightseeing & Mall Road Shopping",
        "description": "After breakfast, visit the historical Hadimba Temple, Vashisht Hot Springs/Kund, and Club House (activities on self-expense). After lunch, enjoy free time for shopping (saffron, apples, woolens) and walks on Mall Road. Dinner and overnight stay in Manali.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Manali to Dalhousie Hill Station",
        "description": "After breakfast, depart for Dalhousie (approx. 325 km, 12 hours). Have lunch en-route, arriving in Dalhousie in the late evening. Check in at the hotel. Dinner and overnight stay in Dalhousie.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Dalhousie & Khajjiar Meadows Excursion",
        "description": "After breakfast, set out for a trip to the scenic pine-wood meadows of Khajjiar (on self-expense). Experience the natural beauty often called the \"mini-Switzerland of India\". Enjoy horse riding and free walks. Dinner and overnight stay in Dalhousie.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Dalhousie to Amritsar - Wagah Border & Golden Temple",
        "description": "After breakfast, depart for the historical city of Amritsar (approx. 200 km, 5 hours). Check in at the hotel. After lunch, visit the Wagah Border for the parade ceremony. In the evening, visit the Golden Temple and Jallianwala Bagh (on self-expense). Dinner and overnight stay in Amritsar (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 9,
        "title": "Amritsar Sightseeing & Departure",
        "description": "After breakfast, check out of the hotel and enjoy brief local sightseeing. Transfer to the railway station or airport as per your convenience for your return journey. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹25,999",
        "rawPrice": 25999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹27,999",
        "rawPrice": 27999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹29,999",
        "rawPrice": 29999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹19,999",
        "rawPrice": 19999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "himanchal"
  },
  "kashmir": {
    "title": "Delux Kashmir",
    "name": "Kashmir",
    "slogan": "Immerse yourself in the ultimate beauty of Kashmir, widely celebrated as the “Heaven of Earth,” alongside the sacred pilgrimage to Vaishno Devi.",
    "category": "domestic",
    "duration": "7 Days / 6 Nights",
    "badge": "",
    "price": "₹25,999 PP",
    "rawPrice": 25999,
    "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800",
    "highlights": [
      "Arrival in Jammu / Katra",
      "Katra to Srinagar (Scenic Drive)",
      "Srinagar to Gulmarg Excursion",
      "Srinagar to Sonamarg & Kheer Bhawani Temple Excursion"
    ],
    "description": "Immerse yourself in the ultimate beauty of Kashmir, widely celebrated as the “Heaven of Earth,” alongside the sacred pilgrimage to Vaishno Devi. This curated 9-day tour covers the serene Mughal Gardens of Srinagar, the snowy slopes of Gulmarg, the golden glaciers of Sonamarg, the valleys of Pahalgam, and Katra. Travel comfortably in a 2×1 Tempo Traveler with a dedicated tour manager and cooks serving delicious meals throughout your journey.",
    "location": "Arrival in Jammu / Katra",
    "bestTimeToVisit": "",
    "groupSize": "12 - 18 Guests",
    "included": [
      "Travel by comfortable 2x1 Tempo Traveler from Katra to Katra",
      "Accommodation in premium, well-maintained hotels (A.C. rooms at Katra)",
      "Delicious, hygienic meals prepared by our personal cooks",
      "Local sightseeing according to the itinerary",
      "Services of a professional and experienced tour manager"
    ],
    "excluded": [
      "Railway or Air tickets to/from Jammu",
      "Lunch meals, mineral water, room heater, and personal expenses",
      "Shikara boat rides in Dal Lake & entry tickets to Mughal Gardens",
      "Pahalgam local sightseeing union cabs & pony rides in Gulmarg/Sonamarg",
      "Gulmarg Gondola tickets & Vaishno Devi Yatra helicopter/pony tickets"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Jammu / Katra",
        "description": "Arrive in Jammu or Katra according to your convenience (on self-expense). Transfer to the hotel in Katra, check in and relax. Dinner and overnight stay in Katra (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Katra to Srinagar (Scenic Drive)",
        "description": "After breakfast, check out and proceed for a long, scenic drive through valleys and tunnels to Srinagar, the summer capital of Kashmir (approx. 300 km, 12 hours). Arrive in Srinagar in the evening and check in at the hotel. Dinner and overnight stay in Srinagar.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Srinagar to Gulmarg Excursion",
        "description": "After breakfast, take a trip to Gulmarg, the meadow of flowers (approx. 60 km, 2 hours). Enjoy horse riding and the world-famous Gondola Cable Car Ride (on self-expense). Return to Srinagar in the evening. Dinner and overnight stay in Srinagar.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Srinagar to Sonamarg & Kheer Bhawani Temple Excursion",
        "description": "After breakfast, depart for a day trip to the meadow of gold, Sonamarg (approx. 100 km, 3 hours). Enjoy horse riding and scenic glacier views. Stop en-route to visit the holy Kheer Bhawani Temple. Return to Srinagar in the evening. Dinner and overnight stay in Srinagar.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Srinagar Local Sightseeing & Shikara Ride",
        "description": "After breakfast, visit the Shankaracharya Temple (on self-expense) followed by the famous Mughal Gardens (Nishat Bagh, Shalimar Bagh, Chashme Shahi, Nehru Park). In the afternoon, enjoy a peaceful Shikara boat ride on Dal Lake (on self-expense). Free time for shopping. Dinner and overnight stay in Srinagar.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Srinagar to Pahalgam (Valley of Shepherds)",
        "description": "After breakfast, check out and depart for Pahalgam (approx. 100 km, 3 hours). Upon arrival, check in at the hotel. In the afternoon, enjoy local sightseeing in Pahalgam (Aru Valley/Betaab Valley via local cabs on self-expense). Dinner and overnight stay in Pahalgam.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Pahalgam to Katra",
        "description": "After breakfast, check out and proceed for the return drive to Katra (approx. 210 km, 6 hours). Arrive in Katra in the evening, check in at the hotel. Dinner and overnight stay in Katra (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Vaishno Devi Darshan (Yatra Day)",
        "description": "After breakfast, proceed for the sacred Vaishno Devi Darshan. The Yatra can be completed by walking, helicopter, pony, or doli (on self-expense). Return to Katra hotel after Darshan. Dinner and overnight stay in Katra (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 9,
        "title": "Katra / Jammu Departure",
        "description": "Early morning after breakfast, check out of the hotel and transfer to Jammu/Katra railway station or airport as per your convenience for your return journey to your hometown. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹25,999",
        "rawPrice": 25999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹27,999",
        "rawPrice": 27999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹29,999",
        "rawPrice": 29999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹19,999",
        "rawPrice": 19999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "kashmir"
  },
  "scenic-beauty-sikkim": {
    "title": "Sikkim",
    "name": "Scenic Beauty Sikkim",
    "slogan": "Explore the pristine valleys, high-altitude lakes, and majestic Himalayan peaks of Sikkim and Darjeeling.",
    "category": "domestic",
    "duration": "8 Days / 7 Nights",
    "badge": "",
    "price": "₹35,999 PP",
    "rawPrice": 35999,
    "image": "https://images.unsplash.com/photo-1616091093714-c64882e9ab55?q=80&w=800",
    "highlights": [
      "Arrival at NJP / Bagdogra & Travel to Gangtok",
      "Gangtok to Lachung Alpine Valley",
      "Yumthang Valley Sightseeing & Return to Gangtok",
      "Tsomgo (Changu) Lake Excursion"
    ],
    "description": "Explore the pristine valleys, high-altitude lakes, and majestic Himalayan peaks of Sikkim and Darjeeling. This comprehensive 8-day tour takes you to the colonial charm of Darjeeling, the bustling capital Gangtok, the alpine wilderness of Lachung and Yumthang Valley, and the peaceful retreats of Pelling. Traveling in local sharing Jeeps and Sumos, this package includes premium stays, delicious meals prepared by our personal cooks, and complete local sightseeing support.",
    "location": "Arrival at NJP / Bagdogra & Travel to Gangtok",
    "bestTimeToVisit": "",
    "groupSize": "10 - 15 Guests",
    "included": [
      "Pick up and drop from NJP Railway Station / Bagdogra Airport",
      "Local sharing Jeep / Sumo / Maruti Van transport for sightseeing as per itinerary",
      "Accommodation in premium, well-maintained hotels",
      "Delicious, hygienic meals prepared by our personal cooks",
      "Services of a professional and experienced tour manager"
    ],
    "excluded": [
      "Railway or Air tickets to/from NJP or Bagdogra",
      "Local sightseeing entry tickets, Skywalk entry fees, and activities",
      "Nathu La Pass and Zero Point vehicle and permit charges (to be paid separately)",
      "Personal shopping, laundry, tips, room heaters, and mineral water"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival at NJP / Bagdogra & Travel to Gangtok",
        "description": "Arrive at New Jalpaiguri (NJP) Railway Station or Bagdogra Airport (IXB) before 3:00 PM. Travel by comfortable non-A.C. vehicle to Gangtok, the capital of Sikkim located at 5,000 ft (approx. 125 km, 5 hours). Check in at the hotel. Dinner and overnight stay in Gangtok.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Gangtok to Lachung Alpine Valley",
        "description": "After breakfast, check out and drive in a local Jeep/Sumo up to Lachung located at an altitude of 8,600 ft (approx. 120 km, 6 hours). Enjoy lunch en-route. Check in at the hotel in Lachung in the evening. Dinner and overnight stay in Lachung.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Yumthang Valley Sightseeing & Return to Gangtok",
        "description": "After breakfast, take a short drive to Yumthang Valley (approx. 24 km from Lachung), known as the Valley of Flowers. Spend time in the meadows, enjoy lunch, and then start the return drive back to Gangtok. Check in at the Gangtok hotel. Dinner and overnight stay in Gangtok.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Tsomgo (Changu) Lake Excursion",
        "description": "After breakfast, set out in a local Jeep/Sumo for a day trip to the sacred Tsomgo (Changu) Lake located at 12,000 ft altitude. Enjoy the beautiful high-altitude scenery. Return to Gangtok in the afternoon for shopping and leisure walks. Dinner and overnight stay in Gangtok.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Gangtok Local Sightseeing & Travel to Pelling",
        "description": "After breakfast, enjoy local sightseeing in Gangtok using local Maruti Vans. After lunch, checkout and drive to Pelling, a tranquil hill station at 6,800 ft (approx. 130 km, 6 hours). Check in at the hotel. Dinner and overnight stay in Pelling.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Pelling Sightseeing & Travel to Darjeeling",
        "description": "After breakfast, explore Pelling local sights (Skywalk and waterfalls) in a sharing Jeep/Sumo. After lunch, check out and proceed to the world-famous tea capital, Darjeeling, located at 7,000 ft (approx. 115 km, 5 hours). Check in at the hotel. Dinner and overnight stay in Darjeeling.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Tiger Hill Sunrise & Darjeeling Sightseeing",
        "description": "Early morning at 4:00 AM, proceed by Jeep/Sumo to Tiger Hill to witness the iconic sunrise over Mt. Kanchenjunga. Return for breakfast. Later, visit Ghoom Monastery, Batasia Loop, and local tea estates. Spend the evening shopping at the local markets. Dinner and overnight stay in Darjeeling.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Darjeeling to NJP / Bagdogra & Departure",
        "description": "After breakfast, check out of the hotel by 12:00 PM. Start the return drive back to New Jalpaiguri (NJP) Railway Station or Bagdogra Airport (approx. 90 km, 4 hours) for your onward journey hometown. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹35,999",
        "rawPrice": 35999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹37,999",
        "rawPrice": 37999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹39,999",
        "rawPrice": 39999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹25,999",
        "rawPrice": 25999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "scenic-beauty-sikkim"
  },
  "majestic-leh-ladakh-adventure": {
    "title": "Leh Ladakh",
    "name": "Majestic Leh Ladakh Adventure",
    "slogan": "Embark on the ultimate adventure to the land of high passes, Leh Ladakh.",
    "category": "domestic",
    "duration": "7 Days / 6 Nights",
    "badge": "",
    "price": "₹35,999 PP",
    "rawPrice": 35999,
    "image": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=800",
    "highlights": [
      "Arrival in Leh & Complete Rest",
      "Sham Valley Sightseeing & Confluence Tour",
      "Leh Local Sightseeing & 3 Idiots School",
      "Leh to Nubra Valley via Khardung-La Pass"
    ],
    "description": "Embark on the ultimate adventure to the land of high passes, Leh Ladakh. This 7-day flight-inclusive package takes you across the serene Indus & Zanskar river confluence in Sham Valley, the highest motorable road at Khardung-La Pass (18,380 ft), the double-humped camel safaris in Nubra Valley, and the famous deep blue waters of Pangong Lake (14,270 ft). This package covers round-trip flight tickets, premium stays in hotels & camps, and hot meals prepared by our personal cooks.",
    "location": "Arrival in Leh & Complete Rest",
    "bestTimeToVisit": "",
    "groupSize": "10 - 15 Guests",
    "included": [
      "Round-trip economy class flight tickets to and from Leh",
      "Local transportation by private SUV / Scorpio / Traveler as per group size",
      "Accommodation in premium, well-maintained hotels and tented camps",
      "Delicious, hygienic meals prepared by our personal cooks",
      "Services of a professional and experienced tour manager"
    ],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Leh & Complete Rest",
        "description": "Arrive at Leh Airport (IXB). Meet our representative and transfer to the hotel. Check in and spend the entire day resting. This is crucial for acclimatization to Leh's high altitude and thin air. Dinner and overnight stay in Leh.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Sham Valley Sightseeing & Confluence Tour",
        "description": "After breakfast, drive to Sham Valley. Visit Gurudwara Pathar Sahib, Magnetic Hill, and the Sangam (confluence of Indus & Zanskar rivers). River rafting is available en-route (on self-expense). Visit Likir and Alchi Monasteries on the return. Dinner and overnight stay in Leh.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Leh Local Sightseeing & 3 Idiots School",
        "description": "After breakfast, explore Leh local attractions including Shey Palace, Thiksey Monastery, Hemis Monastery, and the Hall of Fame. Visit the Druk Padma Karpo School (famous as the 3 Idiots School). Dinner and overnight stay in Leh.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Leh to Nubra Valley via Khardung-La Pass",
        "description": "After breakfast, drive to Nubra Valley (approx. 130 km, 4-5 hours) crossing the mighty Khardung-La Pass (highest motorable road at 18,380 ft). En-route visit Diskit Monastery. Check in at the hotel/tented camp. Enjoy riding the double-humped Bactrian camels. Dinner and overnight stay in Nubra Valley.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Nubra Valley to Pangong Lake (Border Scenic Drive)",
        "description": "After breakfast, drive to Pangong Lake (approx. 270 km, 6 hours) located at 14,270 ft on the India-China border. Enjoy the changing colors of the lake. Check in at the camp. Note: oxygen levels are low and temperatures drop below freezing. Dinner and overnight stay in Pangong.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Pangong Lake to Leh via Changla Pass",
        "description": "Wake up to the spectacular sunrise over Pangong Lake. After breakfast, checkout and drive back to Leh via Changla Pass (approx. 140 km, 5 hours). Check in at the hotel in Leh. Free time for shopping in the Leh main market. Dinner and overnight stay in Leh.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Departure from Leh",
        "description": "After breakfast, checkout and transfer to Leh Airport as per your flight timing for your return journey back to your hometown. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹35,999",
        "rawPrice": 35999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹37,999",
        "rawPrice": 37999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹39,999",
        "rawPrice": 39999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹26,999",
        "rawPrice": 26999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "majestic-leh-ladakh-adventure"
  },
  "nainital-blissful-uttaranchal": {
    "title": "Delux Nainital",
    "name": "Nainital Blissful Uttaranchal",
    "slogan": "Explore the majestic hills, wild jungles, and holy river banks of Uttarakhand on this beautiful 9-day tour.",
    "category": "domestic",
    "duration": "7 Days / 6 Nights",
    "badge": "",
    "price": "₹25,999 PP",
    "rawPrice": 25999,
    "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800",
    "highlights": [
      "Arrival in Delhi & Travel to Nainital",
      "Nainital Local Sightseeing & Lake Tour",
      "Ranikhet Excursion & Return",
      "Nainital to Kausani (Himalayan Panorama)"
    ],
    "description": "Explore the majestic hills, wild jungles, and holy river banks of Uttarakhand on this beautiful 9-day tour. Your journey takes you from Delhi through the sparkling lakes of Nainital, the scenic golf course of Ranikhet, the panoramic views of Kausani, the wildlife safaris of Jim Corbett National Park, the cascading waterfalls of Mussoorie, the suspension bridges of Rishikesh, and the sacred Ganga Aarti of Haridwar. Traveling in a comfortable A.C. Tempo Traveler, this tour includes premium stays, and hot meals served by our personal cooks.",
    "location": "Arrival in Delhi & Travel to Nainital",
    "bestTimeToVisit": "",
    "groupSize": "12 - 18 Guests",
    "included": [
      "Travel by comfortable 2x1 A.C. Tempo Traveler from Delhi to Haridwar",
      "Accommodation in premium, well-maintained hotels (A.C. rooms at selected locations)",
      "Delicious, hygienic meals prepared by our personal cooks",
      "Local sightseeing according to the itinerary",
      "Services of a professional and experienced tour manager"
    ],
    "excluded": [
      "Railway or Air tickets to Delhi / from Haridwar",
      "Lunch meals, mineral water, and personal expenses",
      "Local sightseeing entry tickets, Kempty Falls entries, and boating in Nainital",
      "Jim Corbett Jeep Safari and Mansa Devi Ropeway tickets"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Delhi & Travel to Nainital",
        "description": "Arrive in Delhi according to your convenience. Start the drive to the famous lake resort Nainital by 11:00 AM (approx. 300 km, 8 hours). Arrive in Nainital/Bhimtal in the evening and check in at the hotel. Dinner and overnight stay in Nainital/Bhimtal.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Nainital Local Sightseeing & Lake Tour",
        "description": "After breakfast, explore local attractions in Nainital including Naini Lake boating, Ropeway for Himalaya view, Saat Tal, Bhimtal, and Mall Road (boating & entry fees on self-expense). Enjoy dinner and overnight stay in Nainital/Bhimtal.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Ranikhet Excursion & Return",
        "description": "After breakfast, take a day trip to the quiet military town of Ranikhet (approx. 100 km, 3 hours). Visit the golf courses, temples, and local pine gardens. Return to Nainital/Bhimtal in the evening. Dinner and overnight stay in Nainital/Bhimtal.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Nainital to Kausani (Himalayan Panorama)",
        "description": "After breakfast, check out and drive to Kausani, famous for its views of Himalayan peaks (approx. 120 km, 3 hours). Visit local spots and tea gardens. Dinner and overnight stay in Kausani.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Kausani to Jim Corbett National Park",
        "description": "After breakfast, check out and drive to Jim Corbett National Park (approx. 156 km, 4 hours). Check in at the hotel. In the afternoon, enjoy an exciting open Jeep Safari (on self-expense) to witness wild animals roaming in the jungle. Dinner and overnight stay in Corbett Park (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Corbett Park to Mussoorie (Queen of Hills)",
        "description": "After breakfast, check out and start the drive to Mussoorie (approx. 270 km, 6 hours). Arrive in Mussoorie in the evening, check in at the hotel and relax. Dinner and overnight stay in Mussoorie.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Mussoorie Local Sightseeing & Kempty Falls",
        "description": "After breakfast, visit the famous Kempty Falls, Lal Tibba, and enjoy free time for walking and shopping on Mall Road. Dinner and overnight stay in Mussoorie.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Mussoorie to Rishikesh & Haridwar",
        "description": "After breakfast, check out and drive to Rishikesh (approx. 80 km, 3 hours) to visit Laxman Jhula and local ashrams. Continue to Haridwar (approx. 24 km, 1 hour). Check in at the hotel. In the evening, witness the holy Ganga Aarti at Har Ki Pauri and visit Mansa Devi Temple (ropeway on self-expense). Dinner and overnight stay in Haridwar (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 9,
        "title": "Haridwar Departure",
        "description": "After breakfast, check out of the hotel and transfer to the railway station or airport as per your convenience for your return journey to your hometown. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹25,999",
        "rawPrice": 25999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹27,999",
        "rawPrice": 27999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹29,999",
        "rawPrice": 29999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹19,999",
        "rawPrice": 19999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "nainital-blissful-uttaranchal"
  },
  "delhi-haridwar-gokul-mathura-vrundavan": {
    "title": "Delux Delhi Akshrdham",
    "name": "Delhi Haridwar Gokul Mathura Vrundavan",
    "slogan": "",
    "category": "domestic",
    "duration": "6 Days / 5 Nights",
    "badge": "",
    "price": "₹22,999 PP",
    "rawPrice": 22999,
    "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800",
    "highlights": [
      "Ahmedabad to Delhi",
      "Delhi to Haridwar",
      "Haridwar",
      "Haridwar to rusikesh,, vundavan"
    ],
    "description": "",
    "location": "Delhi to Haridwar",
    "bestTimeToVisit": "",
    "groupSize": "12 - 18 Guests",
    "included": [],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Ahmedabad to Delhi",
        "description": "Ahmedabad from Delhi plane by travel , Then After 2 x 2 AC That’s it by pickup Curry the family Minar Parking in the morning No Breakfast will be Then After the family Minar of visit _ India Gate That’s it by visit , Then After At 12:30 pm Hotel on arrival _ Afternoon of food will be Then After 02:00 pm until in Swaminarayan Akshardham performance No Darshan . 09:00 pm _ until Hotel on arrival Then After food _ Then After Hotel on relax",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Delhi to Haridwar",
        "description": "05:30 AM _ Tea – Breakfast done After room Check – out to do will be Then After 2 x 2 AC bus by Haridwar to go Departure . 11:00 am _ Haridwar arrival _ Then After Hotel Check – in to do will be Afternoon of food Hotel on . food After Harkipouri , Ganges bathing , Ganges Aarti No Darshan , big market done _ return Hotel . the night food Hotel on will be Then After Hotel on relax",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Haridwar",
        "description": "At 07:00 AM Tea – Breakfast done after , Dehradun Sitescene Sahratdhara , Prakaseswara Mahadev ( Crystal Shivlinga vision ) , Camt fall , Afternoon of food Camt Fall in done will come food After Haridwar Hotel return _ the night food Hotel on will be Then After Hotel on relax",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Haridwar to rusikesh,, vundavan",
        "description": "At 07:00 AM Tea – Breakfast done After room Check – out to do will be Then After Rishikesh Sitescene directory Zula , Permit Niketan ashram , Gita building , Rameshwar temple , Then After boat by Ganges the river Darshan . Then After Hotel return Afternoon of food Hotel on will be food After Haridwar local SiteScene ( self-expense Rickshaw by ) Chandidevi Temple ( J Rope – way by to go will remain ) Kankhal Daksha Prajapati Temple to do will be Holy abode , Rama Court Sheeshmahal , Rama Person Basil temple , Vaishnodevi temple , Shantikuj ( Gayatri Temple ) then After Hotel return _ 08:00 pm _ until food _ Then After Haridwar from Vrindavan of the night That’s it 350 keys by . m . of Travel to do will be",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "mathura,,(janmbhumi) (pream mandhir), gokul,",
        "description": "At 06:00 AM Hotel Arrival ( J According to room will get that According to manager by room of to explode done will come .) Then After Tea – Breakfast to do Vrindavan SiteScene ( self-expense Rickshaw by to do will be ). Ranganathji temple , Govind – G temple , Mirabai ashram , Nidhivan ( where Mr Krishna god at night Rash play is .) , Dau – G of mansion Then After Hotel return Afternoon of food will be Then After 03:30 pm _ Mathura the birth Bhumi ( Mr Krushn god the birth place ) then After at own expense love Temple Darshan to go will be At 08:00 PM Hotel return Then After food Hotel on will be Then After Hotel on relax",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Returned Aagra to Ahmedabad",
        "description": "At 06:00 AM Hotel Arrival ( J According to room will get that According to manager by room of to explode done will come .) Then After Tea – Breakfast to do Vrindavan SiteScene ( self-expense Rickshaw by to do will be ). Ranganathji temple , Govind – G temple , Mirabai ashram , Nidhivan ( where Mr Krishna god at night Rash play is .) , Dau – G of mansion Then After Hotel return Afternoon of food will be Then After 03:30 pm _ Mathura the birth Bhumi ( Mr Krushn god the birth place ) then After at own expense love Temple Darshan to go will be At 08:00 PM Hotel return Then After food Hotel on will be Then After Hotel on relax",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "2 Persons Sharing Room",
        "price": "₹25,999",
        "rawPrice": 25999
      },
      {
        "name": "Extra Persons Sharing Room",
        "price": "₹22,999",
        "rawPrice": 22999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹19,999",
        "rawPrice": 19999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "delhi-haridwar-gokul-mathura-vrundavan"
  },
  "chardham-yatra": {
    "title": "Delux Chardham",
    "name": "Chardham Yatra",
    "slogan": "Chardham Yatra Tour Packages Trip Duration 12 Days Accommodation Stay at Haridwar, Barkot, Uttarkashi, Guptkashi, Kedarnath, Badrinath & Rudraprayag Days Meals 10 Breakfast 10 Dinner Group Size Flights All flights included Transportation All Transfers Included Tour Highlights.",
    "category": "domestic",
    "duration": "12 Days / 11 Nights",
    "badge": "",
    "price": "₹27,999 PP",
    "rawPrice": 27999,
    "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800",
    "highlights": [
      "Arrival in Delhi & Transfer to Haridwar",
      "Barkot to Yamunotri Temple Darshan",
      "Uttarkashi to Gangotri Temple Darshan",
      "Guptkashi to Sacred Kedarnath Dham & Badrinath"
],
    "description": "Chardham Yatra Tour Packages Trip Duration 12 Days Accommodation Stay at Haridwar, Barkot, Uttarkashi, Guptkashi, Kedarnath, Badrinath & Rudraprayag Days Meals 10 Breakfast 10 Dinner Group Size Flights All flights included Transportation All Transfers Included Tour Highlights",
    "location": "Arrival in Delhi & Haridwar",
    "bestTimeToVisit": "",
    "groupSize": "20 - 30 Guests",
    "included": [],
    "excluded": [],
    "itinerary": [
      {
            "day": 1,
            "title": "Arrival in Delhi & Drive to Haridwar (200 km)",
            "description": "Arrive at New Delhi Airport / Railway Station. Meet our tour captain and drive to the holy city of Haridwar (approx. 200 km). Check in at the hotel and visit Har Ki Pauri in the evening to witness the sacred Ganga Aarti. Dinner and overnight stay in Haridwar.",
            "meals": "Lunch,Dinner",
            "stay": "Overnight in Haridwar"
      },
      {
            "day": 2,
            "title": "Haridwar to Barkot via Mussoorie (170 km)",
            "description": "Early morning drive to Barkot. En route, enjoy the scenic views of Kempty Falls in Mussoorie (subject to traffic and timing). Stop for lunch on the way. Arrive in Barkot, check in at the hotel, and relax to prepare for the Yamunotri trek the next day. Dinner and overnight stay in Barkot.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Barkot"
      },
      {
            "day": 3,
            "title": "Barkot to Yamunotri Temple Darshan & Return",
            "description": "Early morning drive to Janki Chatti / Phool Chatti. Begin the 6 km trek to the sacred Yamunotri Dham (by foot, pony, or doli). Cook rice in the natural hot springs of Surya Kund as Prasad, offer prayers at Divya Shila, take a holy dip in Jamunabai Kund, and seek the divine blessings of Goddess Yamuna. Trek back to Janki Chatti and drive back to Barkot for dinner and overnight stay.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Barkot"
      },
      {
            "day": 4,
            "title": "Barkot to Uttarkashi (100 km)",
            "description": "After breakfast, drive to Uttarkashi along the Bhagirathi River. Check in at the hotel and visit the revered Kashi Vishwanath Temple and Shakti Temple in Uttarkashi. Dinner and overnight stay in Uttarkashi.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Uttarkashi"
      },
      {
            "day": 5,
            "title": "Uttarkashi to Gangotri Temple Darshan & Return",
            "description": "Early morning drive to Gangotri Dham along the scenic Bhagirathi River. Offer special pooja and darshan at the sacred Gangotri Temple dedicated to Goddess Ganga. After taking darshan and lunch, drive back to Uttarkashi for dinner and overnight stay.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Uttarkashi"
      },
      {
            "day": 6,
            "title": "Uttarkashi to Guptkashi (220 km)",
            "description": "Early morning drive to Guptkashi via Tehri Dam and the Mandakini River valley. Enjoy lunch en route. Arrive in Guptkashi, check in at the hotel, and visit the ancient Vishwanath Temple and Ardhnareshwar Temple. Dinner and overnight stay in Guptkashi.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Guptkashi"
      },
      {
            "day": 7,
            "title": "Guptkashi to Kedarnath Dham Darshan",
            "description": "Early morning departure for Kedarnath Dham. Helicopter passengers transfer to the helipad for their flight to Kedarnath. Trekking pilgrims proceed to Sonprayag/Gaurikund and begin the sacred 16 km trek to Kedarnath. Perform pooja and darshan at the holy Kedarnath Jyotirlinga temple. Return to Guptkashi for dinner and overnight stay (or self-managed overnight stay at Kedarnath for those doing an overnight halt).",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Guptkashi / Kedarnath"
      },
      {
            "day": 8,
            "title": "Guptkashi Rest & Local Excursion",
            "description": "Day at leisure in Guptkashi for relaxation and recovery after the Kedarnath trek. Pilgrims who visited by helicopter can visit Gaurikund or explore the local temple town. Dinner and overnight stay in Guptkashi.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Guptkashi"
      },
      {
            "day": 9,
            "title": "Guptkashi to Badrinath Dham (200 km)",
            "description": "Early morning drive to Badrinath Dham via Joshimath. Arrive in Badrinath and check in at the hotel. Take a holy dip in the natural hot sulphur springs of Tapt Kund and attend the evening Aarti and Darshan of Lord Badrivishal. Dinner and overnight stay in Badrinath.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Badrinath"
      },
      {
            "day": 10,
            "title": "Badrinath Sightseeing, Mana Village to Rudraprayag",
            "description": "Morning darshan at Badrinath Temple followed by sightseeing in Mana Village (the last Indian village before Tibet), including Vyas Gufa, Ganesh Gufa, Bhim Pul, and the origin of Saraswati River. After lunch, drive to Rudraprayag. Check in at the hotel for dinner and overnight stay.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Rudraprayag"
      },
      {
            "day": 11,
            "title": "Rudraprayag to Rishikesh & Haridwar (166 km)",
            "description": "Drive from Rudraprayag to Rishikesh. Visit the iconic Lakshman Jhula, Ram Jhula, and Triveni Ghat. Continue to Haridwar for dinner and an overnight stay.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Haridwar"
      },
      {
            "day": 12,
            "title": "Haridwar to New Delhi Departure (206 km)",
            "description": "After breakfast, depart for New Delhi. Transfer to New Delhi Airport or Railway Station for your onward journey with divine memories of the Chardham Yatra.",
            "meals": "Breakfast",
            "stay": "Departure"
      }
],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹27,999",
        "rawPrice": 27999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹29,999",
        "rawPrice": 29999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹32,999",
        "rawPrice": 32999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹21,999",
        "rawPrice": 21999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "chardham-yatra"
  },
  "nepal-muktinath": {
    "title": "Royal Nepal Muktinath",
    "name": "Nepal Muktinath",
    "slogan": "Embark on a divine 13-day spiritual pilgrimage across Varanasi (Kashi Vishwanath), Nepal, Muktinath (Pulhashram), Ayodhya, and Chhapaiya.",
    "category": "domestic",
    "duration": "13 Days / 12 Nights",
    "badge": "",
    "price": "₹31,999 PP",
    "rawPrice": 31999,
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800",
    "highlights": [
      "Arrival in Banaras & Kashi Darshan",
      "Banaras to Sonauli Border",
      "Sonauli to Kathmandu",
      "Kathmandu Local Sightseeing"
    ],
    "description": "Embark on a divine 13-day spiritual pilgrimage across Varanasi (Kashi Vishwanath), Nepal, Muktinath (Pulhashram), Ayodhya, and Chhapaiya. This tour takes you to the holy site of Muktinath where Lord Swaminarayan performed penance as Neelkanth Varni, the capital Kathmandu, the scenic Pokhara valley, the birthplace of Lord Rama in Ayodhya, and Chhapaiya. Traveling in comfortable coach buses with delicious meals served by our personal chefs, this package offers deep spiritual exploration and ultimate comfort.",
    "location": "Arrival in Banaras & Kashi Darshan",
    "bestTimeToVisit": "",
    "groupSize": "20 - 30 Guests",
    "included": [
      "Travel by comfortable A.C. coach from Banaras to Ayodhya",
      "Local sharing Jeep / sumo / flight transfers for Jomsom/Muktinath",
      "Accommodation in premium, well-maintained hotels (A.C. rooms at selected locations)",
      "Delicious, hygienic meals prepared by our personal cooks",
      "Services of a professional and experienced tour manager"
    ],
    "excluded": [
      "Railway or Air tickets to Banaras / from Varanasi",
      "Lunch meals, mineral water, and personal expenses",
      "Manakamana Ropeway (cable car) entry tickets",
      "Fewa Lake boating, casino entry fees, and museum entry tickets",
      "Sanga Shiva temple and Galeshwor local sightseeing entries"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Banaras & Kashi Darshan",
        "description": "Arrive in Varanasi (Banaras) according to your convenience. Check in at the hotel. In the afternoon, visit the holy Kashi Vishwanath temple for Darshan, followed by a holy bath and Ganga Aarti/Puja at the ghats (on self-expense). Dinner and overnight stay in Banaras (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Banaras to Sonauli Border",
        "description": "After breakfast, check out and drive to the Sonauli Border (approx. 330 km, 10 hours). Arrive in Sonauli, check in at the hotel and enjoy leisure time. Dinner and overnight stay in Sonauli.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Sonauli to Kathmandu",
        "description": "After breakfast, checkout and proceed for the scenic drive to Kathmandu, the capital of Nepal (approx. 350 km, 10-12 hours). Arrive in Kathmandu in the evening, check in at the hotel. Dinner and overnight stay in Kathmandu.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Kathmandu Local Sightseeing",
        "description": "After breakfast, visit Budhanilkantha Temple, Buddhist Monastery, Pashupatinath Temple, and Swayambhunath Temple. Return to the hotel for lunch. Optional casino visit in Thamel in the evening (on self-expense). Dinner and overnight stay in Kathmandu.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Bhaktapur Patan & Sanga Shiva Statue Visit",
        "description": "After breakfast, explore Bhaktapur Patan, famous for its magnificent wood carvings and temples, and visit the tall Sanga Shiva Statue (self-expense). Dinner and overnight stay in Kathmandu.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Kathmandu to Pokhara via Manakamana Temple",
        "description": "After breakfast, checkout and drive to Pokhara (approx. 225 km, 8 hours). Stop en-route to visit Manakamana Devi Temple via ropeway (cable car on self-expense). Check in at the hotel in Pokhara. Dinner and overnight stay in Pokhara.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Pokhara to Muktinath (Jomsom)",
        "description": "Early morning checkout. Transfer by road or internal flight from Pokhara to Jomsom (Muktinath / Pulhashram - the holy land where Lord Swaminarayan penanced as Neelkanth Varni). Visit the sacred Muktinath temple for Darshan. Dinner and overnight stay in Jomsom.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Jomsom to Pokhara via Galeshwor Mahadev",
        "description": "Early morning checkout and return to Pokhara. Stop en-route to visit Galeshwor Mahadev and Tatopani (hot springs). Check in at the hotel in Pokhara. Dinner and overnight stay in Pokhara.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 9,
        "title": "Pokhara Local Sightseeing",
        "description": "After breakfast, enjoy local sightseeing in Pokhara. Visit Fewa Lake, Davis Falls, Gupteshwor Mahadev Temple, and the Gurkha Museum (self-expense). Dinner and overnight stay in Pokhara.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 10,
        "title": "Pokhara to Ayodhya (India)",
        "description": "Early morning checkout, start the long drive from Pokhara crossing back to Ayodhya (approx. 380 km, 12 hours). Check in at the hotel in Ayodhya. Dinner and overnight stay in Ayodhya (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 11,
        "title": "Ayodhya to Chhapaiya Return Excursion",
        "description": "After breakfast, proceed for a day trip to Chhapaiya, the sacred birthplace of Lord Swaminarayan (approx. 40 km, 2-3 hours return). Return to Ayodhya in the afternoon, followed by leisure time. Dinner and overnight stay in Ayodhya (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 12,
        "title": "Ayodhya to Allahabad Triveni Sangam & Banaras",
        "description": "After breakfast, checkout and proceed to Allahabad (Prayagraj) for a holy bath at Triveni Sangam (approx. 170 km, 5 hours). Continue the drive back to Banaras (approx. 120 km, 4 hours). Check in at the hotel. Dinner and overnight stay in Banaras (A.C. Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 13,
        "title": "Varanasi Departure",
        "description": "After breakfast, check out of the hotel and transfer to Varanasi/Mughalsarai railway station or airport as per your convenience for your return journey to your hometown. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹31,999",
        "rawPrice": 31999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹33,999",
        "rawPrice": 33999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹35,999",
        "rawPrice": 35999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹24,999",
        "rawPrice": 24999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "nepal-muktinath"
  },
  "jagannath-puri-gangasagar-tour": {
    "title": "Delux Puri Gangasagear",
    "name": "Jagannath Puri & Gangasagar Tour",
    "slogan": "Embark on a sacred 6-day pilgrimage covering the holy sites of Champaran, the famous coastal Jagannath Puri, Konark Sun Temple, Bhubaneswar, the cultural city of Kolkata, and the holy confluence of Gangasagar.",
    "category": "domestic",
    "duration": "6 Days / 5 Nights",
    "badge": "",
    "price": "₹17,999 PP",
    "rawPrice": 17999,
    "image": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800",
    "highlights": [
      "Arrival in Raipur & Travel to Champaran",
      "Champaran Baithakji Sewa & Train to Jagannath Puri",
      "Arrival in Jagannath Puri & Temple Darshan",
      "Konark Sun Temple, Bhubaneswar & Train to Kolkata"
    ],
    "description": "Embark on a sacred 6-day pilgrimage covering the holy sites of Champaran, the famous coastal Jagannath Puri, Konark Sun Temple, Bhubaneswar, the cultural city of Kolkata, and the holy confluence of Gangasagar. This tour includes comfortable rail travel, AC hotel accommodations in Puri and Kolkata, guided sightseeing, and hot meals prepared by our personal Cooks.",
    "location": "Arrival in Raipur & Travel to Champaran",
    "bestTimeToVisit": "",
    "groupSize": "15 - 25 Guests",
    "included": [
      "Pick up from Raipur Station and drops at Kolkata Station / Airport",
      "Local non-AC vehicle transport for all sightseeing transfers",
      "Accommodation in premium, well-maintained hotels (AC rooms at Puri and Kolkata)",
      "Delicious, hygienic meals prepared by our personal cooks",
      "Services of a professional and experienced tour manager"
    ],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Raipur & Travel to Champaran",
        "description": "Arrive at Raipur Railway Station according to your convenience. Meet our representative and transfer to Champaran (approx. 40 km, 2 hours). Check in at the hotel and relax. Dinner and overnight stay in Champaran.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Champaran Baithakji Sewa & Train to Jagannath Puri",
        "description": "After breakfast, visit Mahaprabhu Shri Vallabhacharya's birthplace and Chhathi Baithakji. Attend Sewa-puja, Jhariji, Charan Sparsh, and Satsangs. In the afternoon, transfer to Raipur Railway Station to board the train to Jagannath Puri (train tickets on self-expense). Overnight train journey.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Arrival in Jagannath Puri & Temple Darshan",
        "description": "Morning arrival at Jagannath Puri Railway Station. Check in at the AC hotel. Take a sacred sea bath and visit the iconic Jagannath Temple for Darshan, followed by Mahaprabhu Baithakji (Jhariji, Charan Sparsh). Dinner and overnight stay in Puri (AC Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Konark Sun Temple, Bhubaneswar & Train to Kolkata",
        "description": "After breakfast, checkout and visit Chandrabhaga Beach and Konark Sun Temple. Drive to Bhubaneswar to visit Dhauligiri (Buddhist Stupa), Lingaraj Temple, and Sakshi Gopal Temple. In the evening, transfer to the railway station to board the train to Kolkata (train on self-expense). Overnight train journey.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Kolkata Local Sightseeing",
        "description": "Morning arrival at Howrah (Kolkata) Railway Station. Check in at the AC hotel. In the afternoon, visit Howrah Bridge, Belur Math, Dakshineswar Kali Temple, and the Victoria Memorial. Dinner and overnight stay in Kolkata (AC Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Gangasagar Holy Confluence & Departure",
        "description": "Early morning (5:00 AM) drive to Gangasagar (approx. 130 km, 4 hours). Board the local steamer to Sagar Island. Take a holy dip at the confluence of the Ganges and the Bay of Bengal, and visit Kapil Muni Ashram and Mahaprabhu Baithakji. Return to Kolkata in the evening, transfer to railway station / airport for return journey. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "2 Persons Sharing Room",
        "price": "₹19,999",
        "rawPrice": 19999
      },
      {
        "name": "Extra Persons Sharing Room",
        "price": "₹17,999",
        "rawPrice": 17999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹14,999",
        "rawPrice": 14999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "jagannath-puri-gangasagar-tour"
  },
  "go-goa-vacation-package": {
    "title": "Delux Go Goa",
    "name": "Go Goa Vacation Package",
    "slogan": "Enjoy your summer holidays in Goa with this deluxe 5-day vacation package.",
    "category": "domestic",
    "duration": "4 Days / 3 Nights",
    "badge": "",
    "price": "₹14,999 PP",
    "rawPrice": 14999,
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800",
    "highlights": [
      "Goa Arrival & Belo Cabana Check-In",
      "North Goa Beaches & Forts Tour",
      "South Goa Temples & River Cruise Tour",
      "Dudhsagar Waterfalls Day Excursion"
    ],
    "description": "Enjoy your summer holidays in Goa with this deluxe 5-day vacation package. Stay in premium deluxe A.C. rooms at the 3-star Belo Cabana Resort in Calangute, North Goa. This tour package includes railway station or airport pick-up and drops, welcome drinks, daily breakfast and buffet dinners, and dedicated days for North Goa sightseeing, South Goa sightseeing, and Dudhsagar Waterfalls.",
    "location": "Goa Arrival & Belo Cabana Check-In",
    "bestTimeToVisit": "",
    "groupSize": "15 - 25 Guests",
    "included": [
      "Pick up and drop from Goa Railway Station / Airport (sharing coach)",
      "Accommodation in Deluxe A.C. rooms at Belo Cabana Resort (3-Star)",
      "Delicious food: 4 breakfasts and 4 buffet dinners at resort",
      "Sightseeing tours: 1 Day North Goa, 1 Day South Goa, 1 Day Dudhsagar Falls (sharing coach)",
      "Welcome drink on arrival at the resort"
    ],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Goa Arrival & Belo Cabana Check-In",
        "description": "Arrive at Goa railway station or airport. Meet our representative and transfer to Belo Cabana Resort in Calangute (on sharing basis). Check in around 1:00 PM. Enjoy the welcome drink on arrival and spend the afternoon at leisure. Dinner and overnight stay in Calangute (AC Room).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "North Goa Beaches & Forts Tour",
        "description": "After breakfast, depart for a full day of North Goa sightseeing by sharing coach. Visit Calangute Beach, Baga Beach, Anjuna Beach, Candolim Beach, Fort Aguada, and Sinquerim Fort. Enjoy an optional Dolphin Show (ticket extra). Return to resort for buffet dinner and overnight stay.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "South Goa Temples & River Cruise Tour",
        "description": "After breakfast, proceed for South Goa sightseeing by sharing coach. Visit the historic Mangueshi Temple, old churches of San Francisco, Dona Paula Beach, and Miramar Beach. Spend the evening enjoying the Mandovi River Cruise (ticket extra). Buffet dinner and overnight stay at Belo Cabana.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Dudhsagar Waterfalls Day Excursion",
        "description": "After breakfast, set off for a scenic excursion to the magnificent Dudhsagar Waterfalls. Enjoy the mountain landscapes and jeep safaris (entry tickets extra). Return to the resort in the evening. Buffet dinner and overnight stay.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Departure from Goa",
        "description": "After breakfast, check out of the resort at 10:00 AM. Board the sharing vehicle for transfer to Goa airport or railway station for your return journey home. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "2 Persons Sharing Room",
        "price": "₹16,999",
        "rawPrice": 16999
      },
      {
        "name": "Extra Persons Sharing Room",
        "price": "₹14,999",
        "rawPrice": 14999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹12,999",
        "rawPrice": 12999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "go-goa-vacation-package"
  },
  "bhutan-himalayan": {
    "title": "Royal Bhutan",
    "name": "Bhutan Himalayan",
    "slogan": "Discover the Land of the Thunder Dragon on this scenic 9-day Bhutan Himalayan Escape.",
    "category": "domestic",
    "duration": "9 Days / 8 Nights",
    "badge": "",
    "price": "₹42,999 PP",
    "rawPrice": 42999,
    "image": "https://images.unsplash.com/photo-1544811096-89a14f806d55?q=80&w=800",
    "highlights": [
      "NJP / Bagdogra to Phuentsholing Border",
      "Formalities & Travel to Thimphu (Capital City)",
      "Thimphu Local Sightseeing",
      "Thimphu to Punakha via Dochu-La Pass"
    ],
    "description": "Discover the Land of the Thunder Dragon on this scenic 9-day Bhutan Himalayan Escape. Your tour covers the entry town of Phuentsholing, the bustling capital Thimphu, the majestic rivers and dzongs of Punakha, and the historical valleys of Paro, culminating in the iconic hike to Tiger’s Nest Monastery. Traveling in comfortable local vehicles (Toyota Coaster), this package includes premium hotel stays, hot meals served by our personal cooks, and complete guided sightseeing.",
    "location": "NJP / Bagdogra to Phuentsholing Border",
    "bestTimeToVisit": "",
    "groupSize": "15 - 25 Guests",
    "included": [
      "Pick up and drop from NJP Railway Station / Bagdogra Airport",
      "Local transport by sharing Toyota Coaster / local vehicles in Bhutan",
      "Accommodation in premium, well-maintained hotels",
      "Delicious, hygienic meals prepared by our personal cooks",
      "Services of a professional and experienced tour manager"
    ],
    "excluded": [
      "Railway or Air tickets to/from NJP or Bagdogra",
      "Lunch meals, mineral water, and personal expenses",
      "River rafting in Punakha & Tiger's Nest entry/pony fees",
      "Local sightseeing entry tickets, museum passes, and Chele-La Pass vehicle permits",
      "Applicable GST charges extra"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "NJP / Bagdogra to Phuentsholing Border",
        "description": "Arrive at New Jalpaiguri (NJP) Railway Station or Bagdogra Airport (IXB). Meet our representative and start the drive to the Bhutan border town of Phuentsholing (approx. 170 km, 6-7 hours). Arrive in the evening, check in at the hotel. Dinner and overnight stay in Phuentsholing.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Formalities & Travel to Thimphu (Capital City)",
        "description": "After breakfast, complete the immigration and entry permit formalities at the border. Start the journey to Thimphu. In the evening, visit Buddha Point (Buddha Dordenma) for views of Thimphu. Enjoy free time/shopping. Dinner and overnight stay in Thimphu.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Thimphu Local Sightseeing",
        "description": "Sightseeing begins from 12:00 PM. Visit the National Library, Heritage Museum, Memorial Chorten, Motithang Takin Preserve (closed on Mondays), and the Art & Craft School. Free time in the evening. Dinner and overnight stay in Thimphu.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Thimphu to Punakha via Dochu-La Pass",
        "description": "After breakfast, travel to Punakha via Dochu-La Pass (3,088 m / 10,130 ft). Enjoy river rafting en-route (on self-expense). Arrive in Punakha and visit Chimi Lhakhang (the fertility temple) and Punakha Dzong. Dinner and overnight stay in Punakha.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Punakha to Paro via Simtokha Dzong",
        "description": "After breakfast, check out and drive to Paro. Take photos of local villages and scenic spots. In the afternoon, visit Simtokha Dzong. Check in at the Paro hotel, followed by free time. Dinner and overnight stay in Paro.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Paro Local Sightseeing",
        "description": "After breakfast, visit Drukgyel Dzong ruins (16 km north of Paro), Kyichu Lhakhang temple (one of the oldest temples in Bhutan), and the Rinpung Dzong. Dinner and overnight stay in Paro.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Tiger's Nest Hike (Paro Taktsang)",
        "description": "After breakfast, proceed to hike up to the spectacular Paro Taktsang (Tiger's Nest Monastery) built on a cliffside at 3,100 m (on self-expense). Alternatively, take a scenic drive to Chele-La Pass (optional, self-expense), the highest motorable road in Bhutan (3,988 m). Dinner and overnight stay in Paro.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Paro to Phuentsholing",
        "description": "After breakfast, checkout and drive back to Phuentsholing/Jaigaon (approx. 170 km, 7-8 hours). Check in at the hotel. Dinner and overnight stay in Phuentsholing.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 9,
        "title": "Phuentsholing to NJP / Bagdogra Departure",
        "description": "After breakfast, check out and transfer back to NJP Railway Station or Bagdogra Airport (approx. 170 km, 6 hours) for your return journey home. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹42,999",
        "rawPrice": 42999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹45,999",
        "rawPrice": 45999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹47,999",
        "rawPrice": 47999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹32,999",
        "rawPrice": 32999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "bhutan-himalayan"
  },
  "assam-meghalaya-tour": {
    "title": "Royal Assam",
    "name": "Assam Meghalaya Tour",
    "slogan": "At Bharat Darshan Travels, we have crafted an exciting and unforgettable 12-day journey that takes you through some of the most beautiful destinations in Northeast India.",
    "category": "domestic",
    "duration": "12 Days / 11 Nights",
    "badge": "",
    "price": "₹47,999 PP",
    "rawPrice": 47999,
    "image": "https://images.unsplash.com/photo-1616091093714-c64882e9ab55?q=80&w=800",
    "highlights": [
      "Arrive Guwahati - Transfer to Hotel",
      "Guwahati to Bomdila",
      "Bomdila to Tawang via Sela Pass",
      "Tawang - Bumla Pass & Madhuri Lake Excursion"
    ],
    "description": "At Bharat Darshan Travels, we have crafted an exciting and unforgettable 12-day journey that takes you through some of the most beautiful destinations in Northeast India. Begin your adventure in Guwahati, where you will explore this lively city before heading towards the tranquil hills of Bomdila, renowned for its Buddhist monasteries and cool climate. From there, experience the majestic beauty of Tawang, with its mesmerizing valleys, serene lakes, and rich history, including the famous Bumla Pass and the Tawang War Memorial.\n\nContinue your journey to Kaziranga National Park, a UNESCO World Heritage Site where you’ll have the chance to spot the majestic One-Horned Rhinoceros and other incredible wildlife. The tour then takes you to the serene and scenic Shillong, often referred to as the Scotland of the East, with its beautiful landscapes and waterfalls. A day trip to Cherrapunjee offers a glimpse into one of the wettest places on Earth, while another day excursion to Mawlynnong and Dawki will let you explore the cleanest village in Asia and witness the breathtaking crystal-clear river.\n\nYour journey will conclude in Guwahati, where you will visit the sacred Kamakhya Temple and enjoy a peaceful sunset cruise on the Brahmaputra River. Throughout the tour, you’ll be treated to stunning natural beauty, cultural highlights, and unforgettable experiences, all arranged with care and dedication by Bharat Darshan Travels.",
    "location": "Arrive Guwahati - Transfer to Hotel",
    "bestTimeToVisit": "",
    "groupSize": "15+ Guests",
    "included": [
      "11 Nights accommodation on sharing basis (Base category rooms)",
      "Meal Plan: Daily Breakfast & Dinner (Pure Vegetarian meals prepared by our own catering kitchen)",
      "AC Vehicles for transfers & sightseeing on point-to-point basis (AC will not work in hills, carrier not included)",
      "Daily 1 liter packaged drinking water bottle per head",
      "One round of Jeep Safari at Kaziranga National Park",
      "Inner Line Permit (ILP) assistance for Tawang entry",
      "Rates are valid for Indian Nationals only"
    ],
    "excluded": [
      "Airfare / Train fare (can be arranged on request)",
      "Entry fees, Camera permits & local guide charges",
      "Bumla Pass local vehicle charges (approx. Rs. 5000 per local SUV, to be shared)",
      "Local vehicle hires, ferry, rafting, boating, cruise & elephant safaris",
      "GST 5% + TCS as applicable",
      "Anything not mentioned in the Inclusions list"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Guwahati - Transfer to Hotel",
        "description": "Arrive at Guwahati airport or railway station and transfer to the hotel. Check-in and refresh. Enjoy the rest of the day at leisure to explore the local markets. Overnight stay at Guwahati. (Dinner Included)",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Guwahati to Bomdila",
        "description": "After breakfast, transfer to Bomdila. Bomdila is the headquarters of the West Kameng District of Arunachal Pradesh, famous for its Buddhist monasteries, apple orchards, and cool mountain climate. Check in to your hotel on arrival. Overnight stay at Bomdila. (Breakfast & Dinner Included)",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Bomdila to Tawang via Sela Pass",
        "description": "After breakfast, drive to Tawang. En route witness the snow-capped Sela Pass situated at 14,000 ft and pay homage at the Jaswant Garh War Memorial (commemorating the lone battle fought by Indian heroes during the 1962 war). Tawang is situated at 3,500m and offers breathtaking views of the Tawang Chu River and surrounding ranges. Overnight stay at Tawang. (Breakfast & Dinner Included)",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Tawang - Bumla Pass & Madhuri Lake Excursion",
        "description": "After breakfast, proceed for a day excursion to Pankang Teng Tso Lake (PT Tso) and Shonga-tser Lake (popularly known as Madhuri Lake, formed after the 1971 earthquake). Later, drive up to the Indo-China border at Bumla Pass (16,000 ft). In the evening, visit the Tawang War Memorial and witness the light & sound show. Overnight stay at Tawang. (Breakfast & Dinner Included) *Note: Bumla Pass permits and access are subject to weather conditions.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Tawang to Bomdila",
        "description": "After breakfast, checkout and drive back to Bomdila. Enjoy the scenic mountain drive. On arrival at Bomdila, check in to your hotel and spend the evening visiting local monasteries. Overnight stay at Bomdila. (Breakfast & Dinner Included)",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Bomdila to Kaziranga National Park",
        "description": "Early breakfast and transfer to Kaziranga National Park, a UNESCO World Heritage Site famous for the Great Indian One-Horned Rhinoceros. The landscape features lush forests, tall elephant grass, marshes, and shallow pools. On arrival, check-in to your hotel. Overnight stay at Kaziranga. (Breakfast & Dinner Included)",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Kaziranga Jeep Safari & Orchid Park",
        "description": "Embark on an early morning Jeep Safari in the central or western range of Kaziranga National Park. Return for breakfast, then visit the Kaziranga National Orchid and Biodiversity Park to explore regional flora. Overnight stay at Kaziranga. (Breakfast & Dinner Included)",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Kaziranga to Shillong",
        "description": "After breakfast, transfer to Shillong, the capital of Meghalaya. Nestled in pine-covered hills, Shillong has a mild climate and is known as the \"Scotland of the East\". Stop at the beautiful Umiam Lake viewpoint en route. Check in to your hotel. Overnight stay at Shillong. (Breakfast & Dinner Included)",
        "meals": "",
        "stay": ""
      },
      {
        "day": 9,
        "title": "Shillong - Cherrapunjee Day Trip",
        "description": "Breakfast at the hotel and drive to Cherrapunjee (Sohra), one of the wettest places on earth. Explore Seven Sisters Falls, Nohkalikai Falls, Mawsmai Cave, and Eco Park. Return to Shillong, visiting Elephant Falls en route. Overnight stay at Shillong. (Breakfast & Dinner Included)",
        "meals": "",
        "stay": ""
      },
      {
        "day": 10,
        "title": "Shillong - Mawlynnong & Dawki Day Trip",
        "description": "Morning excursion to Mawlynnong, Asia's cleanest village. Explore the Single-Decker Living Root Bridge, Sky Walk, and Natural Balancing Rock. Proceed to Dawki and witness the crystal-clear waters of the Umngot River (bordering Bangladesh). Return to Shillong for overnight stay. (Breakfast & Dinner Included)",
        "meals": "",
        "stay": ""
      },
      {
        "day": 11,
        "title": "Shillong to Guwahati - Sunset Cruise",
        "description": "After breakfast, transfer back to Guwahati. On arrival, visit the highly revered Kamakhya Temple on Nilachal Hills. In the evening, enjoy a relaxing Sunset Cruise on the mighty Brahmaputra River. Overnight stay at Guwahati. (Breakfast & Dinner Included)",
        "meals": "",
        "stay": ""
      },
      {
        "day": 12,
        "title": "Guwahati - Departure",
        "description": "After breakfast, check out of your hotel. Bid farewell to Northeast India and transfer to Guwahati Airport/Railway Station for your onward journey home with wonderful memories. (Breakfast Included)",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "4 Persons Sharing Room",
        "price": "₹47,999",
        "rawPrice": 47999
      },
      {
        "name": "3 Persons Sharing Room",
        "price": "₹49,999",
        "rawPrice": 49999
      },
      {
        "name": "2 Persons Sharing Room",
        "price": "₹51,999",
        "rawPrice": 51999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹39,999",
        "rawPrice": 39999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "assam-meghalaya-tour"
  },
  "statue-of-unity": {
    "title": "Statue Of Unity",
    "name": "Statue of Unity",
    "slogan": "",
    "category": "domestic",
    "duration": "5 Days / 4 Nights",
    "badge": "",
    "price": "₹24,999 PP",
    "rawPrice": 24999,
    "image": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800",
    "highlights": [
      "Ahmedabad to Statue of Unity Transfer",
      "Jungle Safari, Zarwani Eco Tour & Ekta Cruise",
      "Poicha Nilkanthdham Temple & Vadodara",
      "Laxmi Vilas Palace & Ahmedabad Heritage Tour"
],
    "description": "",
    "location": "Statue of Unity",
    "bestTimeToVisit": "",
    "groupSize": "",
    "included": [],
    "excluded": [],
    "itinerary": [
      {
            "day": 1,
            "title": "Ahmedabad to Statue of Unity & Evening Laser Show",
            "description": "Pick up from your Ahmedabad address and embark on a scenic drive to the Statue of Unity. Upon arrival, check in at the hotel and freshen up. Proceed for the day's scheduled sightseeing:\n\n• 02:30 PM – 04:00 PM: Visit Sardar Sarovar Dam View Point, Selfie Point, and Valley of Flowers (on SIC basis).\n• 04:00 PM – 06:00 PM: Visit the iconic Statue of Unity & Viewing Gallery (on SIC basis, subject to slot availability).\n• 06:00 PM – 06:45 PM: Light evening refreshments.\n• 06:45 PM – 08:00 PM: Experience the breathtaking Statue of Unity Laser Light & Sound Show (on SIC basis).\n\nEnjoy a delicious dinner and a comfortable overnight stay at the hotel.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Kevadia / Statue of Unity"
      },
      {
            "day": 2,
            "title": "Statue of Unity Sightseeing, Jungle Safari & Ekta Cruise",
            "description": "After breakfast, check out from the hotel and proceed for an exciting full-day sightseeing tour as per the schedule:\n\n• 08:00 AM – 10:00 AM: Explore the Jungle Safari & Zoological Park.\n• 10:00 AM – 12:00 PM: Khalwani to Zarwani Eco Tourism Tour.\n• 12:30 PM – 02:00 PM: Lunch Break.\n• 02:00 PM – 04:00 PM: Leisure & Rest Time.\n• 04:00 PM – 06:00 PM: Scenic Ekta Cruise Ride on the Narmada River.\n• 06:00 PM – 07:30 PM: Walk through the illuminated Unity Glow Garden.\n• 07:30 PM – 08:30 PM: Attend the divine Narmada Maha Aarti.\n• 09:00 PM onwards: Enjoy dinner and an overnight stay at the hotel.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Kevadia / Statue of Unity"
      },
      {
            "day": 3,
            "title": "Statue of Unity to Poicha Swaminarayan Temple & Vadodara",
            "description": "After breakfast, check out from the hotel and proceed to Poicha to visit the magnificent Nilkanthdham Swaminarayan Temple. Situated peacefully along the banks of the Narmada River, Nilkanthdham is known for its divine architecture, serene spiritual atmosphere, and lush natural surroundings. After darshan and exploring the temple campus, drive to Vadodara. Check in at the hotel for dinner and an overnight stay.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Vadodara"
      },
      {
            "day": 4,
            "title": "Vadodara Sightseeing / Pavagadh Mahakali Darshan & Return to Ahmedabad",
            "description": "After breakfast, explore Vadodara's prime attractions including the Laxmi Vilas Palace, Maharaja Fateh Singh Museum, and Sayaji Baug. Alternatively, visit the sacred Pavagadh Hill & Kalika Mata Temple (one of the 51 Shaktipeeths and a UNESCO World Heritage site, accessible by ropeway). Later in the evening, proceed back to Ahmedabad for departure drop-off at the airport or railway station.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Ahmedabad"
      },
      {
            "day": 5,
            "title": "Ahmedabad Heritage Sightseeing & Departure",
            "description": "After breakfast, proceed for Ahmedabad local sightseeing including Sabarmati Gandhi Ashram, Hathisingh Jain Temple, Sidi Saiyyed Mosque, Adalaj Stepwell, and Gandhinagar Akshardham Temple. After an enriching tour and dinner, transfer to Ahmedabad Airport or Railway Station for your onward journey.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Departure"
      }
],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "2 Persons Sharing Room",
        "price": "₹29,999",
        "rawPrice": 29999
      },
      {
        "name": "Extra Persons Sharing Room",
        "price": "₹24,999",
        "rawPrice": 24999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹19,999",
        "rawPrice": 19999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "statue-of-unity"
  },
  "rann-utsav-package": {
    "title": "Ran Utsav",
    "name": "Family Rann Utsav Package",
    "slogan": "Experience the white salt desert of Kutch, the historical town of Bhuj, and the ancient excavations of Dholavira.",
    "category": "domestic",
    "duration": "4 Days / 3 Nights",
    "badge": "Tent City Special",
    "price": "₹19,999 PP",
    "rawPrice": 19999,
    "image": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800",
    "highlights": [
      "03 Nights In Tent City Days",
      "Complimentary Kalo Dungar & Gandhi Nu Gam Tour",
      "Excavation Site & Archaeology Museum in Dholavira",
      "Experience Road to Heaven to Dholavira"
    ],
    "description": "Embark on an unforgettable 4-day journey to the breathtaking White Rann of Kutch and the historic archaeological marvels of Dholavira. Stay in the luxury Tent City, witness cultural programs under the moonlit sky, and explore the ancient Indus Valley Civilization sites. Travels include AC coach transfers from Bhuj, accommodation, sightseeing, and daily meals prepared fresh by dining staff.",
    "location": "Bhuj, Gujarat",
    "bestTimeToVisit": "October to March",
    "groupSize": "10 - 20 Guests",
    "included": [
      "Transfer between Bhuj Railway Station / Airport and Resort by AC coach on SIC (Seat in Coach) basis only as per scheduled timings",
      "Accommodation: 03 Nights premium stay in Tent City / Dholavira Resort",
      "Meals: Daily Breakfast, Lunch & Dinner (Pure Vegetarian meals prepared by our own catering kitchen)",
      "All sightseeing tours as per itinerary (White Rann, Kalo Dungar, Gandhi nu Gam, Dholavira)",
      "Fun and entertainment activities at the resort"
    ],
    "excluded": [
      "All activities which are not mentioned in the itinerary",
      "GST extra as applicable",
      "Personal laundry, telephone calls, tips, and items of personal nature"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Ahmedabad - Bhuj - Dholavira / Check-in & White Rann",
        "description": "Welcome and check-in around 12:30 PM. Enjoy lunch at the dining area. Take some leisure time for shopping or adventure activities. After high tea, depart for a spectacular visit to the White Rann to witness the sunset. Enjoy dinner and cultural activities followed by Grand Housie at night.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Tent City"
      },
      {
        "day": 2,
        "title": "Kalo Dungar & Gandhi Nu Gam",
        "description": "Enjoy breakfast at the dining area. Spend morning leisure time or take part in recreational activities. After lunch, proceed for a complimentary tour to Kalo Dungar (Black Hill - the highest point in Kutch) and Gandhi nu Gam handicraft village. Return for dinner and cultural activities at the resort.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Tent City"
      },
      {
        "day": 3,
        "title": "Departure for Dholavira (Road to Heaven)",
        "description": "After breakfast, depart for Dholavira (approx. 105 km), passing through the magnificent 'Road to Heaven' across the salt desert. Check in to the Dholavira Resort around 12:30 PM and have lunch. In the afternoon, visit the famous archaeological excavations and museum. Enjoy dinner with live music in the evening.",
        "meals": "Breakfast, Lunch, Dinner",
        "stay": "Dholavira Resort"
      },
      {
        "day": 4,
        "title": "Dholavira to Bhuj & Departure",
        "description": "Enjoy breakfast followed by checkout from the resort. Transfer back to Bhuj Railway Station or Airport for departure.",
        "meals": "Breakfast",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "2 Persons Sharing Room",
        "price": "₹24,999",
        "rawPrice": 24999
      },
      {
        "name": "Extra Persons Sharing Room",
        "price": "₹19,999",
        "rawPrice": 19999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹17,999",
        "rawPrice": 17999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "rann-utsav-package"
  },
  "rajasthan-tour-package": {
    "title": "Royal Ran Rajeshthan",
    "name": "Family Rajasthan Tour Package",
    "slogan": "Explore the heritage, palaces, and deserts of Jaipur, Jodhpur, and Jaisalmer.",
    "category": "domestic",
    "duration": "4 Days / 3 Nights",
    "badge": "Heritage Special",
    "price": "₹23,999 PP",
    "rawPrice": 23999,
    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800",
    "highlights": [
      "Jaipur Pink City & Amber Fort Tour",
      "Ajmer Sharif Dargah & Brahma Temple Pushkar",
      "Camel Safari & Desert Camping in Jaisalmer",
      "Mehrangarh Fort & Jaswant Thada in Jodhpur"
    ],
    "description": "Discover the regal history and vibrant culture of Rajasthan on this 7-day family tour. Explore Jaipur's pink palaces, Ajmer's sacred shrine, Pushkar's holy lake, Jaisalmer's golden desert sands, and Jodhpur's blue fortresses. Travels include 3-star deluxe AC accommodation, comfortable coach transfers, camel safari, daily breakfasts, and dinners.",
    "location": "Jaipur, Rajasthan",
    "bestTimeToVisit": "October to March",
    "groupSize": "12 - 25 Guests",
    "included": [
      "Ahmedabad departure with flight/train fare included",
      "06 Nights stay in 03-Star Deluxe hotels (AC Rooms): 2N Jaipur, 2N Jaisalmer, 2N Jodhpur",
      "Meals: 07 Breakfasts and 07 Dinners included",
      "All transfers and sightseeing arrangements on SIC (Seat in Coach) basis as per itinerary",
      "Complimentary Camel Safari in Jaisalmer Sam Sand Dunes",
      "Services of a professional tour coordinator"
    ],
    "excluded": [
      "5% GST Extra",
      "All entry tickets, Jeep safari, and elephant ride charges",
      "Room services, laundry, and telephone charges",
      "Expenses occurred due to bad weather, Flight or ferry cancellation, strike or any political unrest to be paid by guest as per actual"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Jaipur Arrival & Sightseeing",
        "description": "Arrive at Jaipur Railway Station or Airport. Transfer to the hotel and check in. In the afternoon, visit Sisodiya Rani Temple, Laxmi Narayan Temple (Birla Temple), and stop for photos at Hawa Mahal. Enjoy a free evening or opt to visit Chokhi Dhani ethnic resort (dinner charges extra on own). Overnight stay in Jaipur.",
        "meals": "Breakfast",
        "stay": "Jaipur Hotel"
      },
      {
        "day": 2,
        "title": "Jaipur Forts & Palaces",
        "description": "Morning visit to Amber Fort with an optional Elephant ride (at extra cost, subject to availability). Stop for photos at Jal Mahal, then visit Maharaja's City Palace, the astronomical Observatory (Jantar Mantar), and the glittering Sheesh Mahal (Hall of Victory). Evening free for shopping on your own. Overnight stay in Jaipur.",
        "meals": "Breakfast, Dinner",
        "stay": "Jaipur Hotel"
      },
      {
        "day": 3,
        "title": "Jaipur - Ajmer - Pushkar - Jodhpur",
        "description": "Depart for Jodhpur. En route, visit the sacred Ajmer Sharif Dargah in Ajmer, and the unique Brahma Temple and Pushkar Lake in Pushkar. Arrive in Jodhpur and check in to your hotel. Overnight stay in Jodhpur.",
        "meals": "Breakfast, Dinner",
        "stay": "Jodhpur Hotel"
      },
      {
        "day": 4,
        "title": "Jodhpur to Jaisalmer Sam Dunes (Camel Ride)",
        "description": "After breakfast, checkout and drive to Jaisalmer, the Golden City (approx. 350 km, 7 hours). Check in to your hotel on arrival. In the late afternoon, proceed to the Sam Sand Dunes for an unforgettable Camel Safari and desert sunset. Overnight stay in Jaisalmer.",
        "meals": "Breakfast, Dinner",
        "stay": "Jaisalmer Tent/Hotel"
      },
      {
        "day": 5,
        "title": "Jaisalmer Golden City Tour",
        "description": "Proceed for a sightseeing tour of the Golden City. Visit the majestic 12th-century Jaisalmer Fort (Sonar Kella), Salim Singh ki Haveli, Nathmal ki Haveli, Patwon ki Haveli, Gadisar Lake, and the Bada Bagh (Barabagh Hill) cenotaphs. Overnight stay in Jaisalmer.",
        "meals": "Breakfast, Dinner",
        "stay": "Jaisalmer Hotel"
      },
      {
        "day": 6,
        "title": "Jaisalmer to Jodhpur",
        "description": "After breakfast, check out and drive back to Jodhpur (approx. 350 km, 7 hours). Arrive in Jodhpur, check in to the hotel, and spend the rest of the day at leisure. Overnight stay in Jodhpur.",
        "meals": "Breakfast, Dinner",
        "stay": "Jodhpur Hotel"
      },
      {
        "day": 7,
        "title": "Jodhpur Sightseeing & Drop",
        "description": "Enjoy breakfast and check out. Visit the Mehrangarh Fort, Moti Mahal, Phool Mahal, Jaswant Thada cenotaph, and the Umaid Public Gardens. Drop off at Jodhpur Airport/Railway Station for departure.",
        "meals": "Breakfast",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "2 Persons Sharing Room",
        "price": "₹28,999",
        "rawPrice": 28999
      },
      {
        "name": "Extra Persons Sharing Room",
        "price": "₹23,999",
        "rawPrice": 23999
      },
      {
        "name": "Child (6 to 11 years, without bed)",
        "price": "₹19,999",
        "rawPrice": 19999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "rajasthan-tour-package"
  },
  "kailash-mansarovar-yatra-2026-13-nights-14-days": {
    "title": "Royal Kailash Mansarovear",
    "name": "Kailash Mansarovar Yatra 2026 13 Nights / 14 Days",
    "slogan": "",
    "category": "domestic",
    "duration": "14 Days / 13 Nights",
    "badge": "",
    "price": "₹2,85,999 PP",
    "rawPrice": 285999,
    "image": "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?q=80&w=800",
    "highlights": [
      "Pashupatinath Temple Darshan in Kathmandu",
      "Holy Bath & Puja at Sacred Lake Manasarovar",
      "Complete 3-Day Kailash Parikrama via Dolma La Pass",
      "Visit Diraphuk, Zutulpuk & Chiu Monasteries"
],
    "description": "",
    "location": "Day 2 Activity",
    "bestTimeToVisit": "",
    "groupSize": "",
    "included": [],
    "excluded": [],
    "itinerary": [
      {
            "day": 1,
            "title": "Arrival in Kathmandu (1,300m)",
            "description": "Arrive at Tribhuvan International Airport in Kathmandu. Meet our tour representative, transfer to the hotel, and attend the pilgrimage orientation briefing. Dinner and overnight stay in Kathmandu.",
            "meals": "Dinner",
            "stay": "Overnight in Kathmandu"
      },
      {
            "day": 2,
            "title": "Kathmandu Sightseeing & Pashupatinath Darshan",
            "description": "After breakfast, visit the sacred Pashupatinath Temple for special morning prayers and darshan (Rudra Abhishekam Homa puja can be arranged on request). Spend the afternoon shopping for pilgrimage gear and completing final travel preparations. Overnight stay in Kathmandu.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Kathmandu"
      },
      {
            "day": 3,
            "title": "Kathmandu to Syabrubesi / Timure (170 km)",
            "description": "Depart Kathmandu early in the morning by luxury tourist coach. Enjoy a scenic 170 km drive through the verdant Nepalese foothills and river valleys to Syabrubesi / Timure near the Nepal-China border. Dinner and overnight stay at the lodge.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Syabrubesi"
      },
      {
            "day": 4,
            "title": "Syabrubesi to Kyirong (Kerung) (2,700m)",
            "description": "After breakfast, complete border immigration and customs clearance at both Nepal and China checkpoints. Drive uphill into Tibet to the mountain town of Kyirong (2,700m). Fresh hot vegetarian meals served by our personal kitchen team. Overnight stay at guesthouse in Kyirong.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Kyirong"
      },
      {
            "day": 5,
            "title": "Acclimatization Day at Kyirong",
            "description": "Full day at leisure in Kyirong for high-altitude acclimatization. Take short gentle walks around the town and rest to adjust to the Himalayan altitude. All meals and overnight stay in Kyirong.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Kyirong"
      },
      {
            "day": 6,
            "title": "Scenic Drive from Kyirong to Saga (4,500m)",
            "description": "Drive across the majestic Tibetan plateau, passing nomadic settlements and crossing mountain passes exceeding 5,100m (Thong La & Jerkyung La). Cross the sacred Brahmaputra (Yarlung Tsangpo) River into Saga, the major nomadic hub of western Tibet. Dinner and overnight stay at hotel in Saga.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Saga"
      },
      {
            "day": 7,
            "title": "Drive to Sacred Lake Manasarovar & Chiu Monastery (4,550m)",
            "description": "Drive across the arid Tibetan plateau via Paryang and Mayum La Pass. Reach the holy Lake Manasarovar with awe-inspiring views of Mount Kailash and Mount Gurla Mandhata. Visit the historic Chiu Monastery on the clifftop overlooking the lake and view Rakshas Tal (Lahang Tso). Dinner and overnight stay at guesthouse near Lake Manasarovar.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight near Lake Manasarovar"
      },
      {
            "day": 8,
            "title": "Lake Manasarovar Holy Bath, Puja & Drive to Darchen (4,600m)",
            "description": "Perform morning holy snan (spiritual bath) and sacred Homa puja on the banks of Lake Manasarovar. Afternoon drive to Darchen, the base camp town for the Mount Kailash Parikrama. Rest and prepare for the circumambulation trek. Dinner and overnight stay in Darchen.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Darchen"
      },
      {
            "day": 9,
            "title": "Kailash Parikrama Day 1 – Tarboche to Diraphuk (4,900m)",
            "description": "Drive 5 km to Tarboche Flagpole (Yama Dwar), the sacred starting point of the 53 km Kailash Kora. Trek 12 km up the scenic Lha Chu Valley amidst high granite cliffs, waterfalls, and alpine streams. Witness the awe-inspiring North Face of Mount Kailash before arriving at the 13th-century Diraphuk Monastery. Dinner and overnight stay at guesthouse in Diraphuk.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Diraphuk"
      },
      {
            "day": 10,
            "title": "Kailash Parikrama Day 2 – Dolma La Pass (5,636m) & Gauri Kund to Zutulpuk (4,700m)",
            "description": "Ascend the highest and toughest point of the pilgrimage—the sacred Dolma La Pass (5,636m), adorned with thousands of colorful prayer flags. View the holy turquoise waters of Gauri Kund (Lake of Compassion) and descend into the Dolma Chu Valley to the ancient cave monastery of Zutulpuk (Milarepa’s Cave). Dinner and overnight stay at guesthouse in Zutulpuk.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Zutulpuk"
      },
      {
            "day": 11,
            "title": "Kailash Parikrama Day 3 – Zutulpuk to Darchen & Drive to Saga",
            "description": "Complete the final 8 km gentle trek of the Kailash Kora to Dzongdud Mani wall. Board the waiting vehicles at Barkha plain and drive to Darchen for lunch. Proceed on a return drive to Saga. Dinner and overnight stay at hotel in Saga.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Saga"
      },
      {
            "day": 12,
            "title": "Drive from Saga to Kyirong (2,700m)",
            "description": "Enjoy a scenic return journey across the Tibetan plateau back to Kyirong. Relish hot meals prepared by our kitchen team and relax after completing the sacred pilgrimage. Dinner and overnight stay in Kyirong.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Kyirong"
      },
      {
            "day": 13,
            "title": "Kyirong to Kathmandu via Rasuwa Gadhi Border",
            "description": "Drive to the China-Nepal border at Rasuwa Gadhi / Timure. Complete immigration re-entry formalities and drive through Nepal's valleys back to Kathmandu. Check in at the hotel for a celebratory dinner and overnight stay in Kathmandu.",
            "meals": "Breakfast,Lunch,Dinner",
            "stay": "Overnight in Kathmandu"
      },
      {
            "day": 14,
            "title": "Departure from Kathmandu Airport",
            "description": "After breakfast, transfer to Tribhuvan International Airport in Kathmandu for your flight back home, carrying divine blessings and unforgettable memories of the sacred Kailash Mansarovar Yatra.",
            "meals": "Breakfast",
            "stay": "Departure"
      }
],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "2 Persons Sharing Room",
        "price": "₹2,85,999",
        "rawPrice": 285999
      }
    ],
    "pdfItineraryUrl": "",
    "id": "kailash-mansarovar-yatra-2026-13-nights-14-days"
  },
  "bali-cost-saver-1-summer-2026": {
    "title": "Bali Cost Saver 1 Summer 2026",
    "name": "Bali Cost Saver 1 Summer 2026",
    "slogan": "Discover the tropical beauty of Indonesia with this cost-saver 8-day Bali Summer package.",
    "category": "international",
    "duration": "8 Days / 7 Nights",
    "badge": "",
    "price": "₹101,999 PP",
    "rawPrice": 101999,
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800",
    "highlights": [
      "Arrive in Bali & Transfer to Kuta",
      "Tanjung Benoa Water Sports & Bali Day Club",
      "Ulundanu Beratan Lake Temple & Tanah Lot Temple Tour",
      "Free Day for Leisure & Shopping"
    ],
    "description": "Discover the tropical beauty of Indonesia with this cost-saver 8-day Bali Summer package. Covering 5 nights in Kuta and 2 nights in Ubud, this package features Tanjung Benoa water sports (banana boat, jet ski, parasailing), entry to a popular Bali Day Club, the beautiful Ulundanu Beratan Lake Temple, a scenic Tanah Lot Temple sunset, Tegenungan Waterfall, a 1-hour Balinese Spa treatment, Ubud village, and the famous My Swing. This package includes round-trip Singapore Airlines flights from Ahmedabad, hotel stays, guided sightseeing, and hot dinners at Indian restaurants.",
    "location": "Arrive in Bali & Transfer to Kuta",
    "bestTimeToVisit": "",
    "groupSize": "15 - 25 Guests",
    "included": [
      "Round-trip economy flight tickets from Ahmedabad (Singapore Airlines)",
      "05 Nights hotel accommodation in Kuta & 02 Nights resort stay in Ubud",
      "Daily breakfasts at hotels and daily Indian dinners at restaurants",
      "Tanjung Benoa Water Sports: 1x banana boat, 1x Jet Ski, 1x parasailing",
      "Bali Day Club entrance ticket",
      "Tegenungan Waterfall entry & 1-hour traditional Balinese Spa",
      "My Swing entry ticket (includes swings and nests)",
      "Sightseeing transfers on private coach basis",
      "Bali E-Visa processing cost included"
    ],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive in Bali & Transfer to Kuta",
        "description": "Arrive at Ngurah Rai International Airport in Bali (DPS). Welcome by our guide with traditional flower garlands and transfer to your hotel in Kuta for check-in. In the evening, enjoy dinner at a local Indian restaurant. Overnight stay in Kuta.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Tanjung Benoa Water Sports & Bali Day Club",
        "description": "After breakfast, proceed to Tanjung Benoa Beach for water sports activities (includes 1x banana boat, 1x jet ski, and 1x parasailing). After lunch, visit a popular Bali Day Club (entrance only) to relax and soak in the beachside atmosphere. Dinner at an Indian restaurant. Overnight stay in Kuta.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Ulundanu Beratan Lake Temple & Tanah Lot Temple Tour",
        "description": "After breakfast, head out for a full-day cultural tour. Visit the beautiful Ulundanu Beratan Lake Temple situated on Lake Beratan, surrounded by cool mountain air. Later, visit the famous Tanah Lot Temple, built on a rock outcropping in the sea, to witness a beautiful sunset. Dinner at an Indian restaurant. Overnight stay in Kuta.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Free Day for Leisure & Shopping",
        "description": "Enjoy a full day of leisure to explore Kuta's beaches, shopping malls, or local markets at your own pace. Dinner is served at a local Indian restaurant. Overnight stay in Kuta.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Tegenungan Waterfall & Traditional Balinese Spa",
        "description": "After breakfast, proceed to the scenic Tegenungan Waterfall, set in a lush jungle environment. In the afternoon, enjoy a relaxing 1-hour traditional Balinese Spa massage. Return to the hotel. Dinner at an Indian restaurant. Overnight stay in Kuta.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Kuta to Ubud Transfer via Bali Swing",
        "description": "After breakfast, check out from the Kuta hotel and proceed to Ubud. En-route, enjoy lunch at an Indian restaurant and visit the famous My Swing (includes 2 single swings, bird nests, chicken nest, glass floor). Check in at the hotel in Ubud. Dinner at an Indian restaurant. Overnight stay in Ubud.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Ubud Village & Art Markets Tour",
        "description": "After breakfast, explore Ubud Village, visiting Mas and Celuk art villages (famous for wood carvings and silver work) and the Ubud Art Market. In the evening, enjoy dinner at an Indian restaurant. Overnight stay in Ubud.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Departure from Bali",
        "description": "After breakfast, check out of the hotel and transfer to Bali Airport for your return flight to India via Singapore. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "Double / Triple Sharing Room",
        "price": "₹101,999",
        "rawPrice": 101999,
        "details": ""
      },
      {
        "name": "Child With Bed (5 to 11 Years)",
        "price": "₹91,999",
        "rawPrice": 91999,
        "details": ""
      },
      {
        "name": "Child Without Bed (5 to 11 Years)",
        "price": "₹82,999",
        "rawPrice": 82999,
        "details": ""
      }
    ],
    "pdfItineraryUrl": "",
    "id": "bali-cost-saver-1-summer-2026"
  },
  "bali-cost-saver-ii-summer-2026": {
    "title": "Bali Cost Saver II Summer 2026",
    "name": "Bali Cost Saver II Summer 2026",
    "slogan": "Indulge in a premium 8-day Bali holiday with our Cost Saver II package.",
    "category": "international",
    "duration": "8 Days / 7 Nights",
    "badge": "",
    "price": "₹129,999 PP",
    "rawPrice": 129999,
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800",
    "highlights": [
      "Arrive in Bali & Transfer to Kuta",
      "Tanjung Benoa Water Sports & Uluwatu Temple Tour",
      "Mara River Safari & Balinese Spa",
      "West Nusa Penida Island Day Tour"
    ],
    "description": "Indulge in a premium 8-day Bali holiday with our Cost Saver II package. This upgraded luxury tour features 4 nights in Kuta (5* hotel), 1 night at the prestigious 5* Sanctoo Suites & Villa (includes complimentary entry to Bali Zoo), and 2 nights in Ubud in a luxury 5* Private Pool Villa. Explore the beaches, experience Tanjung Benoa water sports (banana boat, jet ski, parasailing), visit Uluwatu Temple, tour West Nusa Penida Island, and enjoy Tanah Lot Temple sunset, Ulundanu Lake Temple, and My Swing. Includes round-trip Singapore Airlines flights from Ahmedabad, daily breakfasts, en-route lunches, and Indian dinners.",
    "location": "Arrive in Bali & Transfer to Kuta",
    "bestTimeToVisit": "",
    "groupSize": "15 - 25 Guests",
    "included": [
      "Round-trip economy flight tickets from Ahmedabad (Singapore Airlines)",
      "04 Nights in 5* Kuta Hotel, 01 Night in Nusa Penida, 02 Nights in 5* Ubud Private Pool Villa",
      "Complimentary 1-time entrance to Bali Zoo (during Sanctoo Suites stay)",
      "Daily breakfasts at hotels and daily Indian dinners at restaurants",
      "Tanjung Benoa Water Sports: 1x banana boat, 1x Jet Ski, 1x parasailing",
      "Mara River Safari Journey ticket (with animal presentations)",
      "Nusa Penida Day Tour (with speedboat transfers, West tour, snorkeling & local lunch)",
      "My Swing entry ticket (includes swings and nests) with en-route Indian lunch",
      "1-hour traditional Balinese Spa treatment",
      "All sightseeing transfers on private coach basis",
      "Bali E-Visa processing cost included"
    ],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive in Bali & Transfer to Kuta",
        "description": "Arrive at Ngurah Rai International Airport in Bali (DPS). Meet your guide and receive traditional flower garlands. Transfer to your 5-star hotel in Kuta for check-in. In the evening, enjoy dinner at a local Indian restaurant. Overnight stay in Kuta.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Tanjung Benoa Water Sports & Uluwatu Temple Tour",
        "description": "After breakfast, proceed to Tanjung Benoa Beach for exciting water sports (includes 1x banana boat, 1x jet ski, and 1x parasailing), followed by lunch. In the afternoon, visit the clifftop Uluwatu Temple and enjoy the ocean views. Dinner at an Indian restaurant. Overnight stay in Kuta.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Mara River Safari & Balinese Spa",
        "description": "After breakfast, visit the Mara River Safari Park. Enjoy animal presentations (Tiger, Elephant, and Animal shows, subject to weather conditions) and go on a 1-time Safari Journey. In the afternoon, rejuvenate with a 1-hour traditional Balinese Spa. Dinner at an Indian restaurant. Overnight stay in Kuta.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "West Nusa Penida Island Day Tour",
        "description": "After an early breakfast, transfer to the harbor and board a speedboat to Nusa Penida Island. Begin a full-day West Nusa Penida tour covering Angel's Billabong, Broken Beach, Kelingking Cliff Beach, and Crystal Bay. Enjoy a local lunch and 1 snorkeling point with equipment. Check in at your Nusa Penida hotel. Dinner at an Indian restaurant. Overnight stay in Nusa Penida.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Nusa Penida to Ubud via My Swing",
        "description": "After breakfast, checkout from your Nusa Penida hotel and take the speedboat back to the main island. Drive to Ubud. En-route, enjoy an Indian lunch and visit the famous My Swing (includes couple swings, ultimate swing, nests, glass floor). Check in at your 5-star Ubud Private Pool Villa. Dinner at an Indian restaurant. Overnight stay in Ubud.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Ulundanu Lake Temple & Tanah Lot Temple Tour",
        "description": "After breakfast, explore Bali's cultural landmarks. Visit the floating Ulundanu Beratan Lake Temple. In the afternoon, visit the famous Tanah Lot Temple, built on a rock in the sea, to witness a beautiful sunset. Dinner at an Indian restaurant. Overnight stay in Ubud.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Ubud Leisure & Market Visit",
        "description": "Enjoy a free morning to relax in your private pool villa. In the evening, visit the Ubud Art Market to shop for local souvenirs and handicrafts. Dinner at an Indian restaurant. Overnight stay in Ubud.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Departure from Bali",
        "description": "After breakfast, check out of the hotel and transfer to Bali Airport for your return flight to Ahmedabad via Singapore. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "Double / Triple Sharing Room",
        "price": "₹129,999",
        "rawPrice": 129999,
        "details": ""
      },
      {
        "name": "Child With Bed (5 to 11 Years)",
        "price": "₹111,999",
        "rawPrice": 111999,
        "details": ""
      },
      {
        "name": "Child Without Bed (5 to 11 Years)",
        "price": "₹109,999",
        "rawPrice": 109999,
        "details": ""
      }
    ],
    "pdfItineraryUrl": "",
    "id": "bali-cost-saver-ii-summer-2026"
  },
  "diwali-dubai-ex-ahmedabad": {
    "title": "Diwali Dubai Ex Ahmedabad – 08 & 10 November 2026 7 Days • Super Deal",
    "name": "Diwali Dubai Ex Ahmedabad – 08 & 10 November 2026 7 Days • Super Deal",
    "slogan": "",
    "category": "international",
    "duration": "",
    "badge": "",
    "price": "₹147,999 PP",
    "rawPrice": 147999,
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800",
    "highlights": [
      "Dubai City Tour & Burj Khalifa 124th Floor",
      "Desert Safari with 4x4 Dune Bashing & BBQ Dinner",
      "Abu Dhabi City Tour & BAPS Swaminarayan Temple",
      "Dubai Miracle Garden & Global Village"
],
    "description": "",
    "location": "Diwali Dubai Ex Ahmedabad – 08 & 10 November 2026 7 Days • Super Deal",
    "bestTimeToVisit": "",
    "groupSize": "",
    "included": [],
    "excluded": [],
    "itinerary": [
      {
            "day": 1,
            "title": "Arrival in Dubai – Check-in & Evening at Leisure",
            "description": "Arrive at Dubai / Sharjah International Airport. Meet our airport representative, board the luxury coach, and transfer to your hotel. Check in and spend the evening relaxing or exploring the city. Enjoy a delicious Indian buffet dinner and an overnight stay in Dubai.",
            "meals": "Dinner",
            "stay": "Overnight in Dubai"
      },
      {
            "day": 2,
            "title": "Dubai City Tour & Burj Khalifa 124th Floor",
            "description": "Enjoy a buffet breakfast at the hotel before departing for the Dubai Guided City Tour & Burj Khalifa experience:\n\n• 09:00 AM – 10:00 AM: Hotel pickup.\n• Morning Sightseeing: Drive past Sheikh Zayed Road, explore Palm Jumeirah, and enjoy photo stops at Burj Al Arab, Dubai Frame, and Museum of the Future.\n• Evening Experience: Visit the Burj Khalifa 124th Floor Observation Deck for stunning panoramic city views, followed by the spectacular Dubai Musical Fountain Show.\n\nEnjoy dinner at a premier Indian restaurant before returning to the hotel for an overnight stay.",
            "meals": "Breakfast,Dinner",
            "stay": "Overnight in Dubai"
      },
      {
            "day": 3,
            "title": "Desert Safari with Dune Bashing & BBQ Dinner",
            "description": "Enjoy breakfast at the hotel with the morning free at your leisure.\n\n• 02:00 PM – 02:30 PM: Afternoon pickup in a 4x4 Land Cruiser for the thrilling Desert Safari.\n• Desert Adventures: Experience exhilarating roller-coaster dune bashing on red sand dunes, camel riding, sandboarding, and henna painting.\n• Evening Desert Camp: Relish an authentic BBQ dinner while enjoying live Tanoura, Fire, and Belly dance performances.\n\nReturn transfer to the hotel for an overnight stay. (Note: Carrying liquor into the desert safari is strictly prohibited).",
            "meals": "Breakfast,Dinner",
            "stay": "Overnight in Dubai"
      },
      {
            "day": 4,
            "title": "Abu Dhabi City Tour, BAPS Swaminarayan Temple & Sheikh Zayed Mosque",
            "description": "After breakfast, embark on a full-day tour of Abu Dhabi:\n\n• Visit the magnificent Sheikh Zayed Grand Mosque, one of the world's largest mosques.\n• Visit the grand BAPS Hindu Mandir (Swaminarayan Temple) in Abu Dhabi.\n• Enjoy photo stops at Ferrari World Abu Dhabi, Yas Island, and Yas Mall.\n\nRelish a delicious dinner at an Indian restaurant before returning to your hotel in Dubai for an overnight stay.",
            "meals": "Breakfast,Dinner",
            "stay": "Overnight in Dubai"
      },
      {
            "day": 5,
            "title": "Dubai Miracle Garden & Global Village",
            "description": "After breakfast, spend a relaxing morning at leisure before your afternoon excursions:\n\n• Afternoon: Visit Dubai Miracle Garden, the world's largest natural flower garden spanning over 72,000 sqm with millions of blooming floral structures.\n• Evening: Explore Global Village, featuring over 30 pavilions representing 80+ countries with world-class entertainment, shopping, and food.\n\nDinner at an Indian restaurant and overnight stay in Dubai.",
            "meals": "Breakfast,Dinner",
            "stay": "Overnight in Dubai"
      },
      {
            "day": 6,
            "title": "Traditional Souks & Shopping Tour",
            "description": "After breakfast, proceed on a shopping excursion visiting Dubai's iconic Gold Souk, Spice Souk, Mina Bazaar, and Mall of the Emirates. Enjoy free time for duty-free shopping and souvenirs. Dinner at an Indian restaurant and overnight stay in Dubai.",
            "meals": "Breakfast,Dinner",
            "stay": "Overnight in Dubai"
      },
      {
            "day": 7,
            "title": "Hotel Check-out & Airport Departure",
            "description": "After breakfast, check out from the hotel. Spend your remaining time at leisure before your scheduled departure transfer to Dubai / Sharjah Airport for your flight back home.",
            "meals": "Breakfast",
            "stay": "Departure"
      }
],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "Detailed Tour Pricing Per adult",
        "price": "₹147,999",
        "rawPrice": 147999,
        "details": ""
      },
      {
        "name": "Per Child With Bed",
        "price": "₹133,999",
        "rawPrice": 133999,
        "details": ""
      },
      {
        "name": "Per Child Without Bed",
        "price": "₹119,999",
        "rawPrice": 119999,
        "details": ""
      }
    ],
    "pdfItineraryUrl": "",
    "id": "diwali-dubai-ex-ahmedabad"
  },
  "phuket-krabi": {
    "title": "Phuket Krabi",
    "name": "Phuket Krabi",
    "slogan": "Experience the best of tropical Thailand with this exciting 6-day Phuket and Krabi tour package.",
    "category": "international",
    "duration": "6 Days / 5 Nights",
    "badge": "",
    "price": "₹79,999 PP",
    "rawPrice": 79999,
    "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800",
    "highlights": [
      "Arrival in Phuket & Hotel Check-in",
      "Phuket City Tour & Tiger Park",
      "Phi Phi Island Speedboat Tour with Lunch",
      "Phuket to Krabi Transfer"
    ],
    "description": "Experience the best of tropical Thailand with this exciting 6-day Phuket and Krabi tour package. Stay 3 nights in Phuket and 2 nights in Krabi in premium 4-star hotel accommodations. Enjoy return economy flights from Ahmedabad via Bengaluru on Akasa Air, delicious daily breakfasts and Indian dinners, a speedboat tour of the iconic Phi Phi Island, a speedboat tour of Krabi’s 4 Islands, intercity transfers, and guided sightseeing.",
    "location": "Arrival in Phuket & Hotel Check-in",
    "bestTimeToVisit": "",
    "groupSize": "15 - 25 Guests",
    "included": [
      "Round-trip economy flight tickets from Ahmedabad (Akasa Air via Bengaluru)",
      "03 Nights accommodation in a 4-star Phuket hotel",
      "02 Nights accommodation in a 4-star Krabi hotel",
      "Daily breakfasts at hotels & daily Indian dinners at restaurants",
      "Phuket City Tour (Wat Chalong, Karon View Point, Big Buddha)",
      "Phi Phi Island Speedboat Tour with Thai Lunch included",
      "Krabi 4 Island Speedboat Tour with Thai Lunch included",
      "All airport and intercity transfers on coach basis",
      "Baggage allowance: 7 Kg cabin + 20 Kg checked baggage per person"
    ],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Phuket & Hotel Check-in",
        "description": "Arrive at Phuket International Airport (HKT). Meet our representative and transfer to your 4-star hotel in Phuket. Complete the check-in formalities and spend the rest of the day at leisure. In the evening, enjoy a hot Indian dinner. Overnight stay in Phuket.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Phuket City Tour & Tiger Park",
        "description": "After breakfast, depart for a 5-hour Phuket City Tour covering Wat Chalong Temple, Karon View Point, Old Phuket Town, and the Big Buddha. Later, transfer to Tiger Park (entry tickets are extra on self-expense). Return to the hotel. Indian dinner in the evening. Overnight stay in Phuket.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Phi Phi Island Speedboat Tour with Lunch",
        "description": "After breakfast, proceed for the Phi Phi Island Tour by Speedboat starting at 07:15 AM. Explore the beautiful limestone cliffs, crystal clear bays, and enjoy a local Thai lunch. Note: National Park Fee of THB 400 per person is payable directly in cash. Transfers are on SIC basis. Return to Phuket. Indian dinner in the evening. Overnight stay in Phuket.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Phuket to Krabi Transfer",
        "description": "After breakfast, check out of the hotel. At 11:00 AM, board the intercity transfer coach to Krabi. Upon arrival, check in at your 4-star Krabi hotel and spend the evening at leisure exploring Ao Nang Beach. Indian dinner in the evening. Overnight stay in Krabi.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Krabi 4 Island Speedboat Tour with Lunch",
        "description": "After breakfast, proceed for the Krabi 4 Island Tour by Speedboat. Visit Koh Poda, Koh Tup, Koh Mor, Chicken Island, and Phra Nang Cave Beach. Enjoy a local Thai lunch en-route. Note: National Park Fee of THB 400 per person is payable directly in cash. Indian dinner in the evening. Overnight stay in Krabi.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Krabi to Phuket Airport Departure",
        "description": "After breakfast and hotel checkout, board the transfer at 10:30 AM from Krabi to Phuket Airport. Board your return flight to Ahmedabad via Bengaluru. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "Double Sharing / Twin Sharing Room",
        "price": "₹79,999",
        "rawPrice": 79999,
        "details": ""
      }
    ],
    "pdfItineraryUrl": "",
    "id": "phuket-krabi"
  },
  "singapore-malaysia-cost-saver": {
    "title": "Singapore Malaysia Cost Saver",
    "name": "Singapore Malaysia Cost Saver",
    "slogan": "Embark on the ultimate 7-day Singapore & Malaysia group tour.",
    "category": "international",
    "duration": "7 Days / 6 Nights",
    "badge": "",
    "price": "₹121,999 PP",
    "rawPrice": 121999,
    "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800",
    "highlights": [
      "Arrive in Singapore - City Tour & Gardens by the Bay",
      "Sentosa Island Attractions & Wings of Time",
      "Universal Studios & Transfer to Johor Bahru",
      "Johor Bahru to Kuala Lumpur & City Tour"
    ],
    "description": "Embark on the ultimate 7-day Singapore & Malaysia group tour. This package is perfectly crafted to offer the best of both destinations, featuring Singapore’s iconic Gardens by the Bay, Sentosa Island, and Universal Studios, followed by a scenic drive to Malaysia. In Malaysia, you will explore Johor Bahru, Kuala Lumpur city, Putrajaya, the majestic Batu Caves, Genting Highlands (with cable car), and enjoy a full day of fun at Sunway Lagoon Theme Park. The tour includes round-trip Singapore Airlines flights from Ahmedabad, comfortable hotel stays, daily breakfasts, lunches, and Indian dinners.",
    "location": "Arrive in Singapore - City Tour & Gardens by the Bay",
    "bestTimeToVisit": "",
    "groupSize": "15 - 25 Guests",
    "included": [
      "Round-trip economy class flight tickets from Ahmedabad (Singapore Airlines)",
      "02 Nights hotel stay in Singapore, 01 Night in Johor Bahru & 03 Nights in Kuala Lumpur (3★)",
      "Daily breakfasts at hotels, en-route lunches, and daily Indian dinners",
      "Gardens by the Bay entry ticket (Flower Dome & Cloud Forest)",
      "Sentosa Island: Madame Tussauds, Images of Singapore, 4D Marvel, Wings of Time",
      "Universal Studios theme park full-day entry pass",
      "Genting Highlands cable car ticket, Batu Caves visit, and Geneva watch outlet",
      "Sunway Lagoon Theme Park 6-Parks entry pass",
      "All group transfers on private coach basis with English speaking guide",
      "Singapore normal tourist visa charges included"
    ],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive in Singapore - City Tour & Gardens by the Bay",
        "description": "Arrive at Changi Airport in Singapore. Freshen up and proceed for a guided Singapore City Tour covering Merlion Park, Chinatown, and Mount Faber. Enjoy lunch and check in at your hotel (check-in after 3:00 PM). In the evening, visit Gardens by the Bay (includes entry tickets to Flower Dome & Cloud Forest). Dinner and overnight stay in Singapore.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Sentosa Island Attractions & Wings of Time",
        "description": "After breakfast, enjoy a morning at leisure. In the afternoon, proceed to Sentosa Island. Explore Madame Tussauds, Images of Singapore, Ultimate Star Experience, 4D Marvel Show, and a boat ride. Spend free time at Siloso Beach and witness the spectacular Wings of Time water & laser show. Dinner and overnight stay in Singapore.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Universal Studios & Transfer to Johor Bahru",
        "description": "After breakfast, check out of the hotel and transfer to Universal Studios Singapore for a full day of thrilling rides and movie-themed attractions. In the evening, cross the border and check in at your hotel in Johor Bahru (Malaysia). Dinner and overnight stay in Johor Bahru.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Johor Bahru to Kuala Lumpur & City Tour",
        "description": "After breakfast, check out of the hotel and transfer to Kuala Lumpur by coach. Upon arrival, enjoy a city tour of Kuala Lumpur and Putrajaya. Check in at the hotel. Dinner and overnight stay in Kuala Lumpur.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Genting Highlands Day Trip via Batu Caves",
        "description": "Following breakfast, embark on a day trip to Genting Highlands. Stop en-route to visit the famous Batu Caves temple and the Geneva Watch outlet. Take a scenic cable car ride to Genting Highlands. You can optionally visit SkyWorld Theme Park or the Casino. Return to Kuala Lumpur. Dinner and overnight stay in Kuala Lumpur.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Sunway Lagoon Theme Park Day Tour",
        "description": "After breakfast, proceed to Sunway Lagoon Theme Park for a full day of adventure (includes entry to Water Park, Amusement Park, Wildlife Park, Extreme Park, Scream Park, and Nickelodeon Lost Lagoon). On the way back, make a photo stop at the iconic Petronas Twin Towers. Dinner and overnight stay in Kuala Lumpur.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Departure from Kuala Lumpur",
        "description": "After breakfast, check out of the hotel and transfer to Kuala Lumpur International Airport for your return flight to Ahmedabad via Singapore. Tour ends with sweet memories.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "Double / Triple Sharing Room",
        "price": "₹121,999",
        "rawPrice": 121999,
        "details": ""
      },
      {
        "name": "Child With Bed (5 to 11 Years)",
        "price": "₹115,999",
        "rawPrice": 115999,
        "details": ""
      },
      {
        "name": "Child Without Bed (5 to 11 Years)",
        "price": "₹111,999",
        "rawPrice": 111999,
        "details": ""
      }
    ],
    "pdfItineraryUrl": "",
    "id": "singapore-malaysia-cost-saver"
  },
  "singapore-malaysia-thailand-cost-saver": {
    "title": "Singapore Malaysia Thailand Cost Saver",
    "name": "Singapore Malaysia Thailand Cost Saver",
    "slogan": "Embark on the ultimate Southeast Asian exploration covering three beautiful nations: Singapore, Malaysia, and Thailand.",
    "category": "international",
    "duration": "11 Days / 10 Nights",
    "badge": "",
    "price": "₹191,999 PP",
    "rawPrice": 191999,
    "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800",
    "highlights": [
      "Arrive in Singapore & Gardens by the Bay",
      "Sentosa Island Tour & Wings of Time",
      "Universal Studios & Transfer to Johor Bahru",
      "Johor Bahru to Kuala Lumpur Transfer & City Tour"
    ],
    "description": "Embark on the ultimate Southeast Asian exploration covering three beautiful nations: Singapore, Malaysia, and Thailand. This comprehensive 11-day tour features 2 nights in Singapore, 1 night in Johor Bahru, 3 nights in Kuala Lumpur, 2 nights in Pattaya, and 2 nights in Bangkok. Explore Gardens by the Bay, Sentosa Island, Universal Studios, Genting Highlands, Batu Caves, Sunway Lagoon, Coral Island (Pattaya), and Safari World & Marine Park (Bangkok). Includes round-trip Singapore Airlines flights from Ahmedabad, tourist visa processing, hotel stays, breakfasts, lunches, and Indian dinners.",
    "location": "Arrive in Singapore & Gardens by the Bay",
    "bestTimeToVisit": "",
    "groupSize": "15 - 25 Guests",
    "included": [
      "Round-trip economy class flight tickets from Ahmedabad (Singapore Airlines)",
      "Domestic/Internal flight ticket from Kuala Lumpur to Bangkok included",
      "Accommodation in premium 3★ hotels (Singapore, JB, KL, Pattaya, Bangkok)",
      "Daily breakfasts at hotels, lunches as mentioned, and daily Indian dinners",
      "Gardens by the Bay entry ticket (Flower Dome & Cloud Forest)",
      "Sentosa Island: Madame Tussauds, Images of Singapore, 4D Marvel, Wings of Time",
      "Universal Studios theme park full-day entry pass",
      "Genting Highlands cable car ticket, Batu Caves visit & Gems Gallery Pattaya",
      "Sunway Lagoon Theme Park 6-Parks entry pass",
      "Coral Island speedboat tour & Art in Paradise entry pass",
      "Safari World & Marine Park entry pass with buffet lunch",
      "Singapore normal tourist visa charges included"
    ],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive in Singapore & Gardens by the Bay",
        "description": "Arrive at Singapore Changi Airport. Freshen up and proceed for a guided Singapore City Tour covering Merlion Park, Chinatown, and Mount Faber. Enjoy lunch and check in at your hotel (check-in after 3:00 PM). In the evening, visit Gardens by the Bay (Flower Dome & Cloud Forest entry included). Dinner and overnight stay in Singapore.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Sentosa Island Tour & Wings of Time",
        "description": "After breakfast, enjoy a morning at leisure. In the afternoon, proceed to Sentosa Island to explore Madame Tussauds, Images of Singapore, Ultimate Star Experience, 4D Marvel Show, and a boat ride. Spend free time at Siloso Beach and witness the Wings of Time water & laser show. Dinner and overnight stay in Singapore.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Universal Studios & Transfer to Johor Bahru",
        "description": "After breakfast, check out of the hotel and transfer to Universal Studios Singapore for a full day of thrilling rides and movie-themed attractions. In the evening, cross the border and check in at your hotel in Johor Bahru (Malaysia). Dinner and overnight stay in Johor Bahru.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Johor Bahru to Kuala Lumpur Transfer & City Tour",
        "description": "After breakfast, check out of the hotel and transfer to Kuala Lumpur by coach. Upon arrival, enjoy a city tour of Kuala Lumpur and Putrajaya. Check in at the hotel. Dinner and overnight stay in Kuala Lumpur.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Genting Highlands Day Trip via Batu Caves",
        "description": "Following breakfast, depart for a day trip to Genting Highlands. Stop en-route to visit the famous Batu Caves temple and the Geneva Watch outlet. Take the Genting cable car. Optionally visit SkyWorld outdoor/indoor theme parks or the Casino. Return to Kuala Lumpur. Dinner and overnight stay in Kuala Lumpur.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Sunway Lagoon Theme Park Tour",
        "description": "After breakfast, proceed to Sunway Lagoon Theme Park for a full day of adventure (includes entry to Water Park, Amusement Park, Wildlife Park, Extreme Park, Scream Park, and Nickelodeon Lost Lagoon). On the way back, make a photo stop at the iconic Petronas Twin Towers. Dinner and overnight stay in Kuala Lumpur.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Putrajaya Tour & Flight to Bangkok",
        "description": "After breakfast, check out of the hotel and proceed for a short tour of Putrajaya. Transfer to Kuala Lumpur Airport for your flight to Bangkok. Upon arrival in Bangkok, transfer directly to your hotel in Pattaya. Dinner and overnight stay in Pattaya.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Coral Island Speedboat Tour & Art in Paradise",
        "description": "After breakfast, proceed for a speedboat excursion to Coral Island. Enjoy the sandy beaches and optional water sports activities (such as parasailing, jet ski, banana boat, or sea walking on self-expense). Enjoy lunch. In the afternoon, visit the Art in Paradise 3D Museum. Dinner and overnight stay in Pattaya.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 9,
        "title": "Pattaya to Bangkok via Gems Gallery",
        "description": "After breakfast, check out of the Pattaya hotel. En-route, visit the world's largest Gems Gallery. Drive to Bangkok and check in to your hotel. Rest of the day is free for leisure or shopping. Dinner and overnight stay in Bangkok.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 10,
        "title": "Safari World & Marine Park Full Day Tour",
        "description": "Following breakfast, embark on a full-day tour to Safari World & Marine Park. Witness amazing animal shows (such as Dolphin show, Sea Lion show, Spy War show) and go on an exciting open safari ride. Enjoy a buffet lunch. Dinner and overnight stay in Bangkok.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 11,
        "title": "Departure from Bangkok",
        "description": "After breakfast, check out of the hotel and transfer to Bangkok Airport for your return flight to Ahmedabad via Singapore. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "Double / Triple Sharing Room",
        "price": "₹191,999",
        "rawPrice": 191999,
        "details": ""
      },
      {
        "name": "Child With Bed (5 to 11 Years)",
        "price": "₹181,999",
        "rawPrice": 181999,
        "details": ""
      },
      {
        "name": "Child Without Bed (5 to 11 Years)",
        "price": "₹151,099",
        "rawPrice": 151099,
        "details": ""
      }
    ],
    "pdfItineraryUrl": "",
    "id": "singapore-malaysia-thailand-cost-saver"
  },
  "singapore-malaysia-thailand-tour": {
    "title": "Singapore Malaysia Thailand Tour",
    "name": "Singapore Malaysia Thailand Tour",
    "slogan": "Embark on an epic 11-day journey exploring the absolute best of Southeast Asia! This comprehensive, flight-inclusive tour package covers the hyper-modern city-state of Singapore, the vibrant cultural melting pot of Malaysia (Kuala Lumpur & Genting), and the exotic tropical beauty of Thailand (Bangkok & Pattaya).",
    "category": "international",
    "duration": "11 Days / 10 Nights",
    "badge": "",
    "price": "₹171,999 PP",
    "rawPrice": 171999,
    "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800",
    "highlights": [
      "Arrive Singapore – Gardens by the Bay & Sound & Light Show",
      "Singapore City Tour & Sentosa Island Excursion",
      "Full Day Universal Studios Extravaganza",
      "Singapore to Kuala Lumpur (by Coach) – Putrajaya & KL City Tour"
    ],
    "description": "Embark on an epic 11-day journey exploring the absolute best of Southeast Asia! This comprehensive, flight-inclusive tour package covers the hyper-modern city-state of Singapore, the vibrant cultural melting pot of Malaysia (Kuala Lumpur & Genting), and the exotic tropical beauty of Thailand (Bangkok & Pattaya).\n\nEnjoy premium accommodation, daily Indian meals, guided city tours, and entry tickets to top attractions like Universal Studios, Gardens by the Bay, Genting Cable Car, Safari World, and Coral Island.",
    "location": "Arrive Singapore – Gardens by the Bay & Sound & Light Show",
    "bestTimeToVisit": "",
    "groupSize": "15 - 35 Guests",
    "included": [
      "Economy Class Return Airfare from Ahmedabad (Vietjet/Indigo)",
      "10 Nights Accommodation in Premium 4-Star Hotels",
      "10 Buffet Breakfasts at the Hotels",
      "08 Indian Lunches + 02 Meal Coupons",
      "10 Dinners at Local Indian Restaurants",
      "Singapore Half-Day City Tour & Gardens by the Bay Entry",
      "Sentosa Island (Madame Tussauds, Wings of Time, Cable Car)",
      "Full Day Universal Studios Entrance Ticket",
      "Kuala Lumpur City Tour & KL Tower Sky Deck Entry",
      "Genting Highlands Day Trip with Skyway Cable Car Ride",
      "Bangkok City & Temple Tour (Golden & Marble Buddha)",
      "Full Day Safari World & Marine Park Ticket with Lunch",
      "Coral Island Speedboat Tour in Pattaya with Lunch",
      "Evening Alcazar Cabaret Show Entry in Pattaya",
      "Singapore Tourist Visa & Airport Taxes Included",
      "Malaysia & Thailand Visa Free Entry (As per current guidelines)",
      "All transfers and sightseeing by private air-conditioned coach"
    ],
    "excluded": [
      "5% GST & 5% TCS (or 20% TCS as applicable under current Indian tax laws)",
      "Optional Sunway Lagoon Tour (Can be booked at surcharge)",
      "Tips for local guides and coach drivers (approx. USD 3 per person per day)",
      "Personal expenses (laundry, phone calls, drinks, mini-bars, camera fees)",
      "Travel and Medical Insurance",
      "Any items or services not explicitly mentioned in the inclusions list"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive Singapore – Gardens by the Bay & Sound & Light Show",
        "description": "Arrive in Singapore. After completing immigration and custom formalities, fresh up at the airport. Later, board our coach and drive to the hotel for check-in and relaxation (Check-in time 15:00 hours). In the evening, enjoy a tour of Gardens by the Bay (Flower Dome + Supertree Observatory) to experience exotic plants and flowers from around the world. Witness the spectacular evening Sound and Light Show at Gardens by the Bay (subject to operational availability). Enjoy a delicious Indian Dinner and overnight stay in Singapore.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Singapore City Tour & Sentosa Island Excursion",
        "description": "After breakfast, start a half-day guided city tour of Singapore, covering Thian Hock Keng Temple, Little India, Suntec City, Fountain of Wealth, Chinatown, Singapore Esplanade, and the iconic Merlion Statue. Experience the world's best joyride on the Singapore Flyer. In the afternoon, proceed for a fun-filled trip to Sentosa Island, including Madam Tussauds Museum, Marvel 4D Show, Boat Ride, and the spectacular Wings of Time Musical Fountain & Laser Show (08:40 PM show). Enjoy Indian Dinner and an overnight stay in Singapore.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Full Day Universal Studios Extravaganza",
        "description": "After breakfast, proceed for a full-day adventure at Universal Studios Singapore, located on Sentosa Island. Experience cutting-edge rides, shows, and attractions based on your favorite blockbuster films and television series, including Transformers, Jurassic Park, and Battlestar Galactica. A 10 SGD meal coupon is provided for lunch. Enjoy dinner at a local Indian restaurant and a comfortable night stay at the hotel.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Singapore to Kuala Lumpur & Putrajaya Tour",
        "description": "After an early breakfast at the hotel, check out and drive to Kuala Lumpur, Malaysia by coach via the scenic Express Highway (approx. 400 km / 5 hours). Enjoy lunch at nearby Putrajaya, the federal administrative center of Malaysia. Upon arrival in Kuala Lumpur, proceed on a city tour including a visit to the KL Tower (Sky Deck entry ticket included). Photo stops at the King's Palace (Istana Negara), Merdeka Square, National Mosque, and the famous Petronas Twin Towers. Indian Dinner and overnight stay in Kuala Lumpur.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Full Day Genting Highlands Excursion",
        "description": "After breakfast, embark on a scenic day trip to Genting Highlands, situated 6,000 feet above sea level. Enjoy the cool mountain air. Ride the Genting SkyWay cable car (one-way ticket included) which takes you through lush rainforests in 20 minutes. Spend the day enjoying the Genting SkyWorlds Outdoor Theme Park (at extra cost), the casino, or shopping at First World Plaza. Return to Kuala Lumpur in the evening for an Indian Dinner and overnight stay.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Full Day Sunway Lagoon Theme Park (Optional)",
        "description": "After breakfast, enjoy a day trip to Sunway Lagoon, situated on the border of Kuala Lumpur. Sunway Lagoon features 80+ rides and attractions across 88 acres, divided into Water Park, Amusement Park, Wildlife Park, Extreme Park, and Scream Park. Spend a full day enjoying non-stop family fun and slides. Return to Kuala Lumpur in the evening. Enjoy a warm Indian Dinner and overnight stay.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Kuala Lumpur to Bangkok (by Flight) – Arrival & Leisure",
        "description": "After breakfast, check out and transfer to Kuala Lumpur International Airport (KUL) for your flight to Bangkok. Upon arrival at Bangkok airport, complete your immigration and customs formalities. Meet our local representative, transfer to your hotel by luxury coach, and check in. Enjoy a relaxed evening at your leisure, followed by an Indian Dinner and overnight stay in Bangkok.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Full Day Safari World & Marine Park Tour",
        "description": "After breakfast, proceed on a full-day excursion to Safari World & Marine Park. Enjoy spectacular shows including the Orangutan Boxing Show, Dolphin Show, Sea Lion Show, Spy War Stunt Show, and Hollywood Stunt Show. Savor a buffet lunch at Safari World Restaurant. Afterwards, drive through the Safari Park to spot wild animals in their natural habitats. Spend the evening shopping in Bangkok's local markets. Indian Dinner and overnight stay.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 9,
        "title": "Bangkok City Tour – Drive to Pattaya – Alcazar Show",
        "description": "After breakfast, check out and enjoy a half-day Bangkok City and Temple Tour, visiting the Golden Buddha Temple (Wat Traimit) and the Marble Buddha Temple (Wat Benchamabophit), along with a Gems Gallery visit. Drive to Pattaya. In the evening, attend the world-famous Alcazar Cabaret Show. Savor dinner at a local Indian restaurant and check in for an overnight stay in Pattaya.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 10,
        "title": "Pattaya – Coral Island Tour by Speedboat",
        "description": "After breakfast, board a speedboat for a thrilling ride to Coral Island (Koh Larn). Relax on the white sand beaches or participate in exciting water sports like parasailing, jet skiing, banana boat rides, and undersea walking (available at own expense). Enjoy an Indian Lunch. Return to Pattaya for a free afternoon. Enjoy an Indian Dinner and overnight stay in Pattaya.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 11,
        "title": "Pattaya – Bangkok Airport – Departure to India",
        "description": "After breakfast, check out of the hotel (standard noon check-out). Enjoy free time for last-minute shopping. Later, transfer to Bangkok Airport for your return flight back to India, carrying unforgettable memories of your Southeast Asian adventure.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "Double / Triple Sharing Room",
        "price": "₹171,999",
        "rawPrice": 171999,
        "details": ""
      },
      {
        "name": "Child With Bed (5 to 11 Years)",
        "price": "₹151,999",
        "rawPrice": 151999,
        "details": ""
      },
      {
        "name": "Child Without Bed (5 to 11 Years)",
        "price": "₹141,999",
        "rawPrice": 141999,
        "details": ""
      }
    ],
    "pdfItineraryUrl": "",
    "id": "singapore-malaysia-thailand-tour"
  },
  "singapore-cruise-malaysia": {
    "title": "Singapore – Cruise – Malaysia",
    "name": "Singapore – Cruise – Malaysia",
    "slogan": "Create unforgettable memories with our 8-day Singapore – Cruise – Malaysia tour package.",
    "category": "international",
    "duration": "8 Days / 7 Nights",
    "badge": "",
    "price": "₹175,999 PP",
    "rawPrice": 175999,
    "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800",
    "highlights": [
      "Arrive in Singapore & Gardens by the Bay",
      "Sentosa Island Tour & Board Resort World Cruise",
      "Full Day Fun on Resort World Cruise",
      "Disembark Cruise & Universal Studios Tour"
    ],
    "description": "",
    "location": "Arrive in Singapore & Gardens by the Bay",
    "bestTimeToVisit": "",
    "groupSize": "15 - 25 Guests",
    "included": [
      "Round-trip economy class flight tickets from Ahmedabad (Singapore Airlines)",
      "02 Nights hotel stay in Singapore & 03 Nights hotel stay in Kuala Lumpur (3★)",
      "02 Nights stay on Resort World Cruise (Inside / Balcony State Cabin)",
      "Daily breakfasts at hotels, all meals on board cruise, and Indian dinners",
      "Gardens by the Bay entry ticket (Flower Dome & Cloud Forest)",
      "Sentosa Island: Madame Tussauds, Images of Singapore, 4D Marvel, Wings of Time",
      "Universal Studios theme park full-day entry pass",
      "Genting Highlands cable car ticket & Batu Caves visit",
      "Sunway Lagoon Theme Park 6-Parks entry pass",
      "All group transfers on private coach basis with English speaking guide",
      "Singapore normal tourist visa charges included"
    ],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrive in Singapore & Gardens by the Bay",
        "description": "Arrive at Singapore Changi Airport. Freshen up and depart for a guided Singapore City Tour covering Merlion Park, Chinatown, and Mount Faber. Enjoy lunch and check in at your hotel (check-in after 3:00 PM). In the evening, visit Gardens by the Bay (Flower Dome & Cloud Forest entry included). Dinner and overnight stay in Singapore.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Sentosa Island Tour & Board Resort World Cruise",
        "description": "After breakfast, check out of the hotel. Proceed to Sentosa Island to explore Madame Tussauds, Images of Singapore, Ultimate Star Experience, 4D Marvel Show, and a boat ride. Spend free time at Siloso Beach. In the afternoon, transfer to the cruise terminal and board the Resort World Cruise. Overnight stay on board.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Full Day Fun on Resort World Cruise",
        "description": "Enjoy a full day of luxury and entertainment on the cruise ship. Take part in on-board activities, theatrical shows, pools, and enjoy buffet meals served at the cruise restaurants. Overnight stay on cruise (all meals included on board).",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Disembark Cruise & Universal Studios Tour",
        "description": "After breakfast, disembark the cruise at Singapore terminal. Transfer directly to Universal Studios Singapore for a full day of thrilling rides and movie-themed attractions. In the evening, enjoy the Wings of Time water & laser show. Dinner and check-in to your hotel. Overnight stay in Singapore.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Singapore to Kuala Lumpur Transfer & City Tour",
        "description": "After breakfast, check out of the hotel and transfer to Kuala Lumpur by coach. Upon arrival, enjoy a city tour of Kuala Lumpur and Putrajaya. Check in at the hotel. Dinner and overnight stay in Kuala Lumpur.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "Genting Highlands Day Trip via Batu Caves",
        "description": "Following breakfast, depart for a day trip to Genting Highlands. Stop en-route to visit the famous Batu Caves temple and the Geneva Watch outlet. Take the scenic Genting cable car ride. Optionally visit SkyWorld theme parks or the Genting Casino. Return to Kuala Lumpur. Dinner and overnight stay in Kuala Lumpur.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "Sunway Lagoon Theme Park & Petronas Towers",
        "description": "After breakfast, proceed to Sunway Lagoon Theme Park for a full day of fun covering the Water Park, Amusement Park, Wildlife Park, Extreme Park, Scream Park, and Nickelodeon Lost Lagoon. On the way back, make a photo stop at the iconic Petronas Twin Towers. Dinner and overnight stay in Kuala Lumpur.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Departure from Kuala Lumpur",
        "description": "After breakfast, check out of the hotel and transfer to Kuala Lumpur International Airport for your return flight to Ahmedabad via Singapore. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "Double / Triple Sharing Room",
        "price": "₹175,999",
        "rawPrice": 175999,
        "details": ""
      },
      {
        "name": "Child With Bed (5 to 11 Years)",
        "price": "₹145,999",
        "rawPrice": 145999,
        "details": ""
      },
      {
        "name": "Child Without Bed (5 to 11 Years)",
        "price": "₹131,999",
        "rawPrice": 131999,
        "details": ""
      }
    ],
    "pdfItineraryUrl": "",
    "id": "singapore-cruise-malaysia"
  },
  "thailand-7-day": {
    "title": "Thailend  7 Days • Super Deal",
    "name": "Thailend  7 Days • Super Deal",
    "slogan": "",
    "category": "international",
    "duration": "",
    "badge": "",
    "price": "₹87,999 PP",
    "rawPrice": 87999,
    "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=800",
    "highlights": [
      "Arrive Chiang Mai & City Temples",
      "Doi Inthanon National Park & Waterfalls",
      "Elephant Jungle Sanctuary Experience",
      "Golden Triangle, Blue Temple & Mekong Boat Ride"
],
    "description": "",
    "location": "Thailend  7 Days • Super Deal",
    "bestTimeToVisit": "",
    "groupSize": "",
    "included": [],
    "excluded": [],
    "itinerary": [
      {
            "day": 1,
            "title": "Arrival in Chiang Mai – Check-in & Evening Leisure",
            "description": "Arrive at Chiang Mai International Airport. Transfer to your hotel, check in, and spend the evening relaxing or exploring the famous Night Bazaar. Overnight stay in Chiang Mai.",
            "meals": "Breakfast",
            "stay": "Overnight in Chiang Mai"
      },
      {
            "day": 2,
            "title": "Chiang Mai City Temples & Wat Phra That Doi Suthep",
            "description": "After breakfast, visit the most sacred temple in Chiang Mai, Wat Phra That Doi Suthep, perched 3,500 ft above sea level in Doi Pui National Park. Ascend the 300 Naga stairs to admire the golden pagoda containing holy Buddha relics and panoramic city views. Later, visit Wat Chedi Luang, Wat Phra Singh, and the bustling Warorot Market. Overnight stay in Chiang Mai.",
            "meals": "Breakfast",
            "stay": "Overnight in Chiang Mai"
      },
      {
            "day": 3,
            "title": "Full Day Doi Inthanon National Park & Waterfalls",
            "description": "Full-day excursion to Doi Inthanon National Park, Thailand’s highest peak (8,500 ft). Walk along the Ang Kha Nature Trail amidst lush cloud forests, visit the King & Queen Royal Twin Pagodas, browse the Hmong Tribal Market, and marvel at the majestic Wachirathan Waterfall. Overnight stay in Chiang Mai.",
            "meals": "Breakfast",
            "stay": "Overnight in Chiang Mai"
      },
      {
            "day": 4,
            "title": "Elephant Jungle Sanctuary Experience",
            "description": "Drive through rolling hills and forests to the ethical Elephant Jungle Sanctuary. Learn about Asian elephants, change into traditional Karen clothing, feed and interact with the elephants, enjoy an elephant mud spa, and bathe them in the natural river. Return to Chiang Mai for an overnight stay.",
            "meals": "Breakfast",
            "stay": "Overnight in Chiang Mai"
      },
      {
            "day": 5,
            "title": "Chiang Mai to Chiang Rai & White Temple Tour",
            "description": "Check out from your hotel in Chiang Mai and drive through mountain landscapes with a stop at Mae Kachan Hot Springs. Visit the world-renowned White Temple (Wat Rong Khun) in Chiang Rai before checking in at your hotel for an overnight stay.",
            "meals": "Breakfast",
            "stay": "Overnight in Chiang Rai"
      },
      {
            "day": 6,
            "title": "Golden Triangle, Blue Temple & Mekong Boat Ride",
            "description": "Visit the stunning Wat Rong Suea Ten (Blue Temple). Continue to the historic Golden Triangle where Thailand, Myanmar, and Laos meet along the Mekong River. Visit the House of Opium museum, take a scenic boat cruise on the Mekong River, and explore ancient Chiang Saen before returning to Chiang Rai for an overnight stay.",
            "meals": "Breakfast",
            "stay": "Overnight in Chiang Rai"
      },
      {
            "day": 7,
            "title": "Chiang Rai Airport Departure",
            "description": "After breakfast, check out from the hotel and transfer to Chiang Rai Airport for your flight back home.",
            "meals": "Breakfast",
            "stay": "Departure"
      }
],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "Detailed Tour Pricing Per adult",
        "price": "₹87,999",
        "rawPrice": 87999,
        "details": ""
      },
      {
        "name": "Per Child With Bed",
        "price": "₹79,999",
        "rawPrice": 79999,
        "details": ""
      },
      {
        "name": "Per Child Without Bed",
        "price": "₹79,999",
        "rawPrice": 79999,
        "details": ""
      }
    ],
    "pdfItineraryUrl": "",
    "id": "thailand-7-day"
  },
  "vietnam-wonders-explorer": {
    "title": "Vietnam Wonders Explorer",
    "name": "Vietnam Wonders Explorer",
    "slogan": "Experience the ultimate beauty of Vietnam on this premium 8-day flight-inclusive tour.",
    "category": "international",
    "duration": "8 Days / 7 Nights",
    "badge": "",
    "price": "₹139,999 PP",
    "rawPrice": 139999,
    "image": "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800",
    "highlights": [
      "Arrival in Hanoi & City Tour",
      "Hanoi to Halong Bay Day Cruise",
      "Hanoi to Da Nang & Hoi An Ancient Town Excursion",
      "Ba Na Hills & Golden Bridge Tour"
    ],
    "description": "Experience the ultimate beauty of Vietnam on this premium 8-day flight-inclusive tour. Cover the historical capital city of Ha Noi, cruise through the majestic limestone structures of Halong Bay, enjoy the breathtaking views from Ba Na Hills (Golden Bridge), walk through lantern-lit Hoi An Ancient Town, and fly to the tropical island paradise of Phu Quoc (VinWonders, Vinpearl Safari, Hon Thom Cable Car, and Aquatopia Water Park). This package includes international and domestic flights from Ahmedabad, deluxe hotel stays, daily breakfast & buffet dinners, and fully guided excursions.",
    "location": "Arrival in Hanoi & City Tour",
    "bestTimeToVisit": "",
    "groupSize": "15 - 25 Guests",
    "included": [
      "Round-trip economy flight tickets from Ahmedabad (Vietjet Air)",
      "Domestic flight tickets within Vietnam (Hanoi - Da Nang - Phu Quoc)",
      "Accommodation in premium, well-maintained hotels",
      "Daily breakfasts and Indian dinners as mentioned on itinerary",
      "Sightseeing entries: Ba Na Hills cable car, VinWonders, Vinpearl Safari, Grand World Venice boat ride, Hon Thom cable car, Aquatopia water park",
      "Vietnam normal E-Visa processing cost included",
      "2 water bottles per person per day",
      "Guided transfers on Seat-In-Coach (SIC) basis"
    ],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Hanoi & City Tour",
        "description": "Upon arrival at Noi Bai Airport in Hanoi, meet your guide and proceed to visit the Temple of Literature, Hoan Kiem Lake with Ngoc Son Temple, and explore the bustling Old Street and Train Street. Check in at the hotel. In the evening, enjoy dinner at an Indian restaurant. Return to hotel before 21:30.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 2,
        "title": "Hanoi to Halong Bay Day Cruise",
        "description": "After breakfast, drive to Halong Bay (approx. 2.5 hours). Board a premium day cruise for 5 hours of scenic sightseeing through limestone karsts. Enjoy a delicious buffet lunch on the cruise. In the afternoon, return to Hanoi. Enjoy dinner at an Indian restaurant. Return to hotel before 21:30.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 3,
        "title": "Hanoi to Da Nang & Hoi An Ancient Town Excursion",
        "description": "After breakfast, transfer to Hanoi airport for your flight to Da Nang. Upon arrival, visit Marble Mountain (take the elevator up to explore caves and ancient pagodas). Proceed to Coconut Forest for a fun basket boat ride, followed by a walking tour of the lantern-lit Hoi An Ancient Town (including a romantic lantern boat ride). Return to Da Nang for dinner at an Indian restaurant.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 4,
        "title": "Ba Na Hills & Golden Bridge Tour",
        "description": "Following breakfast, depart for Ba Na Hills. Enjoy a scenic cable car ride offering breathtaking mountain views. Explore the iconic Golden Bridge held by giant hands, stroll through the charming French Village, and experience the fun rides at Fantasy Park. Return to Da Nang. Dinner at an Indian restaurant. Return to hotel before 21:30.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 5,
        "title": "Da Nang to Phu Quoc & Grand World Venice Ride",
        "description": "After breakfast, transfer to the airport for your flight to the tropical paradise of Phu Quoc. Check in at the hotel. In the afternoon, explore Grand World Phu Quoc, the vibrant entertainment and cultural complex (Venice water taxi boat ride and Teddy Bear Museum entry included). Dinner at an Indian restaurant.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 6,
        "title": "VinWonders Theme Park & Vinpearl Safari",
        "description": "After breakfast, enjoy a full day of excitement at VinWonders, Vietnam's largest theme park with water slides and thrill rides, and Vinpearl Safari, home to a wide variety of exotic wildlife. Dinner at an Indian restaurant. Return to hotel before 21:30.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 7,
        "title": "4 Island Speedboat Tour & Hon Thom Cable Car",
        "description": "After breakfast, embark on a private speedboat 4 Islands Tour (Gam Ghi, Xuong, and May Rut islands for coral snorkeling). Later, ride the Hon Thom Cable Car (the longest over-sea cable car in the world) and enjoy Aquatopia Water Park. Explore Kiss Bridge & Sunset Town in the evening. Dinner at an Indian restaurant.",
        "meals": "",
        "stay": ""
      },
      {
        "day": 8,
        "title": "Departure from Phu Quoc via HCMC",
        "description": "After breakfast, check out of the hotel. Transfer to Phu Quoc Airport for your return flight to Ahmedabad via Ho Chi Minh City. Tour ends.",
        "meals": "",
        "stay": ""
      }
    ],
    "gallery": [],
    "faqs": [
      {
        "question": "What is the booking policy for Royals Tours?",
        "answer": "Bookings can be initialized by submitting an inquiry online or contacting us on WhatsApp (+91 97238 20277). A deposit is required to secure flight/hotel bookings."
      },
      {
        "question": "Does this tour package include vegetarian catering?",
        "answer": "Yes, our domestic group tours feature pure vegetarian and Swaminarayan/Jain meals prepared by our own catering kitchen team traveling with the group."
      }
    ],
    "isFixedDeparture": true,
    "pricingTiers": [
      {
        "name": "Double / Triple Sharing Room",
        "price": "₹139,999",
        "rawPrice": 139999,
        "details": ""
      },
      {
        "name": "Child (5 to 11 Years, with bed/seat)",
        "price": "₹129,999",
        "rawPrice": 129999,
        "details": ""
      }
    ],
    "pdfItineraryUrl": "",
    "id": "vietnam-wonders-explorer"
  }
};

export const fixedDepartures: FixedDeparture[] = Object.values(detailedTravelItems)
  .filter(item => item.isFixedDeparture)
  .map(item => ({
    id: item.id,
    destination: item.name,
    slogan: item.slogan,
    highlights: item.highlights,
    price: item.price,
    image: item.image,
    duration: item.duration,
    description: item.description
  }));

export const featuredPackages: DestinationPackage[] = Object.values(detailedTravelItems)
  .filter(item => !item.isFixedDeparture)
  .map(item => ({
    id: item.id,
    name: item.name,
    subtext: item.slogan,
    category: item.category,
    duration: item.duration,
    badge: item.badge,
    price: item.price,
    rawPrice: item.rawPrice,
    image: item.image,
    highlights: item.highlights,
    description: item.description
  }));

export const servicesList: ServiceItem[] = [
  {
    "id": "srv-domestic",
    "title": "Domestic Tour",
    "subtitle": "Explore Incredible India",
    "icon": "🍱",
    "description": "Discover India's rich heritage, scenic beaches, and royal palaces with our custom-curated domestic tour packages.",
    "features": [
      "Pure Veg, Swaminarayan, and Jain catering kitchens",
      "Experienced Gujarati-speaking tour managers",
      "Comfortable hotel stays and direct site transfers",
      "Perfect for families and senior citizens"
    ],
    "badge": "Specialty"
  },
  {
    "id": "srv-intl",
    "title": "International Tour",
    "subtitle": "Explore the World with Us",
    "icon": "✈️",
    "description": "Embark on global adventures with hand-picked holiday packages to the world's most exotic destinations.",
    "features": [
      "Flight ticket bookings and airport transfers included",
      "E-Visa documentation and processing assistance",
      "Sightseeing by private coaches with English guides",
      "Daily Indian breakfasts and hot restaurant dinners"
    ],
    "badge": "Popular"
  },
  {
    "id": "srv-hotel",
    "title": "Hotel Booking",
    "subtitle": "Comfortable Stays Worldwide",
    "icon": "🏨",
    "description": "Access exclusive deals on luxury resorts, boutique hotels, and budget-friendly stays globally.",
    "features": [
      "Handpicked 3-star, 4-star, and 5-star properties",
      "Breakfast-inclusive and resort credit inclusions",
      "Instantly confirmed bookings and voucher issuance",
      "Custom group room allotments"
    ]
  },
  {
    "id": "srv-flights",
    "title": "Air Ticket Booking",
    "subtitle": "Best Fares, Best Services",
    "icon": "🎟️",
    "description": "Get competitive rates and seamless booking on all domestic and international flight reservations.",
    "features": [
      "Direct GDS ticketing with locked inventory prices",
      "Group airline tickets for corporate/large groups",
      "Seat selection, baggage upgrades, and meal additions",
      "Round-the-clock rescheduling support"
    ]
  },
  {
    "id": "srv-car",
    "title": "Car Booking",
    "subtitle": "Easy & Instant Car Rentals",
    "icon": "🚗",
    "description": "Hassle-free car rentals, local sightseeing cabs, and outstation taxi booking services.",
    "features": [
      "Well-maintained AC sedans, SUVs & Tempo Travelers",
      "Experienced, polite, and verified drivers",
      "Flexible hourly, daily, and outstation rental packages",
      "Transparent pricing with instant booking confirmation"
    ]
  },
  {
    "id": "srv-visa",
    "title": "Visa Service",
    "subtitle": "Hassle Free Visa Assistance",
    "icon": "📑",
    "description": "Professional document processing, review, and guidance for successful tourist and business visas.",
    "features": [
      "E-Visa processing for Thailand, Vietnam, Singapore, etc.",
      "Guidance for Schengen, US, and UK visa interviews",
      "New passport applications and speed-track renewals",
      "Legal translation and document attestation support"
    ]
  },
  {
    "id": "srv-passport",
    "title": "Passport Service",
    "subtitle": "Apply New or Renew Passport",
    "icon": "📖",
    "description": "Fast-track assistance for new passport applications, renewals, corrections, and Tatkaal services.",
    "features": [
      "New passport application processing",
      "Tatkaal and urgent service support",
      "Document correction & renewal guidance",
      "Slot booking and verification assistance"
    ]
  },
  {
    "id": "srv-cruise",
    "title": "Cruise Booking",
    "subtitle": "Luxury Cruises, Unforgettable Memories",
    "icon": "🚢",
    "description": "Set sail on premium cruise liners for a luxurious holiday floating across the oceans.",
    "features": [
      "Premium domestic & international cruises",
      "Stateroom selection and cabin bookings",
      "All-inclusive meal and entertainment packages",
      "Shore excursion planning"
    ]
  },
  {
    "id": "srv-insurance",
    "title": "Overseas Travel Insurance",
    "subtitle": "Travel Safe, Travel Secure",
    "icon": "🛡️",
    "description": "Guard your trip against emergencies with comprehensive travel insurance coverage.",
    "features": [
      "Emergency medical expenses coverage",
      "Baggage loss and delay protection",
      "Trip cancellation & curtailment insurance",
      "24/7 global travel assistance support"
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    "id": "test-1",
    "name": "Rajesh Patel",
    "role": "Family Traveler",
    "trip": "Assam Meghalaya Tour",
    "comment": "Our family had an absolutely memorable journey with Royals Tours! The pure vegetarian meals prepared by their own kitchen staff on the tour was a savior. Everyone was very polite and helpful.",
    "rating": 5,
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
  },
  {
    "id": "test-2",
    "name": "Komal Shah",
    "role": "Couple Traveler",
    "trip": "Bali Cost Saver II",
    "comment": "The 5-star Ubud private pool villa stay was pure luxury. The Singapore Airlines flight arrangements, sightseeing transfers, and Nusa Penida tour were organized perfectly by Royals Tours.",
    "rating": 5,
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
  },
  {
    "id": "test-3",
    "name": "Hitesh Trivedi",
    "role": "Pilgrim Guest",
    "trip": "Chardham Yatra",
    "comment": "Chardham Yatra was a dream which Royals Tours helped me fulfill comfortably. Excellent hotel arrangements in Haridwar, Barkot, and Badrinath. The tour manager was exceptionally caring.",
    "rating": 5,
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200"
  }
];

export const galleryImages: GalleryItem[] = [
  {
    "id": "gal-1",
    "title": "Golden Bridge in Ba Na Hills",
    "location": "Da Nang, Vietnam",
    "category": "international",
    "image": "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800",
    "caption": "Our guests walking along the majestic hands of Golden Bridge in Vietnam."
  },
  {
    "id": "gal-2",
    "title": "Double-Humped Camel Safari",
    "location": "Nubra Valley, Ladakh",
    "category": "trek",
    "image": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=800",
    "caption": "Experiencing Bactrian camel rides among the sand dunes of high-altitude Hunder."
  },
  {
    "id": "gal-3",
    "title": "Athirappilly Waterfalls Scenic",
    "location": "Athirappilly, Kerala",
    "category": "community",
    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800",
    "caption": "Capturing the scenic natural waterfalls of God's Own Country, Kerala."
  },
  {
    "id": "gal-4",
    "title": "Uluwatu Clifftop Sunset",
    "location": "Bali, Indonesia",
    "category": "international",
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800",
    "caption": "Spectacular clifftop temple vistas during our Bali Cost Saver II Tour."
  }
];

export const comprehensiveFaqs: FaqItem[] = [
  {
    "category": "departures",
    "question": "What is included in Royals Tours domestic group tours?",
    "answer": "Our domestic group packages typically cover local AC coach transport, hotel stays, guided sightseeing, and delicious, hygienic pure vegetarian meals prepared by our own catering kitchen team."
  },
  {
    "category": "catering",
    "question": "What is special about the catering kitchen service?",
    "answer": "For most domestic tours (like Assam, Sikkim, South India, Himanchal), our own team of Gujarati and Rajasthani cooks travels with the group to prepare fresh, hygienic Pure Vegetarian, Swaminarayan, and Jain meals in our mobile kitchen."
  },
  {
    "category": "visas",
    "question": "How do you help with international visas?",
    "answer": "We handle the complete E-Visa application process and documentation check for countries like Singapore, Vietnam, and Thailand. Normal E-visa processing costs are already included in our international packages."
  },
  {
    "category": "payments",
    "question": "What are your payment terms for booking a tour?",
    "answer": "To book your seat, a 30% booking advance is required. The balance payment must be cleared 15 days before the departure date. Invoices and receipts will be generated instantly."
  }
];

// Helper functions
export function getTravelItemById(id: string): DetailedTravelItem | undefined {
  return detailedTravelItems[id];
}

export function getDestinationById(id: string): DetailedTravelItem | undefined {
  return detailedTravelItems[id];
}

export function getPackageById(id: string): DetailedTravelItem | undefined {
  return detailedTravelItems[id];
}
