// English copy shared by the kiosk (index.html) and the phone page (mobile.html).

window.COPY = {
  en: {
    title: 'Arts and Culture',
    projects: 'Programs', partOf: 'Partner with us', more: 'More pillars',
    partner: 'Partner with us',
    take: 'Take this with you', takeBody: 'Scan to open this page on your phone.',
    startOver: 'Start over', allPrograms: 'All pillars', tap: 'Tap to explore',
    p1: 'Leadership Development', p2: 'Education', p3: 'Community Development', p0: 'Arts and Culture', homeTitle: 'Building thriving communities toward shared prosperity', homeLine: 'We envision communities where people are productive, creative, self-reliant, and proud to be Filipino.', touch: 'Touch to explore', touchHint: 'Or tap anywhere on the screen to begin.', about: 'About us', home: 'Home', tagPillar: 'Strategic pillar', tagBet: 'Big Bets', supportedBy: 'Supported by', ccvName: 'Corporate Citizenship & Volunteerism', ccvLine: 'Enabling an active and purpose-driven workforce with volunteer opportunities to do good', pSupport: 'Supporting our pillars', featured: 'Featured', visit: 'Visiting today? Please check in at the front desk.', still: 'Still there?', stillBody: 'This screen will start over for the next visitor in', keep: 'Keep exploring', allTitle: 'Our pillars', pillarsIntro: 'We believe in contributing to the nation’s development goals by adapting to the evolving needs of stakeholders so we can remain relevant and responsive. Through our programs, we affirm our commitment to aligning, giving focus, and making an impact in the lives of people in our conglomerate, communities, and country.', hint: 'Swipe or tap a card', learnMore: 'Learn more',
    d0: 'We provide platforms that spotlight history, contemporary, and fine art forms in state-of-the-art museum and library venues. By curating physical and digital collections that celebrate the joy and wonder of Philippine arts and culture, we hope to contribute to conversations about evolving Filipino identities and agency throughout history.', d1: 'We aspire for Filipinos to emerge as world-class leaders who elevate standards within their chosen fields and inspire future generations.', d2: 'Bridging the learning gap through competent and confident teachers supporting students at grade-level.', d3: 'We support families as they raise themselves from poverty to the middle class. To achieve this goal, we work with partners to take systemic approaches to fulfilling basic needs—enhancing nutrition, health, education, WASH (water, sanitation, and hygiene), electrification, and connectivity within our target communities.',
thanks: 'Thank you for visiting', fromLobby: 'Saved from the Ayala Foundation lobby',
    // One real figure per pillar, shown on the home photos (slide order).
    homeStats: [
      { value: '98%', label: 'advancement rate (employment, further studies or entrepreneurial activity)', source: 'El Nido, Palawan' },
      { value: '92,833', label: 'Total visitors in 2025', source: 'Ayala Museum' },
      { value: '2,018', label: 'Total number of Ayala Young Leaders alumni nationwide', source: 'Ayala Young Leaders' },
      { value: '13.8', label: 'percentage points by which 9 treatment schools outperformed control schools', source: 'CENTEX Digital Education' }
    ],
        mobileCta: 'Explore our pillars'
  }
};

// Pillar page text for a pillar ('arts' | 'leadership' | 'bigbets' | 'community'),
// in the copy.
// tag: the pillar's place in the foundation's diagram, as on the carousel.
// body: the same description as the pillar's card (d0-d3).
window.pillarPage = (t, pillar) => ({
  leadership: { title: t.p1, body: t.d1, tag: t.tagPillar },
  bigbets: { title: t.p2, body: t.d2, tag: t.tagBet },
  community: { title: t.p3, body: t.d3, tag: t.tagPillar }
}[pillar] || { title: t.title, body: t.d0, tag: t.tagPillar });
