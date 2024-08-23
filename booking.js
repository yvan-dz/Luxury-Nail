document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar-container');

    // Initialiser FullCalendar avec des options personnalisées
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        themeSystem: 'standard',
        events: [
            { title: 'Available', start: '2024-09-29', end: '2024-09-30' },
            { title: 'Available', start: '2024-10-03' }
        ],
        eventBackgroundColor: '#ff6b81',
        eventBorderColor: '#ff4757',
        eventTextColor: '#fff',
        dayMaxEventRows: 3, // Limite le nombre d'événements visibles avant d'afficher "+n more"
        views: {
            dayGridMonth: {
                titleFormat: { year: 'numeric', month: 'long' }
            }
        }
    });

    calendar.render();

    // Fonction pour générer un lien Google Calendar
    document.getElementById('bookingForm').addEventListener('submit', function(event) {
        generateGoogleCalendarLink(event);
    });

    function generateGoogleCalendarLink(event) {
        event.preventDefault();

        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const date = document.getElementById('selectedDateInput').value;
        const time = document.getElementById('selectedTimeInput').value;
        const service = document.getElementById('selectedService').value;

        // Combiner la date et l'heure en une chaîne datetime
        const startDateTime = new Date(`${date}T${time}`).toISOString();
        const endDateTime = new Date(new Date(`${date}T${time}`).getTime() + 60 * 60 * 1000).toISOString(); // Durée de 1 heure

        // Générer un lien Google Calendar
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(service)}&dates=${startDateTime.replace(/-|:|\.\d+/g, '')}/${endDateTime.replace(/-|:|\.\d+/g, '')}&details=Client: ${encodeURIComponent(name)} (${encodeURIComponent(email)})&sf=true&output=xml`;

        // Rediriger l'utilisateur vers la page de création d'événement Google Calendar
        window.open(googleCalendarUrl, '_blank');
    }
});
