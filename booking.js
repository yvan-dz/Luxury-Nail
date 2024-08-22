document.addEventListener('DOMContentLoaded', function () {
    let calendar;

    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [],
    });
    calendar.render();

    document.getElementById('bookNowBtn').addEventListener('click', function() {
        const selectedDate = document.getElementById('selectedDateInput').value;

        if (selectedDate) {
            fetch('/api/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date: selectedDate }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    calendar.addEvent({
                        title: 'Réservé',
                        start: selectedDate,
                        backgroundColor: 'blue',
                        borderColor: 'blue',
                        textColor: 'white'
                    });
                    alert(`La date du ${selectedDate} a été réservée.`);
                } else {
                    alert('Cette date est déjà réservée.');
                }
            });
        } else {
            alert('Veuillez sélectionner une date avant de réserver.');
        }
    });
});
