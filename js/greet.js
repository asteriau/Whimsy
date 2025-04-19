const userName = 'Laura'; 

function updateClockAndGreeting() {
    const greetingElement = document.getElementById('greeting');
    const clockElement = document.getElementById('clock');
    
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const formattedTime = formatTime(hours, minutes);

    const { greeting, emoji } = getGreetingAndEmoji(hours);

    greetingElement.textContent = `${greeting}, ${userName}! ${emoji}`;
    clockElement.textContent = `It is currently ${formattedTime}.`;  
}

function formatTime(hours, minutes) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const twelveHour = hours % 12 || 12; 
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; 
    return `${twelveHour}:${formattedMinutes} ${period}`;
}

function getGreetingAndEmoji(hours) {
    if (hours < 12) {
        return { greeting: 'Good morning', emoji: '🌅' }; 
    } else if (hours < 18) {
        return { greeting: 'Good afternoon', emoji: '☀️' }; 
    } else {
        return { greeting: 'Good evening', emoji: '🌙' }; 
    }
}

setInterval(updateClockAndGreeting, 60000);

updateClockAndGreeting();