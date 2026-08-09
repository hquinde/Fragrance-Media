// Real data from an actual posted batch (carousel 1, "5 Fragrances That Make
// You the Main Character") — not fabricated placeholders. Images in
// design/samples/ are the real Fragrantica bottle/card images + Pinterest
// title background for these 5 fragrances.
//
// This is a full carousel's worth of real entries so a future template that
// shows 2 or 3 fragrances per slide has enough real data to pull from —
// design/preview.js only ever renders the title slide + ONE content slide,
// not all 5, since slides of the same type are structurally identical.

module.exports = {
  title: '5 Fragrances That Make You the Main Character',
  titleImg: 'title.jpg',
  slides: [
    {
      num: 1,
      name: 'Eros',
      brand: 'Versace',
      gender: 'men',
      copy: 'The scent equivalent of walking in slow motion. Mint, apple, and tonka bean that make an entrance before you say a word.',
      bottle: 's1-bottle.jpg',
      card: 's1-card.jpg',
    },
    {
      num: 2,
      name: 'Olympéa',
      brand: 'Rabanne',
      gender: 'women',
      copy: 'Salted vanilla and ginger lily — sweet enough to be dangerous. This is the fragrance people ask about twice.',
      bottle: 's2-bottle.jpg',
      card: 's2-card.jpg',
    },
    {
      num: 3,
      name: 'Libre',
      brand: 'Yves Saint Laurent',
      gender: 'women',
      copy: 'Lavender meets orange blossom in a fragrance that refuses to blend in. Freedom, bottled.',
      bottle: 's3-bottle.jpg',
      card: 's3-card.jpg',
    },
    {
      num: 4,
      name: 'Sauvage Elixir',
      brand: 'Dior',
      gender: 'men',
      copy: 'Cinnamon and lavender turned all the way up. Not for blending into the background — for owning it.',
      bottle: 's4-bottle.jpg',
      card: 's4-card.jpg',
    },
    {
      num: 5,
      name: 'Baccarat Rouge 540',
      brand: 'Maison Francis Kurkdjian',
      gender: 'unisex',
      copy: 'The fragrance that started a thousand "what are you wearing" texts. Saffron and amberwood, unmistakable.',
      bottle: 's5-bottle.jpg',
      card: 's5-card.jpg',
    },
  ],
};
