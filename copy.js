// English and Filipino copy shared by the kiosk (index.html) and the phone page (mobile.html).

// Languages offered on screen. With one language the English/Filipino switch is
// hidden. Filipino text stays in this file and programs.js: add 'fil' back to
// turn the switch on again.
window.LANGUAGES = ['en'];

window.COPY = {
  en: {
    title: 'Arts and Culture',
    projects: 'Programs', partOf: 'Partner with us', more: 'More pillars',
    partner: 'Partner with us',
    take: 'Take this with you', takeBody: 'Scan to open this page on your phone.',
    startOver: 'Start over', allPrograms: 'All pillars', tap: 'Tap to explore',
    p1: 'Leadership Development', p2: 'Education', p3: 'Community Development', p0: 'Arts and Culture', homeTitle: 'Building thriving communities toward shared prosperity', homeLine: 'We envision communities where people are productive, creative, self-reliant, and proud to be Filipino.', touch: 'Touch to explore', touchHint: 'Or tap anywhere on the screen to begin.', about: 'About us', home: 'Home', tagPillar: 'Strategic pillar', tagBet: 'Big Bets', supportedBy: 'Supported by', ccvName: 'Corporate Citizenship & Volunteerism', ccvLine: 'Enabling an active and purpose-driven workforce with volunteer opportunities to do good', pSupport: 'Supporting our pillars', featured: 'Featured', visit: 'Visiting today? Please check in at the front desk.', still: 'Still there?', stillBody: 'This screen will start over for the next visitor in', keep: 'Keep exploring', allTitle: 'Our pillars', pillarsIntro: 'We believe in contributing to the nation’s development goals by adapting to the evolving needs of stakeholders so we can remain relevant and responsive. Through our programs, we affirm our commitment to aligning, giving focus, and making an impact in the lives of people in our conglomerate, communities, and country.', hint: 'Swipe or tap a card', learnMore: 'Learn more',
    d0: 'We provide platforms that spotlight history, contemporary, and fine art forms in state-of-the-art museum and library venues. By curating physical and digital collections that celebrate the joy and wonder of Philippine arts and culture, we hope to contribute to conversations about evolving Filipino identities and agency throughout history.', d1: 'We aspire for Filipinos to emerge as world-class leaders who elevate standards within their chosen fields and inspire future generations.', d2: 'Bridging the learning gap through competent and confident teachers supporting students at grade-level.', d3: 'We support families as they raise themselves from poverty to the middle class. To achieve this goal, we work with partners to take systemic approaches to fulfilling basic needs—enhancing nutrition, health, education, WASH (water, sanitation, and hygiene), electrification, and connectivity within our target communities.',
    mobileCta: 'Explore our pillars'
  },
  fil: {
    title: 'Sining at Kultura',
    projects: 'Mga Programa', partOf: 'Makipagtulungan sa amin', more: 'Iba pang haligi',
    partner: 'Makipagtulungan sa amin',
    take: 'Dalhin mo ito', takeBody: 'I-scan para buksan ang pahinang ito sa iyong telepono.',
    startOver: 'Magsimula muli', allPrograms: 'Lahat ng haligi', tap: 'Pindutin para tuklasin',
    p1: 'Pagpapaunlad ng Pamumuno', p2: 'Edukasyon', p3: 'Pagpapaunlad ng Komunidad', p0: 'Sining at Kultura', homeTitle: 'Bumubuo ng masisiglang komunidad tungo sa sama-samang kasaganaan', homeLine: 'Hangad namin ang mga komunidad kung saan ang mga tao ay produktibo, malikhain, may sariling kakayahan, at ipinagmamalaki ang pagiging Pilipino.', touch: 'Pindutin para tuklasin', touchHint: 'O pindutin kahit saan sa screen para magsimula.', about: 'Tungkol sa amin', home: 'Simula', tagPillar: 'Pangunahing haligi', tagBet: 'Big Bets', supportedBy: 'Sinusuportahan ng', ccvName: 'Corporate Citizenship & Volunteerism', ccvLine: 'Pinasisigla ang aktibo at may layuning workforce sa pamamagitan ng mga pagkakataong mag-volunteer para sa kabutihan', pSupport: 'Sumusuporta sa aming mga haligi', featured: 'Tampok', visit: 'Bibisita ngayon? Mag-check in po sa front desk.', still: 'Nandiyan ka pa ba?', stillBody: 'Magsisimula muli ang screen para sa susunod na bisita sa loob ng', keep: 'Magpatuloy', allTitle: 'Aming mga haligi', pillarsIntro: 'Naniniwala kaming makapag-ambag sa mga layunin ng bansa para sa kaunlaran sa pamamagitan ng pag-angkop sa nagbabagong pangangailangan ng mga stakeholder upang manatiling makabuluhan at tumutugon. Sa aming mga programa, pinagtitibay namin ang aming pangako na umayon, magtuon, at magkaroon ng epekto sa buhay ng mga tao sa aming conglomerate, mga komunidad, at bansa.', hint: 'I-swipe o pindutin ang card', learnMore: 'Alamin pa',
    d0: 'Nagbibigay kami ng mga plataporma na nagtatampok sa kasaysayan, kontemporaryo, at pinong sining sa mga makabagong museo at aklatan. Sa pag-curate ng pisikal at digital na koleksyon na nagdiriwang sa sining at kultura ng Pilipinas, layunin naming makapag-ambag sa usapan tungkol sa umuusbong na pagkakakilanlan at kakayahan ng Pilipino sa kasaysayan.', d1: 'Hangad naming umusbong ang mga Pilipino bilang mga lider na pandaigdigan ang husay, na nagpapataas ng pamantayan sa kanilang larangan at nagbibigay-inspirasyon sa susunod na henerasyon.', d2: 'Pinaliliit ang agwat sa pagkatuto sa pamamagitan ng mahuhusay at may kumpiyansang guro na tumutulong sa mga mag-aaral na makaabot sa antas ng kanilang baitang.', d3: 'Sinusuportahan namin ang mga pamilya habang iniaangat nila ang kanilang sarili mula sa kahirapan tungo sa gitnang uri. Para rito, nakikipagtulungan kami sa mga katuwang sa sistematikong pagtugon sa mga pangunahing pangangailangan—pagpapabuti ng nutrisyon, kalusugan, edukasyon, WASH (tubig, sanitasyon, at kalinisan), kuryente, at koneksyon sa aming mga komunidad.',
    mobileCta: 'Tuklasin ang aming mga haligi'
  }
};

// Pillar page text for a pillar ('arts' | 'leadership' | 'bigbets' | 'community'),
// in a language's copy.
// tag: the pillar's place in the foundation's diagram, as on the carousel.
// body: the same description as the pillar's card (d0-d3).
window.pillarPage = (t, pillar) => ({
  leadership: { title: t.p1, body: t.d1, tag: t.tagPillar },
  bigbets: { title: t.p2, body: t.d2, tag: t.tagBet },
  community: { title: t.p3, body: t.d3, tag: t.tagPillar }
}[pillar] || { title: t.title, body: t.d0, tag: t.tagPillar });
