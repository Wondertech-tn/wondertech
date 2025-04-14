 const now = new Date();
                const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
                const hour = now.getHours();
                const minute = now.getMinutes();
                const isOpen = (day >= 1 && day <= 5 && (hour >= 8 && (hour < 17 || (hour === 17 && minute <= 30)))) ||
                       (day === 6 && (hour >= 8 && (hour < 13 || (hour === 13 && minute === 0))));
                document.getElementById('notification').textContent = isOpen ? "Nous sommes actuellement ouverts." : "Nous sommes actuellement fermés.";
const toggleButton = document.getElementById('toggle-calendar');
const calendarContent = document.getElementById('calendar-content');
toggleButton.addEventListener('click', () => {
    if (calendarContent.style.display === 'none') {
        calendarContent.style.display = 'flex';
        toggleButton.textContent = 'Cacher le calendrier';
    } else {
        calendarContent.style.display = 'none';
        toggleButton.textContent = 'Afficher le calendrier';
    }
});