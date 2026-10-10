export interface FeedEvent {
    id: string;
    cover: any;
    host: string;
    hostColor: string;
    hostKind: 'none' | 'studio' | 'avatars' | 'book' | 'ai' | 'gear' | 'white';
    title: string;
    time: string;
    location?: string;
    inlineMeta?: boolean;
    price?: string;
    dateLabel: string;
    dayLabel: string;
}
export interface PopularEvent {
    id: string;
    cover: any;
    host: string;
    hostMark: 'lantern' | 'commons' | 'coffee';
    title: string;
    time: string;
    badge?: {
        label: string;
        color: string;
        bg: string;
    };
}
export interface Category {
    id: string;
    label: string;
    icon: string;
}
export const feedEvents: FeedEvent[] = [
    {
        id: 'popup',
        cover: require('../assets/covers/cover-popup.jpg'),
        host: 'Studio Kiln',
        hostColor: '#E8E8EC',
        hostKind: 'studio',
        title: 'Back-to-School Maker Pop-up',
        time: '11:30 AM',
        location: 'Fountain Plaza',
        dateLabel: 'September 22',
        dayLabel: 'Tuesday',
    },
    {
        id: 'warehouse',
        cover: require('../assets/covers/cover-warehouse.jpg'),
        host: 'Mira Holt, Theo Park, Lena Ruiz',
        hostColor: '#E8D5F0',
        hostKind: 'avatars',
        title: 'Joint Warehouse Sale — Paper Lantern × Juniper Goods × Small Batch Pickles',
        time: '11:00 AM',
        location: 'Dockside Hall',
        inlineMeta: true,
        dateLabel: 'September 26',
        dayLabel: 'Saturday',
    },
    {
        id: 'readpark',
        cover: require('../assets/covers/cover-readpark.jpg'),
        host: 'Read in the Park Club 📚',
        hostColor: '#5C8A2B',
        hostKind: 'book',
        title: 'Read in the Park — Sunday Pages 📚',
        time: '3:00 PM',
        location: 'Linden Park West',
        inlineMeta: true,
        dateLabel: 'September 26',
        dayLabel: 'Saturday',
    },
    {
        id: 'games',
        cover: require('../assets/covers/cover-games.jpg'),
        host: 'Tabletop Guild',
        hostColor: '#E8E8EC',
        hostKind: 'none',
        title: 'Board Game Market: Fall 2026',
        time: '10:00 AM',
        location: 'Guildhouse',
        inlineMeta: true,
        dateLabel: 'September 27',
        dayLabel: 'Sunday',
    },
    {
        id: 'summit',
        cover: require('../assets/covers/cover-summit.jpg'),
        host: 'The Builders Circle',
        hostColor: '#7B2FF7',
        hostKind: 'ai',
        title: 'Agents in Practice: Builders Summit 2026',
        time: '12:00 PM',
        location: 'Harbor Science Center',
        dateLabel: 'September 28',
        dayLabel: 'Monday',
    },
    {
        id: 'tools',
        cover: require('../assets/covers/cover-tools.jpg'),
        host: 'Open Tools Collective',
        hostColor: '#4A6B8A',
        hostKind: 'gear',
        title: 'Open Tools Day',
        time: '12:00 PM',
        location: '135 Lantern Ave',
        inlineMeta: true,
        dateLabel: 'October 9',
        dayLabel: 'Friday',
    },
    {
        id: 'choir',
        cover: require('../assets/covers/cover-choir.jpg'),
        host: 'Harbor Voices, June Morrow',
        hostColor: '#E8E8EC',
        hostKind: 'white',
        title: 'Harbor Voices Choir: Second Anniversary Concert',
        time: '4:00 PM',
        location: 'Valley Hall',
        price: '$29.99',
        dateLabel: 'October 11',
        dayLabel: 'Sunday',
    },
    {
        id: 'swap',
        cover: require('../assets/covers/cover-swap.jpg'),
        host: 'Neighborhood Swap Club',
        hostColor: '#E8D5F0',
        hostKind: 'none',
        title: 'Plant & Book Swap',
        time: '1:00 PM',
        location: 'Maple Commons',
        inlineMeta: true,
        dateLabel: 'October 12',
        dayLabel: 'Monday',
    },
];
export const popularEvents: PopularEvent[] = [
    {
        id: 'lanterns',
        cover: require('../assets/covers/cover-lanterns.jpg'),
        host: 'Lantern Market',
        hostMark: 'lantern',
        title: 'Night Market Social',
        time: 'Tomorrow, 11:00 AM',
    },
    {
        id: 'fireside',
        cover: require('../assets/covers/cover-fireside.jpg'),
        host: 'Commons Lab',
        hostMark: 'commons',
        title: 'Fireside: How Robots Learn to Drive',
        time: 'Mon 2:30 PM',
        badge: { label: 'Near Capacity', color: '#D89D1F', bg: '#F5E6C7' },
    },
    {
        id: 'codecoffee',
        cover: require('../assets/covers/cover-codecoffee.jpg'),
        host: 'Code & Coffee',
        hostMark: 'coffee',
        title: 'Code & Coffee Community Meetup',
        time: 'Tue 6:00 PM',
        badge: { label: 'Waitlist Open', color: '#3780ED', bg: '#D4E3FB' },
    },
];
export const categories = [
    { id: 'family', label: 'Family', icon: 'family', track: -0.65 },
    { id: 'tech', label: 'Tech', icon: 'tech', track: -0.50 },
    { id: 'food', label: 'Food & Drink', icon: 'food', track: -0.68 },
    { id: 'music', label: 'Music', icon: 'books', track: -0.50 },
    { id: 'books', label: 'Books', icon: 'books', track: -1.13 },
    { id: 'games', label: 'Games', icon: 'games', track: -1.21 },
    { id: 'ai', label: 'AI', icon: 'ai', track: -0.25 },
    { id: 'running', label: 'Running', icon: 'running', track: -0.45 },
];
export interface DetailEvent {
    cover: any;
    title: string;
    host: string;
    hostMark: any;
    time: string;
    location: string;
    address: string;
    speaker: string;
    speakerRole: string;
    going: number;
    goingNames: string;
    about: string;
}
const mark = {
    studio: require('../assets/hosts/mark-studio.png'),
    builders: require('../assets/hosts/mark-builders.png'),
    readpark: require('../assets/hosts/mark-readpark.png'),
    lantern: require('../assets/hosts/mark-lantern.png'),
    commons: require('../assets/hosts/mark-commons.png'),
    codecoffee: require('../assets/hosts/mark-codecoffee.png'),
};
export const detailEvents: Record<string, DetailEvent> = {
    popup: { cover: require('../assets/covers/cover-popup.jpg'), title: 'Back-to-School Maker Pop-up', host: 'Studio Kiln', hostMark: mark.studio, time: 'Tue, Sep 22, 11:30 AM – 3:00 PM', location: 'Fountain Plaza', address: '12 Fountain Plaza, Riverside District', speaker: 'Ada Brooks', speakerRole: 'Founder at Studio Kiln', going: 86, goingNames: 'Nina Ford, Sam Ortiz, Priya Nair, Leo Grant, and 82 more', about: 'Twenty local makers set up stalls for the new term: ceramics, notebooks, tote bags and desk plants, plus a free glaze-your-own-mug table for kids.' },
    warehouse: { cover: require('../assets/covers/cover-warehouse.jpg'), title: 'Joint Warehouse Sale — Paper Lantern × Juniper Goods', host: 'Mira Holt, Theo Park, Lena Ruiz', hostMark: mark.studio, time: 'Sat, Sep 26, 11:00 AM – 5:00 PM', location: 'Dockside Hall', address: '400 Pier Road, Harbor Quarter', speaker: 'Mira Holt', speakerRole: 'Co-host, Paper Lantern', going: 214, goingNames: 'Owen Hale, Rosa Lind, Kai Moreno, Elle Shaw, and 210 more', about: 'Three small studios clear their shelves for one day only: stationery seconds, ceramics samples and jars of house pickles at warehouse prices.' },
    readpark: { cover: require('../assets/covers/cover-readpark.jpg'), title: 'Read in the Park — Sunday Pages', host: 'Read in the Park Club', hostMark: mark.readpark, time: 'Sat, Sep 26, 3:00 – 5:00 PM', location: 'Linden Park West', address: 'Linden Park, west lawn by the oak', speaker: 'Tess Whitman', speakerRole: 'Club organiser', going: 47, goingNames: 'Iris Cole, Ben Adler, Maya Fox, Jon Reyes, and 43 more', about: 'Bring a book and a blanket. Two quiet hours of reading together, then an optional swap circle for anything you have finished.' },
    games: { cover: require('../assets/covers/cover-games.jpg'), title: 'Board Game Market: Fall 2026', host: 'Tabletop Guild', hostMark: mark.builders, time: 'Sun, Sep 27, 10:00 AM – 4:00 PM', location: 'Guildhouse', address: '9 Tinker Lane, Old Town', speaker: 'Ravi Sol', speakerRole: 'Guild steward', going: 132, goingNames: 'Zoe Marsh, Eli Brandt, Ana Vega, Tom Pike, and 128 more', about: 'Buy, sell and trade second-hand board games, try new releases at the demo tables, and join the afternoon speed-learning tournament.' },
    summit: { cover: require('../assets/covers/cover-summit-large.jpg'), title: 'Agents in Practice: Builders Summit 2026', host: 'The Builders Circle', hostMark: mark.builders, time: 'Mon, Sep 28, 12:00 – 4:00 PM', location: 'Harbor Science Center', address: '1 Observatory Way, Harbor Quarter', speaker: 'Dana Whitfield', speakerRole: 'Program lead, The Builders Circle', going: 538, goingNames: 'Lena Brooks, Omar Haddad, Grace Liu, Felix Stone, and 534 more', about: 'An afternoon for people shipping AI agents: short talks on evaluation and reliability, a fireside on product design, and hands-on demo tables.' },
    tools: { cover: require('../assets/covers/cover-tools.jpg'), title: 'Open Tools Day', host: 'Open Tools Collective', hostMark: mark.commons, time: 'Fri, Oct 9, 12:00 – 6:00 PM', location: '135 Lantern Ave', address: '135 Lantern Ave, Mill District', speaker: 'Jules Arden', speakerRole: 'Maintainer, Open Tools Collective', going: 96, goingNames: 'Hana Ito, Mark Bell, Sofia Ruiz, Ian Cross, and 92 more', about: 'Lightning talks from open-source maintainers, a pairing room for first contributions, and a long table of free pizza.' },
    choir: { cover: require('../assets/covers/cover-choir.jpg'), title: 'Harbor Voices Choir: Second Anniversary Concert', host: 'Harbor Voices, June Morrow', hostMark: mark.lantern, time: 'Sun, Oct 11, 4:00 – 6:00 PM', location: 'Valley Hall', address: '28 Valley Road, Hillside', speaker: 'June Morrow', speakerRole: 'Music director, Harbor Voices', going: 164, goingNames: 'Ruth Evans, Caleb North, Mia Torres, Abe Lowe, and 160 more', about: 'Two years of singing together, celebrated in one concert: folk arrangements, a cappella pop and a sing-along finale.' },
    swap: { cover: require('../assets/covers/cover-swap.jpg'), title: 'Plant & Book Swap', host: 'Neighborhood Swap Club', hostMark: mark.readpark, time: 'Mon, Oct 12, 1:00 – 3:00 PM', location: 'Maple Commons', address: 'Maple Commons community room', speaker: 'Pia Lund', speakerRole: 'Swap club volunteer', going: 58, goingNames: 'Noah Kerr, Lily Chase, Ezra Bloom, Jade Price, and 54 more', about: 'Bring cuttings, seedlings or books you are done with and leave with something new. Tea and labels provided.' },
    lanterns: { cover: require('../assets/covers/cover-lanterns.jpg'), title: 'Night Market Social', host: 'Lantern Market', hostMark: mark.lantern, time: 'Tomorrow, 11:00 AM – 9:00 PM', location: 'Lantern Square', address: 'Lantern Square, Market Street', speaker: 'Rin Okafor', speakerRole: 'Market organiser', going: 312, goingNames: 'Cara Doyle, Ivan Petrov, May Lin, Hugo Laurent, and 308 more', about: 'Street food stalls, live music and hand-made goods under strings of paper lanterns, from late morning until the last stall closes.' },
    fireside: { cover: require('../assets/covers/cover-fireside.jpg'), title: 'Fireside: How Robots Learn to Drive', host: 'Commons Lab', hostMark: mark.commons, time: 'Mon, 2:30 – 4:00 PM', location: 'Commons Lab', address: '77 Foundry Street, Mill District', speaker: 'Theo Marlow', speakerRole: 'Robotics researcher', going: 241, goingNames: 'Asha Patel, Lars Berg, Nora Quinn, Dev Shah, and 237 more', about: 'A relaxed conversation about simulation, sensors and the long tail of real roads, followed by open questions from the room.' },
    codecoffee: { cover: require('../assets/covers/cover-codecoffee.jpg'), title: 'Code & Coffee Community Meetup', host: 'Code & Coffee', hostMark: mark.codecoffee, time: 'Tue, 6:00 – 8:00 PM', location: 'The Roastery', address: '5 Bean Street, Old Town', speaker: 'Sasha Kim', speakerRole: 'Community host, Code & Coffee', going: 180, goingNames: 'Will Hart, Ines Duarte, Kofi Mensah, Ella Ward, and 176 more', about: 'Bring a laptop and whatever you are building. Short show-and-tell at seven, otherwise just good coffee and better company.' },
};
export const detailEvent = detailEvents.summit;
