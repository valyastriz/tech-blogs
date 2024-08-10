
module.exports = {
    truncateText: (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    },
    format_time: (date) => {
        return date.toLocaleTimeString();
      },
      format_date: (date) => {
        // Customize the format as needed, e.g., MM/DD/YYYY
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short', // Use 'long' for full month name
            day: 'numeric',
        });
    },
  };
  