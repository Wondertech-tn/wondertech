
    const starsContainer = document.getElementById('stars');
    const submitRatingButton = document.getElementById('submit-rating');
    const ratingList = document.getElementById('rating-list');
    const userNameInput = document.getElementById('user-name');

    let selectedRating = 0;

    // Generate 5 stars using star.gif
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('img');
        star.src = 'star.gif'; // Use star.gif
        star.alt = 'Star';
        star.style.width = '40px';
        star.style.height = '40px';
        star.style.cursor = 'pointer';
        star.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
        star.style.opacity = '0.5'; // Default star opacity

        // Hover effect
        star.addEventListener('mouseover', () => {
            for (let j = 0; j < i; j++) {
                starsContainer.children[j].style.opacity = '1'; // Highlight stars
                starsContainer.children[j].style.transform = 'scale(1.2)'; // Scale up
            }
        });

        // Reset hover effect
        star.addEventListener('mouseout', () => {
            for (let j = 0; j < 5; j++) {
                starsContainer.children[j].style.opacity = j < selectedRating ? '1' : '0.5'; // Keep selected stars highlighted
                starsContainer.children[j].style.transform = 'scale(1)'; // Reset scale
            }
        });

        // Click to select rating
        star.addEventListener('click', () => {
            selectedRating = i;
            for (let j = 0; j < 5; j++) {
                starsContainer.children[j].style.opacity = j < selectedRating ? '1' : '0.5'; // Highlight selected stars
            }
        });

        starsContainer.appendChild(star);
    }

    // Save ratings to localStorage
    function saveRatings(ratings) {
        localStorage.setItem('ratings', JSON.stringify(ratings));
    }

    // Load ratings from localStorage
    function loadRatings() {
        return JSON.parse(localStorage.getItem('ratings')) || [];
    }

    // Render ratings
    function renderRatings() {
        const ratings = loadRatings();
        ratingList.innerHTML = ''; // Clear the rating list

        if (ratings.length === 0) {
            ratingList.innerHTML = '<p style="text-align: center; color: #888;">Aucune évaluation pour le moment. Soyez le premier à évaluer !</p>';
            return;
        }

        ratings.forEach((rating, index) => {
            const ratingElement = document.createElement('div');
            ratingElement.style.marginBottom = '1rem';
            ratingElement.style.padding = '0.8rem';
            ratingElement.style.backgroundColor = '#fff';
            ratingElement.style.border = '1px solid #ddd';
            ratingElement.style.borderRadius = '5px';
            ratingElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            ratingElement.innerHTML = `
                <p style="margin: 0; font-size: 1rem; color: #333;">Note: ${'<img src="star.gif" alt="Star" style="width: 20px; height: 20px;">'.repeat(rating.rating)} (${rating.rating} étoile(s))</p>
                <small style="color: #888;">Posté par ${rating.name || 'Anonyme'} le ${rating.date} à ${rating.time}</small>
                ${rating.name === userNameInput.value ? `<button class="delete-rating" data-index="${index}" style="margin-top: 0.5rem; padding: 0.3rem 0.6rem; background-color: #dc3545; color: #fff; border: none; border-radius: 3px; cursor: pointer;">Supprimer</button>` : ''}
            `;
            ratingList.appendChild(ratingElement);
        });

        // Add delete functionality
        document.querySelectorAll('.delete-rating').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                const ratings = loadRatings();
                ratings.splice(index, 1); // Remove the rating
                saveRatings(ratings); // Save updated ratings
                renderRatings(); // Re-render the ratings
            });
        });
    }

    // Submit the rating
    submitRatingButton.addEventListener('click', () => {
        if (selectedRating === 0) {
            alert('Veuillez sélectionner une note avant de soumettre.');
            return;
        }

        const userName = userNameInput.value.trim();
        if (!userName) {
            alert('Veuillez entrer votre nom avant de soumettre.');
            return;
        }

        const ratings = loadRatings();

        // Check if the user has already rated
        const existingRatingIndex = ratings.findIndex(rating => rating.name === userName);
        if (existingRatingIndex !== -1) {
            ratings[existingRatingIndex].rating = selectedRating; // Update the rating
            ratings[existingRatingIndex].date = new Date().toLocaleDateString();
            ratings[existingRatingIndex].time = new Date().toLocaleTimeString();
        } else {
            // Create a new rating object
            const rating = {
                rating: selectedRating,
                name: userName,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            };
            ratings.push(rating); // Add the new rating
        }

        saveRatings(ratings); // Save to localStorage
        renderRatings(); // Update the UI

        // Reset stars and name input
        selectedRating = 0;
        userNameInput.value = '';
        for (let j = 0; j < 5; j++) {
            starsContainer.children[j].style.opacity = '0.5'; // Reset stars
        }
    });

    // Initialize the section
    document.addEventListener('DOMContentLoaded', () => {
        renderRatings(); // Render existing ratings
        updateViewCounter(); // Update the view counter
    });

    // Update the view counter
    function updateViewCounter() {
        let viewCount = localStorage.getItem('viewCount');
        if (!viewCount) {
            viewCount = 0;
        }
        viewCount = parseInt(viewCount) + 1;
        localStorage.setItem('viewCount', viewCount);
        document.getElementById('view-count').textContent = viewCount;
    }