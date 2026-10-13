// Add new poses with the same "character-slug-01.png" naming rule.
// Character and stamp ids must use lowercase letters, numbers, and hyphens.
(() => {
    const folders = {
        ofutonNanyo: 'assets/character-stamps/おふとんなんよ',
        zeyoZeyo: 'assets/character-stamps/ぜよぜよ',
        keAndSaposan: 'assets/character-stamps/けーとさぽさん'
    };
    const series = (folder, slug, count, labelJa, labelEn) => Array.from({ length: count }, (_, index) => {
        const number = String(index + 1).padStart(2, '0');
        return {
            id: `pose-${number}`,
            file: `${folder}/${slug}-${number}.png`,
            labelJa: `${labelJa} ${number}`,
            labelEn: `${labelEn} ${number}`
        };
    });

    window.NININ_CHARACTER_STAMP_SERIES = [
        {
            id: 'ofuton-nanyo-series',
            labelJa: 'おふとんなんよ',
            labelEn: 'Ofuton Nanyo',
            characters: [
                { id: 'ofuton-nanyo', labelJa: 'おふとんなんよ', labelEn: 'Ofuton Nanyo', stamps: series(folders.ofutonNanyo, 'ofuton-nanyo', 11, 'おふとんなんよ', 'Ofuton Nanyo') },
                { id: 'azuki', labelJa: 'あずきさん', labelEn: 'Azuki-san', stamps: series(folders.ofutonNanyo, 'azuki', 7, 'あずきさん', 'Azuki-san') },
                { id: 'kesepasa', labelJa: 'ケセパサ', labelEn: 'Kesepasa', stamps: series(folders.ofutonNanyo, 'kesepasa', 7, 'ケセパサ', 'Kesepasa') },
                { id: 'towelket-c', labelJa: 'タオル・けっと・シー', labelEn: 'Towel Ketto C', stamps: series(folders.ofutonNanyo, 'towelket-c', 8, 'タオル・けっと・シー', 'Towel Ketto C') },
                { id: 'makkura-san', labelJa: 'まっくらさん', labelEn: 'Makkura-san', stamps: series(folders.ofutonNanyo, 'makkura-san', 8, 'まっくらさん', 'Makkura-san') },
                { id: 'mofukichi', labelJa: 'もふきち', labelEn: 'Mofukichi', stamps: series(folders.ofutonNanyo, 'mofukichi', 9, 'もふきち', 'Mofukichi') }
            ]
        },
        {
            id: 'zeyozeyo-series',
            labelJa: 'ぜよぜよ',
            labelEn: 'Zeyo Zeyo',
            characters: [
                { id: 'zeyozeyo', labelJa: 'ぜよぜよ', labelEn: 'Zeyo Zeyo', stamps: series(folders.zeyoZeyo, 'zeyozeyo', 32, 'ぜよぜよ', 'Zeyo Zeyo') },
                { id: 'desuwan', labelJa: 'ですわん', labelEn: 'Desuwan', stamps: series(folders.zeyoZeyo, 'desuwan', 7, 'ですわん', 'Desuwan') }
            ]
        },
        {
            id: 'ke-and-saposan-series',
            labelJa: 'けーとさぽさん',
            labelEn: 'Ke & Sapo-san',
            characters: [
                { id: 'ke', labelJa: 'けー', labelEn: 'Ke', stamps: series(folders.keAndSaposan, 'ke', 12, 'けー', 'Ke') },
                { id: 'saposan', labelJa: 'さぽさん', labelEn: 'Sapo-san', stamps: series(folders.keAndSaposan, 'saposan', 4, 'さぽさん', 'Sapo-san') }
            ]
        }
    ];
})();
