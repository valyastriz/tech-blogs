document.querySelector('#comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-content').value.trim();
    const post_id = document.querySelector('#post-id').value.trim(); // Assuming you have a hidden input with the post ID

    if (content && post_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content, post_id }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload(); // Reload the page to show the new comment
        } else {
            alert('Failed to add comment.');
        }
    }
});
