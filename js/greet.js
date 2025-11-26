const userName = 'Laura'; 

// Main function to update the greeting and clock
function updateClockAndGreeting() {
    const greetingElement = document.getElementById('greeting');
    const clockElement = document.getElementById('clock');
    
    const now = new Date();
    const { hours, minutes } = getTime(now); // Deconstructed to get hours and minutes
    const formattedTime = formatTime(hours, minutes); // Format the time
    
    const greeting = getGreeting(hours); // Get appropriate greeting

    greetingElement.textContent = `${greeting}, ${userName}!`;
    clockElement.textContent = `It is currently ${formattedTime}.`;  
}

// Function to extract hours and minutes from a Date object
function getTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return { hours, minutes };
}

// Function to format time to a 12-hour format with AM/PM
function formatTime(hours, minutes) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const twelveHour = hours % 12 || 12; // Convert 24-hour time to 12-hour time
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Ensure minutes are always 2 digits
    return `${twelveHour}:${formattedMinutes} ${period}`;
}

// Function to determine the greeting message based on the time of day
function getGreeting(hours) {
    if (hours < 12) {
        return 'Good morning'; 
    } else if (hours < 18) {
        return 'Good afternoon'; 
    } else {
        return 'Good evening'; 
    }
}

// Set interval to update greeting and clock every minute
setInterval(updateClockAndGreeting, 60000);

// Initial call to display greeting and clock immediately
updateClockAndGreeting();
