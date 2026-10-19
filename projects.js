// Project pages for the kiosk and mobile app. Both files read this.
// Add a project: give it a program ('arts' | 'leadership' | 'bigbets' | 'community'), a title,
// a hero image, and en/fil content. Entries without en/fil show in the list but don't open yet.
// Section types (each becomes a tab on the kiosk): 'pillars' | 'results' | 'stats' | 'packages'.
// A 'stats' section may also have a label and a location shown above the figures;
// three or four figures use a compact 2×2 layout.
// Icons: users, smile, pres, lap, heart, hand, book, gem, image.
window.KIOSK_PROJECTS = {
  "museum": {
    "program": "arts",
    "title": "Ayala Museum",
    "hero": {
      "id": "museum-hero",
      "src": "assets/museum-panel.jpg",
      "ph": "Ayala Museum photo"
    },
    "en": {
      "lead": "One of the country's leading private museums, making Philippine history, art and culture accessible to everyone.",
      "body": [
        "Celebrating its 50th year in 2024, the museum uses both traditional and new platforms to share our rich heritage with people of all generations."
      ],
      "sections": [
        {
          "tab": "What's inside",
          "type": "pillars",
          "heading": "Explore the museum",
          "sub": "Three experiences that bring Philippine history, art and culture to life.",
          "items": [
            {
              "icon": "lap",
              "title": "Digital Gallery",
              "body": "The country's first Digital Gallery, an immersive touchscreen experience for exploring objects from the museum and library collections."
            },
            {
              "icon": "gem",
              "title": "Crossroads of Civilizations",
              "body": "A permanent exhibition of Philippine pre-colonial treasures."
            },
            {
              "icon": "image",
              "title": "Diorama Experience of Philippine History",
              "body": "A one-of-a-kind journey through Philippine history, told in dioramas."
            }
          ]
        },
        {
          "tab": "Impact",
          "type": "stats",
          "stats": [
            {
              "icon": "users",
              "value": "92,833",
              "label": "visitors in 2023"
            },
            {
              "icon": "smile",
              "value": "96%",
              "label": "satisfaction rating from guests and program attendees, from young to late adults"
            }
          ]
        }
      ],
      "contact": {
        "icon": "heart",
        "title": "Support this project",
        "lines": [
          {
            "text": "giving@ayalafoundation.org",
            "href": "mailto:giving@ayalafoundation.org"
          }
        ]
      }
    },
    "fil": {
      "lead": "Isa sa mga nangungunang pribadong museo sa bansa, na naglalapit sa lahat ng kasaysayan, sining at kultura ng Pilipinas.",
      "body": [
        "Sa pagdiriwang ng ika-50 taon nito noong 2024, gumagamit ang museo ng tradisyonal at bagong plataporma upang ibahagi ang ating mayamang pamana sa lahat ng henerasyon."
      ],
      "sections": [
        {
          "tab": "Ano ang makikita",
          "type": "pillars",
          "heading": "Tuklasin ang museo",
          "sub": "Tatlong karanasan na nagbibigay-buhay sa kasaysayan, sining at kultura ng Pilipinas.",
          "items": [
            {
              "icon": "lap",
              "title": "Digital Gallery",
              "body": "Ang kauna-unahang Digital Gallery ng bansa, isang touchscreen na karanasan para tuklasin ang mga bagay mula sa koleksyon ng museo at aklatan."
            },
            {
              "icon": "gem",
              "title": "Crossroads of Civilizations",
              "body": "Isang permanenteng eksibisyon ng mga kayamanang pre-kolonyal ng Pilipinas."
            },
            {
              "icon": "image",
              "title": "Diorama Experience of Philippine History",
              "body": "Isang natatanging paglalakbay sa kasaysayan ng Pilipinas sa pamamagitan ng mga diorama."
            }
          ]
        },
        {
          "tab": "Epekto",
          "type": "stats",
          "stats": [
            {
              "icon": "users",
              "value": "92,833",
              "label": "bisita noong 2023"
            },
            {
              "icon": "smile",
              "value": "96%",
              "label": "satisfaction rating mula sa mga bisita at dumalo sa programa, mula kabataan hanggang nakatatanda"
            }
          ]
        }
      ],
      "contact": {
        "icon": "heart",
        "title": "Suportahan ang proyektong ito",
        "lines": [
          {
            "text": "giving@ayalafoundation.org",
            "href": "mailto:giving@ayalafoundation.org"
          }
        ]
      }
    }
  },
  "fhl": {
    "program": "arts",
    "title": "Filipinas Heritage Library"
  },
  "centexDE": {
    "program": "bigbets",
    "title": "CENTEX Digital Education",
    "hero": {
      "id": "centex-de-hero",
      "src": "assets/centex-de-banner.jpg",
      "ph": "CENTEX Digital Education photo"
    },
    "en": {
      "lead": "We are making a big bet on digital education focused on differentiated instruction.",
      "body": [
        "As our contribution to addressing the learning crisis in the Philippines, we are sharpening our focus to support students in Grades 4–6, recognizing this as a critical, last window of opportunity to help learners catch up before they transition to higher levels of education.",
        "Through Digital Education and Teacher Training programs, these targeted, high-impact interventions aim to unlock meaningful, scalable, and sustainable solutions to improving learning outcomes."
      ],
      "sections": [
        {
          "tab": "Our approach",
          "type": "pillars",
          "heading": "Creating a thriving learning community",
          "sub": "Confident, data-driven, and community-anchored educators leading thriving learning communities across public schools.",
          "items": [
            {
              "icon": "pres",
              "title": "Teacher and School Leader Training",
              "body": "Continuous teacher development program combining online modules, in-person coaching, and Professional Learning Communities (PLCs)."
            },
            {
              "icon": "lap",
              "title": "Digital Lab and Learning Resources",
              "body": "Equipped with digital infrastructure and devices, teachers create learning experiences meant to address individual needs of the students using real-time assessment data from adaptive technology such as Khan Academy."
            },
            {
              "icon": "users",
              "title": "Community and Parent Engagement",
              "body": "Each teacher engages parents, community members, and peers to extend learning beyond the classroom."
            }
          ]
        },
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
            "Pre mathematics score (%)",
            "Post mathematics score (%)"
          ],
          "axis": [
            "Control",
            "Treatment"
          ],
          "highlight": "9 treatment schools outperformed control schools by 13.8 percentage points"
        },
        {
          "tab": "Packages",
          "type": "packages",
          "heading": "Digital Education & Teacher Training packages",
          "cards": [
            {
              "title": "Intensive Educator Training*",
              "label": "Inclusions",
              "items": [
                "8–16 hours of Khan Platform Training",
                "40 hours of Teacher Training and Parental/Community Engagement",
                "8 hours of School Leaders Training"
              ],
              "impact": "Program will impact ~1,000 students across Grades 4–6 for two years.",
              "foot": "*Assumes a minimum of 10 schools for Professional Learning Communities."
            },
            {
              "tag": "Add-on",
              "title": "Digital Lab",
              "label": "Inclusions",
              "items": [
                "40 student tablets",
                "3 teacher laptops",
                "2 years internet connectivity"
              ],
              "dark": true
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
    },
    "fil": {
      "lead": "Malaki ang taya namin sa digital na edukasyon na nakatuon sa differentiated instruction.",
      "body": [
        "Bilang ambag sa pagtugon sa krisis sa pagkatuto sa Pilipinas, mas tinututukan namin ang mga mag-aaral sa Grade 4–6, dahil ito ang kritikal at huling pagkakataon upang makahabol sila bago tumuntong sa mas mataas na antas ng edukasyon.",
        "Sa pamamagitan ng Digital Education at Teacher Training, layunin ng mga nakatuon at mabisang interbensyong ito na makabuo ng makabuluhan, napapalawak, at pangmatagalang solusyon para sa mas mahusay na pagkatuto."
      ],
      "sections": [
        {
          "tab": "Aming paraan",
          "type": "pillars",
          "heading": "Pagbuo ng masiglang komunidad ng pagkatuto",
          "sub": "Mga gurong may kumpiyansa, gumagamit ng datos, at nakaugat sa komunidad na nangunguna sa mga pampublikong paaralan.",
          "items": [
            {
              "icon": "pres",
              "title": "Pagsasanay ng Guro at School Leader",
              "body": "Tuloy-tuloy na programa para sa mga guro na pinagsasama ang online modules, personal na coaching, at Professional Learning Communities (PLCs)."
            },
            {
              "icon": "lap",
              "title": "Digital Lab at Learning Resources",
              "body": "Gamit ang digital na imprastraktura at mga device, bumubuo ang mga guro ng aralin na tumutugon sa pangangailangan ng bawat mag-aaral gamit ang real-time na assessment data mula sa adaptive technology tulad ng Khan Academy."
            },
            {
              "icon": "users",
              "title": "Pakikilahok ng Komunidad at Magulang",
              "body": "Hinihikayat ng bawat guro ang mga magulang, komunidad, at kapwa guro na palawigin ang pagkatuto lampas sa silid-aralan."
            }
          ]
        },
        {
          "tab": "Resulta ng pilot",
          "type": "results",
          "label": "Resulta ng aming pilot",
          "location": "San Marcelino, Zambales",
          "stat": {
            "value": "78%",
            "text": "ang nahihirapang maabot ang inaasahang kakayahan sa math para sa kanilang baitang",
            "note": "Batay sa lokal na assessment"
          },
          "callout": "Sa Digital Education, dumoble ang iskor ng mga mag-aaral sa math sa loob lamang ng ~12 linggo.",
          "chart": "centexDE",
          "legend": [
            "Iskor sa math bago (%)",
            "Iskor sa math pagkatapos (%)"
          ],
          "axis": [
            "Control",
            "Treatment"
          ],
          "highlight": "Nalampasan ng 9 na treatment school ang mga control school nang 13.8 percentage points"
        },
        {
          "tab": "Mga package",
          "type": "packages",
          "heading": "Mga package ng Digital Education at Teacher Training",
          "cards": [
            {
              "title": "Intensive Educator Training*",
              "label": "Kasama",
              "items": [
                "8–16 oras ng Khan Platform Training",
                "40 oras ng Teacher Training at Pakikilahok ng Magulang/Komunidad",
                "8 oras ng School Leaders Training"
              ],
              "impact": "Aabot ang programa sa ~1,000 mag-aaral sa Grade 4–6 sa loob ng dalawang taon.",
              "foot": "*Ipinapalagay na may hindi bababa sa 10 paaralan para sa Professional Learning Communities."
            },
            {
              "tag": "Add-on",
              "title": "Digital Lab",
              "label": "Kasama",
              "items": [
                "40 tablet para sa mag-aaral",
                "3 laptop para sa guro",
                "2 taong internet connection"
              ],
              "dark": true
            }
          ]
        }
      ],
      "contact": {
        "icon": "hand",
        "title": "Makipagtulungan sa amin",
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
    "program": "bigbets",
    "title": "CENTEX Early Grades",
    "hero": {
      "id": "centex-eg-hero",
      "src": "",
      "ph": "CENTEX Early Grades photo"
    },
    "en": {
      "lead": "We are making a big bet on early childhood education to combat the learning crisis in the Philippines.",
      "body": [
        "As our contribution to addressing the learning crisis in the Philippines, we are sharpening our focus to support students in their early years.",
        "Only 1 in 5 Filipino children are enrolled in early learning programs, and just 3 in 10 Grade 1 learners meet basic literacy and numeracy standards. Quality varies widely, with many Child Development Workers lacking specialized early childhood training and limited parental engagement, particularly among low-income families.",
        "Through CENTEX Early Grades, these targeted, high-impact interventions aim to build strong foundations in literacy, numeracy, and socio-emotional development, unlocking meaningful and sustainable gains among children aged 3–5."
      ],
      "sections": [
        {
          "tab": "Our approach",
          "type": "pillars",
          "heading": "Building strong foundations for learning",
          "sub": "Improving instructional quality, strengthening home-school collaboration, and aligning early grade systems to support long-term academic success.",
          "items": [
            {
              "icon": "pres",
              "title": "Teacher and CDW Training",
              "body": "Teacher training, mentoring, and professional learning communities that bring together Child Development Workers (CDWs) and Kindergarten teachers within the same barangays, ensuring consistent, high-quality instruction."
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
              "body": "Partnering with Local Government Units, DepEd/MBHTE, Municipal and City Social Welfare Development Offices, and Higher Education Institutions to promote coordination, community ownership, and long-term sustainability."
            }
          ]
        },
        {
          "tab": "Our impact",
          "type": "stats",
          "label": "Our impact",
          "location": "Lamitan City, Basilan",
          "stats": [
            {
              "icon": "users",
              "value": "715",
              "label": "students have taken part in the program since September 2025"
            },
            {
              "icon": "book",
              "value": "26",
              "label": "Child Development Centers and elementary schools"
            },
            {
              "icon": "smile",
              "value": "13.2%",
              "label": "average increase in consistent participation (at least 80% of school days attended)"
            },
            {
              "icon": "pres",
              "value": "36",
              "label": "child development workers, kindergarten teachers, and school heads mentored"
            }
          ]
        },
        {
          "tab": "Package",
          "type": "packages",
          "heading": "Learning Resource & Teacher Training package",
          "cards": [
            {
              "tag": "Starts at ₱640,000",
              "title": "Learning Resource & Teacher Training",
              "label": "Inclusions",
              "items": [
                "Learning Resource Kits for all students",
                "32 hours of Teacher and Child Development Worker Training, including mentoring and Professional Learning Communities"
              ],
              "impact": "Program will impact ~1,050 students from Child Development Centers and Kindergarten per school over three years.",
              "foot": "*Assumes a minimum of 30 schools for Professional Learning Communities."
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
    },
    "fil": {
      "lead": "Malaki ang taya namin sa edukasyon sa maagang pagkabata upang labanan ang krisis sa pagkatuto sa Pilipinas.",
      "body": [
        "Bilang ambag sa pagtugon sa krisis sa pagkatuto sa Pilipinas, mas tinututukan namin ang mga mag-aaral sa kanilang mga unang taon.",
        "1 lamang sa bawat 5 batang Pilipino ang naka-enroll sa mga programa ng maagang pagkatuto, at 3 lamang sa bawat 10 mag-aaral sa Grade 1 ang umaabot sa batayang pamantayan sa pagbasa at pagbilang. Magkakaiba ang kalidad, dahil maraming Child Development Worker ang kulang sa espesyal na pagsasanay sa maagang pagkabata at limitado ang pakikilahok ng mga magulang, lalo na sa mga pamilyang mababa ang kita.",
        "Sa pamamagitan ng CENTEX Early Grades, layunin ng mga nakatuon at mabisang interbensyong ito na bumuo ng matibay na pundasyon sa pagbasa, pagbilang, at socio-emotional na pag-unlad, para sa makabuluhan at pangmatagalang pag-unlad ng mga batang edad 3–5."
      ],
      "sections": [
        {
          "tab": "Aming paraan",
          "type": "pillars",
          "heading": "Pagbuo ng matibay na pundasyon sa pagkatuto",
          "sub": "Pagpapahusay sa kalidad ng pagtuturo, pagpapatibay sa ugnayan ng tahanan at paaralan, at pag-aayon ng mga sistema sa maagang baitang para sa pangmatagalang tagumpay sa pag-aaral.",
          "items": [
            {
              "icon": "pres",
              "title": "Pagsasanay ng Guro at CDW",
              "body": "Pagsasanay, mentoring, at professional learning communities na pinagsasama ang mga Child Development Worker (CDW) at mga guro sa Kindergarten sa iisang barangay, para sa tuloy-tuloy at de-kalidad na pagtuturo."
            },
            {
              "icon": "book",
              "title": "Mga Learning Resource",
              "body": "Mga kagamitang nagpapalakas sa pagbasa, pagbilang, at socio-emotional na kakayahan ng mga bata, habang hinihikayat ang kanilang pakikilahok sa pamamagitan ng aktibong pagkatuto sa paglalaro."
            },
            {
              "icon": "heart",
              "title": "Pakikilahok ng Magulang at Pamilya",
              "body": "Mga sesyon sa adbokasiya at pagpapamagulang na tumutulong sa mga pamilya na suportahan ang pagkatuto sa tahanan at palakasin ang mabuting ugnayan ng magulang at anak."
            },
            {
              "icon": "hand",
              "title": "Pakikiisa sa Pagsisikap ng Komunidad",
              "body": "Pakikipagtulungan sa mga Local Government Unit, DepEd/MBHTE, Municipal at City Social Welfare Development Office, at mga Higher Education Institution para sa koordinasyon, pagmamay-ari ng komunidad, at pangmatagalang pagpapatuloy."
            }
          ]
        },
        {
          "tab": "Aming epekto",
          "type": "stats",
          "label": "Aming epekto",
          "location": "Lamitan City, Basilan",
          "stats": [
            {
              "icon": "users",
              "value": "715",
              "label": "mag-aaral ang nakilahok sa programa mula Setyembre 2025"
            },
            {
              "icon": "book",
              "value": "26",
              "label": "Child Development Center at elementary school"
            },
            {
              "icon": "smile",
              "value": "13.2%",
              "label": "karaniwang pagtaas sa tuloy-tuloy na pagdalo (hindi bababa sa 80% ng mga araw ng klase)"
            },
            {
              "icon": "pres",
              "value": "36",
              "label": "child development worker, guro sa kindergarten, at school head ang na-mentor"
            }
          ]
        },
        {
          "tab": "Package",
          "type": "packages",
          "heading": "Package ng Learning Resource at Teacher Training",
          "cards": [
            {
              "tag": "Simula ₱640,000",
              "title": "Learning Resource at Teacher Training",
              "label": "Kasama",
              "items": [
                "Learning Resource Kit para sa lahat ng mag-aaral",
                "32 oras ng Teacher at Child Development Worker Training, kasama ang mentoring at Professional Learning Communities"
              ],
              "impact": "Aabot ang programa sa ~1,050 mag-aaral mula sa mga Child Development Center at Kindergarten bawat paaralan sa loob ng tatlong taon.",
              "foot": "*Ipinapalagay na may hindi bababa sa 30 paaralan para sa Professional Learning Communities."
            }
          ]
        }
      ],
      "contact": {
        "icon": "hand",
        "title": "Makipagtulungan sa amin",
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
