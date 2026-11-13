// Comprehensive dataset for the 6 missions featured in THE FORGOTTEN FRONTIER
// Curated with historical accuracy, real NASA coordinates, timelines, trivia, and quizzes.

const BASE = import.meta.env.BASE_URL;

export const MISSIONS = [
  // ===================== MOON MISSIONS =====================
  {
    id: 'apollo-11-descent-stage',
    body: 'moon',
    badge: 'Apollo 11 LM-5',
    title: 'The Part of the Eagle That Never Came Home',
    artifact: 'Apollo 11 Lunar Module Descent Stage',
    siteName: 'Tranquility Base (Mare Tranquillitatis)',
    landingDate: 'July 20, 1969',
    departureDate: 'July 21, 1969',
    timeOnSurface: '21 hours, 36 minutes',
    distanceFromEarth: '~384,400 km',
    massLeftBehind: '2,034 kg (4,484 lbs)',
    coordinates: {
      lat: 0.67408,
      lng: 23.47297,
      latFormatted: "0.67408° N",
      lngFormatted: "23.47297° E"
    },
    heroImage: 'https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~orig.jpg',
    heroAlt: 'The Lunar Module Eagle standing on Mare Tranquillitatis with gold kapton foil and American flag',
    accentColor: '#38bdf8', // Cyan lunar glow
    status: 'Permanent Historic Monument',

    overview: 'The astronauts returned. The mission was complete. But one part of their spacecraft never made the journey home. It remained on the Moon, holding a story that the world should never forget.',

    storyTitle: 'THE EAGLE: A MACHINE LEFT BEHIND ON THE MOON',

    story: [
      {
        sectionId: 1,
        paragraphs: [
          'Imagine travelling nearly 384,000 kilometres from Earth, reaching another world and leaving behind a machine that helped make history.',
          'That is exactly what happened during Apollo 11.',
          'On 16 July 1969, three astronauts — Neil Armstrong, Buzz Aldrin and Michael Collins — began their historic journey aboard the Apollo 11 mission.'
        ],
        image: `${BASE}images/apollo11/apollo11-astronauts.jpg`,
        caption: 'Astronaut Michael Collins (90), who stayed behind in Apollo 11 — Neil Armstrong, Buzz Aldrin and Michael Collins.'
      },
      {
        sectionId: 2,
        paragraphs: [
          'They were heading towards the Moon, carrying the hopes and curiosity of millions of people on Earth. Their spacecraft travelled through space for several days before reaching lunar orbit.',
          'However, not all three astronauts would land on the Moon. Michael Collins stayed in the Command Module, while Armstrong and Aldrin entered a smaller spacecraft called Eagle.'
        ],
        image: `${BASE}images/apollo11/eagle-lunar-lander.jpg`,
        caption: "Far above the Earth, NASA's Apollo lunar lander put astronauts on the moon."
      },
      {
        sectionId: 3,
        paragraphs: [
          'Eagle had one important job: bring the two astronauts safely down to the lunar surface.',
          'On 20 July 1969, it successfully landed at a place called Tranquility Base. The message sent to Earth was unforgettable:'
        ],
        transmissionQuote: 'Houston, Tranquility Base here. The Eagle has landed.',
        image: `${BASE}images/apollo11/buzz-aldrin-moonwalk.jpg`,
        caption: 'Apollo 11: NASA video of first moon walk resurfaces — Buzz Aldrin on the lunar surface.'
      },
      {
        sectionId: 4,
        paragraphs: [
          'Armstrong and Aldrin stepped onto the Moon, explored the surface and collected samples. Their mission was a success.',
          'But what happened to the spacecraft that brought them there?'
        ]
      },
      {
        sectionId: 'why-it-had-to-stay-behind',
        heading: 'Why it had to stay behind',
        paragraphs: [
          'The Eagle was never meant to return to Earth as one complete spacecraft. Its lower half had done its job — bringing the astronauts safely to the Moon. So, Armstrong and Aldrin climbed into the upper half, which lifted off to take them back to Michael Collins. The lower half stayed behind at Tranquility Base, becoming a lasting reminder of the journey that changed history.',
          'Eagle was designed in two stages. The lower part, called the Descent Stage, helped the spacecraft land. The upper part, called the Ascent Stage, carried the astronauts back into lunar orbit.',
          'When the astronauts were ready to leave, the Ascent Stage lifted off, while the Descent Stage stayed behind.'
        ],
        image: `${BASE}images/apollo11/apollo11-liftoff-pad39a.jpg`,
        caption: 'Apollo 11 liftoff from pad 39A | The Planetary Society'
      },
      {
        sectionId: 5,
        paragraphs: [
          'That means a part of the Apollo 11 spacecraft never returned home.',
          'The astronauts returned safely to Earth on 24 July 1969. But the Descent Stage remained at Tranquility Base, becoming a silent historical object on the lunar surface.',
          'It no longer carries astronauts. It no longer travels through space. Yet its importance has not disappeared.',
          'It reminds us that exploration is not only about reaching new places. It is also about the machines, experiments and discoveries that make those journeys possible.'
        ],
        closingTribute: 'The astronauts came home. Their footprints remained. And the Eagle left a part of itself behind.'
      }
    ],

    timeline: [
      {
        date: 'July 16, 1969 (13:32 UTC)',
        phase: 'Launch from Earth',
        title: 'Saturn V Liftoff from Launch Complex 39A',
        detail: 'The colossal 363-foot Saturn V rocket propelled Apollo 11 outward toward the Moon, carrying 3,000 metric tons of fuel and three astronauts.'
      },
      {
        date: 'July 20, 1969 (20:17 UTC)',
        phase: 'Touchdown',
        title: 'Eagle Lands in the Sea of Tranquility',
        detail: 'With alarms sounding and manual steering over boulder fields, Neil Armstrong guided Eagle down to an ultra-soft touchdown on Mare Tranquillitatis.'
      },
      {
        date: 'July 21, 1969 (02:56 UTC)',
        phase: 'First Steps',
        title: 'One Small Step for a Man',
        detail: 'Neil Armstrong stepped onto the lunar pad and declared his iconic words. Buzz Aldrin joined 19 minutes later, calling the vista "magnificent desolation."'
      },
      {
        date: 'July 21, 1969 (17:54 UTC)',
        phase: 'Ascent & Abandonment',
        title: 'Ascent Stage Fires, Descent Stage Left Behind',
        detail: 'Pyrotechnic bolts fired. The ascent stage engine ignited with 3,500 pounds of thrust, lifting off toward lunar orbit while the descent stage stood alone.'
      },
      {
        date: 'Present Day (2026+)',
        phase: 'Eternal Monument',
        title: 'Protected Extraterrestrial Heritage',
        detail: 'Photographed in razor-sharp detail by NASA’s Lunar Reconnaissance Orbiter (LRO). Protected under the US "One Small Step to Protect Human Heritage in Space Act."'
      }
    ],

    mapData: {
      locationDescription: 'Mare Tranquillitatis (Sea of Tranquility), an ancient basaltic lava plain formed over 3.5 billion years ago.',
      orbitalImageryUrl: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001859/GSFC_20171208_Archive_e001859~orig.jpg',
      orbitalCaption: 'NASA Lunar Reconnaissance Orbiter (LRO) high-resolution image showing the Apollo 11 descent stage shadow, scientific instruments (EASEP), and dark astronaut footpaths etched into the regolith.',
      elevation: '-2.57 km below mean lunar radius',
      craterProximity: 'Located 400m west of West Crater and 60m east of Little West Crater.',
      features: [
        { label: 'Descent Stage', offset: { x: 50, y: 50 }, note: 'Octagonal gold-foil structure with 4 landing pads' },
        { label: 'Astronaut Footpath', offset: { x: 42, y: 58 }, note: 'Dark disturbed regolith path to Little West Crater' },
        { label: 'LRRR Experiment', offset: { x: 62, y: 44 }, note: 'Laser reflector deployed ~14 meters south of the LM' },
        { label: 'U.S. Flag Site', offset: { x: 46, y: 45 }, note: 'Knocked over by ascent engine exhaust during liftoff' }
      ]
    },

    facts: [
      {
        badge: 'Diplomacy',
        title: 'Diplomacy 🌍',
        description: 'Apollo 11 carried a tiny silicon disk containing goodwill messages from 73 countries. It was left on the Moon as a symbol of peace and friendship between nations.'
      },
      {
        badge: 'Preservation',
        title: 'Preservation 🌕',
        description: "The Moon has almost no atmosphere or rain. Because of this, the Eagle's Descent Stage and the astronauts' footprints can remain on the lunar surface for an extremely long time."
      },
      {
        badge: 'Tribute',
        title: 'Tribute 🏅',
        description: 'A plaque attached to the Eagle\'s Descent Stage carries the words, “We came in peace for all mankind.” It was left on the Moon to remember humanity\'s first crewed lunar landing.'
      },
      {
        badge: 'Reconnaissance',
        title: 'Reconnaissance 🔭',
        description: 'Before Apollo 11 landed, NASA sent robotic missions like Lunar Orbiter and Surveyor to study the Moon. Their photographs and measurements helped NASA choose a suitable landing site for the astronauts.'
      }
    ],

    quiz: {
      question: "What happened to the Eagle's Ascent Stage after it lifted off from the Moon?",
      options: [
        'It returned directly to Earth.',
        'It rejoined Michael Collins in lunar orbit.',
        'It landed at another location on the Moon.'
      ],
      correctIndex: 1,
      explanation: "Eagle's Ascent Stage carried Neil Armstrong and Buzz Aldrin off the lunar surface and successfully rejoined Michael Collins aboard the Command Module in lunar orbit.",
      badgeName: 'Tranquility Base Historian'
    }
  },

  {
    id: 'apollo-15-rover',
    body: 'moon',
    badge: 'Apollo 15 LRV-001',
    title: 'The Dune Buggy Parked Forever at Hadley Rille',
    artifact: 'Lunar Roving Vehicle (LRV-001)',
    siteName: 'Hadley-Apennine (Palus Putredinis)',
    landingDate: 'July 30, 1971',
    departureDate: 'August 2, 1971',
    timeOnSurface: '66 hours, 55 minutes',
    distanceFromEarth: '~384,400 km',
    massLeftBehind: '210 kg (460 lbs on Earth, 77 lbs on Moon)',
    coordinates: {
      lat: 26.1322,
      lng: 3.6339,
      latFormatted: "26.1322° N",
      lngFormatted: "3.6339° E"
    },
    heroImage: 'https://images-assets.nasa.gov/image/as15-88-11866/as15-88-11866~orig.jpg',
    heroAlt: 'Astronaut Jim Irwin salutes beside the Apollo 15 Lunar Roving Vehicle with Mount Hadley in background',
    accentColor: '#38bdf8',
    status: 'Permanent Historic Vehicle',

    overview: 'The first astronauts left footprints on the moon, but the next explorers want to leave something more—tracks that would travel far beyond their landing site. That is where the moon buggy came in.',

    storyTitle: 'FOUR WHEELS ACROSS THE MOON',

    story: [
      {
        sectionId: 1,
        paragraphs: [
          'Imagine a tiny electric car driving across a world with no roads, no traffic and no petrol stations. Sounds unusual, right? Yet, this really happened on the Moon.'
        ],
        image: `${BASE}images/apollo15/moon-buggy-lrv.jpg`,
        caption: 'PICTURE 1 — The Moon Buggy: 45 Years Since the First Lunar Rover Drive on the Moon'
      },
      {
        sectionId: 2,
        paragraphs: [
          'On Apollo 15, astronauts David Scott and James Irwin had something no Moon explorers had used before — a vehicle of their own. It was called the Lunar Roving Vehicle, or simply, the Moon Buggy. With four wheels and battery power, it was ready to explore a world humans had only walked across before.'
        ],
        image: `${BASE}images/apollo15/david-scott-driving.jpg`,
        caption: "PICTURE 2 — David Scott driving the rover: NASA's first moon buggy mission celebrates 50th anniversary"
      },
      {
        sectionId: 3,
        paragraphs: [
          'The little vehicle travelled across the Hadley–Apennine region, carrying the astronauts over the lunar landscape. They explored places beyond walking distance, collected Moon rocks and discovered more about the world beneath their feet.'
        ],
        image: `${BASE}images/apollo15/collecting-moon-samples.jpg`,
        caption: 'PICTURE 3 — Collecting Moon samples: Astronauts exploring the Hadley–Apennine region with the Moon Buggy'
      },
      {
        sectionId: 4,
        paragraphs: [
          'But the journey had an ending. When it was time for David Scott and James Irwin to leave the Moon and rejoin Alfred Worden in orbit, there was no journey home for their four-wheeled companion. The astronauts took off, leaving the Moon Buggy right where its adventure had ended.'
        ],
        image: `${BASE}images/apollo15/rover-left-on-moon.jpg`,
        caption: 'PICTURE 4 — The rover left on the Moon: The Apollo 15 Lunar Rover parked forever at Hadley Rille'
      },
      {
        sectionId: 5,
        paragraphs: [
          'And there it remains — a little explorer from Earth, parked forever at Hadley, with no driver coming back to start its next journey.'
        ],
        closingTribute: 'The astronauts returned home, their tracks remained, and a little moon buggy became a silent explorer, parked forever on the lunar surface.'
      }
    ],

    timeline: [
      {
        date: 'July 26, 1971',
        phase: 'Launch',
        title: 'Apollo 15 Falcon Blasts Off from KSC',
        detail: 'The first "J-series" extended science mission launched with upgraded spacesuits and the revolutionary new rover packed into quadrant 1 of Falcon.'
      },
      {
        date: 'July 31, 1971',
        phase: 'Deployment',
        title: 'First Drive on Another Celestial Body',
        detail: 'Dave Scott and Jim Irwin deployed the buggy and took it on its maiden voyage across the undulating plains of Palus Putredinis.'
      },
      {
        date: 'August 1, 1971',
        phase: 'Discovery',
        title: 'Finding the 4-Billion-Year-Old Genesis Rock',
        detail: 'Driving up the steep slopes of Mount Hadley Delta, the astronauts spotted sample 15415, an anorthosite crystal dating back to the formation of the Moon’s crust.'
      },
      {
        date: 'August 2, 1971',
        phase: 'Final Parking',
        title: 'Parked at Site 10 for Final Broadcast',
        detail: 'Scott parked the rover facing Falcon with its high-gain antenna locked on Earth. Odometer reading: 27.8 kilometers (17.3 miles).'
      },
      {
        date: 'Present Day (2026+)',
        phase: 'Still Parked',
        title: 'Awaiting Future Explorers at Hadley Rille',
        detail: 'Its steering wheel centered, its antenna still aimed skyward toward the blue marble of Earth, waiting in pristine silence at the base of the Apennines.'
      }
    ],

    mapData: {
      locationDescription: 'Hadley-Apennine region, nestled between 15,000-foot lunar mountains and the sinuous volcanic Hadley Rille trench.',
      orbitalImageryUrl: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001858/GSFC_20171208_Archive_e001858~orig.jpg',
      orbitalCaption: 'LRO camera view of the Apollo 15 site. The LRV parking site is clearly visible ~100m east of Falcon’s descent stage, along with parallel wheel ruts.',
      elevation: '-1.8 km below lunar datum',
      craterProximity: 'Located 1.5 km west of Mount Hadley Delta and 2 km east of the gorge of Hadley Rille.',
      features: [
        { label: 'LRV Final Parking Spot', offset: { x: 62, y: 48 }, note: 'Parked facing Falcon descent stage' },
        { label: 'Falcon Descent Stage', offset: { x: 45, y: 52 }, note: 'Touchdown point of Lunar Module' },
        { label: 'Wheel Ruts (Tracks)', offset: { x: 38, y: 40 }, note: 'Parallel tire tracks heading toward Hadley Rille' },
        { label: 'ALSEP Station', offset: { x: 30, y: 65 }, note: 'Nuclear-powered geophysical laboratory' }
      ]
    },

    facts: [
      {
        title: 'Woven Piano-Wire Tires',
        description: 'Tires were made of woven zinc-coated steel piano wire with titanium chevrons. Rubber would become brittle like glass in the extreme temperature swings of space.',
        badge: 'Materials'
      },
      {
        title: 'Fallen Astronaut Memorial',
        description: 'Before departing, Dave Scott placed a small 3.5-inch aluminum figurine called "Fallen Astronaut" and a plaque listing 14 deceased American and Soviet astronauts and cosmonauts right next to the rover.',
        badge: 'Secret Tribute'
      },
      {
        title: 'Remote-Controlled from Houston',
        description: 'The color TV camera on the rover could be steered by flight controllers on Earth, compensating for the 1.3-second light-speed delay to track the departing ascent stage.',
        badge: 'Tele-operations'
      },
      {
        title: 'Top Speed: 18 km/h',
        description: 'While its designed cruise speed was 8 km/h (5 mph), on Apollo 17 Gene Cernan pushed his rover down a hill to an extraterrestrial land-speed record of 18 km/h (11.2 mph)!',
        badge: 'Performance'
      }
    ],

    quiz: {
      question: 'Why was the Apollo 15 Lunar Roving Vehicle parked 100 meters away from the Lunar Module before departure?',
      options: [
        'To prevent its lithium batteries from igniting the spaceship',
        'So its color television camera could broadcast the live liftoff back to Earth',
        'Because the astronauts forgot the key in the ignition',
        'To test if its steering mechanism could self-drive autonomously'
      ],
      correctIndex: 1,
      explanation: 'Dave Scott drove the rover 100 meters east and pointed its camera at Falcon so NASA flight controller Ed Fendell in Houston could tilt the camera up and broadcast the live liftoff of the ascent stage to millions of TV viewers on Earth.',
      badgeName: 'Lunar Rover Navigator'
    }
  },

  {
    id: 'lunar-retroreflector',
    body: 'moon',
    badge: 'Apollo 11 & 14 & 15 LRRR',
    title: 'The Solitary Mirror That Still Talks to Earth',
    artifact: 'Laser Ranging Retroreflector (LRRR) Array',
    siteName: 'Tranquility Base & Fra Mauro & Hadley',
    landingDate: 'July 21, 1969 (First deployment)',
    departureDate: 'Never (Continuous operation)',
    timeOnSurface: '55+ Years of active science',
    distanceFromEarth: '~384,400 km (varying by 3.8 cm/yr)',
    massLeftBehind: '30 kg (66 lbs)',
    coordinates: {
      lat: 0.6734,
      lng: 23.4731,
      latFormatted: "0.6734° N",
      lngFormatted: "23.4731° E"
    },
    heroImage: `${BASE}images/retroreflector/the-lunar-reflector-cover.jpg`,
    heroAlt: 'The Apollo 11 Lunar Laser Ranging Retroreflector sitting on the Moon, aimed back at planet Earth',
    accentColor: '#38bdf8',
    status: 'ACTIVE – Still pinged by lasers today',

    overview: 'Of all the high-tech equipment carried across 240,000 miles of space during Apollo, the simplest device proved to be the most enduring. The Laser Ranging Retroreflector contains zero electronics, zero wires, and zero batteries. Yet it is the ONLY Apollo experiment that is still actively delivering groundbreaking scientific discoveries over half a century later.',

    storyTitle: 'THE MIRROR THAT NEVER STOPPED ANSWERING',

    story: [
      {
        sectionId: 1,
        paragraphs: [
          'Imagine a tiny object sitting silently on the Moon, with no batteries, no wires and no one to operate it. Yet, even after more than 50 years, scientists on Earth can still use it to study the Moon.'
        ],
        image: `${BASE}images/retroreflector/the-lunar-reflector.jpg`,
        caption: 'PICTURE 1 — The Lunar Reflector: Resting on the Moon'
      },
      {
        sectionId: 2,
        paragraphs: [
          'During Apollo 11, astronaut Buzz Aldrin placed a special device on the lunar surface. It was called a Laser Retroreflector. Unlike an ordinary mirror, it was designed to send incoming laser light back towards its source.'
        ],
        image: `${BASE}images/retroreflector/buzz-aldrin-deploying-reflector.jpg`,
        caption: 'PICTURE 2 — Buzz Aldrin deploying the reflector: Astronaut placing the retroreflector on the lunar surface'
      },
      {
        sectionId: 3,
        paragraphs: [
          'Inside this small device were special glass pieces called corner-cube prisms. Scientists on Earth could send laser pulses towards the Moon, and the reflector would send some of that light back.'
        ],
        image: `${BASE}images/retroreflector/corner-cube-prisms.jpg`,
        caption: 'PICTURE 3 — Close-up of the corner-cube prisms: Special glass pieces designed to send laser light back towards its source'
      },
      {
        sectionId: 4,
        paragraphs: [
          'By measuring how long the light took to make the round trip, scientists could calculate the distance between Earth and the Moon with great accuracy.'
        ],
        image: `${BASE}images/retroreflector/laser-experiment-earth-moon.jpg`,
        caption: 'PICTURE 4 — Laser experiment between Earth and Moon: Measuring round-trip light time to calculate Earth-Moon distance with great accuracy'
      },
      {
        sectionId: 5,
        paragraphs: [
          'But why leave such a special device behind? Because that was exactly what it was made for. It didn’t need to return to Earth, carry batteries or have anyone switch it on. Its job was to remain on the Moon and help scientists for years to come.'
        ],
        image: `${BASE}images/retroreflector/reflector-resting-on-moon.jpg`,
        caption: 'PICTURE 5 — The reflector resting on the Moon: The little mirror that stayed behind, continuing to help Earth listen to the Moon through light'
      },
      {
        sectionId: 6,
        paragraphs: [
          'The astronauts returned home, but their little mirror stayed behind. And even today, it continues to help Earth listen to the Moon through light.'
        ],
        closingTribute: 'The astronauts returned home, their little mirror stayed behind. And even today, it continues to help Earth listen to the Moon through light.'
      }
    ],

    timeline: [
      {
        date: 'July 21, 1969',
        phase: 'Deployment',
        title: 'Buzz Aldrin Sets Down the Apollo 11 LRRR',
        detail: 'Carefully leveled using a bubble level and aligned with a sun-compass to ensure the prisms faced Earth’s center.'
      },
      {
        date: 'August 1, 1969',
        phase: 'First Contact',
        title: 'First Laser Echo Detected at Lick Observatory',
        detail: 'Scientists recorded the first successful return pulses of laser light bounced off the Apollo 11 prisms.'
      },
      {
        date: '1971',
        phase: 'Network Expansion',
        title: 'Apollo 14 & 15 Deploy Larger Arrays',
        detail: 'Apollo 15 deployed a 300-prism array (triple the size), creating a triangulation network across the lunar face.'
      },
      {
        date: '1990s - Present',
        phase: 'Millimeter Revolution',
        title: 'Discovery of the Moon’s Liquid Core',
        detail: 'Decades of continuous ranging proved the Moon possesses a small fluid outer core through gravitational wobble.'
      },
      {
        date: 'Present Day (2026+)',
        phase: 'Continuous Operation',
        title: 'Active Daily Science After 55+ Years',
        detail: 'Laser pulses continue to be fired every month, making it the longest-running physical experiment in human history.'
      }
    ],

    mapData: {
      locationDescription: 'Mare Tranquillitatis, ~14 meters south-southwest of Apollo 11 Lunar Module landing site.',
      orbitalImageryUrl: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001859/GSFC_20171208_Archive_e001859~orig.jpg',
      orbitalCaption: 'LRO high-altitude view marking the location of the Apollo 11 Laser Ranging Retroreflector pallet next to the Early Apollo Scientific Experiments Package (EASEP).',
      elevation: '-2.57 km',
      craterProximity: 'Directly in the open plain between Cat’s Paw crater and Doublet crater.',
      features: [
        { label: 'Apollo 11 LRRR Array', offset: { x: 55, y: 56 }, note: '100 fused-silica corner cubes' },
        { label: 'Passive Seismic Experiment (PSE)', offset: { x: 42, y: 62 }, note: 'Detected moonquakes until 1977' },
        { label: 'Eagle Descent Stage', offset: { x: 50, y: 35 }, note: '14 meters north of the reflector' }
      ]
    },

    facts: [
      {
        title: 'Zero Electricity Required',
        description: 'Because it relies solely on geometric optical reflection, it has never needed batteries, solar panels, or maintenance, outlasting every powered device ever sent into space.',
        badge: 'Design Genius'
      },
      {
        title: 'The Moon is Drifting Away',
        description: 'Laser ranging measurements revealed that tidal friction causes Earth to transfer angular momentum to the Moon, pushing it outward by 3.8 cm (1.5 inches) every single year.',
        badge: 'Major Discovery'
      },
      {
        title: 'Only 1 in 10²¹ Photons Returns',
        description: 'Atmospheric divergence and lunar distance spread a 1-meter Earth laser beam into a 7-kilometer circle on the Moon. Only 1 to 5 photons per pulse return into Earth’s photon counters!',
        badge: 'Extreme Physics'
      },
      {
        title: 'Testing Einstein’s Equivalence Principle',
        description: 'By observing whether Earth and the Moon fall toward the Sun at the exact same rate regardless of their different internal compositions, scientists verified Einstein’s Strong Equivalence Principle.',
        badge: 'Relativity'
      }
    ],

    quiz: {
      question: 'What profound discovery about the Moon’s orbit was proven by bouncing lasers off these left-behind retroreflectors?',
      options: [
        'The Moon is spiraling inward and will crash into Earth in 100,000 years',
        'The Moon is drifting away from Earth at roughly 3.8 centimeters per year',
        'The Moon stops rotating completely once every century',
        'The Moon has an active magnetic dipole like Earth'
      ],
      correctIndex: 1,
      explanation: 'By timing the round-trip laser pulses with picosecond accuracy over 50+ years, scientists proved that tidal interactions push the Moon 3.8 cm (1.5 inches) farther from Earth each year.',
      badgeName: 'Laser Ranging Physicist'
    }
  },

  // ===================== MARS MISSIONS =====================
  {
    id: 'opportunity-rover',
    body: 'mars',
    badge: 'MER-B (Opportunity)',
    title: 'The 15-Year Marathon Runner of Meridiani Planum',
    artifact: 'Mars Exploration Rover Opportunity ("Oppy")',
    siteName: 'Perseverance Valley, Endeavour Crater',
    landingDate: 'January 25, 2004',
    departureDate: 'June 10, 2018 (Final transmission)',
    timeOnSurface: '14 years, 138 days (5,111 Sols)',
    distanceFromEarth: '~225,000,000 km (up to 401M km)',
    massLeftBehind: '185 kg (408 lbs)',
    coordinates: {
      lat: -2.21,
      lng: 354.41,
      latFormatted: "2.21° S",
      lngFormatted: "354.41° E (10.98° W)"
    },
    heroImage: 'https://images-assets.nasa.gov/image/PIA18613/PIA18613~orig.jpg',
    heroAlt: 'Self-portrait simulation of NASA Mars Exploration Rover Opportunity on the surface of Mars',
    accentColor: '#f97316', // Mars amber/crimson
    status: 'Mission Complete – Asleep in Perseverance Valley',

    overview: 'Engineers designed Opportunity to survive for just 90 Martian days and travel 600 meters. Instead, the plucky solar-powered rover lived for almost fifteen years, drove 45.16 kilometers—completing the first Olympic marathon on another planet—and rewrote our understanding of whether Mars once possessed liquid water.',

    story: [
      {
        heading: 'An Interplanetary Hole-in-One',
        text: 'On January 25, 2004, Opportunity bounced across Meridiani Planum encased in a cocoon of airbags, rolling to a stop inside Eagle Crater—a tiny 22-meter depression. Mission scientists were ecstatic: the airbag bounce had delivered the rover directly in front of the very first exposed bedrock ever seen on Mars, revealing layered sulfates that had formed in ancient saltwater.',
        image: 'https://images-assets.nasa.gov/image/PIA05208/PIA05208~orig.jpg',
        caption: 'Microscopic view of hematite "blueberries"—spherical mineral concretions formed in ancient liquid water.'
      },
      {
        heading: 'Martian Dust Devils: Nature’s Car Wash',
        text: 'Opportunity’s biggest existential threat was Martian dust accumulating on its solar arrays. But Mars surprised everyone: sporadic whirling vortexes of wind called "dust devils" repeatedly swept directly over the rover, blowing the solar panels clean and resetting its power levels back to 100%. These fortuitous cleaning events allowed Oppy to operate through eight harsh Martian winters.',
        image: 'https://images-assets.nasa.gov/image/PIA15031/PIA15031~orig.jpg',
        caption: 'Pristine 360-degree panoramic view captured from the rim of Endeavour Crater by Opportunity.'
      },
      {
        heading: '"My Battery is Low and It\'s Getting Dark"',
        text: 'In May 2018, a catastrophic planet-encircling dust storm engulfed Mars, blocking out over 99% of sunlight from reaching the ground. With no power to recharge its batteries or heat its delicate electronics, Opportunity sent its final packet of telemetry on Sol 5111 (June 10, 2018). Science reporter Jacob Margolis poignantly translated the engineering readout: "My battery is low and it’s getting dark." Despite over 1,000 recovery commands sent by NASA, Oppy never woke up.',
        image: 'https://images-assets.nasa.gov/image/PIA22227/PIA22227~orig.jpg',
        caption: 'High-resolution MRO HiRISE orbital photograph spotting Opportunity as a tiny lonely dot on the rim of Endeavour Crater.'
      }
    ],

    timeline: [
      {
        date: 'July 7, 2003',
        phase: 'Launch',
        title: 'Delta II Rocket Roars from Cape Canaveral',
        detail: 'MER-B embarked on a seven-month cruise across the interplanetary void toward Mars.'
      },
      {
        date: 'January 25, 2004',
        phase: 'Landing',
        title: 'Airbag Bounce into Eagle Crater',
        detail: 'Bounced 26 times across Meridiani Planum, landing directly inside a crater filled with ancient bedrock.'
      },
      {
        date: 'April 2004',
        phase: 'Baseline Milestone',
        title: 'Primary 90-Day Mission Completed',
        detail: 'Having confirmed that Meridiani Planum was once drenched in liquid water, NASA granted endless mission extensions.'
      },
      {
        date: 'March 24, 2015',
        phase: 'Marathon Record',
        title: 'Completing 42.195 km on Mars',
        detail: 'Opportunity crossed 26.2 miles of Martian terrain, becoming the first vehicle in history to complete a marathon on another celestial body.'
      },
      {
        date: 'June 10, 2018 (Sol 5111)',
        phase: 'Final Transmission',
        title: 'The Great Global Dust Storm',
        detail: 'Solar tau reached record 10.8 (pitch darkness at midday). Final data packet received at Deep Space Network.'
      },
      {
        date: 'February 13, 2019',
        phase: 'Mission Declared Complete',
        title: 'Final Wakeup Song: Billie Holiday’s "I\'ll Be Seeing You"',
        detail: 'After eight months of radio silence, NASA flight controllers gave their final emotional salute to the legendary rover.'
      }
    ],

    mapData: {
      locationDescription: 'Perseverance Valley on the western rim of Endeavour Crater, Meridiani Planum.',
      orbitalImageryUrl: 'https://images-assets.nasa.gov/image/PIA22227/PIA22227~orig.jpg',
      orbitalCaption: 'NASA Mars Reconnaissance Orbiter (MRO) HiRISE image from 267 km altitude pinpointing Opportunity parked forever on the slope of Perseverance Valley.',
      elevation: '-1.4 km below Martian datum',
      craterProximity: 'Resting on the crest of Endeavour Crater, a 22-kilometer impact basin.',
      features: [
        { label: 'Opportunity Final Rest Site', offset: { x: 52, y: 48 }, note: 'Perseverance Valley slope' },
        { label: 'Endeavour Crater Rim', offset: { x: 30, y: 25 }, note: '22 km wide impact crater edge' },
        { label: 'Cape Tribulation', offset: { x: 68, y: 35 }, note: 'Highest peak summited by Opportunity' },
        { label: 'Eagle Crater (Landing Site)', offset: { x: 15, y: 80 }, note: '45.16 km away along traverse route' }
      ]
    },

    facts: [
      {
        title: '55 Times Its Planned Lifespan',
        description: 'Engineered for 90 days, Opportunity survived 5,111 Martian sols (nearly 15 Earth years), spanning three US presidencies and a whole generation of planetary scientists.',
        badge: 'Longevity'
      },
      {
        title: 'The Martian "Blueberries"',
        description: 'Discovered tiny spheres rich in hematite, nicknamed "blueberries." They could only have formed by minerals precipitating out of ancient acidic groundwater.',
        badge: 'Water Evidence'
      },
      {
        title: 'Driving in Reverse with a Stuck Wheel',
        description: 'When its right-front steering motor stalled in 2005, clever engineers programmed Oppy to drive in reverse, dragging the wheel behind like a plow and uncovering bright silica deposits!',
        badge: 'Hacking from Earth'
      },
      {
        title: '45.16 Kilometers Traversed',
        description: 'Surpassed the Soviet Lunokhod 2 distance record (39 km) to hold the all-time off-world driving record for any vehicle until the far future.',
        badge: 'World Record'
      }
    ],

    quiz: {
      question: 'What microscopic geological feature discovered by Opportunity provided definitive proof of past liquid water on Mars?',
      options: [
        'Frozen ice sheets preserved under volcanic basalt',
        'Hematite spherical concretions nicknamed "blueberries"',
        'Fossilized microbial river algae',
        'Carbonate seashells embedded in crater sandstone'
      ],
      correctIndex: 1,
      explanation: 'Opportunity discovered gray hematite spherules—colloquially called "blueberries"—which form on Earth through the slow percolation of mineral-rich liquid groundwater through sedimentary rock.',
      badgeName: 'Meridiani Planum Geologist'
    }
  },

  {
    id: 'ingenuity-helicopter',
    body: 'mars',
    badge: 'Ingenuity (Mars Rotorcraft)',
    title: 'The Wright Brothers Moment in Alien Skies',
    artifact: 'Ingenuity Mars Helicopter ("Ginny")',
    siteName: 'Valinor Hills (Airfield Sigma), Jezero Crater',
    landingDate: 'February 18, 2021 (Dropped to surface April 3, 2021)',
    departureDate: 'January 18, 2024 (Flight 72, final landing)',
    timeOnSurface: '1,004 Sols active (988 days)',
    distanceFromEarth: '~225,000,000 km',
    massLeftBehind: '1.8 kg (4.0 lbs)',
    coordinates: {
      lat: 18.4447,
      lng: 77.4508,
      latFormatted: "18.4447° N",
      lngFormatted: "77.4508° E"
    },
    heroImage: 'https://images-assets.nasa.gov/image/PIA24449/PIA24449~orig.jpg',
    heroAlt: 'The Ingenuity Mars Helicopter sitting solitary on the red soil of Jezero Crater',
    accentColor: '#f97316',
    status: 'Mission Complete – Permanent Stationary Weather Station',

    overview: 'Physics declared powered atmospheric flight on Mars virtually impossible: Martian air density at ground level is less than 1% of Earth’s—equivalent to flying at 100,000 feet altitude on Earth. Ingenuity was built as an experimental 30-day technology demonstration to see if a rotorcraft could fly 5 times. It flew 72 times, becoming humanity’s first aerial scout across another world.',

    story: [
      {
        heading: 'Spinning Five Times Faster Than an Earth Helicopter',
        text: 'To generate lift in Mars’ whisper-thin carbon dioxide atmosphere, Ingenuity was equipped with twin counter-rotating carbon-fiber rotor blades spanning 1.2 meters. They spun at a staggering 2,400 to 2,700 revolutions per minute—roughly five times faster than an terrestrial passenger helicopter—while the entire aircraft weighed just 1.8 kilograms (4 pounds).',
        image: 'https://images-assets.nasa.gov/image/PIA24647/PIA24647~orig.jpg',
        caption: 'Ingenuity taking off during an early test flight, photographed by the Perseverance rover from 64 meters away.'
      },
      {
        heading: 'Carrying a Piece of the 1903 Wright Flyer',
        text: 'Beneath Ingenuity’s postage-stamp-sized solar panel, NASA engineers taped a tiny postage-stamp-sized piece of unbleached muslin fabric from the lower left wing of Orville and Wilbur Wright’s 1903 Flyer. The International Civil Aviation Organization (ICAO) officially designated Ingenuity’s first takeoff zone as "Wright Brothers Field" with the callsign IGY.',
        image: 'https://images-assets.nasa.gov/image/PIA24497/PIA24497~orig.jpg',
        caption: 'Aerial color photograph taken by Ingenuity’s high-resolution downward camera flying 10 meters above Martian sand ripples.'
      },
      {
        heading: 'Flight 72 and the Valinor Hills Landing',
        text: 'Over three years, Ginny transformed from a tech demo into an indispensable aerial scout, flying ahead of Perseverance to chart routes across hazardous boulder fields. On January 18, 2024, during its 72nd flight over featureless sandy ripples in Jezero Crater, the helicopter made an emergency touchdown. Telemetry and shadow photos revealed that one or more rotor tips had struck the sand, ending its flight career. It now rests peacefully at Valinor Hills, continuing to send daily temperature and sensor data.',
        image: 'https://images-assets.nasa.gov/image/PIA26233/PIA26233~orig.jpg',
        caption: 'Shadow image captured by Ingenuity showing the fractured tip of its carbon-fiber rotor blade after Flight 72.'
      }
    ],

    timeline: [
      {
        date: 'July 30, 2020',
        phase: 'Launch',
        title: 'Tucked Beneath Perseverance Rover’s Belly',
        detail: 'Ingenuity traveled to Mars folded beneath the protective belly pan of the Mars 2020 Perseverance rover.'
      },
      {
        date: 'April 19, 2021',
        phase: 'First Flight',
        title: 'Historic First Powered Flight on Another World',
        detail: 'Rose to 3 meters, hovered for 39.1 seconds, and landed gently on Wright Brothers Field in Jezero Crater.'
      },
      {
        date: 'May 2021',
        phase: 'Mission Transition',
        title: 'From Technology Demo to Aerial Scout',
        detail: 'Having completed all 5 test flights, NASA promoted Ginny to operational scout, scouting routes for Perseverance.'
      },
      {
        date: 'December 2023',
        phase: 'Milestone 70',
        title: 'Crossing 17 Kilometers of Total Flight Distance',
        detail: 'Ingenuity accumulated over 2 hours and 8 minutes of total flight time in the alien atmosphere.'
      },
      {
        date: 'January 18, 2024',
        phase: 'Flight 72',
        title: 'Final Landing at Valinor Hills',
        detail: 'Emergency landing over sand ripples caused blade tip damage. The helicopter completed its flying mission.'
      },
      {
        date: 'Present Day (2026+)',
        phase: 'Stationary Weather Post',
        title: 'Long-term Telemetry Station',
        detail: 'Its solar panel charges its battery daily to wake its flight computer, record meteorological data, and store avionics telemetry.'
      }
    ],

    mapData: {
      locationDescription: 'Valinor Hills (Airfield Sigma), Jezero Crater river delta floor, Mars.',
      orbitalImageryUrl: 'https://images-assets.nasa.gov/image/PIA24497/PIA24497~orig.jpg',
      orbitalCaption: 'Orbital composite of Jezero Crater river delta showing the 72 flight paths and final resting spot at Valinor Hills.',
      elevation: '-2.5 km below Martian datum',
      craterProximity: 'Located inside the ancient 45-km impact crater Jezero that once held a 250-meter-deep lake.',
      features: [
        { label: 'Final Resting Spot (Valinor Hills)', offset: { x: 50, y: 50 }, note: 'Airfield Sigma' },
        { label: 'Wright Brothers Field', offset: { x: 22, y: 75 }, note: 'Site of Flight 1 (April 19, 2021)' },
        { label: 'Perseverance Rover Position', offset: { x: 65, y: 38 }, note: 'Parked ~200m away during farewell' },
        { label: 'Ancient River Delta Fan', offset: { x: 35, y: 20 }, note: 'Mudstones containing potential biosignatures' }
      ]
    },

    facts: [
      {
        title: 'Piece of the 1903 Wright Flyer',
        description: 'Tucked under its solar panel is a swatch of unbleached muslin fabric from the original 1903 Wright Flyer airplane that flew at Kitty Hawk, North Carolina.',
        badge: 'Aviation Heritage'
      },
      {
        title: 'Autonomous Navigation by Sight',
        description: 'Because radio signals between Earth and Mars take 5 to 20 minutes each way, Ingenuity had to steer itself autonomously using a downward-facing sensor camera tracking ground features at 30 frames per second.',
        badge: 'AI Autonomy'
      },
      {
        title: 'Surviving 72 Flights Instead of 5',
        description: 'It flew more than 14 times further than originally designed, staying in the air for over 128 total minutes and climbing to a peak altitude of 24 meters (79 feet).',
        badge: '1400% Target'
      },
      {
        title: 'Commercial Smartphone Brain',
        description: 'Its main computer ran an off-the-shelf Linux operating system powered by a Qualcomm Snapdragon 801 processor—a chip originally designed for everyday consumer smartphones!',
        badge: 'Smart Avionics'
      }
    ],

    quiz: {
      question: 'What historic Earth artifact is attached beneath Ingenuity’s solar panel?',
      options: [
        'A microchip with Neil Armstrong’s fingerprint',
        'A piece of fabric from the 1903 Wright Brothers Flyer',
        'A fragment of meteoritic diamond from Antarctica',
        'A gold coin minted during the 1969 Apollo launch'
      ],
      correctIndex: 1,
      explanation: 'NASA engineers taped a postage-stamp-sized piece of muslin fabric from the wing of the 1903 Wright Flyer beneath Ingenuity’s solar panel, linking humanity’s first flight on Earth to its first flight on Mars.',
      badgeName: 'Martian Aviator'
    }
  },

  {
    id: 'viking-1-lander',
    body: 'mars',
    badge: 'Viking 1 (Mutch Station)',
    title: 'The Silent Sentinel of Chryse Planitia',
    artifact: 'Viking 1 Lander (Thomas A. Mutch Memorial Station)',
    siteName: 'Chryse Planitia ("Plains of Gold")',
    landingDate: 'July 20, 1976 (Exactly 7 years after Apollo 11)',
    departureDate: 'November 11, 1982 (Final signal received)',
    timeOnSurface: '6 years, 116 days (2,245 Sols)',
    distanceFromEarth: '~225,000,000 km',
    massLeftBehind: '572 kg (1,261 lbs)',
    coordinates: {
      lat: 22.27,
      lng: 312.05,
      latFormatted: "22.27° N",
      lngFormatted: "312.05° E (47.95° W)"
    },
    heroImage: 'https://images-assets.nasa.gov/image/PIA00563/PIA00563~orig.jpg',
    heroAlt: 'The first color photograph of Mars taken by the Viking 1 lander showing red soil and rocky plain',
    accentColor: '#f97316',
    status: 'Permanent Extraterrestrial Monument',

    overview: 'Before Viking 1, humanity had never seen the surface of Mars in clear focus. On July 20, 1976—exactly seven years after Neil Armstrong walked on the Moon—Viking 1 executed the first successful long-duration soft touchdown on the Red Planet, transmitting the first color photographs of a salmon-pink sky and rocky red soil that captivated the world.',

    story: [
      {
        heading: 'The First Glimpse of Another World’s Horizon',
        text: 'Viking 1 touched down in Chryse Planitia ("Plains of Gold") at 11:53 UTC. Just 25 seconds after landing, its facsimile camera began scanning from top to bottom, line by line. The very first photograph revealed the lander’s own circular footpad resting firmly on fine Martian dust and small pebbles. Moments later, the first panoramic color photo sent a shockwave through science: Mars had a reddish-pink sky, colored by airborne dust particles suspended in the thin air.',
        image: 'https://images-assets.nasa.gov/image/PIA00570/PIA00570~orig.jpg',
        caption: 'The iconic first high-resolution color panorama returned by Viking 1, showing the rust-colored boulders of Chryse Planitia.'
      },
      {
        heading: 'Searching for Martian Microbes with Nuclear Power',
        text: 'Unlike today’s solar-powered rovers, Viking 1 was powered by two Snap-19 Radioisotope Thermoelectric Generators (RTGs) containing radioactive plutonium-238. It extended a mechanical trenching boom, scooped up Martian soil, and deposited it into three automated biological incubators to search for metabolism. The results were tantalizing: carbon dioxide was released, but subsequent analysis suggested exotic surface oxidants (perchlorates) rather than biological life.',
        image: 'https://images-assets.nasa.gov/image/PIA00564/PIA00564~orig.jpg',
        caption: 'Viking 1 robotic arm digging a sample trench into the Martian soil to scoop samples for the biology suite.'
      },
      {
        heading: 'A Fatal Human Command in 1982',
        text: 'Viking 1 operated flawlessly for over six Earth years—monitoring daily weather, measuring atmospheric pressure drops as the polar caps froze and sublimated, and recording over 1,400 images. Its mission ended not because of machine breakdown, but human error: in November 1982, ground controllers sent a software update to upgrade battery management, which inadvertently overwrote the antenna pointing instructions. The lander turned its high-gain antenna away from Earth and fell into eternal silence.',
        image: 'https://images-assets.nasa.gov/image/PIA02982/PIA02982~orig.jpg',
        caption: 'HiRISE orbital photo of Viking 1 Lander sitting quietly in the Chryse Planitia plains.'
      }
    ],

    timeline: [
      {
        date: 'August 20, 1975',
        phase: 'Launch',
        title: 'Titan IIIE-Centaur Launch from Florida',
        detail: 'Viking 1 began its 10-month, 500-million-mile voyage to the Red Planet.'
      },
      {
        date: 'June 19, 1976',
        phase: 'Mars Orbit Insertion',
        title: 'Scouting Chryse Planitia from Orbit',
        detail: 'The orbiter mapped the surface for an entire month, rejecting hazardous initial landing sites before selecting safe terrain.'
      },
      {
        date: 'July 20, 1976',
        phase: 'Landing',
        title: 'First Successful US Soft Landing on Mars',
        detail: 'Parachute and terminal descent thrusters gently placed the lander on Chryse Planitia on the 7th anniversary of Apollo 11.'
      },
      {
        date: '1976 - 1982',
        phase: 'Weather & Seismology',
        title: 'Six Years of Martian Meteorology',
        detail: 'Monitored atmospheric pressure variations, seasonal dust storms, and extreme temperatures ranging from -123°C to -23°C.'
      },
      {
        date: 'November 11, 1982',
        phase: 'Final Transmission',
        title: 'Antenna Command Software Overwrite',
        detail: 'An errant software command aimed the dish away from Earth. After 2,245 Sols of service, communication ceased.'
      },
      {
        date: 'January 1984',
        phase: 'Memorial Designation',
        title: 'Named Thomas A. Mutch Memorial Station',
        detail: 'NASA officially renamed the historic lander in honor of the leader of the Viking surface imaging team.'
      }
    ],

    mapData: {
      locationDescription: 'Chryse Planitia ("Plains of Gold"), a smooth, circular volcanic outflow basin in Mars’ equatorial northern lowlands.',
      orbitalImageryUrl: 'https://images-assets.nasa.gov/image/PIA02982/PIA02982~orig.jpg',
      orbitalCaption: 'NASA Mars Reconnaissance Orbiter (MRO) HiRISE image confirming the Viking 1 lander resting intact amid small craters and drift deposits.',
      elevation: '-2.69 km below Martian datum',
      craterProximity: 'Located 6 km northwest of a prominent 1-km crater and adjacent to ancient outflow channels from Valles Marineris.',
      features: [
        { label: 'Viking 1 Lander (Mutch Station)', offset: { x: 50, y: 50 }, note: 'Three-legged platform with RTG covers' },
        { label: 'Backshell & Parachute Site', offset: { x: 28, y: 35 }, note: 'Jettisoned during descent ~1.5 km west' },
        { label: 'Heat Shield Impact Point', offset: { x: 72, y: 68 }, note: 'Jettisoned after atmospheric entry' },
        { label: 'Sample Trench Site', offset: { x: 48, y: 53 }, note: 'Trenches dug by robotic arm scoop' }
      ]
    },

    facts: [
      {
        title: 'Powered by Plutonium',
        description: 'Viking 1 carried two nuclear SNAP-19 Radioisotope Thermoelectric Generators (RTGs) generating electricity from the natural radioactive decay heat of plutonium-238.',
        badge: 'Nuclear Power'
      },
      {
        title: 'The Salmon-Pink Sky',
        description: 'Scientists initially balanced the first photo to look like Earth’s blue sky, but quickly realized the Martian sky is a soft butterscotch or pinkish salmon hue caused by suspended airborne dust.',
        badge: 'First Color Vision'
      },
      {
        title: 'Accidental Farewell',
        description: 'Viking did not run out of fuel or power; an uplinked software patch in 1982 accidentally overwrote the memory address for antenna tracking, forever cutting the radio link to Earth.',
        badge: 'Ghost Station'
      },
      {
        title: 'Sterilized in a 116°C Oven',
        description: 'To protect Mars from Earth bacteria (planetary protection), the entire Viking spacecraft was baked inside a giant thermal sterilization oven for 40 hours before launch.',
        badge: 'Planetary Defense'
      }
    ],

    quiz: {
      question: 'Why did communications with the long-lived Viking 1 lander abruptly end in November 1982?',
      options: [
        'A violent dust devil knocked the lander onto its side',
        'An errant software update accidentally overwrote the high-gain antenna pointing commands',
        'Its nuclear plutonium fuel was completely depleted',
        'A meteorite struck its radio transmitter'
      ],
      correctIndex: 1,
      explanation: 'Viking 1 was still functioning smoothly after six years when ground control sent a battery-management software command that inadvertently overwrote the antenna-pointing memory block, causing the dish to turn away from Earth.',
      badgeName: 'Viking Mission Archivist'
    }
  }
];
