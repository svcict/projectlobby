// English and Filipino copy shared by the kiosk (index.html) and the phone page (mobile.html).
window.COPY = {
  en: {
    title: 'Arts and Culture',
    body: 'We provide platforms that spotlight history, contemporary and fine art forms in state-of-the-art museum and library venues. By curating physical and digital collections that celebrate the joy and wonder of Philippine arts and culture, we hope to contribute to conversations about evolving Filipino identities and agency throughout history.',
    projects: 'Projects', partOf: 'Be part of it', more: 'More programs',
    partner: 'Partner with us',
    take: 'Take this with you', takeBody: 'Scan to open this page on your phone.',
    startOver: 'Start over', allPrograms: 'All programs', tap: 'Tap to explore',
    p1: 'Leadership Development', p2: 'Big Bets', p3: 'Community Development', p0: 'Arts and Culture', homeSub: 'Discover how we work with Filipinos to build a better nation.', touch: 'Touch to explore', touchHint: 'Or tap anywhere on the screen to begin.', about: 'About us', featured: 'Featured', visit: 'Visiting today? Please check in at the front desk.', still: 'Still there?', stillBody: 'This screen will start over for the next visitor in', keep: 'Keep exploring', allTitle: 'Our programs', hint: 'Swipe or tap a card', learnMore: 'Learn more',
    d0: 'Ayala Museum and the Filipinas Heritage Library preserve Philippine art, history and culture, and open them up to every Filipino.', d1: 'Developing young Filipino leaders who serve their communities and the nation.', d2: 'Through CENTEX, we give public school children a quality education, from their first years in school to the digital skills they need.', d3: 'Multi-sector, community-driven solutions that help families rise from poverty to the middle class.',
    bbBody: 'We back bold, long-term ideas that can change the lives of millions of Filipinos. Through CENTEX, we work to give public school children a quality education, from their very first years in school to the digital skills they need for the future.',
    cdBody: 'We uplift families from poverty to the middle class through multi-sector, community-driven solutions. Working side by side with communities, we improve access to income, education, healthcare and essential utilities, so families can build stable, sustainable livelihoods.',
    mobileCta: 'Explore our programs'
  },
  fil: {
    title: 'Sining at Kultura',
    body: 'Nagbibigay kami ng mga plataporma na nagtatampok sa kasaysayan, kontemporaryo at pinong sining sa mga makabagong museo at aklatan. Sa pag-curate ng pisikal at digital na koleksyon na nagdiriwang sa sining at kultura ng Pilipinas, layunin naming makapag-ambag sa usapan tungkol sa umuusbong na pagkakakilanlan at kakayahan ng Pilipino sa kasaysayan.',
    projects: 'Mga Proyekto', partOf: 'Makibahagi', more: 'Iba pang programa',
    partner: 'Makipagtulungan sa amin',
    take: 'Dalhin mo ito', takeBody: 'I-scan para buksan ang pahinang ito sa iyong telepono.',
    startOver: 'Magsimula muli', allPrograms: 'Lahat ng programa', tap: 'Pindutin para tuklasin',
    p1: 'Pagpapaunlad ng Pamumuno', p2: 'Big Bets', p3: 'Pagpapaunlad ng Komunidad', p0: 'Sining at Kultura', homeSub: 'Alamin kung paano kami nakikipagtulungan sa mga Pilipino para sa mas mabuting bansa.', touch: 'Pindutin para tuklasin', touchHint: 'O pindutin kahit saan sa screen para magsimula.', about: 'Tungkol sa amin', featured: 'Tampok', visit: 'Bibisita ngayon? Mag-check in po sa front desk.', still: 'Nandiyan ka pa ba?', stillBody: 'Magsisimula muli ang screen para sa susunod na bisita sa loob ng', keep: 'Magpatuloy', allTitle: 'Aming mga programa', hint: 'I-swipe o pindutin ang card', learnMore: 'Alamin pa',
    d0: 'Pinangangalagaan ng Ayala Museum at Filipinas Heritage Library ang sining, kasaysayan at kultura ng Pilipinas para sa bawat Pilipino.', d1: 'Hinuhubog ang mga kabataang Pilipinong lider na naglilingkod sa kanilang komunidad at sa bansa.', d2: 'Sa CENTEX, de-kalidad na edukasyon para sa mga batang nasa pampublikong paaralan, mula sa unang mga taon hanggang sa digital na kasanayan.', d3: 'Mga solusyong multi-sektor at pinangungunahan ng komunidad na tumutulong sa mga pamilya na makaahon mula sa kahirapan tungo sa gitnang uri.',
    bbBody: 'Sinusuportahan namin ang matatapang at pangmatagalang ideya na makapagbabago sa buhay ng milyun-milyong Pilipino. Sa pamamagitan ng CENTEX, nagsisikap kaming bigyan ng de-kalidad na edukasyon ang mga batang nasa pampublikong paaralan, mula sa kanilang unang mga taon sa paaralan hanggang sa digital na kasanayang kailangan nila sa hinaharap.',
    cdBody: 'Tinutulungan namin ang mga pamilya na makaahon mula sa kahirapan tungo sa gitnang uri sa pamamagitan ng mga solusyong multi-sektor at pinangungunahan ng komunidad. Kasama ang mga komunidad, pinapalawak namin ang access sa kita, edukasyon, kalusugan at mahahalagang serbisyo, upang makabuo ang mga pamilya ng matatag at pangmatagalang kabuhayan.',
    mobileCta: 'Tuklasin ang aming mga programa'
  }
};

// Program page text for a program ('arts' | 'bigbets' | 'community'), in a
// language's copy. Programs without their own page fall back to Arts and Culture.
window.programPage = (t, prog) => ({
  bigbets: { title: t.p2, body: t.bbBody },
  community: { title: t.p3, body: t.cdBody }
}[prog] || { title: t.title, body: t.body });
