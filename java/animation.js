 const loadingScreen = document.getElementById('loading-screen');
        const header = document.querySelector('header');

        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                header.style.display = 'block';
            }, 3000);
        });
        // this is for the loading screen animation
        