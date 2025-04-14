 const ratingList = document.getElementById('rating-list');
    const allRatings = Array.from(ratingList.children);
    const initialDisplayCount = 3;

    // Show only the first 3 ratings by default
    allRatings.forEach((rating, index) => {
        rating.style.display = index < initialDisplayCount ? 'block' : 'none';
    });
    document.getElementById('show-all-ratings').addEventListener('click', function() {
        const isShowingAll = allRatings.some(rating => rating.style.display === 'none');
        allRatings.forEach(rating => {
            rating.style.display = isShowingAll ? 'block' : 'none';
        });
        this.textContent = isShowingAll ? 'Hide all comments' : 'Show all comments';
    });