const toggleMapButton = document.getElementById('toggle-map');
const mapContainer = document.getElementById('map-container');
toggleMapButton.addEventListener('click', () => {
    if (mapContainer.style.display === 'none') {
        mapContainer.style.display = 'block';
        toggleMapButton.textContent = 'Cacher la carte';
    } else {
        mapContainer.style.display = 'none';
        toggleMapButton.textContent = 'Afficher la carte';
    }
});