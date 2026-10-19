// Programs for the kiosk and the phone page. Both read this file.
// Each program belongs to a pillar: 'arts' | 'leadership' | 'bigbets' | 'community'.
// Add a program: give it a pillar, a title, a hero image, and en/fil content.
// Entries without en/fil show in their pillar's list but don't open yet.
// Tab order: impact first, then how the program works, then specifics or the
// ask (packages) last.
// Section types (each becomes a tab on the kiosk): 'features' | 'results' | 'stats' | 'packages' | 'list' | 'about'.
//   features: heading, sub and/or highlight, and items with an icon, title and body.
//     Four or more items sit in two columns on the kiosk.
//   stats: figures with an icon, value and label; optional label, location, sub
//     and a quote ({ text, by }). Three or four figures use a compact 2×2 layout,
//     five or six use three columns.
//   list: heading, sub, intro and a list of plain-text items.
//   about: heading, highlight, a logo ({ src, alt }) and body paragraphs beside it.
//   Headings are optional. A quote's text can hold several paragraphs separated
//   by a blank line, and may have a photo.
// Icons: users, smile, pres, lap, heart, hand, book, gem, image, briefcase, stethoscope, sun.
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
    },
    "fil": {
      "lead": "Pinupukaw ang pagmamalaki sa pamanang Pilipino sa pamamagitan ng sining, kasaysayan, at kultura.",
      "body": [
        "Hinuhubog ng kultura, kasaysayan, at pagkakakilanlan kung paano tinitingnan ng isang bansa ang sarili nito at kung paano ito sumusulong.",
        "Inaanyayahan ng Ayala Museum ang mga Pilipino na tuklasin ang yaman ng ating pamana sa pamamagitan ng maingat na inihandang mga eksibisyon, nakaka-engganyong karanasan, at masiglang pakikipag-ugnayan sa publiko. Sa paglalahad ng sining, kasaysayan, at kultura ng Pilipinas sa paraang nakapagbibigay-inspirasyon at abot-kaya, tinutulungan ng museo na palalimin ang pagpapahalaga sa kung sino tayo bilang isang bayan.",
        "Sa panahong hinuhubog ng mga salaysay ang ating pananaw, lumilikha ang Ayala Museum ng espasyo upang pagnilayan ang ating nakaraan, ipagdiwang ang pagkamalikhain ng Pilipino, at isipin ang ating sama-samang hinaharap. Sa ganitong paraan, pinalalago nito ang pagmamalaki, pagkamausisa, at mas matibay na pagkakakilanlang pinagsasaluhan na nagpapayaman sa buhay ng bansa."
      ],
      "sections": [
        {
          "tab": "Aming epekto",
          "type": "stats",
          "stats": [
            {
              "icon": "users",
              "value": "92,833",
              "label": "kabuuang bisita noong 2025"
            },
            {
              "icon": "image",
              "value": "7,000",
              "label": "sqm na pasilidad ng museo sa anim na palapag"
            },
            {
              "icon": "gem",
              "value": "8",
              "label": "nakalaang espasyo para sa eksibisyon ng sining, kasaysayan at kultura ng Pilipinas"
            },
            {
              "icon": "book",
              "value": "9,700+",
              "label": "bagay sa koleksyon ng museo"
            },
            {
              "icon": "lap",
              "value": "1st",
              "label": "museo sa Timog-Silangang Asya na nakalista sa Bloomberg Connects platform"
            }
          ]
        },
        {
          "tab": "Aming ginagawa",
          "type": "features",
          "heading": "Pagbibigay-buhay sa pamanang Pilipino",
          "sub": "Pinagsasama ng Ayala Museum ang iskolarsip, disenyo, at pakikipag-ugnayan sa publiko upang gawing abot-kaya, makabuluhan, at makapagpabago ang sining at kasaysayan.",
          "items": [
            {
              "icon": "gem",
              "title": "Curation & Collection Stewardship",
              "body": "Pangangalaga at paglalahad ng fine arts, mga artifact na arkeolohikal, mga materyales na etnograpiko, numismatics, at mga arkibong pangkasaysayan."
            },
            {
              "icon": "image",
              "title": "Immersive Exhibitions",
              "body": "Patuloy na umaangkop sa nagbabagong kultura sa pamamagitan ng makabagong disenyo ng eksibisyon at mga interactive na display sa museo."
            },
            {
              "icon": "pres",
              "title": "Education & Public Programs",
              "body": "Nag-aalok ng guided tour, lektyur, workshop, at digital na nilalaman na nagpapalalim sa literasiyang pangkultura. Sa Discovery Tours public school program ng museo, daan-daang kapus-palad na mag-aaral sa Grade 4–6 ang nakapapasok sa mga gallery, kasama ang mga aktibidad sa pagkatuto at learning kit na maiuuwi nila."
            },
            {
              "icon": "users",
              "title": "Access and Community Outreach",
              "body": "Pinalalawak ang abot sa pamamagitan ng pakikipagtulungan sa mga paaralan, mga naglalakbay na eksibisyon, mga inisyatiba para sa access ng publiko, at inklusibong programa."
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
    },
    "fil": {
      "lead": "Pinangangalagaan ang alaala ng Pilipinas. Pinalalawak ang access sa kaalamang pangkultura.",
      "body": [
        "Bihira, marupok, at nanganganib masira ang mga materyales ng pamanang Pilipino, ngunit limitado pa rin ang access sa mapagkakatiwalaang sangguniang pangkultura at pangkasaysayan.",
        "Maraming publikasyong Filipiniana ang inilimbag sa kakaunting kopya at madaling masira sa klimang tropikal. Kasabay nito, ang limitadong access sa pisikal at digital na aklatan ng pamana ay nag-aambag sa pagbaba ng literasiya at sa paglaganap ng maling impormasyon tungkol sa kasaysayan at kultura ng Pilipinas.",
        "Ang pangangalaga at pag-digitize sa mga materyales na ito ay tumitiyak na magkakaroon ang mga susunod na henerasyon ng maaasahan at batay-sa-ebidensyang sanggunian na nagpapalalim sa pag-unawa sa pagkakakilanlang Pilipino."
      ],
      "sections": [
        {
          "tab": "Aming epekto",
          "type": "stats",
          "stats": [
            {
              "icon": "users",
              "value": "3,896",
              "label": "kabuuang bisita noong 2025"
            },
            {
              "icon": "book",
              "value": "106,140",
              "label": "materyales ng pamana sa iba't ibang anyo, pinangangalagaan para sa patuloy na access"
            },
            {
              "icon": "lap",
              "value": "67,784",
              "label": "digitized na materyales na maa-access sa electronic na paraan"
            },
            {
              "icon": "gem",
              "value": "1st",
              "label": "aklatan sa Timog-Silangang Asya na nakalista sa Bloomberg Connects platform"
            },
            {
              "icon": "pres",
              "value": "316",
              "label": "kabuuang dumalo sa tatlong Roderick Hall memorial lecture"
            }
          ]
        },
        {
          "tab": "Aming ginagawa",
          "type": "features",
          "items": [
            {
              "icon": "book",
              "title": "Collection Management & Preservation",
              "body": "Pag-aalaga sa mga kuwentong Pilipino sa limbag, audio, at biswal na anyo, na pinahahalagahan ang tradisyonal na media kasabay ng umuusbong na Filipiniana mula sa bagong media at pop culture."
            },
            {
              "icon": "lap",
              "title": "Digitization & Online Access",
              "body": "Pag-convert ng mga marupok na analog na materyales sa digital na anyo at paglalagay nito sa mga electronic platform upang mapalawak ang access sa buong mundo."
            },
            {
              "icon": "users",
              "title": "Library & Research Services",
              "body": "Pagbibigay ng espasyo at dalubhasang suporta sa sanggunian para sa mga mag-aaral, guro, at iskolar."
            },
            {
              "icon": "pres",
              "title": "Curation & Public Programming",
              "body": "Pagbibigay-buhay sa mga koleksyon sa pamamagitan ng mga lektyur, pagtatanghal, podcast, playlist, at digital na pakikipag-ugnayan na nagpapalalim sa pagpapahalaga sa kultura ng Pilipinas."
            }
          ]
        },
        {
          "tab": "Mga koleksyon",
          "type": "list",
          "heading": "Pagbubukas ng access sa alaala ng Pilipinas",
          "sub": "Bilang tagapag-ingat ng alaala at tagapagtaguyod ng kasaysayan at kultura ng Pilipinas, pinag-uugnay ng FHL ang pangangalaga, pananaliksik, at pakikipag-ugnayan sa publiko upang bigyang-buhay ang kuwentong Pilipino.",
          "intro": "Nasa FHL ang mga bihira at kontemporaryong materyales tungkol sa sining, kasaysayan, at kultura ng Pilipinas, kabilang ang:",
          "items": [
            "Ang Roderick Hall Collection (mga materyales mula sa Ikalawang Digmaang Pandaigdig)",
            "Ang Himig Collection (mga rekording ng musika, mula vintage hanggang moderno)",
            "Ang Retrato Photo Archive (mga lumang larawan)",
            "Ang Elpidio R. Quirino Presidential Papers",
            "Ang Manuel L. Quezon Family Collection",
            "Mga aklat, peryodiko, mapa, at multimedia na koleksyon"
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
  "centexDE": {
    "pillar": "bigbets",
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
          "tab": "Our approach",
          "type": "features",
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
          "tab": "Aming paraan",
          "type": "features",
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
    "pillar": "bigbets",
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
          "sub": "Improving instructional quality, strengthening home-school collaboration, and aligning early grade systems to support long-term academic success.",
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
              "body": "Partnering with Local Government Units, DepEd/MBHTE, Municipal and City Social Welfare Development Offices, and Higher Education Institutions to promote coordination, community ownership, and long-term sustainability."
            }
          ]
        },
        {
          "tab": "Package",
          "type": "packages",
          "heading": "Learning Resource & Teacher Training Package",
          "cards": [
            {
              "title": "Starts at ₱640,000",
              "label": "Inclusions",
              "items": [
                "Learning Resource Kits for all students",
                "32 Hours of Teacher and Child Development Worker Training, including mentoring and Professional Learning Communities"
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
          "tab": "Aming paraan",
          "type": "features",
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
          "tab": "Package",
          "type": "packages",
          "heading": "Package ng Learning Resource at Teacher Training",
          "cards": [
            {
              "title": "Simula ₱640,000",
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
    },
    "fil": {
      "lead": "Tinutulungan ang mga pamilya na makaahon mula sa kahirapan tungo sa gitnang uri sa pamamagitan ng mga solusyong multi-sektor at pinangungunahan ng komunidad.",
      "body": [
        "Patuloy na humaharap ang El Nido sa malalaking kakulangan sa pag-unlad, na may mas mataas na antas ng kahirapan at kawalan ng trabaho kumpara sa ibang bahagi ng lalawigan ng Palawan. Maraming sambahayan pa rin ang walang maaasahang kuryente, internet, at ligtas na inuming tubig, habang nananatiling alalahanin ang malnutrisyon. Sa mga benepisyaryo ng aming mga community enterprise, nananatiling mas mababa sa lower middle-income threshold ang karaniwang kita ng sambahayan.",
        "Sa pamamagitan ng aming pinagsama-samang paraan, layunin naming matulungan ang mga pamilya na magkaroon ng mas matatag at pangmatagalang kabuhayan pagsapit ng 2028."
      ],
      "sections": [
        {
          "tab": "Aming epekto",
          "type": "stats",
          "label": "Aming epekto",
          "location": "El Nido, Palawan",
          "sub": "Ginagamit ng El Nido Community Development program ang suporta ng mga Ayala Business Unit na kasangkot mula pa noong 2013, habang aktibong pinalalawak ang mga pakikipagtulungan upang isulong ang misyon nitong labanan ang kahirapan sa mga komunidad ng El Nido.",
          "stats": [
            {
              "icon": "briefcase",
              "value": "16.78%",
              "label": "pagtaas sa buwanang kita ng sambahayan ng mga benepisyaryo"
            },
            {
              "icon": "pres",
              "value": "98%",
              "label": "advancement rate (trabaho, karagdagang pag-aaral o pagnenegosyo)"
            },
            {
              "icon": "stethoscope",
              "value": "9,396",
              "label": "unang patient encounter at unang konsultasyon na naisagawa"
            },
            {
              "icon": "sun",
              "value": "1,620",
              "label": "sambahayang nabigyan ng solar home system"
            }
          ]
        },
        {
          "tab": "Aming paraan",
          "type": "features",
          "heading": "Pagbuo ng masiglang ecosystem ng komunidad",
          "sub": "Pagpapalawak ng access sa kita, edukasyon, kalusugan, at mahahalagang serbisyo sa pamamagitan ng magkakaugnay na solusyong pinangungunahan ng komunidad.",
          "items": [
            {
              "icon": "heart",
              "title": "Pagtugon sa mga pangunahing pangangailangan",
              "body": "Pagpapabuti sa kalidad ng nutrisyon, kalusugan, edukasyon, WASH, kuryente, at koneksyon."
            },
            {
              "icon": "briefcase",
              "title": "Pagpapasigla sa ekonomiya at komunidad",
              "body": "Financial inclusion at mga programang pangkabuhayan, mga lokal na museo at aklatan."
            },
            {
              "icon": "users",
              "title": "Pagpapalakas ng social capital",
              "body": "Pakikilahok sa mga organisasyon ng komunidad, at mga programa sa pamumuno at katatagan."
            }
          ]
        },
        {
          "tab": "Mga programa",
          "type": "features",
          "items": [
            {
              "icon": "briefcase",
              "title": "Sustainable Livelihood Development",
              "body": "Pagpapalakas sa mga community enterprise sa pamamagitan ng pagsasanay sa kooperatiba at access sa merkado, upang mapalago ng mga pamilya ang matatag na mapagkukunan ng kita."
            },
            {
              "icon": "pres",
              "title": "Education for Employment",
              "body": "Paghahanda sa mga mag-aaral at guro sa senior high sa pamamagitan ng pagsasanay na akma sa industriya, mga simulation, at internship sa lokal na hospitality sector."
            },
            {
              "icon": "stethoscope",
              "title": "Health Access through Telehealth",
              "body": "Pagbibigay sa mga barangay ng digital na kagamitang pangkalusugan, sinanay na mga barangay health worker (BHW), at mga boluntaryong doktor para sa napapanahong konsultasyon sa malalayong lugar."
            },
            {
              "icon": "sun",
              "title": "Sustainable Energy Access",
              "body": "Pagbibigay ng solar home system at mga community support center upang mapalawak ang maaasahan at abot-kayang kuryente sa mga sitiong kulang sa serbisyo."
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
    },
    "fil": {
      "lead": "Nagbubukas ng oportunidad para sa mga kabataang babaeng may potensyal ngunit nangangailangan ng tulong pinansyal.",
      "body": [
        "Para sa maraming kabataang babae, hindi sapat ang talento at ambisyon upang magtagumpay. Nasa 56% ang pakikilahok ng kababaihan sa lakas-paggawa sa Pilipinas, mas mababa kumpara sa 76% ng kalalakihan, at 2.4 milyong kababaihan ang nananatili sa gawaing-bahay na walang bayad. Dahil sa gastos sa tirahan, pamasahe, pagkain, at iba pang pangangailangan sa pag-aaral, nagiging mahirap abutin ang kolehiyo, na nagpapalala sa hindi pagkakapantay-pantay at naglilimita sa pag-angat sa buhay.",
        "Binabago ng edukasyon ng kababaihan ang direksyong ito. Ngunit dahil halos 40% ang hindi nakatatapos ng kolehiyo, napakaraming kabataang Pilipina ang hindi nakakukumpleto ng kanilang kurso. Kapag nakatapos ang kababaihan, tumataas ang kita, mas matagal nag-aaral ang kanilang mga anak, at lumalakas ang mga komunidad."
      ],
      "sections": [
        {
          "tab": "Aming epekto",
          "type": "stats",
          "stats": [
            {
              "icon": "pres",
              "value": "1,082",
              "label": "U-GO scholarship na naigawad sa buong bansa mula 2023"
            },
            {
              "icon": "smile",
              "value": "98%",
              "label": "advancement rate ng mga iskolar"
            }
          ],
          "quote": {
            "text": "Pangarap kong makatapos ng kolehiyo at maging gurong gagabay at magbibigay-inspirasyon sa mga bata, lalo na sa mga nagmula sa payak na pamumuhay tulad ko. Tuwing Sabado, nagtuturo kami ng aking mga kaklase sa mga bata sa aming baryo kung paano bumasa, sumulat, at bumilang.\n\nAng pagbabahagi ng aking natutunan ay nagbibigay sa akin ng saya at layunin. Maaaring lumaki ako sa hirap, ngunit may dala akong malalaking pangarap — ang magturo, gumabay, at mag-angat ng iba sa pamamagitan ng edukasyon.",
            "by": "Daijane, 2025 U-GO Scholar",
            "photo": "assets/ugo-daijane.jpg"
          }
        },
        {
          "tab": "Aming paraan",
          "type": "features",
          "heading": "Paglikha ng daan para sa pamumuno ng kababaihan",
          "sub": "Pinalalawak ang access sa mas mataas na edukasyon habang hinuhubog ang pamumuno, katatagan, at kahandaan sa karera ng mga kabataang babae.",
          "items": [
            {
              "icon": "book",
              "title": "Access sa Tertiary Education",
              "body": "Sa pamamagitan ng scholarship grant, tumutulong ang tulong pinansyal sa mahahalagang gastusin sa pag-aaral upang makapagpokus ang mga iskolar sa kanilang pag-aaral."
            },
            {
              "icon": "users",
              "title": "Suporta at Pakikilahok ng Mag-aaral",
              "body": "Mga nakaayos na pagkakataon para sa pagpapaunlad ng kasanayan, mentoring, at pagkilala sa iba't ibang landas ng karera."
            },
            {
              "icon": "heart",
              "title": "Epektong may Layunin",
              "body": "Hinuhubog ang mga iskolar upang maging bahagi ng lumalaking hanay ng mahuhusay na propesyonal at lider na naghahangad ng mas magandang kinabukasan para sa kanilang pamilya at komunidad."
            }
          ]
        },
        {
          "tab": "Tungkol sa U-GO",
          "type": "about",
          "heading": "Gawing kasing-laganap ng talento ang oportunidad",
          "highlight": "Dumodoble ang bawat pisong ibibigay mo sa pamamagitan ng U-GO global donation matching",
          "logo": {
            "src": "assets/ugo-logo.png",
            "alt": "U-GO"
          },
          "body": [
            "Ang U-GO ay isang pandaigdigang nonprofit na nakatuon sa pagpapalawak ng access sa mas mataas na edukasyon para sa mga ambisyoso at may potensyal na kabataang babae mula sa mga komunidad na mababa ang kita.",
            "Kasalukuyang tumatakbo sa siyam na bansa, nakikipagtulungan ang U-GO sa mga mapagkakatiwalaang lokal na institusyon upang maghatid ng scholarship at suporta sa buong paglalakbay ng iskolar sa unibersidad. Sa Pilipinas, ang Ayala Foundation ang nag-iisang implementing partner ng U-GO, na tumutulong sa paghahatid ng scholarship at pakikilahok ng mga mag-aaral sa buong bansa."
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
