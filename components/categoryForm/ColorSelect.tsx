// todo use as a template for the color select component
// https://medium.com/designly/using-enums-to-make-jsx-select-inputs-more-type-safe-0d61c4ca9f08

// 'use client';

// import React, { useState } from 'react';

// enum E_PreciousStones {
//  diamond = 'Diamond',
//  ruby = 'Ruby',
//  sapphire = 'Sapphire',
//  emerald = 'Emerald',
//  amethyst = 'Amethyst',
//  opal = 'Opal',
//  topaz = 'Topaz',
//  aquamarine = 'Aquamarine',
//  garnet = 'Garnet',
//  peridot = 'Peridot',
//  turquoise = 'Turquoise',
//  tanzanite = 'Tanzanite',
//  citrine = 'Citrine',
//  alexandrite = 'Alexandrite',
//  spinel = 'Spinel',
//  tourmaline = 'Tourmaline',
// }

// type T_PreciousStones = keyof typeof E_PreciousStones;

// export default function Select() {
//  const [selectedStone, setSelectedStone] = useState<T_PreciousStones | undefined>(undefined);

//  const stones: T_PreciousStones[] = Object.keys(E_PreciousStones) as T_PreciousStones[];

//  return (
//   <div className="flex flex-col gap-6">
//    <label htmlFor="stone" className="label">
//     Select a precious stone:
//    </label>
//    <select
//     id="stone"
//     className="select select-bordered"
//     value={selectedStone}
//     onChange={e => setSelectedStone(e.target.value as T_PreciousStones)}
//    >
//     <option value="">Select a stone</option>
//     {stones.map(stone => (
//      <option key={stone} value={stone}>
//       {E_PreciousStones[stone]}
//      </option>
//     ))}
//    </select>
//    {selectedStone && (
//     <div className="alert alert-info">
//      You have selected <strong>{E_PreciousStones[selectedStone]}</strong>.
//     </div>
//    )}
//   </div>
//  );
// }