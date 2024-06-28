export async function SendToLine(message: string) {
    const token = 'xc9Od32gX4RgWZxtuWncJ4ucyrkFyk7Xylif0TmygGA';

    const paras = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
        },
        body: new URLSearchParams({
        'message': message
        })
    };

    const response = await fetch('https://notify-api.line.me/api/notify', paras);

    if (!response.ok) {
        console.error('Error sending message to LINE:', response.statusText);
    } else {
        console.log('Message sent to LINE successfully.');
    }
}
