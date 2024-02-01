const duaLipaInfo = {
    "artist": "Dua Lipa",
    "birthDate": "August 22, 1995",
    "birthPlace": "London, England",
    "nationality": "British",
    "genres": ["Pop", "Dance", "R&B"],
    "albums": [
        {
            "title": "Dua Lipa",
            "releaseYear": 2017,
            "singles": ["New Rules", "Be the One", "IDGAF"]
        },
        {
            "title": "Future Nostalgia",
            "releaseYear": 2020,
            "singles": ["Don't Start Now", "Physical", "Levitating"]
        }
    ],
    "awards": {
        "grammys": 2,
        "britAwards": 3,
        "mtvAwards": 1
    },
    "socialMedia": {
        "instagram": "@dualipa",
        "twitter": "@DUALIPA"
    }
};


function renderDuaLipaInfo(info) {
    const container = document.getElementById("duaLipaInfoContainer");

    const h1 = document.createElement("h1");
    h1.innerHTML = info.artist;
    container.appendChild(h1);

    const p1 = document.createElement("p");
    p1.innerHTML = `Birth Date: ${info.birthDate}`;
    container.appendChild(p1);

    const p2 = document.createElement("p");
    p2.innerHTML = `Birth Place: ${info.birthPlace}`;
    container.appendChild(p2);

    const p3 = document.createElement("p");
    p3.innerHTML = `Nationality: ${info.nationality}`;
    container.appendChild(p3);

    const genresList = document.createElement("ul");
    info.genres.forEach(genre => {
        const li = document.createElement("li");
        li.innerHTML = genre;
        genresList.appendChild(li);
    });
    container.appendChild(genresList);

    

    const albumsList = document.createElement("ul");
    info.albums.forEach(album => {
        const li = document.createElement("li");
        li.innerHTML = `${album.title} (${album.releaseYear}) - Singles: ${album.singles.join(", ")}`;
        albumsList.appendChild(li);
    });
    container.appendChild(albumsList);

    const awardsList = document.createElement("ul");
    for (const award in info.awards) {
        const li = document.createElement("li");
        li.innerHTML = `${award}: ${info.awards[award]}`;
        awardsList.appendChild(li);
    }
    container.appendChild(awardsList);

    const socialMediaList = document.createElement("ul");
    for (const platform in info.socialMedia) {
        const li = document.createElement("li");
        li.innerHTML = `${platform}: ${info.socialMedia[platform]}`;
        socialMediaList.appendChild(li);
    }
    container.appendChild(socialMediaList);
}


renderDuaLipaInfo(duaLipaInfo);