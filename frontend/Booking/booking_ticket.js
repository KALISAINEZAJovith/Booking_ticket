document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const languageSelect = document.getElementById('language');
    const eventSelect = document.getElementById('event');
    const timeSelect = document.getElementById('time');
    const dateInput = document.getElementById('date');
    const ticketsSelect = document.getElementById('tickets');
    const selectSeatsBtn = document.getElementById('select-seats-btn');
    const seatSelection = document.getElementById('seat-selection');
    const bookingForm = document.getElementById('booking-form');
    const seatsContainer = document.getElementById('seats-container');
    const seatsToSelect = document.getElementById('seats-to-select');
    const continueToPaymentBtn = document.getElementById('continue-to-payment-btn');
    const paymentForm = document.getElementById('payment-form');
    const confirmPaymentBtn = document.getElementById('confirm-payment-btn');
    const confirmation = document.getElementById('confirmation');
    const newBookingBtn = document.getElementById('new-booking-btn');
    
    // Summary elements
    const summaryEvent = document.getElementById('summary-event');
    const summaryDate = document.getElementById('summary-date');
    const summaryTime = document.getElementById('summary-time');
    const summarySeats = document.getElementById('summary-seats');
    const summaryPrice = document.getElementById('summary-price');
    const bookingReference = document.getElementById('booking-reference');
    
    // Event data - this would come from a backend in a real system
    const eventData = {
        concert: {
            name: {
                en: 'Music Concert',
                fr: 'Concert de Musique'
            },
            price: 75,
            times: ['18:00', '20:30']
        },
        movie: {
            name: {
                en: 'Movie Screening',
                fr: 'Projection de Film'
            },
            price: 15,
            times: ['14:00', '17:30', '20:00', '22:30']
        },
        vvp: {
            name: {
                en: 'VVP',
                fr: 'VVP'
            },
            price: 60,
            times: ['15:00', '19:30']
        },
        theater: {
            name: {
                en: 'Theater Play',
                fr: 'Pièce de Théâtre'
            },
            price: 45,
            times: ['14:00', '19:00']
        }
    };
    
    // Language translations
    const translations = {
        en: {
            mainTitle: 'Ticket Booking System',
            selectTicketsTitle: 'Select Your Tickets',
            eventLabel: 'Event',
            selectEventOption: 'Select an Event',
            concertOption: 'Music Concert',
            movieOption: 'Movie Screening',
            vvpOption: 'VVP',
            theaterOption: 'Theater Play',
            dateLabel: 'Date',
            timeLabel: 'Time',
            selectTimeOption: 'Select a Time',
            ticketsLabel: 'Number of Tickets',
            selectSeatsButton: 'Select Seats',
            selectSeatsTitle: 'Select Your Seats',
            seatsInstruction: 'Please select',
            seatsSuffix: 'seats:',
            summaryTitle: 'Booking Summary',
            summaryEventLabel: 'Event:',
            summaryDateLabel: 'Date:',
            summaryTimeLabel: 'Time:',
            summarySeatsLabel: 'Seats:',
            summaryPriceLabel: 'Total: $',
            continueToPaymentButton: 'Continue to Payment',
            paymentTitle: 'Payment Details',
            nameLabel: 'Full Name',
            emailLabel: 'Email',
            cardNumberLabel: 'Card Number',
            expiryLabel: 'Expiry Date',
            cvvLabel: 'CVV',
            confirmPaymentButton: 'Confirm Payment',
            confirmationTitle: 'Booking Confirmed!',
            confirmationMessage: 'Thank you for your booking. An email with your ticket details has been sent to your email address.',
            bookingReferenceLabel: 'Booking Reference:',
            newBookingButton: 'Make Another Booking',
            validationMessage: 'Please fill in all fields',
            seatLimitMessage: 'You can only select',
            selectAllSeatsMessage: 'Please select',
            fillPaymentDetailsMessage: 'Please fill in all payment details'
        },
        fr: {
            mainTitle: 'Système de Réservation de Billets',
            selectTicketsTitle: 'Sélectionnez Vos Billets',
            eventLabel: 'Événement',
            selectEventOption: 'Sélectionnez un Événement',
            concertOption: 'Concert de Musique',
            movieOption: 'Projection de Film',
            vvpOption: 'VVP',
            theaterOption: 'Pièce de Théâtre',
            dateLabel: 'Date',
            timeLabel: 'Heure',
            selectTimeOption: 'Sélectionnez une Heure',
            ticketsLabel: 'Nombre de Billets',
            selectSeatsButton: 'Sélectionner les Sièges',
            selectSeatsTitle: 'Sélectionnez Vos Sièges',
            seatsInstruction: 'Veuillez sélectionner',
            seatsSuffix: 'sièges:',
            summaryTitle: 'Résumé de la Réservation',
            summaryEventLabel: 'Événement:',
            summaryDateLabel: 'Date:',
            summaryTimeLabel: 'Heure:',
            summarySeatsLabel: 'Sièges:',
            summaryPriceLabel: 'Total: €',
            continueToPaymentButton: 'Continuer vers le Paiement',
            paymentTitle: 'Détails du Paiement',
            nameLabel: 'Nom Complet',
            emailLabel: 'Email',
            cardNumberLabel: 'Numéro de Carte',
            expiryLabel: 'Date d\'Expiration',
            cvvLabel: 'CVV',                                                                                                                                                                                                                                                                               
            confirmPaymentButton: 'Confirmer le Paiement',
            confirmationTitle: 'Réservation Confirmée!',
            confirmationMessage: 'Merci pour votre réservation. Un email avec les détails de votre billet a été envoyé à votre adresse email.',
            bookingReferenceLabel: 'Référence de Réservation:',
            newBookingButton: 'Faire une Autre Réservation',
            validationMessage: 'Veuillez remplir tous les champs',
            seatLimitMessage: 'Vous ne pouvez sélectionner que',
            selectAllSeatsMessage: 'Veuillez sélectionner',
            fillPaymentDetailsMessage: 'Veuillez remplir tous les détails de paiement'
        }
    };
    
    // State variables
    let selectedSeats = [];
    let numberOfTickets = 1;
    let eventPrice = 0;
    let currentLanguage = 'en';
    
    // Set minimum date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    
    // Event listeners
    languageSelect.addEventListener('change', changeLanguage);
    eventSelect.addEventListener('change', updateTimes);
    selectSeatsBtn.addEventListener('click', showSeatSelection);
    continueToPaymentBtn.addEventListener('click', showPaymentForm);
    confirmPaymentBtn.addEventListener('click', confirmBooking);
    newBookingBtn.addEventListener('click', resetBooking);
    
    // Change language function
    function changeLanguage() {
        currentLanguage = languageSelect.value;
        updateTexts();
        updateEventOptions();
        if (eventSelect.value) {
            updateTimes();
        }
    }
    
    // Update all text elements based on selected language
    function updateTexts() {
        const texts = translations[currentLanguage];
        
        // Update main titles
        document.getElementById('main-title').textContent = texts.mainTitle;
        document.getElementById('select-tickets-title').textContent = texts.selectTicketsTitle;
        document.getElementById('select-seats-title').textContent = texts.selectSeatsTitle;
        document.getElementById('summary-title').textContent = texts.summaryTitle;
        document.getElementById('payment-title').textContent = texts.paymentTitle;
        document.getElementById('confirmation-title').textContent = texts.confirmationTitle;
        
        // Update labels
        document.getElementById('event-label').textContent = texts.eventLabel;
        document.getElementById('date-label').textContent = texts.dateLabel;
        document.getElementById('time-label').textContent = texts.timeLabel;
        document.getElementById('tickets-label').textContent = texts.ticketsLabel;
        document.getElementById('name-label').textContent = texts.nameLabel;
        document.getElementById('email-label').textContent = texts.emailLabel;
        document.getElementById('card-number-label').textContent = texts.cardNumberLabel;
        document.getElementById('expiry-label').textContent = texts.expiryLabel;
        document.getElementById('cvv-label').textContent = texts.cvvLabel;
        
        // Update summary labels
        document.getElementById('summary-event-label').textContent = texts.summaryEventLabel + ' ';
        document.getElementById('summary-date-label').textContent = texts.summaryDateLabel + ' ';
        document.getElementById('summary-time-label').textContent = texts.summaryTimeLabel + ' ';
        document.getElementById('summary-seats-label').textContent = texts.summarySeatsLabel + ' ';
        document.getElementById('summary-price-label').textContent = texts.summaryPriceLabel;
        
        // Update buttons
        selectSeatsBtn.textContent = texts.selectSeatsButton;
        continueToPaymentBtn.textContent = texts.continueToPaymentButton;
        confirmPaymentBtn.textContent = texts.confirmPaymentButton;
        newBookingBtn.textContent = texts.newBookingButton;
        
        // Update other texts
        document.getElementById('seats-instruction').textContent = `${texts.seatsInstruction} ${seatsToSelect.textContent} ${texts.seatsSuffix}`;
        document.getElementById('confirmation-message').textContent = texts.confirmationMessage;
        document.getElementById('booking-reference-label').textContent = `${texts.bookingReferenceLabel} `;
        
        // Update select options
        document.getElementById('select-event-option').textContent = texts.selectEventOption;
        document.getElementById('select-time-option').textContent = texts.selectTimeOption;
        document.getElementById('concert-option').textContent = texts.concertOption;
        document.getElementById('movie-option').textContent = texts.movieOption;
        document.getElementById('sports-option').textContent = texts.sportsOption;
        document.getElementById('theater-option').textContent = texts.theaterOption;
    }
    
    // Update event options based on language
    function updateEventOptions() {
        document.getElementById('concert-option').textContent = translations[currentLanguage].concertOption;
        document.getElementById('movie-option').textContent = translations[currentLanguage].movieOption;
        document.getElementById('sports-option').textContent = translations[currentLanguage].sportsOption;
        document.getElementById('theater-option').textContent = translations[currentLanguage].theaterOption;
    }
    
    // Update times based on event selection
    function updateTimes() {
        const selectedEvent = eventSelect.value;
        timeSelect.innerHTML = `<option value="">${translations[currentLanguage].selectTimeOption}</option>`;
        
        if (selectedEvent && eventData[selectedEvent]) {
            eventData[selectedEvent].times.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            });
        }
    }
    
    // Show seat selection screen
    function showSeatSelection() {
        // Validate form
        if (!eventSelect.value || !dateInput.value || !timeSelect.value) {
            alert(translations[currentLanguage].validationMessage);
            return;
        }
        
        // Update state
        numberOfTickets = parseInt(ticketsSelect.value);
        seatsToSelect.textContent = numberOfTickets;
        eventPrice = eventData[eventSelect.value].price;
        
        // Generate seats
        generateSeats();
        
        // Hide booking form and show seat selection
        document.querySelector('.ticket-selection').classList.add('hidden');
        seatSelection.classList.remove('hidden');
        
        // Update seats instruction text
        document.getElementById('seats-instruction').textContent = `${translations[currentLanguage].seatsInstruction} ${numberOfTickets} ${translations[currentLanguage].seatsSuffix}`;
        
        // Update summary
        summaryEvent.textContent = eventData[eventSelect.value].name[currentLanguage];
        summaryDate.textContent = formatDate(dateInput.value);
        summaryTime.textContent = timeSelect.value;
    }
    
    // Generate seats
    function generateSeats() {
        seatsContainer.innerHTML = '';
        selectedSeats = [];
        
        // Generate 40 seats (5 rows x 8 seats)
        for (let i = 1; i <= 40; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            
            // Generate some random booked seats
            const isBooked = Math.random() < 0.3;
            if (isBooked) {
                seat.classList.add('booked');
            }
            
            // Create seat label (A1, A2, etc.)
            const row = String.fromCharCode(64 + Math.ceil(i / 8));
            const seatNum = i % 8 === 0 ? 8 : i % 8;
            seat.textContent = `${row}${seatNum}`;
            seat.dataset.seatId = `${row}${seatNum}`;
            
            // Add click event for seat selection
            seat.addEventListener('click', function() {
                if (seat.classList.contains('booked')) return;
                
                if (seat.classList.contains('selected')) {
                    // Deselect
                    seat.classList.remove('selected');
                    selectedSeats = selectedSeats.filter(s => s !== seat.dataset.seatId);
                } else {
                    // Select - but only if we haven't reached the limit
                    if (selectedSeats.length < numberOfTickets) {
                        seat.classList.add('selected');
                        selectedSeats.push(seat.dataset.seatId);
                    } else {
                        alert(`${translations[currentLanguage].seatLimitMessage} ${numberOfTickets} ${translations[currentLanguage].seatsSuffix.toLowerCase()}`);
                    }
                }
                
                // Update summary
                updateSeatsSummary();
            });
            
            seatsContainer.appendChild(seat);
        }
    }
    
    // Update seats summary
    function updateSeatsSummary() {
        summarySeats.textContent = selectedSeats.join(', ');
        summaryPrice.textContent = (selectedSeats.length * eventPrice).toFixed(2);
        
        // Enable/disable continue button
        continueToPaymentBtn.disabled = selectedSeats.length !== numberOfTickets;
    }
    
    // Show payment form
    function showPaymentForm() {
        if (selectedSeats.length !== numberOfTickets) {
            alert(`${translations[currentLanguage].selectAllSeatsMessage} ${numberOfTickets} ${translations[currentLanguage].seatsSuffix.toLowerCase()}`);
            return;
        }
        
        seatSelection.classList.add('hidden');
        paymentForm.classList.remove('hidden');
    }
    
    // Confirm booking
    function confirmBooking(e) {
        e.preventDefault();
        
        // Validate form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!name || !email || !cardNumber || !expiry || !cvv) {
            alert(translations[currentLanguage].fillPaymentDetailsMessage);
            return;
        }
        
        // Generate a booking reference
        const bookingRef = generateBookingReference();
        bookingReference.textContent = bookingRef;
        
        // Show confirmation
        paymentForm.classList.add('hidden');
        confirmation.classList.remove('hidden');
    }
    
    // Reset booking process
    function resetBooking() {
        // Reset forms
        document.querySelector('.ticket-selection').classList.remove('hidden');
        seatSelection.classList.add('hidden');
        paymentForm.classList.add('hidden');
        confirmation.classList.add('hidden');
        
        // Clear form values
        eventSelect.value = '';
        dateInput.value = '';
        timeSelect.innerHTML = `<option value="">${translations[currentLanguage].selectTimeOption}</option>`;
        ticketsSelect.value = '1';
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('card-number').value = '';
        document.getElementById('expiry').value = '';
        document.getElementById('cvv').value = '';
        
        // Reset state
        selectedSeats = [];
    }
    
    // Helper functions
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(currentLanguage, options);
    }
    
    function generateBookingReference() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let ref = '';
        for (let i = 0; i < 8; i++) {
            ref += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return ref;
    }
    
    // Initialize the UI with default language
    updateTexts();
});

async function createEvent(name, age) {
    const response = await fetch('localhost:3000/api/events', {
        body: JSON.stringify({ name, age }),
    })
    const data =  await response.json();
    console.log(data);
}