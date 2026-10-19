// Programs for the kiosk and the phone page. Both read this file.
// Each program belongs to a pillar: 'arts' | 'leadership' | 'bigbets' | 'community',
// or 'support' (Corporate Citizenship and Volunteerism, opened from the
// "Supported by" strip on the pillars screen rather than a pillar page).
// Add a program: give it a pillar, a title, a hero image, and en content.
// A hero can set pos (CSS object-position, e.g. '50% 12%') to keep faces in frame when the photo is cropped.
// body: intro paragraphs; an entry that is a list of strings shows as bullets.
// Entries without en show in their pillar's list but don't open yet.
// Tab order: impact first, then how the program works, then specifics or the
// ask (packages) last.
// Section types (each becomes a tab on the kiosk): 'features' | 'results' | 'stats' | 'packages' | 'list' | 'about'.
//   features: heading, sub (one paragraph or a list) and/or highlight, and items
//     with an icon, title and body.
//     Four or more items sit in two columns on the kiosk.
//   features may end with a note: a plain line under the items, or
//     { text, link, href } (the link is tappable on the phone).
//   packages: cards with title, optional tag, price, label, items, impact and
//     foot (dark: true for the blue card); optional note under the cards.
//   stats: figures with an icon, value and label; optional label, location, sub
//     and a quote ({ text, by }). Three or four figures use a compact 2×2 layout,
//     five or six use three columns. Or groups: [{ label, stats }], each group
//     with its own label and figures.
//   list: heading, sub, intro and a list of plain-text items.
//   about: heading, highlight, a logo ({ src, alt }) and body paragraphs beside it.
//   Headings are optional. A quote's text can hold several paragraphs separated
//   by a blank line, and may have a photo.
// Icons: users, smile, pres, lap, heart, hand, book, gem, image, briefcase, stethoscope, sun,
// lightbulb, eye, map, pin, medal, trending.
window.KIOSK_PROGRAMS = {
  "museum": {
    "pillar": "arts",
    "title": "Ayala Museum",
    "hero": {
      "id": "museum-hero",
      "src": "assets/museum-panel.jpg",
      "ph": "Ayala Museum photo"
    },
    "en": {
      "lead": "Inspiring pride in Filipino heritage through art, history, and culture",
      "body": [
        "Culture, history, and identity shape how a nation sees itself and moves forward.",
        "Ayala Museum invites Filipinos to explore the richness of our heritage through thoughtfully curated exhibitions, immersive experiences, and dynamic public engagement. By presenting Philippine art, history, and culture in ways that are both inspiring and accessible, the museum helps deepen appreciation of who we are as a people.",
        "At a time when narratives shape perspectives, Ayala Museum creates space to reflect on our past, celebrate Filipino creativity, and imagine our collective future. In doing so, it nurtures pride, curiosity, and a stronger sense of shared identity that enriches national life."
      ],
      "sections": [
        {
          "tab": "Our impact",
          "type": "stats",
          "stats": [
            {
              "icon": "users",
              "value": "92,833",
              "label": "Total visitors in 2025"
            },
            {
              "icon": "image",
              "value": "7,000",
              "label": "sqm museum facility spread across six floors"
            },
            {
              "icon": "gem",
              "value": "8",
              "label": "dedicated exhibition spaces for Philippine art, history and culture"
            },
            {
              "icon": "book",
              "value": "9,700+",
              "label": "Objects in the museum collection"
            },
            {
              "icon": "lap",
              "value": "1st",
              "label": "Museum in Southeast Asia to be listed on the Bloomberg Connects platform"
            }
          ]
        },
        {
          "tab": "What we do",
          "type": "features",
          "heading": "Bringing Philippine heritage to life",
          "sub": "Ayala Museum combines scholarship, design, and public engagement to make art and history accessible, meaningful, and transformative.",
          "items": [
            {
              "icon": "gem",
              "title": "Curation & Collection Stewardship",
              "body": "Preserving and presenting fine arts, archaeological artifacts, ethnographic materials, numismatics, and historical archives."
            },
            {
              "icon": "image",
              "title": "Immersive Exhibitions",
              "body": "Constantly adapting to changing cultural landscapes through innovative exhibition design and interactive onsite displays."
            },
            {
              "icon": "pres",
              "title": "Education & Public Programs",
              "body": "Offering guided tours, lectures, workshops, and digital content that deepen cultural literacy. The museum's Discovery Tours public school program provides hundreds of underprivileged students grades 4–6 with access to the museum's galleries, including hands-on learning activities and learning kits for them to take home."
            },
            {
              "icon": "users",
              "title": "Access and Community Outreach",
              "body": "Expanding reach through school partnerships, traveling exhibitions, public access initiatives, and inclusive programming."
            }
          ]
        }
      ],
      "contact": {
        "icon": "hand",
        "title": "Partner with us",
        "lines": [
          {
            "text": "partnerships@ayalafoundation.org",
            "href": "mailto:partnerships@ayalafoundation.org"
          },
          {
            "text": "www.ayalafoundation.org",
            "href": "https://www.ayalafoundation.org"
          }
        ]
      }
    }
  },
  "fhl": {
    "pillar": "arts",
    "title": "Filipinas Heritage Library",
    "hero": {
      "id": "fhl-hero",
      "src": "assets/fhl-hero.jpg",
      "ph": "Filipinas Heritage Library photo"
    },
    "en": {
      "lead": "Preserving Philippine memory. Expanding access to cultural knowledge.",
      "body": [
        "Philippine heritage materials are rare, fragile, and at risk of deterioration, yet access to credible cultural and historical resources remains limited.",
        "Many Filipiniana publications were produced in small print runs and are vulnerable to tropical climate conditions. At the same time, limited access to physical and digital heritage libraries contributes to declining literacy and the spread of misinformation about Philippine history and culture.",
        "Preserving and digitizing these materials ensures that future generations can access reliable, evidence-based resources that deepen understanding of Filipino identity."
      ],
      "sections": [
        {
          "tab": "Our impact",
          "type": "stats",
          "stats": [
            {
              "icon": "users",
              "value": "3,896",
              "label": "Total visitors in 2025"
            },
            {
              "icon": "book",
              "value": "106,140",
              "label": "Heritage materials in various formats, preserved for continued access"
            },
            {
              "icon": "lap",
              "value": "67,784",
              "label": "Digitized materials accessible electronically"
            },
            {
              "icon": "gem",
              "value": "1st",
              "label": "Library in Southeast Asia to be listed on the Bloomberg Connects platform"
            },
            {
              "icon": "pres",
              "value": "316",
              "label": "Total attendance across three Roderick Hall memorial lectures"
            }
          ]
        },
        {
          "tab": "What we do",
          "type": "features",
          "items": [
            {
              "icon": "book",
              "title": "Collection Management & Preservation",
              "body": "Nurturing Filipino stories in print, audio, and visual forms, honoring traditional media alongside emerging Filipiniana from new media and pop culture."
            },
            {
              "icon": "lap",
              "title": "Digitization & Online Access",
              "body": "Converting fragile analog materials into digital formats and making them available through electronic platforms to expand global access."
            },
            {
              "icon": "users",
              "title": "Library & Research Services",
              "body": "Providing onsite space and expert reference support for students, educators, and scholars."
            },
            {
              "icon": "pres",
              "title": "Curation & Public Programming",
              "body": "Activating collections through lectures, performances, podcasts, playlists, and digital engagement that deepen appreciation for Philippine culture."
            }
          ]
        },
        {
          "tab": "Our collections",
          "type": "list",
          "heading": "Creating access to Philippine memory",
          "sub": "As a memory keeper and advocate of Philippine history and culture, FHL bridges preservation, research, and public engagement—bringing the Filipino story to life.",
          "intro": "FHL houses rare and contemporary materials on Philippine art, history, and culture, including:",
          "items": [
            "The Roderick Hall Collection (World War II materials)",
            "The Himig Collection (vintage to modern music recordings)",
            "The Retrato Photo Archive (vintage photographs)",
            "The Elpidio R. Quirino Presidential Papers",
            "The Manuel L. Quezon Family Collection",
            "Books, periodicals, maps, and multimedia collections"
          ]
        }
      ],
      "contact": {
        "icon": "hand",
        "title": "Partner with us",
        "lines": [
          {
            "text": "partnerships@ayalafoundation.org",
            "href": "mailto:partnerships@ayalafoundation.org"
          },
          {
            "text": "www.ayalafoundation.org",
            "href": "https://www.ayalafoundation.org"
          }
        ]
      }
    }
  },
  "centexDE": {
    "pillar": "bigbets",
    "title": "CENTEX Digital Education",
    "hero": {
      "id": "centex-de-hero",
      "src": "assets/centex-de-banner.jpg",
      "ph": "CENTEX Digital Education photo"
    },
    "en": {
      "lead": "We are making a big bet on differentiated instruction through digital education.",
      "body": [
        "As our contribution to addressing the learning crisis in the Philippines, we are sharpening our focus to support students in grades 4–6.",
        [
          "last chance to catch up"
        ],
        "Through Digital Education and Teacher Training programs, these targeted, high-impact interventions aim to unlock meaningful, scalable, and sustainable solutions to improving learning outcomes."
      ],
      "sections": [
        {
          "tab": "Pilot results",
          "type": "results",
          "label": "Results from our pilot",
          "location": "San Marcelino, Zambales",
          "stat": {
            "value": "78%",
            "text": "were struggling to meet grade-level competency in math",
            "note": "Based on a local assessment"
          },
          "callout": "With Digital Education, compelling results show students doubled their math scores in just ~12 weeks.",
          "chart": "centexDE",
          "legend": [
            "Pre Mathematics Score (%)",
            "Post Mathematics Score (%)"
          ],
          "axis": [
            "Control",
            "Treatment"
          ],
          "highlight": "9 treatment schools outperformed control schools by 13.8 percentage points"
        },
        {
          "tab": "Our approach",
          "type": "features",
          "heading": "Creating a thriving learning community",
          "sub": "Confident, data-driven, and community-anchored educators leading thriving learning communities across public schools.",
          "items": [
            {
              "icon": "pres",
              "title": "Teacher and School Leader Training",
              "body": "Comprehensive teacher development program combining online modules, in-person coaching, and Professional Learning Communities (PLCs)."
            },
            {
              "icon": "lap",
              "title": "Digital Lab and Learning Resources",
              "body": "Equipped with digital infrastructure and devices, teachers create learning experiences meant to address individual needs of the students using real time assessment data from Khan Academy."
            },
            {
              "icon": "users",
              "title": "Community and Parent Engagement",
              "body": "Each teacher engages parents, community members, and peers to sustain learning beyond the classroom using a whole-school approach."
            }
          ]
        },
        {
          "tab": "Packages",
          "type": "packages",
          "heading": "Digital Education & Teacher Training packages",
          "cards": [
            {
              "title": "Intensive Educator Training",
              "price": "₱440,000",
              "label": "Inclusions",
              "items": [
                "36 Hours of Khan Platform Training",
                "80 Hours of Teacher Training and Parental/Community Engagement",
                "54 Hours of School Leaders Training"
              ],
              "impact": "Program will impact ~1,000 students across Grades 4–6 for two years"
            },
            {
              "tag": "Add-on",
              "title": "Digital Lab",
              "price": "₱615,000",
              "label": "Inclusions",
              "items": [
                "50 student tablets",
                "6 teacher laptops",
                "2 years internet connectivity"
              ],
              "dark": true
            },
            {
              "tag": "Add-on",
              "title": "AI-Enabled Catch-Up Sessions",
              "price": "₱250,000",
              "dark": true
            }
          ],
          "note": "*exclusive of VAT"
        }
      ],
      "contact": {
        "icon": "hand",
        "title": "Partner with us",
        "lines": [
          {
            "text": "partnerships@ayalafoundation.org",
            "href": "mailto:partnerships@ayalafoundation.org"
          },
          {
            "text": "www.ayalafoundation.org",
            "href": "https://www.ayalafoundation.org"
          }
        ]
      }
    }
  },
  "centexEG": {
    "pillar": "bigbets",
    "title": "CENTEX Early Grades Program",
    "hero": {
      "id": "centex-eg-hero",
      "src": "assets/centex-eg-hero.jpg",
      "ph": "CENTEX Early Grades photo"
    },
    "en": {
      "lead": "We are making a big bet on early childhood education to combat the learning crisis in the Philippines.",
      "body": [
        "As our contribution to addressing the learning crisis in the Philippines, we are sharpening our focus to support students in their early years.",
        "Only 1 in 5 Filipino children are enrolled in early learning programs, and just 3 in 10 Grade 1 learners meet basic literacy and numeracy standards. Quality varies widely, with many Child Development Workers lacking specialized early childhood training and limited parental engagement, particularly among low-income families.",
        "Through CENTEX Early Grades, these targeted, high-impact interventions aim to build strong foundations in literacy, numeracy, and socio-emotional development—unlocking meaningful and sustainable gains among children aged 3-5."
      ],
      "sections": [
        {
          "tab": "Our impact",
          "type": "stats",
          "label": "Our impact",
          "location": "Lamitan City, Basilan",
          "stats": [
            {
              "icon": "users",
              "value": "715",
              "label": "Total number of students have taken part in the program since September 2025"
            },
            {
              "icon": "book",
              "value": "26",
              "label": "Child Development Centers and Elementary schools"
            },
            {
              "icon": "smile",
              "value": "13.2%",
              "label": "Average increase in consistent participation (at least 80% of school days attended)"
            },
            {
              "icon": "pres",
              "value": "36",
              "label": "child development workers, kindergarten teachers, and school heads mentored"
            }
          ]
        },
        {
          "tab": "Our approach",
          "type": "features",
          "heading": "Building strong foundations for learning",
          "sub": [
            "Improving instructional quality, strengthening home-school collaboration, and aligning early grade systems to support long-term academic success.",
            "The program invests in key areas to strengthen early learning and school readiness:"
          ],
          "items": [
            {
              "icon": "pres",
              "title": "Teacher and CDW Training",
              "body": "Teacher training, mentoring, and professional learning communities that bring together Child Development Workers (CDWs) and Kindergarten teachers within the same barangays — ensuring consistent, high-quality instruction."
            },
            {
              "icon": "book",
              "title": "Learning Resources",
              "body": "Access to resources to strengthen children's literacy, numeracy, and socio-emotional skills, while promoting student participation and learning engagement through hands-on play-based learning."
            },
            {
              "icon": "heart",
              "title": "Parent and Family Engagement",
              "body": "Advocacy and parenting sessions that equip families to support learning at home and foster positive parent-child relationships."
            },
            {
              "icon": "hand",
              "title": "Alignment with Community Efforts",
              "body": "Partnering with LGUs, DepEd/MBHTE, MSWD/CSWD, and Higher Education Institutions (HEIs)—to promote coordination, community ownership, and long-term sustainability."
            }
          ]
        }
      ],
      "contact": {
        "icon": "hand",
        "title": "Partner with us",
        "lines": [
          {
            "text": "partnerships@ayalafoundation.org",
            "href": "mailto:partnerships@ayalafoundation.org"
          },
          {
            "text": "www.ayalafoundation.org",
            "href": "https://www.ayalafoundation.org"
          }
        ]
      }
    }
  },
  "elnido": {
    "pillar": "community",
    "title": "El Nido, Palawan",
    "hero": {
      "id": "elnido-hero",
      "src": "assets/elnido-hero.jpg",
      "ph": "El Nido, Palawan photo"
    },
    "en": {
      "lead": "Uplifting families from poverty to the middle class through multi-sector, community-driven solutions.",
      "body": [
        "El Nido continues to face significant development gaps, with higher poverty and unemployment rates compared to the rest of the province of Palawan. Many households still lack reliable electricity, internet access, and safe drinking water, while malnutrition remains a concern. Among our community enterprise beneficiaries, average household incomes remain below the lower middle-income threshold.",
        "Through our integrated approach, we aim to help families progress toward more stable, sustainable livelihoods by 2028."
      ],
      "sections": [
        {
          "tab": "Our impact",
          "type": "stats",
          "label": "Our impact",
          "location": "El Nido, Palawan",
          "sub": "The El Nido Community Development program leverages the support of Ayala Business Units involved since 2013, while actively expanding partnerships to advance its mission of poverty alleviation in El Nido communities.",
          "stats": [
            {
              "icon": "briefcase",
              "value": "16.78%",
              "label": "increase in household monthly income of beneficiaries"
            },
            {
              "icon": "pres",
              "value": "98%",
              "label": "advancement rate (employment, further studies or entrepreneurial activity)"
            },
            {
              "icon": "stethoscope",
              "value": "9,396",
              "label": "first patient encounters and first patient consultations facilitated"
            },
            {
              "icon": "sun",
              "value": "1,620",
              "label": "households provided with solar home systems"
            }
          ]
        },
        {
          "tab": "Our approach",
          "type": "features",
          "heading": "Creating a thriving community ecosystem",
          "sub": "Improving access to income, education, healthcare, and essential utilities through coordinated, community-led solutions.",
          "items": [
            {
              "icon": "heart",
              "title": "Fulfill basic needs",
              "body": "Improving quality of nutrition, health, education, WASH, electricity, connectivity"
            },
            {
              "icon": "briefcase",
              "title": "Boost economic & community vitality",
              "body": "Financial inclusion and livelihood programs, local museums and libraries"
            },
            {
              "icon": "users",
              "title": "Increase social capital",
              "body": "Participation in community organizations, leadership and resilience programs"
            }
          ]
        },
        {
          "tab": "Programs",
          "type": "features",
          "items": [
            {
              "icon": "briefcase",
              "title": "Sustainable Livelihood Development",
              "body": "Strengthening community enterprises through cooperative training and market access, so families can grow stable sources of income."
            },
            {
              "icon": "pres",
              "title": "Education for Employment",
              "body": "Preparing senior high students and teachers with industry-aligned training, simulations, and internships in the local hospitality sector."
            },
            {
              "icon": "stethoscope",
              "title": "Health Access through Telehealth",
              "body": "Equipping barangays with digital health tools, trained health workers (BHWs), and volunteer doctors to deliver timely consultations in remote areas."
            },
            {
              "icon": "sun",
              "title": "Sustainable Energy Access",
              "body": "Providing solar home systems and community support centers to expand reliable, affordable electricity in underserved sitios."
            }
          ]
        }
      ],
      "contact": {
        "icon": "hand",
        "title": "Partner with us",
        "lines": [
          {
            "text": "partnerships@ayalafoundation.org",
            "href": "mailto:partnerships@ayalafoundation.org"
          },
          {
            "text": "www.ayalafoundation.org",
            "href": "https://www.ayalafoundation.org"
          }
        ]
      }
    }
  },
  "ugo": {
    "pillar": "leadership",
    "title": "U-GO Scholar Grant Program",
    "hero": {
      "id": "ugo-hero",
      "src": "assets/ugo-hero.jpg",
      "ph": "U-GO Scholar Grant Program photo"
    },
    "en": {
      "lead": "Unlocking opportunities for high-potential young women in financial need",
      "body": [
        "For many young women, talent and ambition are often not enough to secure success. Women's labor force participation in the Philippines stands at 56%, significantly lower than men's at 76%, with 2.4 million women remaining in unpaid housework. The cost of lodging, transportation, food, and other essential schooling needs can put university out of reach — reinforcing inequality and limiting social mobility.",
        "Educating women changes this trajectory. Yet with higher education attrition rates at nearly 40%, too many young Filipinas are unable to complete their degrees. When women finish their education, incomes rise, their children stay in school longer, and communities grow stronger."
      ],
      "sections": [
        {
          "tab": "Our impact",
          "type": "stats",
          "stats": [
            {
              "icon": "pres",
              "value": "1,082",
              "label": "U-GO scholarships awarded nationwide since 2023"
            },
            {
              "icon": "smile",
              "value": "98%",
              "label": "Advancement rate among scholars"
            }
          ],
          "quote": {
            "text": "My dream is to finish college and become a teacher who can guide and inspire children, especially those from humble beginnings like mine. Every Saturday, my classmates and I teach kids in our village how to read, write, and count.\n\nSharing what I've learned brings me joy and purpose. I may have grown up in hardship, but I carry big dreams — to teach, guide, and uplift others through education.",
            "by": "Daijane, 2025 U-GO Scholar",
            "photo": "assets/ugo-daijane.jpg"
          }
        },
        {
          "tab": "Our approach",
          "type": "features",
          "heading": "Creating pathways for women's leadership",
          "sub": "Expanding access to higher education while nurturing leadership, resilience, and career readiness among young women",
          "items": [
            {
              "icon": "book",
              "title": "Access to Tertiary Education",
              "body": "Through scholarship grants, financial assistance helps cover essential education-related costs, enabling scholars to focus on their studies"
            },
            {
              "icon": "users",
              "title": "Student Support and Engagement",
              "body": "Structured opportunities for skills-building, mentoring, and exposure to career pathways"
            },
            {
              "icon": "heart",
              "title": "Purpose-Driven Impact",
              "body": "Nurturing scholars into a growing pipeline of skilled professionals and leaders inspired to build better futures for their families and communities"
            }
          ]
        },
        {
          "tab": "About U-GO",
          "type": "about",
          "heading": "Help make opportunity as universal as talent",
          "highlight": "Every peso you give goes twice as far with U-GO global donation matching",
          "logo": {
            "src": "assets/ugo-logo.png",
            "alt": "U-GO"
          },
          "body": [
            "U-GO is a global nonprofit dedicated to expanding access to higher education for ambitious and promising young women from low-income communities.",
            "Currently operating across nine countries, U-GO partners with trusted local institutions to deliver scholarships and student support throughout a scholar's university journey. In the Philippines, Ayala Foundation serves as U-GO's sole implementing partner, supporting the delivery of scholarships and student engagement nationwide."
          ]
        }
      ],
      "contact": {
        "icon": "hand",
        "title": "Partner with us",
        "lines": [
          {
            "text": "partnerships@ayalafoundation.org",
            "href": "mailto:partnerships@ayalafoundation.org"
          },
          {
            "text": "www.ayalafoundation.org",
            "href": "https://www.ayalafoundation.org"
          }
        ]
      }
    }
  },
  "ayl": {
    "pillar": "leadership",
    "title": "Ayala Young Leaders (AYL)",
    "hero": {
      "id": "ayl-hero",
      "src": "assets/ayl-hero.jpg",
      "pos": "50% 12%",
      "ph": "Ayala Young Leaders photo"
    },
    "en": {
      "lead": "Developing steward leaders for nation-building",
      "body": [
        "As the Philippines navigates economic disparity, environmental challenges, and social inequality, the country's future depends on a new generation of capable and principled leaders.",
        "While Filipino youth represent a powerful demographic advantage, many young leaders lack the mindset, exposure, and support systems needed to create sustained impact in their communities and institutions.",
        "Investing early in leadership formation strengthens not only individual potential, but the country's long-term capacity for inclusive and responsible growth."
      ],
      "sections": [
        {
          "tab": "Our impact",
          "type": "stats",
          "groups": [
            {
              "label": "28 years of leadership development",
              "stats": [
                {
                  "icon": "users",
                  "value": "2,018",
                  "label": "Total number of Ayala Young Leaders alumni nationwide"
                },
                {
                  "icon": "pin",
                  "value": "22",
                  "label": "Active alumni chapters across the Philippines"
                }
              ]
            },
            {
              "label": "The 2026 cohort",
              "stats": [
                {
                  "icon": "pres",
                  "value": "31",
                  "label": "student participants from 24 universities nationwide"
                },
                {
                  "icon": "map",
                  "value": "9",
                  "label": "regions represented nationwide"
                },
                {
                  "icon": "book",
                  "value": "5",
                  "label": "Discipline clusters"
                }
              ]
            }
          ]
        },
        {
          "tab": "Our approach",
          "type": "features",
          "heading": "Creating pathways for steward leadership",
          "sub": "AYL develops steward leaders through a structured framework that strengthens identity, expands imagination, deepens insight, builds interdependence, drives intervention, and sustains impact.",
          "items": [
            {
              "icon": "heart",
              "title": "Identity",
              "body": "Anchors leaders in self-awareness, values, and purpose, shaping how they show up and make decisions"
            },
            {
              "icon": "lightbulb",
              "title": "Imagination",
              "body": "Expands what is possible by reframing challenges and envisioning better collective futures grounded in reality"
            },
            {
              "icon": "eye",
              "title": "Insight",
              "body": "Equips leaders to understand complex challenges through evidence-based analysis and an appreciation of both technical and adaptive dimensions"
            },
            {
              "icon": "users",
              "title": "Interdependence",
              "body": "The ability to cultivate relationships, navigate power dynamics, build coalitions, and leverage collective intelligence"
            },
            {
              "icon": "hand",
              "title": "Intervention",
              "body": "The unifying capacity that translates insight, imagination, and interdependence into action"
            },
            {
              "icon": "sun",
              "title": "Impact",
              "body": "The sustained social, economic, and environmental value leaders seek to create for communities, institutions, and society"
            }
          ]
        },
        {
          "tab": "Leadership journey",
          "type": "features",
          "heading": "The AYL leadership journey",
          "sub": "A structured pathway that transforms high-potential student leaders into lifelong stewards of change.",
          "items": [
            {
              "icon": "pres",
              "title": "Leadership Formation",
              "body": "An immersive leadership experience for outstanding college students, grounded in stewardship, national realities, and community action."
            },
            {
              "icon": "briefcase",
              "title": "Guided Leadership Practice",
              "body": "Delegates apply learning through mentorship, project implementation, and collaborative community initiatives."
            },
            {
              "icon": "hand",
              "title": "Leadership in Action",
              "body": "Equipping delegates to initiate and implement meaningful projects in their campuses and communities translating learning into sustainable practice."
            }
          ],
          "note": "Sustaining impact through the ATLAS network, where alumni across programs collaborate, mentor, and drive initiatives nationwide."
        }
      ],
      "contact": {
        "icon": "hand",
        "title": "Partner with us",
        "lines": [
          {
            "text": "partnerships@ayalafoundation.org",
            "href": "mailto:partnerships@ayalafoundation.org"
          },
          {
            "text": "www.ayalafoundation.org",
            "href": "https://www.ayalafoundation.org"
          }
        ]
      }
    }
  },
  "atletang": {
    "pillar": "leadership",
    "title": "Atletang Ayala",
    "hero": {
      "id": "atletang-hero",
      "src": "assets/atletang-hero.jpg",
      "ph": "Atletang Ayala photo"
    },
    "en": {
      "lead": "Empowering Filipino athletes to pursue Olympic qualification while building long-term professional careers.",
      "body": [
        "Qualifying for the Olympics requires sustained, world-class support—yet many Filipino national athletes lack consistent access to the resources needed to train, compete, and qualify at the highest level.",
        "Elite preparation demands long-term investment in international exposure, medical and recovery services, and financial stability. Without structured and uninterrupted support, athletes face barriers that limit both performance and progression.",
        "Beyond competition, national athletes represent a powerful pipeline of future leaders in Philippine sports and society. Enabling them to thrive today strengthens leadership across sectors tomorrow."
      ],
      "sections": [
        {
          "tab": "Our impact",
          "type": "stats",
          "groups": [
            {
              "label": "Our impact",
              "stats": [
                {
                  "icon": "users",
                  "value": "27",
                  "label": "National Athletes supported through two batches since 2022"
                },
                {
                  "icon": "trending",
                  "value": "10",
                  "label": "athletes moved up 2025 world rankings"
                }
              ]
            },
            {
              "label": "SEA Games 2025 performance",
              "sub": "Delivering a total of 17 medals, Atletang Ayala accounted for 7.42% of the Philippine's total medal haul of 229",
              "stats": [
                {
                  "icon": "medal",
                  "value": "2",
                  "label": "Gold"
                },
                {
                  "icon": "medal",
                  "value": "5",
                  "label": "Silver"
                },
                {
                  "icon": "medal",
                  "value": "10",
                  "label": "Bronze"
                }
              ]
            }
          ]
        },
        {
          "tab": "Our approach",
          "type": "features",
          "heading": "Creating pathways to global competition and leadership",
          "sub": "Supports Filipino national athletes by helping bridge gaps in access to international competition, elite preparation, and athlete well-being through sustained and thoughtful support. We aim to enable athletes to pursue excellence on the global stage while developing the skills, values, and perspective to lead and contribute beyond sport.",
          "items": [
            {
              "icon": "briefcase",
              "title": "Employment & Professional Pathways",
              "body": "Providing full-salaried roles, flexible work arrangements, and continuing education to support long-term professional growth beyond sport."
            },
            {
              "icon": "heart",
              "title": "World-Class Training & Performance Support",
              "body": "Supporting international training and competitions, elite facility access, and providing specialized athlete health and wellness support."
            },
            {
              "icon": "map",
              "title": "International Competition Exposure",
              "body": "Supplementing national athlete calendars by supporting additional international competition opportunities."
            },
            {
              "icon": "users",
              "title": "Diversity & Inclusion in Sport",
              "body": "Expanding access for women athletes, para-athletes, and competitors in historically under-resourced sports to level the playing field in elite competition."
            }
          ]
        }
      ],
      "contact": {
        "icon": "hand",
        "title": "Partner with us",
        "lines": [
          {
            "text": "partnerships@ayalafoundation.org",
            "href": "mailto:partnerships@ayalafoundation.org"
          },
          {
            "text": "www.ayalafoundation.org",
            "href": "https://www.ayalafoundation.org"
          }
        ]
      }
    }
  },
  "iraya": {
    "pillar": "community",
    "title": "Iraya Mangyan Development Program",
    "hero": {
      "id": "iraya-hero",
      "src": "assets/iraya-hero.jpg",
      "ph": "Iraya Mangyan Development Program photo"
    },
    "en": {
      "lead": "Advancing inclusive growth while preserving indigenous heritage in Puerto Galera",
      "body": [
        "Puerto Galera, a first-class municipality with 9,944 households, has a poverty incidence of 18%, comparable to the provincial rate. While known as a thriving tourism destination, basic service gaps remain: 6% of households lack electricity, 38% have no internet access, and 17% lack access to safe drinking water.",
        "Among the most vulnerable are the 367 Iraya-Mangyan families living in the foothills of Mt. Talipanan. Despite residing in a semi-urban and economically active municipality, Iraya-Mangyan households earn an average of ₱13,000 per month—barely above the poverty threshold and far below the lower middle-income benchmark. Limited access to stable livelihood, education, healthcare, and civic services continues to constrain upward mobility."
      ],
      "sections": [
        {
          "tab": "Our impact",
          "type": "stats",
          "label": "Our impact",
          "location": "Puerto Galera, Oriental Mindoro",
          "stats": [
            {
              "icon": "briefcase",
              "value": "50%",
              "label": "increase in average monthly household income of Iraya Mangyan beneficiaries"
            },
            {
              "icon": "pres",
              "value": "343",
              "label": "Students graduated or moved up to the next grade level"
            },
            {
              "icon": "stethoscope",
              "value": "975",
              "label": "Iraya Mangyan beneficiaries availed of medical services"
            }
          ]
        },
        {
          "tab": "Our approach",
          "type": "features",
          "heading": "Building a self-reliant community ecosystem",
          "sub": "Improving access to income, education, and healthcare through coordinated, culturally grounded interventions.",
          "items": [
            {
              "icon": "heart",
              "title": "Fulfill basic needs",
              "body": "Improving quality of nutrition, health, education, WASH, electricity, connectivity"
            },
            {
              "icon": "briefcase",
              "title": "Boost economic & community vitality",
              "body": "Financial inclusion and livelihood programs, local museums and libraries"
            },
            {
              "icon": "users",
              "title": "Increase social capital",
              "body": "Participation in community organizations, leadership and resilience programs"
            }
          ]
        },
        {
          "tab": "Programs",
          "type": "features",
          "items": [
            {
              "icon": "briefcase",
              "title": "Sustainable Livelihood Development",
              "body": "Strengthening community enterprises through organizational development, skills training, and expanded market access for indigenous products to increase stable household incomes."
            },
            {
              "icon": "pres",
              "title": "Access to Education",
              "body": "Strengthening community enterprises through organizational development, skills training, and expanded market access for indigenous products to increase stable household incomes."
            },
            {
              "icon": "stethoscope",
              "title": "Health Access and Well-being",
              "body": "Providing daycare services, scholarships from secondary to graduate level, and supplemental feeding to improve retention and increase Iraya-Mangyan graduates."
            },
            {
              "icon": "users",
              "title": "Community Organization and Planning",
              "body": "Conducting census and baselining of 367 families and enabling participatory planning toward long-term self-management and sustainability."
            }
          ]
        }
      ],
      "contact": {
        "icon": "hand",
        "title": "Partner with us",
        "lines": [
          {
            "text": "partnerships@ayalafoundation.org",
            "href": "mailto:partnerships@ayalafoundation.org"
          },
          {
            "text": "www.ayalafoundation.org",
            "href": "https://www.ayalafoundation.org"
          }
        ]
      }
    }
  },
  "ccv": {
    "pillar": "support",
    "title": "Corporate Citizenship and Volunteerism",
    "hero": {
      "id": "ccv-hero",
      "src": "assets/ccv-hero.jpg",
      "pos": "50% 10%",
      "ph": "Corporate Citizenship and Volunteerism photo"
    },
    "en": {
      "lead": "Mobilizing people, partnerships, and purpose for nation-building",
      "body": [
        "The Philippines faces recurring disasters, persistent malnutrition, education access gaps, and economic instability—challenges that require coordinated, sustained action across sectors.",
        "Located in one of the most disaster-prone countries in the world, Filipino communities regularly face climate-related shocks that disrupt livelihoods and deepen vulnerability. Malnutrition, learning disruptions, and financial insecurity continue to affect millions of Filipino families, especially during and in the aftermath of disasters.",
        "Addressing these complex challenges requires more than funding—it requires mobilizing people, skills, and networks at scale."
      ],
      "sections": [
        {
          "tab": "Our impact",
          "type": "stats",
          "label": "Our impact in 2025",
          "sub": "Through its national disaster response efforts, Ayala Foundation provides rapid relief within the first 48–72 hours of calamities, while supporting early recovery and preparedness initiatives. By integrating skills-based volunteerism and working alongside local governments, the program strengthens community resilience beyond immediate response.",
          "stats": [
            {
              "icon": "heart",
              "value": "32,751",
              "label": "families assisted with care packs, shelter kits, and go bags"
            },
            {
              "icon": "pin",
              "value": "20",
              "label": "Disaster Response Deployment Locations across the Philippines"
            },
            {
              "icon": "hand",
              "value": "183,563",
              "label": "hours rendered by volunteers from the Ayala Group and partners"
            },
            {
              "icon": "briefcase",
              "value": "5,224",
              "label": "skills-based hours rendered by Ayala volunteers"
            }
          ]
        },
        {
          "tab": "Our approach",
          "type": "features",
          "heading": "Turning volunteerism into impact",
          "sub": "Ayala Foundation's Corporate Citizenship & Volunteerism platform mobilizes employees, partners, and communities through structured, high-impact engagement.",
          "items": [
            {
              "icon": "sun",
              "title": "Disaster Response & Resiliency",
              "body": "Mobilizing volunteers for immediate relief and long-term preparedness in vulnerable communities."
            },
            {
              "icon": "book",
              "title": "Education & Literacy",
              "body": "Supporting underserved schools through Balik Eskwela and expanding access to reading through mobile libraries and Open Book initiatives."
            },
            {
              "icon": "stethoscope",
              "title": "Health, Nutrition & Financial Inclusion",
              "body": "Providing supplemental feeding and nutrition education through the Hapag Movement, alongside financial literacy workshops in partnership with BPI and GCash."
            },
            {
              "icon": "users",
              "title": "Employee Engagement & Corporate Citizenship",
              "body": "Strengthening a culture of volunteerism that enhances employee purpose, skills, and commitment across the Ayala Group."
            }
          ],
          "note": {
            "text": "Join the Ayala Foundation Volunteer Portal to turn your time and talent into meaningful impact:",
            "link": "volunteer.ayalafoundation.org",
            "href": "https://volunteer.ayalafoundation.org"
          }
        }
      ],
      "contact": {
        "icon": "hand",
        "title": "Partner with us",
        "lines": [
          {
            "text": "partnerships@ayalafoundation.org",
            "href": "mailto:partnerships@ayalafoundation.org"
          },
          {
            "text": "www.ayalafoundation.org",
            "href": "https://www.ayalafoundation.org"
          }
        ]
      }
    }
  }
};
