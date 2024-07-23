document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const span = document.getElementsByClassName('close')[0];

    const artTitle = document.getElementById('art-title');
    const artImage = document.getElementById('art-image');
    const artInfo = document.getElementById('art-info');

    // Data for artworks
    const artworks = [
        {
            title: "Mother with Child on Her Knee",
            image_id: "mother-with-child-on-her-knee",
            api_id: 12857
        },
        {
            title: "Seated Man and Swaddled Baby",
            image_id: "seated-man-and-swaddled-baby",
            api_id: 113574
        },
        {
            title: "Baby in a High Chair",
            image_id: "baby-in-a-high-chair",
            api_id: 156990
        },
        {
            title: "Mary Reynolds with Her Cats",
            image_id: "mary-reynolds-with-her-cats",
            api_id: 5388
        }
    ];

    artworks.forEach(artwork => {
        const img = document.createElement('img');
        img.src = `images/${artwork.image_id}.jpg`;
        img.alt = artwork.title;
        img.addEventListener('click', () => {
            fetchArtworkData(artwork);
        });
        gallery.appendChild(img);
    });

    function fetchArtworkData(artwork) {
        fetch(`https://api.artic.edu/api/v1/artworks/${artwork.api_id}`)
            .then(response => response.json())
            .then(data => {
                const artData = data.data;
                openModal(artwork, artData);
            })
            .catch(error => console.error('Error fetching artwork data:', error));
    }

    function openModal(artwork, artData) {
        modal.style.display = "block";
        artTitle.textContent = artwork.title;
        artImage.src = `images/${artwork.image_id}.jpg`;
        artImage.alt = artwork.title;
        artInfo.innerHTML = `
            <p><strong>Artist:</strong> ${artData.artist_title || 'Unknown'}</p>
            <p><strong>Year:</strong> ${artData.date_display || 'Unknown'}</p>
            <p><strong>Medium:</strong> ${artData.medium_display || 'Unknown'}</p>
            <p>${artData.thumbnail.alt_text || 'No additional information available.'}</p>
        `;
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});


