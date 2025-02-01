const searchInput = document.getElementById('search-input') as HTMLInputElement;
const resultArtist = document.getElementById("result-artist") as HTMLElement;
const resultPlaylist = document.getElementById('result-playlists') as HTMLElement;

type Artist = {
    name: string;
    urlImg: string;
};

async function requestApi(searchTerm: string): Promise<void> {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar os artistas');
        }
        const result: Artist[] = await response.json();
        displayResults(result);
    } catch (error) {
        console.error(error);
    }
}

function displayResults(result: Artist[]): void {
    resultPlaylist.classList.add("hidden");
    const artistName = document.getElementById('artist-name') as HTMLElement;
    const artistImage = document.getElementById('artist-img') as HTMLImageElement;

    if (result.length > 0) {
        const artist = result[0];
        artistName.innerText = artist.name;
        artistImage.src = artist.urlImg;
        resultArtist.classList.remove('hidden');
    }
}

document.addEventListener('input', function () {
    if (searchInput) {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') {
            resultPlaylist.classList.add('hidden');
            resultArtist.classList.add('hidden');
        } else {
            requestApi(searchTerm);
        }
    }
});
