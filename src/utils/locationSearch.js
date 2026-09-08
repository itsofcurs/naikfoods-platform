// High-performance location search engine with instant autocomplete (Zomato/Swiggy-style)

export const MAHARASHTRA_LOCALITIES = [
  // User Requested Highlights & Pune Localities
  { name: 'Sujata Apartment, Kasat Nagar, Pune', landmark: 'Near Shri Krishna Colony, 4th Floor', suburb: 'Kasat Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4721, lon: 73.8614 },
  { name: 'Sujata Apartment, Shri Krishna Colony Lane No 3, Pune', landmark: 'Near Ganesh Niwas', suburb: 'Kasat Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4735, lon: 73.8598 },
  { name: 'Kasat Nagar, Pune', landmark: 'Near Bibvewadi / Kondhwa Road', suburb: 'Kasat Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4725, lon: 73.8610 },
  { name: 'MMIT College Pune (Marathwada Mitra Mandal Institute of Technology)', landmark: 'Vadgaon Shinde Road, Lohgaon', suburb: 'Lohgaon', city: 'Pune', state: 'Maharashtra', pincode: '411047', lat: 18.6080, lon: 73.9310 },
  { name: 'VIT College Bibwewadi (Vishwakarma Institute of Technology)', landmark: 'Upper Indira Nagar, Bibvewadi', suburb: 'Bibvewadi', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4636, lon: 73.8682 },
  { name: 'VIIT College Kondhwa (Vishwakarma Institute of Information Technology)', landmark: 'Near Saswad Road', suburb: 'Kondhwa', city: 'Pune', state: 'Maharashtra', pincode: '411048', lat: 18.4590, lon: 73.8835 },

  // Famous Pune Colleges & Educational Landmarks
  { name: 'COEP Technological University (College of Engineering Pune)', landmark: 'Wellesley Road, Shivajinagar', suburb: 'Shivajinagar', city: 'Pune', state: 'Maharashtra', pincode: '411005', lat: 18.5293, lon: 73.8565 },
  { name: 'PICT College (Pune Institute of Computer Technology)', landmark: 'Near Bharati Vidyapeeth, Katraj', suburb: 'Dhankawadi', city: 'Pune', state: 'Maharashtra', pincode: '411043', lat: 18.4575, lon: 73.8508 },
  { name: 'MIT World Peace University (MIT-WPU)', landmark: 'Paud Road, Kothrud', suburb: 'Kothrud', city: 'Pune', state: 'Maharashtra', pincode: '411038', lat: 18.5180, lon: 73.8152 },
  { name: 'Cummins College of Engineering for Women', landmark: 'Karve Nagar, Hingne Budruk', suburb: 'Karve Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411052', lat: 18.4890, lon: 73.8175 },
  { name: 'Fergusson College (FC)', landmark: 'FC Road, Deccan Gymkhana', suburb: 'Shivajinagar', city: 'Pune', state: 'Maharashtra', pincode: '411004', lat: 18.5236, lon: 73.8417 },
  { name: 'BMCC (Brihan Maharashtra College of Commerce)', landmark: 'BMCC Road, Deccan Gymkhana', suburb: 'Deccan Gymkhana', city: 'Pune', state: 'Maharashtra', pincode: '411004', lat: 18.5250, lon: 73.8375 },
  { name: 'SP College (Sir Parashurambhau College)', landmark: 'Tilak Road, Sadashiv Peth', suburb: 'Sadashiv Peth', city: 'Pune', state: 'Maharashtra', pincode: '411030', lat: 18.5082, lon: 73.8490 },
  { name: 'Symbiosis International University, Viman Nagar', landmark: 'Symbiosis Road, Near Airport', suburb: 'Viman Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411014', lat: 18.5645, lon: 73.9100 },
  { name: 'Bharati Vidyapeeth Deemed University', landmark: 'Pune-Satara Road, Katraj', suburb: 'Dhankawadi', city: 'Pune', state: 'Maharashtra', pincode: '411043', lat: 18.4550, lon: 73.8520 },
  { name: 'Sinhgad College of Engineering (SCOE)', landmark: 'Sinhgad Road, Vadgaon Budruk', suburb: 'Vadgaon Budruk', city: 'Pune', state: 'Maharashtra', pincode: '411041', lat: 18.4650, lon: 73.8360 },
  { name: 'DY Patil College of Engineering, Akurdi', landmark: 'Sector 29, Nigdi Pradhikaran', suburb: 'Akurdi', city: 'Pune', state: 'Maharashtra', pincode: '411044', lat: 18.6470, lon: 73.7600 },
  { name: 'AISSMS College of Engineering', landmark: 'Near RTO, Kennedy Road', suburb: 'Shivajinagar', city: 'Pune', state: 'Maharashtra', pincode: '411001', lat: 18.5310, lon: 73.8650 },
  { name: 'PES Modern College of Engineering', landmark: 'Jangali Maharaj Road, Shivajinagar', suburb: 'Shivajinagar', city: 'Pune', state: 'Maharashtra', pincode: '411005', lat: 18.5280, lon: 73.8500 },

  // Pune Popular Food & Culture Landmarks
  { name: 'Sujata Mastani, Sadashiv Peth', landmark: 'Near Khunya Murlidhar', suburb: 'Sadashiv Peth', city: 'Pune', state: 'Maharashtra', pincode: '411030', lat: 18.5126, lon: 73.8519 },
  { name: 'Sujata Mastani, Aranyeshwar Padmavati Road', landmark: 'Aranyeshwar Park Society', suburb: 'Sahakar Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411009', lat: 18.4872, lon: 73.8546 },
  { name: 'Sujata Society, Bund Garden Road', landmark: 'Opposite Bund Garden', suburb: 'Bund Garden', city: 'Pune', state: 'Maharashtra', pincode: '411001', lat: 18.5362, lon: 73.8785 },
  { name: 'Sujata Mastani, Baner Gaon', landmark: 'Gopal Hari Deshmukh Marg', suburb: 'Baner', city: 'Pune', state: 'Maharashtra', pincode: '411045', lat: 18.5590, lon: 73.7868 },
  { name: 'Sujata Mastani, Kothrud', landmark: 'Near Karve Statue', suburb: 'Kothrud', city: 'Pune', state: 'Maharashtra', pincode: '411038', lat: 18.5074, lon: 73.8077 },
  { name: 'Sujata Mastani, Sinhagad Road', landmark: 'Manik Baug', suburb: 'Sinhagad Road', city: 'Pune', state: 'Maharashtra', pincode: '411051', lat: 18.4812, lon: 73.8298 },
  { name: 'Sujata Mastani, Shukrawar Peth', landmark: 'Ravjimama Kondhakar Path', suburb: 'Shukrawar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411002', lat: 18.5101, lon: 73.8562 },
  { name: 'Sujata Mastani, Vasant Vihar Bibvewadi', landmark: 'Prabodhankar Thakare Path', suburb: 'Bibvewadi', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4795, lon: 73.8612 },
  { name: 'SUJATA COACH PVT LTD', landmark: 'Near Swargate / Bibvewadi', suburb: 'Pune', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4750, lon: 73.8600 },

  // Pune Core Peths & Localities
  { name: 'Deccan Gymkhana, Pune', landmark: 'FC Road / Sambhaji Park', suburb: 'Deccan Gymkhana', city: 'Pune', state: 'Maharashtra', pincode: '411004', lat: 18.5173, lon: 73.8415 },
  { name: 'Fergusson College Road (FC Road)', landmark: 'Goodluck Chowk', suburb: 'Shivajinagar', city: 'Pune', state: 'Maharashtra', pincode: '411004', lat: 18.5236, lon: 73.8417 },
  { name: 'Jangali Maharaj Road (JM Road)', landmark: 'Sambhaji Park', suburb: 'Shivajinagar', city: 'Pune', state: 'Maharashtra', pincode: '411005', lat: 18.5284, lon: 73.8475 },
  { name: 'Shaniwar Wada, Shaniwar Peth', landmark: 'Historical Fort', suburb: 'Shaniwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411030', lat: 18.5196, lon: 73.8553 },
  { name: 'Shanipar Chowk, Sadashiv Peth', landmark: 'Mandai Link Road', suburb: 'Sadashiv Peth', city: 'Pune', state: 'Maharashtra', pincode: '411030', lat: 18.5134, lon: 73.8532 },
  { name: 'Appa Balwant Chowk (ABC)', landmark: 'Book Market', suburb: 'Budhwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411002', lat: 18.5167, lon: 73.8547 },
  { name: 'Mahatma Phule Mandai, Shukrawar Peth', landmark: 'Central Market', suburb: 'Shukrawar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411002', lat: 18.5127, lon: 73.8576 },
  { name: 'Tulshibaug, Budhwar Peth', landmark: 'Ganpati Temple', suburb: 'Budhwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411002', lat: 18.5144, lon: 73.8569 },
  { name: 'Kasba Peth, Pune', landmark: 'Kasba Ganpati', suburb: 'Kasba Peth', city: 'Pune', state: 'Maharashtra', pincode: '411011', lat: 18.5204, lon: 73.8588 },
  { name: 'Narayan Peth, Pune', landmark: 'Kesari Wada', suburb: 'Narayan Peth', city: 'Pune', state: 'Maharashtra', pincode: '411030', lat: 18.5165, lon: 73.8489 },
  { name: 'Raviwar Peth, Pune', landmark: 'Saraf Bazaar', suburb: 'Raviwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411002', lat: 18.5160, lon: 73.8610 },
  { name: 'Somwar Peth, Pune', landmark: 'Nageshwar Temple', suburb: 'Somwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411011', lat: 18.5225, lon: 73.8682 },
  { name: 'Mangalwar Peth, Pune', landmark: 'Juna Bazaar', suburb: 'Mangalwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411011', lat: 18.5255, lon: 73.8640 },
  { name: 'Guruwar Peth, Pune', landmark: 'Panchmukhi Maruti', suburb: 'Guruwar Peth', city: 'Pune', state: 'Maharashtra', pincode: '411042', lat: 18.5080, lon: 73.8605 },
  { name: 'Ganj Peth, Pune', landmark: 'Phule Wada', suburb: 'Ganj Peth', city: 'Pune', state: 'Maharashtra', pincode: '411042', lat: 18.5065, lon: 73.8660 },
  { name: 'Bhavani Peth, Pune', landmark: 'Timber Market', suburb: 'Bhavani Peth', city: 'Pune', state: 'Maharashtra', pincode: '411042', lat: 18.5085, lon: 73.8710 },
  { name: 'Nana Peth, Pune', landmark: 'Quarter Gate', suburb: 'Nana Peth', city: 'Pune', state: 'Maharashtra', pincode: '411002', lat: 18.5135, lon: 73.8695 },
  { name: 'Rasta Peth, Pune', landmark: 'Power House', suburb: 'Rasta Peth', city: 'Pune', state: 'Maharashtra', pincode: '411011', lat: 18.5185, lon: 73.8715 },

  // Pune Suburbs & IT Hubs
  { name: 'Kothrud, Karve Road, Pune', landmark: 'Near Karve Statue / Vanaz', suburb: 'Kothrud', city: 'Pune', state: 'Maharashtra', pincode: '411038', lat: 18.5074, lon: 73.8077 },
  { name: 'Kothrud, Paud Road, Pune', landmark: 'Near MIT College', suburb: 'Kothrud', city: 'Pune', state: 'Maharashtra', pincode: '411038', lat: 18.5120, lon: 73.8050 },
  { name: 'Karve Nagar, Pune', landmark: 'Cummins College Road', suburb: 'Karve Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411052', lat: 18.4912, lon: 73.8198 },
  { name: 'Warje, Mumbai-Bangalore Highway', landmark: 'Warje Flyover', suburb: 'Warje', city: 'Pune', state: 'Maharashtra', pincode: '411058', lat: 18.4785, lon: 73.7990 },
  { name: 'Baner High Street, Pune', landmark: 'Near Balewadi Phata', suburb: 'Baner', city: 'Pune', state: 'Maharashtra', pincode: '411045', lat: 18.5590, lon: 73.7868 },
  { name: 'Balewadi, Pune', landmark: 'Balewadi Sports Complex / High Street', suburb: 'Balewadi', city: 'Pune', state: 'Maharashtra', pincode: '411045', lat: 18.5750, lon: 73.7745 },
  { name: 'Aundh, Parihar Chowk, Pune', landmark: 'Westend Mall', suburb: 'Aundh', city: 'Pune', state: 'Maharashtra', pincode: '411007', lat: 18.5602, lon: 73.8077 },
  { name: 'Pashan, Pune', landmark: 'Pashan Lake / Circle', suburb: 'Pashan', city: 'Pune', state: 'Maharashtra', pincode: '411021', lat: 18.5420, lon: 73.7950 },
  { name: 'Bavdhan, Pune', landmark: 'Chandani Chowk', suburb: 'Bavdhan', city: 'Pune', state: 'Maharashtra', pincode: '411021', lat: 18.5150, lon: 73.7750 },
  { name: 'Viman Nagar, Phoenix Marketcity, Pune', landmark: 'Near Symbiosis College', suburb: 'Viman Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411014', lat: 18.5679, lon: 73.9143 },
  { name: 'Kalyani Nagar, Pune', landmark: 'Bishop School / Jogger Park', suburb: 'Kalyani Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411006', lat: 18.5480, lon: 73.9025 },
  { name: 'Koregaon Park, North Main Road, Pune', landmark: 'Osho Ashram / German Bakery', suburb: 'Koregaon Park', city: 'Pune', state: 'Maharashtra', pincode: '411001', lat: 18.5362, lon: 73.8940 },
  { name: 'Magarpatta City, Hadapsar, Pune', landmark: 'Cybercity / Destination Centre', suburb: 'Hadapsar', city: 'Pune', state: 'Maharashtra', pincode: '411028', lat: 18.5144, lon: 73.9298 },
  { name: 'Amanora Park Town, Hadapsar, Pune', landmark: 'Amanora Mall', suburb: 'Hadapsar', city: 'Pune', state: 'Maharashtra', pincode: '411028', lat: 18.5180, lon: 73.9350 },
  { name: 'Kharadi, EON Free Zone, Pune', landmark: 'World Trade Center', suburb: 'Kharadi', city: 'Pune', state: 'Maharashtra', pincode: '411014', lat: 18.5520, lon: 73.9520 },
  { name: 'Hinjawadi Phase 1, Rajiv Gandhi Infotech Park', landmark: 'Shivaji Chowk', suburb: 'Hinjawadi', city: 'Pune', state: 'Maharashtra', pincode: '411057', lat: 18.5913, lon: 73.7389 },
  { name: 'Hinjawadi Phase 2, Pune', landmark: 'Wipro Circle', suburb: 'Hinjawadi', city: 'Pune', state: 'Maharashtra', pincode: '411057', lat: 18.5980, lon: 73.7250 },
  { name: 'Hinjawadi Phase 3, Pune', landmark: 'Megapolis / Tech Mahindra', suburb: 'Hinjawadi', city: 'Pune', state: 'Maharashtra', pincode: '411057', lat: 18.5870, lon: 73.7020 },
  { name: 'Wakad, Dutta Mandir Road, Pune', landmark: 'Near Ginger Hotel', suburb: 'Wakad', city: 'Pune', state: 'Maharashtra', pincode: '411057', lat: 18.5987, lon: 73.7686 },
  { name: 'Pimple Saudagar, Kunal Icon Road, Pune', landmark: 'Near Govind Garden', suburb: 'Pimple Saudagar', city: 'Pune', state: 'Maharashtra', pincode: '411027', lat: 18.5987, lon: 73.7998 },
  { name: 'Pimple Nilakh, Pune', landmark: 'DP Road', suburb: 'Pimple Nilakh', city: 'Pune', state: 'Maharashtra', pincode: '411027', lat: 18.5800, lon: 73.7900 },
  { name: 'Pimpri Chinchwad, Pune', landmark: 'Finolex Chowk / Dr. D.Y. Patil', suburb: 'Pimpri', city: 'Pune', state: 'Maharashtra', pincode: '411018', lat: 18.6270, lon: 73.8000 },
  { name: 'Nigdi, Pradhikaran, Pune', landmark: 'Bhakti Shakti Chowk', suburb: 'Nigdi', city: 'Pune', state: 'Maharashtra', pincode: '411044', lat: 18.6550, lon: 73.7750 },
  { name: 'Swargate, Pune', landmark: 'Jedhe Chowk / ST Stand', suburb: 'Swargate', city: 'Pune', state: 'Maharashtra', pincode: '411042', lat: 18.5018, lon: 73.8636 },
  { name: 'Bibvewadi, Pune', landmark: 'Vasant Vihar / Chintamani Ganpati', suburb: 'Bibvewadi', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4795, lon: 73.8612 },
  { name: 'Katraj, Pune', landmark: 'Katraj Snake Park & Zoo', suburb: 'Katraj', city: 'Pune', state: 'Maharashtra', pincode: '411046', lat: 18.4529, lon: 73.8553 },
  { name: 'Dhankawadi, Pune', landmark: 'Bharati Vidyapeeth Campus', suburb: 'Dhankawadi', city: 'Pune', state: 'Maharashtra', pincode: '411043', lat: 18.4600, lon: 73.8550 },
  { name: 'Sahakar Nagar, Pune', landmark: 'Taljai Hills Foot', suburb: 'Sahakar Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411009', lat: 18.4872, lon: 73.8546 },
  { name: 'Padmavati, Pune', landmark: 'Padmavati Mandir', suburb: 'Padmavati', city: 'Pune', state: 'Maharashtra', pincode: '411009', lat: 18.4800, lon: 73.8580 },
  { name: 'Sinhagad Road, Manik Baug, Pune', landmark: 'Near Abhiruchi Mall', suburb: 'Sinhagad Road', city: 'Pune', state: 'Maharashtra', pincode: '411051', lat: 18.4812, lon: 73.8298 },
  { name: 'Dhayari, Pune', landmark: 'Dhayari Phata / DSK Vishwa', suburb: 'Dhayari', city: 'Pune', state: 'Maharashtra', pincode: '411041', lat: 18.4500, lon: 73.8150 },
  { name: 'Camp, MG Road, Pune', landmark: 'Aurora Towers / SGS Mall', suburb: 'Camp', city: 'Pune', state: 'Maharashtra', pincode: '411001', lat: 18.5186, lon: 73.8785 },
  { name: 'Pune Railway Station', landmark: 'Main Station Entrance', suburb: 'Agarkar Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411001', lat: 18.5289, lon: 73.8744 },
  { name: 'Pune Airport (PNQ), Lohegaon', landmark: 'Departure Terminal', suburb: 'Lohegaon', city: 'Pune', state: 'Maharashtra', pincode: '411032', lat: 18.5822, lon: 73.9197 },
  { name: 'Savitribai Phule Pune University (SPPU)', landmark: 'Ganeshkhind Main Gate', suburb: 'Ganeshkhind', city: 'Pune', state: 'Maharashtra', pincode: '411007', lat: 18.5529, lon: 73.8262 },
  { name: 'PCCOE (Pimpri Chinchwad College of Engineering)', landmark: 'Sector 26, Pradhikaran, Nigdi', suburb: 'Nigdi', city: 'Pune', state: 'Maharashtra', pincode: '411044', lat: 18.6538, lon: 73.7695 },
  { name: 'MIT ADT University, Loni Kalbhor', landmark: 'Rajbaug Educational Complex, Solapur Highway', suburb: 'Loni Kalbhor', city: 'Pune', state: 'Maharashtra', pincode: '412201', lat: 18.4905, lon: 74.0245 },
  { name: 'NIBM Road, Kondhwa, Pune', landmark: 'Near Cloud 9 / Bizzbay Mall', suburb: 'Kondhwa', city: 'Pune', state: 'Maharashtra', pincode: '411048', lat: 18.4770, lon: 73.8960 },
  { name: 'Wanowrie, Pune', landmark: 'Kedari Petrol Pump / Jagtap Chowk', suburb: 'Wanowrie', city: 'Pune', state: 'Maharashtra', pincode: '411040', lat: 18.4950, lon: 73.8980 },
  { name: 'Market Yard, Gultekdi, Pune', landmark: 'Shree Chhatrapati Shivaji Market Yard', suburb: 'Gultekdi', city: 'Pune', state: 'Maharashtra', pincode: '411037', lat: 18.4890, lon: 73.8670 },
  { name: 'Wagholi, Pune', landmark: 'Nagar Road / Lexicon International', suburb: 'Wagholi', city: 'Pune', state: 'Maharashtra', pincode: '412207', lat: 18.5800, lon: 73.9800 },
  { name: 'Ravet, Pune', landmark: 'DY Patil Ravet Campus / BRTS Road', suburb: 'Ravet', city: 'Pune', state: 'Maharashtra', pincode: '412101', lat: 18.6475, lon: 73.7380 },
  { name: 'Tathawade, Pune', landmark: 'JSPM / Indira College Campus', suburb: 'Tathawade', city: 'Pune', state: 'Maharashtra', pincode: '411033', lat: 18.6180, lon: 73.7540 },
  { name: 'Bhosari, PCMC, Pune', landmark: 'MIDC / Pune-Nashik Highway', suburb: 'Bhosari', city: 'Pune', state: 'Maharashtra', pincode: '411026', lat: 18.6250, lon: 73.8450 },
  { name: 'Chakan, Pune', landmark: 'Talegaon Chowk / Automobile Hub', suburb: 'Chakan', city: 'Pune', state: 'Maharashtra', pincode: '410501', lat: 18.7600, lon: 73.8600 },

  // Mumbai & Mumbai Metropolitan Region (MMR)
  { name: 'Bandra West, Linking Road, Mumbai', landmark: 'Near Bandra Station / Bandstand', suburb: 'Bandra West', city: 'Mumbai', state: 'Maharashtra', pincode: '400050', lat: 19.0596, lon: 72.8295 },
  { name: 'Andheri West, Lokhandwala Complex, Mumbai', landmark: 'Near Infinity Mall', suburb: 'Andheri West', city: 'Mumbai', state: 'Maharashtra', pincode: '400053', lat: 19.1363, lon: 72.8277 },
  { name: 'Dadar West, Shivaji Park, Mumbai', landmark: 'Near Sena Bhavan / Chaitya Bhoomi', suburb: 'Dadar West', city: 'Mumbai', state: 'Maharashtra', pincode: '400028', lat: 19.0269, lon: 72.8397 },
  { name: 'Powai, Hiranandani Gardens, Mumbai', landmark: 'Near IIT Bombay Main Gate', suburb: 'Powai', city: 'Mumbai', state: 'Maharashtra', pincode: '400076', lat: 19.1176, lon: 72.9060 },
  { name: 'Juhu Beach, Mumbai', landmark: 'Juhu Tara Road / Hotel JW Marriott', suburb: 'Juhu', city: 'Mumbai', state: 'Maharashtra', pincode: '400049', lat: 19.0988, lon: 72.8264 },
  { name: 'Colaba, Gateway of India, Mumbai', landmark: 'Taj Mahal Palace / Colaba Causeway', suburb: 'Colaba', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', lat: 18.9220, lon: 72.8347 },
  { name: 'Marine Drive & Nariman Point, Mumbai', landmark: 'NCPA / Marine Drive Promenade', suburb: 'Churchgate', city: 'Mumbai', state: 'Maharashtra', pincode: '400021', lat: 18.9260, lon: 72.8230 },
  { name: 'Borivali West, Mumbai', landmark: 'Near Shimpoli / Gorai Creek', suburb: 'Borivali West', city: 'Mumbai', state: 'Maharashtra', pincode: '400092', lat: 19.2307, lon: 72.8567 },
  { name: 'Ghatkopar East, Mumbai', landmark: 'R-City Mall / 90 Feet Road', suburb: 'Ghatkopar East', city: 'Mumbai', state: 'Maharashtra', pincode: '400077', lat: 19.0860, lon: 72.9090 },
  { name: 'Vashi, Sector 17, Navi Mumbai', landmark: 'Inorbit Mall / Vashi Station', suburb: 'Vashi', city: 'Navi Mumbai', state: 'Maharashtra', pincode: '400703', lat: 19.0771, lon: 72.9986 },
  { name: 'CBD Belapur, Navi Mumbai', landmark: 'CIDCO Bhavan / Belapur Station', suburb: 'CBD Belapur', city: 'Navi Mumbai', state: 'Maharashtra', pincode: '400614', lat: 19.0180, lon: 73.0400 },
  { name: 'Thane West, Gokhale Road, Thane', landmark: 'Near Talao Pali / Viviana Mall', suburb: 'Thane West', city: 'Thane', state: 'Maharashtra', pincode: '400601', lat: 19.1860, lon: 72.9750 },
  { name: 'Kalyan West, Shivaji Chowk', landmark: 'Near Kalyan Station / Agra Road', suburb: 'Kalyan West', city: 'Kalyan', state: 'Maharashtra', pincode: '421301', lat: 19.2437, lon: 73.1355 },
  { name: 'Dombivli East, Phadke Road', landmark: 'Near Dombivli Railway Station', suburb: 'Dombivli East', city: 'Dombivli', state: 'Maharashtra', pincode: '421201', lat: 19.2184, lon: 73.0867 },

  // Nashik
  { name: 'College Road, Nashik', landmark: 'Near BYK College / Circle Cinema', suburb: 'College Road', city: 'Nashik', state: 'Maharashtra', pincode: '422005', lat: 19.9975, lon: 73.7660 },
  { name: 'Panchavati, Godavari Ghat, Nashik', landmark: 'Kalaram Temple / Ramkund', suburb: 'Panchavati', city: 'Nashik', state: 'Maharashtra', pincode: '422003', lat: 20.0050, lon: 73.7920 },
  { name: 'Gangapur Road, Nashik', landmark: 'Near Jehan Circle / KTHM College', suburb: 'Gangapur Road', city: 'Nashik', state: 'Maharashtra', pincode: '422013', lat: 20.0120, lon: 73.7580 },
  { name: 'CIDCO, Nashik', landmark: 'Near Lekha Nagar / Trimurti Chowk', suburb: 'CIDCO', city: 'Nashik', state: 'Maharashtra', pincode: '422009', lat: 19.9650, lon: 73.7550 },

  // Chhatrapati Sambhajinagar (Aurangabad)
  { name: 'Cannaught Place, CIDCO, Chhatrapati Sambhajinagar (Aurangabad)', landmark: 'Near Prozone Mall / Town Centre, Aurangabad', suburb: 'CIDCO', city: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', pincode: '431003', lat: 19.8762, lon: 75.3670 },
  { name: 'Kranti Chowk, Chhatrapati Sambhajinagar (Aurangabad)', landmark: 'Chhatrapati Shivaji Maharaj Statue, Aurangabad Central', suburb: 'Kranti Chowk', city: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', pincode: '431001', lat: 19.8700, lon: 75.3260 },
  { name: 'Dr. BAMU (Babasaheb Ambedkar Marathwada University), Aurangabad', landmark: 'University Campus Gate, Chhatrapati Sambhajinagar', suburb: 'University Area', city: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', pincode: '431004', lat: 19.9020, lon: 75.3050 },

  // Nagpur
  { name: 'Dharampeth, Laxmi Nagar, Nagpur', landmark: 'Coffee House Chowk / West High Court Road', suburb: 'Dharampeth', city: 'Nagpur', state: 'Maharashtra', pincode: '440010', lat: 21.1420, lon: 79.0650 },
  { name: 'Sitabuldi, Main Market, Nagpur', landmark: 'Near Sitabuldi Fort / Metro Interchange', suburb: 'Sitabuldi', city: 'Nagpur', state: 'Maharashtra', pincode: '440012', lat: 21.1470, lon: 79.0830 },
  { name: 'VNIT Nagpur (Visvesvaraya National Institute of Technology)', landmark: 'South Ambazari Road', suburb: 'Ambazari', city: 'Nagpur', state: 'Maharashtra', pincode: '440010', lat: 21.1255, lon: 79.0515 },
  { name: 'IT Park Gayatri Nagar, Nagpur', landmark: 'Parsodi, Near VNIT', suburb: 'Gayatri Nagar', city: 'Nagpur', state: 'Maharashtra', pincode: '440022', lat: 21.1180, lon: 79.0550 },

  // Kolhapur
  { name: 'Mahalaxmi Ambabai Temple, Kolhapur', landmark: 'Bhavani Mandap / Old Palace', suburb: 'Bhavani Mandap', city: 'Kolhapur', state: 'Maharashtra', pincode: '416012', lat: 16.6946, lon: 74.2238 },
  { name: 'Rajarampuri, 2nd Lane, Kolhapur', landmark: 'Near Janata Bazaar', suburb: 'Rajarampuri', city: 'Kolhapur', state: 'Maharashtra', pincode: '416008', lat: 16.6910, lon: 74.2480 },
  { name: 'Tarabai Park, Kolhapur', landmark: 'Near Circuit House / Collector Office', suburb: 'Tarabai Park', city: 'Kolhapur', state: 'Maharashtra', pincode: '416003', lat: 16.7110, lon: 74.2380 },
  { name: 'Shivaji University, Kolhapur', landmark: 'Vidyanagar, Old Pune-Bangalore Road', suburb: 'Vidyanagar', city: 'Kolhapur', state: 'Maharashtra', pincode: '416004', lat: 16.6780, lon: 74.2560 },

  // Solapur
  { name: 'Navi Peth, Main Market, Solapur', landmark: 'Near Siddheshwar Temple', suburb: 'Navi Peth', city: 'Solapur', state: 'Maharashtra', pincode: '413007', lat: 17.6715, lon: 75.9064 },
  { name: 'Saat Rasta Chowk, Solapur', landmark: 'Near Old Employment Chowk / ST Stand', suburb: 'Saat Rasta', city: 'Solapur', state: 'Maharashtra', pincode: '413001', lat: 17.6620, lon: 75.9120 },

  // Satara & Sangli
  { name: 'Powai Naka, Satara', landmark: 'Shivaji Circle / Radhika Road', suburb: 'Powai Naka', city: 'Satara', state: 'Maharashtra', pincode: '415001', lat: 17.6890, lon: 73.9980 },
  { name: 'Vishrambag, Sangli', landmark: 'Walchand College Road / Sangli Station Link', suburb: 'Vishrambag', city: 'Sangli', state: 'Maharashtra', pincode: '416415', lat: 16.8480, lon: 74.6020 },
  { name: 'Walchand College of Engineering, Sangli', landmark: 'A/P Vishrambag', suburb: 'Vishrambag', city: 'Sangli', state: 'Maharashtra', pincode: '416415', lat: 16.8450, lon: 74.6010 }
];

// Common abbreviation expansions
const ABBREVIATIONS = {
  apa: 'apartment',
  apt: 'apartment',
  apts: 'apartments',
  soc: 'society',
  socy: 'society',
  bldg: 'building',
  bldng: 'building',
  rd: 'road',
  st: 'street',
  nr: 'near',
  opp: 'opposite',
  ngr: 'nagar',
  ng: 'nagar',
  col: 'colony',
  clny: 'colony',
  hsg: 'housing',
  stn: 'station',
  chwk: 'chowk',
  chauk: 'chowk',
  mrg: 'marg',
  gln: 'galli',
  flt: 'flat',
  clg: 'college',
  coll: 'college',
  univ: 'university',
  inst: 'institute',
  tech: 'technology',
  engg: 'engineering'
};

export function expandAbbreviations(query) {
  if (!query) return '';
  return query
    .trim()
    .split(/\s+/)
    .map((w) => ABBREVIATIONS[w.toLowerCase()] || w)
    .join(' ');
}

// Synchronous Instant Search (0ms for every keystroke)
export function searchLocalLocations(query) {
  const clean = query.toLowerCase().trim();
  if (!clean || clean.length < 1) return [];

  const genericStopWords = new Set(['pune', 'maharashtra', 'india', 'near', 'rd', 'road', 'street', 'college', 'clg']);
  const tokens = clean.split(/\s+/).filter(Boolean);
  const specificTokens = tokens.filter((t) => !genericStopWords.has(t));
  const expandedQuery = expandAbbreviations(clean).toLowerCase();
  const expandedTokens = expandedQuery.split(/\s+/).filter(Boolean);

  return MAHARASHTRA_LOCALITIES.filter((loc) => {
    const haystack = `${loc.name} ${loc.landmark || ''} ${loc.suburb || ''} ${loc.city || ''} ${loc.pincode || ''}`.toLowerCase();
    
    // Direct string match
    if (haystack.includes(clean) || haystack.includes(expandedQuery)) return true;

    // Must match all specific tokens if any exist
    if (specificTokens.length > 0) {
      const matchesAllSpecific = specificTokens.every((t) => haystack.includes(t));
      if (matchesAllSpecific) return true;
    }

    // Token match
    const matchesAllTokens = tokens.every((t) => haystack.includes(t));
    if (matchesAllTokens) return true;

    const matchesAllExpandedTokens = expandedTokens.every((t) => haystack.includes(t));
    if (matchesAllExpandedTokens) return true;

    // Single token prefix match
    if (tokens.length === 1 && tokens[0].length >= 3 && haystack.includes(tokens[0])) {
      return true;
    }

    return false;
  }).slice(0, 8);
}
