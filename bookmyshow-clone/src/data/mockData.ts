export interface Movie {
    id: string;
    title: string;
    genre: string;
    rating: string;
    votes: string;
    image: string;
    backdrop: string;
    description: string;
    language: string;
    duration: string;
}

export interface Showtime {
    id: string;
    time: string;
    availability: 'Available' | 'Fast Filling' | 'Almost Full';
    price: number;
    category: 'Gold' | 'Platinum' | 'Lounger';
}

export interface Theater {
    id: string;
    name: string;
    location: string;
    distance: string;
    showtimes: Showtime[];
}

export const movies: Movie[] = [
    {
        id: '1',
        title: 'Animal',
        genre: 'Action, Crime, Drama',
        rating: '8.4',
        votes: '250K',
        image: '/assets/animal.jpg',
        backdrop: 'https://images.indianexpress.com/2023/11/animal-ranbir-kapoor.jpg',
        description: 'A father-son bond set against the backdrop of extreme underworld resistance which leads to the protagonist becoming a psychopath.',
        language: 'Hindi',
        duration: '3h 21m'
    },
    {
        id: '2',
        title: 'Sam Bahadur',
        genre: 'Biography, Drama, War',
        rating: '9.1',
        votes: '120K',
        image: '/assets/sam_bahadur.jpg',
        backdrop: 'https://stat5.bollywoodhungama.in/wp-content/uploads/2023/10/Sam-Bahadur-3.jpg',
        description: 'Based on the life of Sam Manekshaw, who was the Chief of the Army Staff of the Indian Army during the Indo-Pakistani War of 1971.',
        language: 'Hindi',
        duration: '2h 30m'
    },
    {
        id: '3',
        title: 'Salaar',
        genre: 'Action, Thriller',
        rating: '8.2',
        votes: '500K',
        image: '/assets/salaar.jpg',
        backdrop: 'https://stat5.bollywoodhungama.in/wp-content/uploads/2023/12/Salaar-1-2.jpg',
        description: 'A gang leader tries to keep a promise made to his dying friend and faces off against other criminal gangs.',
        language: 'Telugu',
        duration: '2h 55m'
    },
    {
        id: '4',
        title: 'Dunki',
        genre: 'Comedy, Drama',
        rating: '7.8',
        votes: '180K',
        image: '/assets/dunki.jpg',
        backdrop: 'https://stat5.bollywoodhungama.in/wp-content/uploads/2023/12/Dunki-10.jpg',
        description: 'Four friends from a village in Punjab share a common dream: to go to England. Their problem is that they have neither the visa nor the ticket.',
        language: 'Hindi',
        duration: '2h 41m'
    },
    {
        id: '5',
        title: 'They Call Him OG',
        genre: 'Action, Thriller',
        rating: '9.5',
        votes: '10K',
        image: '/assets/og.png',
        backdrop: 'https://images.indianexpress.com/2023/09/OG-teaser.jpg',
        description: 'A powerful action drama featuring the return of the Original Gangster.',
        language: 'Telugu',
        duration: '2h 45m'
    }
];

export const allTheaters: Theater[] = [
    {
        id: 't1',
        name: 'PVR: ICON, Nexus Mall, Kormanagala',
        location: 'Kormanagala',
        distance: '2.5 km',
        showtimes: [
            { id: 's1', time: '10:30 AM', availability: 'Available', price: 250, category: 'Gold' },
            { id: 's2', time: '01:45 PM', availability: 'Fast Filling', price: 350, category: 'Platinum' },
            { id: 's3', time: '05:00 PM', availability: 'Available', price: 250, category: 'Gold' },
            { id: 's4', time: '09:30 PM', availability: 'Almost Full', price: 450, category: 'Lounger' }
        ]
    },
    {
        id: 't2',
        name: 'Inox: Lido Mall, MG Road',
        location: 'MG Road',
        distance: '4.8 km',
        showtimes: [
            { id: 's5', time: '11:00 AM', availability: 'Available', price: 200, category: 'Gold' },
            { id: 's6', time: '04:30 PM', availability: 'Available', price: 200, category: 'Gold' },
            { id: 's7', time: '10:00 PM', availability: 'Almost Full', price: 400, category: 'Lounger' }
        ]
    },
    {
        id: 't3',
        name: 'Cinepolis: Royal Meenakshi Mall',
        location: 'Bannerghatta Road',
        distance: '7.2 km',
        showtimes: [
            { id: 's8', time: '10:00 AM', availability: 'Available', price: 180, category: 'Gold' },
            { id: 's9', time: '01:15 PM', availability: 'Available', price: 250, category: 'Platinum' },
            { id: 's10', time: '08:45 PM', availability: 'Fast Filling', price: 350, category: 'Lounger' }
        ]
    },
    {
        id: 't4',
        name: 'UrVashi Digital 4K Cinema: Lalbagh',
        location: 'Lalbagh',
        distance: '3.1 km',
        showtimes: [
            { id: 's11', time: '11:30 AM', availability: 'Available', price: 150, category: 'Gold' },
            { id: 's12', time: '02:45 PM', availability: 'Fast Filling', price: 250, category: 'Platinum' },
            { id: 's13', time: '06:00 PM', availability: 'Available', price: 150, category: 'Gold' },
            { id: 's14', time: '09:15 PM', availability: 'Almost Full', price: 350, category: 'Lounger' }
        ]
    },
    {
        id: 't5',
        name: 'Gopalan Cinemas: Arcade Mall',
        location: 'Mysore Road',
        distance: '10.5 km',
        showtimes: [
            { id: 's15', time: '10:45 AM', availability: 'Available', price: 120, category: 'Gold' },
            { id: 's16', time: '01:30 PM', availability: 'Available', price: 180, category: 'Platinum' },
            { id: 's17', time: '07:30 PM', availability: 'Fast Filling', price: 250, category: 'Lounger' }
        ]
    },
    {
        id: 't6',
        name: 'Balaji Digital 4K Cinema: Tavarekere',
        location: 'Tavarekere',
        distance: '1.2 km',
        showtimes: [
            { id: 's18', time: '10:00 AM', availability: 'Available', price: 100, category: 'Gold' },
            { id: 's19', time: '01:15 PM', availability: 'Available', price: 150, category: 'Platinum' },
            { id: 's20', time: '04:30 PM', availability: 'Available', price: 100, category: 'Gold' },
            { id: 's21', time: '07:45 PM', availability: 'Fast Filling', price: 200, category: 'Lounger' }
        ]
    },
    {
        id: 't7',
        name: 'Sandhya Digital 4K Cinema: Madivala',
        location: 'Madivala',
        distance: '2.8 km',
        showtimes: [
            { id: 's22', time: '11:00 AM', availability: 'Available', price: 120, category: 'Gold' },
            { id: 's23', time: '02:30 PM', availability: 'Available', price: 120, category: 'Gold' },
            { id: 's24', time: '06:15 PM', availability: 'Fast Filling', price: 120, category: 'Gold' },
            { id: 's25', time: '10:00 PM', availability: 'Almost Full', price: 250, category: 'Lounger' }
        ]
    },
    {
        id: 't8',
        name: 'Cauvery Digital 4K Cinema: Sankey Road',
        location: 'Sankey Road',
        distance: '5.5 km',
        showtimes: [
            { id: 's26', time: '10:30 AM', availability: 'Available', price: 150, category: 'Gold' },
            { id: 's27', time: '01:45 PM', availability: 'Available', price: 220, category: 'Platinum' },
            { id: 's28', time: '05:00 PM', availability: 'Available', price: 150, category: 'Gold' },
            { id: 's29', time: '09:30 PM', availability: 'Almost Full', price: 320, category: 'Lounger' }
        ]
    },
    {
        id: 't9',
        name: 'PVR: Forum Mall, Koramangala',
        location: 'Koramangala',
        distance: '1.5 km',
        showtimes: [
            { id: 's30', time: '09:45 AM', availability: 'Available', price: 200, category: 'Gold' },
            { id: 's31', time: '01:00 PM', availability: 'Available', price: 300, category: 'Platinum' },
            { id: 's32', time: '04:15 PM', availability: 'Available', price: 200, category: 'Gold' },
            { id: 's33', time: '08:30 PM', availability: 'Fast Filling', price: 400, category: 'Lounger' }
        ]
    },
    {
        id: 't10',
        name: 'The Cinema: GT World Mall',
        location: 'Magadi Road',
        distance: '12.2 km',
        showtimes: [
            { id: 's34', time: '10:00 AM', availability: 'Available', price: 130, category: 'Gold' },
            { id: 's35', time: '01:15 PM', availability: 'Available', price: 200, category: 'Platinum' },
            { id: 's36', time: '04:30 PM', availability: 'Available', price: 130, category: 'Gold' },
            { id: 's37', time: '07:45 PM', availability: 'Almost Full', price: 300, category: 'Lounger' }
        ]
    }
];

// Map theater IDs to movies to give each movie unique theaters
export const movieTheaterMap: Record<string, string[]> = {
    '1': ['t1', 't2', 't4', 't9'], // Animal
    '2': ['t3', 't5', 't7', 't10'], // Sam Bahadur
    '3': ['t1', 't4', 't6', 't8'], // Salaar
    '4': ['t2', 't3', 't9', 't10'], // Dunki
    '5': ['t1', 't6', 't8', 't10'] // They Call Him OG
};

export const getTheatersForMovie = (movieId: string): Theater[] => {
    const theaterIds = movieTheaterMap[movieId] || [];
    return allTheaters.filter(t => theaterIds.includes(t.id));
};
