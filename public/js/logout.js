console.log('Login script loaded'); // 

document.querySelector('#logout').addEventListener('click', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log in.');
    }
});
