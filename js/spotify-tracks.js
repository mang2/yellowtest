// BLUE FOR US 앨범의 트랙 정보
const albumTracks = [
    { name: "BOAT", duration: "3:02" }
];

function displayTracks() {
    const trackList = document.querySelector('.track-list ol');
    if (!trackList) return;

    trackList.innerHTML = albumTracks.map((track, index) => {
        return `
            <li>
                <span class="track-title">${track.name}</span>
                <span class="track-duration">${track.duration}</span>
            </li>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', displayTracks); 