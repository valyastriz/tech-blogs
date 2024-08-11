document.querySelector('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim(); // Change 'username' to 'email'
    const password = document.querySelector('#password').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ name, password }), // Ensure 'email' is sent
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in.');
        }
    }
});
