document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#new-post-form');
    
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const title = document.querySelector('#post-title').value.trim();
            const content = document.querySelector('#post-content').value.trim();

            if (title && content) {
                const response = await fetch('/api/posts', {
                    method: 'POST',
                    body: JSON.stringify({ title, content }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    document.location.replace('/');
                } else {
                    alert('Failed to create post');
                }
            }
        });
    }
});
