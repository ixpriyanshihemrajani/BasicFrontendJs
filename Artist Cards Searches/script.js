const artistsData = [
    {
"name": "Dua Lipa",
"birthYear": 1995,
"country": "United Kingdom",
"genres": ["Pop", "Dance"],
"hitSongs": ["Don't Start Now", "New Rules"],
"description": "Dua Lipa is known for her captivating pop and dance music."
},
{
"name": "Katy Perry",
"birthYear": 1984,
"country": "United States",
"genres": ["Pop"],
"hitSongs": ["Firework", "Roar"],
"description": "Katy Perry is a global pop sensation with numerous chart-topping hits."
},
{
"name": "Billie Eilish",
"birthYear": 2001,
"country": "United States",
"genres": ["Pop", "Alternative"],
"hitSongs": ["Bad Guy", "Ocean Eyes"],
"description": "Billie Eilish is a young and influential artist known for her unique style and impactful lyrics."
},
{
"name": "Taylor Swift",
"birthYear": 1989,
"country": "United States",
"genres": ["Pop", "Country"],
"hitSongs": ["Love Story", "Shake It Off"],
"description": "Taylor Swift is a versatile artist with a blend of pop and country influences."
},
{
"name": "Ariana Grande",
"birthYear": 1993,
"country": "United States",
"genres": ["Pop", "R&B"],
"hitSongs": ["Thank U, Next", "7 Rings"],
"description": "Ariana Grande is recognized for her powerful voice and a mix of pop and R&B styles."
},
{
"name": "Lana Del Rey",
"birthYear": 1985,
"country": "United States",
"genres": ["Indie Pop", "Alternative"],
"hitSongs": ["Summertime Sadness", "Video Games"],
"description": "Lana Del Rey is known for her dreamy and cinematic approach to music."
}
    ];

    function generateArtistCards(artists) {
        const container = document.getElementById("artistContainer");
        container.innerHTML = "";

        artists.forEach(artist => {
            const card = document.createElement("div");
            card.classList.add("artist-card");

            const name = document.createElement("div");
            name.textContent = artist.name;
            name.classList.add("artist-name");

            const info = document.createElement("div");
            info.textContent = `${artist.birthYear} | ${artist.country}`;
            info.classList.add("artist-info");

            const genres = document.createElement("div");
            genres.textContent = `Genres: ${artist.genres.join(", ")}`;
            genres.classList.add("artist-genres");

            const hitSongs = document.createElement("div");
            hitSongs.textContent = `Hit Songs: ${artist.hitSongs.join(", ")}`;
            hitSongs.classList.add("artist-info");

            const description = document.createElement("div");
            description.textContent = artist.description;
            description.classList.add("artist-info");

            card.appendChild(name);
            card.appendChild(info);
            card.appendChild(genres);
            card.appendChild(hitSongs);
            card.appendChild(description);

            container.appendChild(card);
        });
    }

    function filterArtists(searchTerm) {
        const filteredArtists = artistsData.filter(artist =>
            artist.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        generateArtistCards(filteredArtists);
    }

    generateArtistCards(artistsData);

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
        filterArtists(searchInput.value);
    });