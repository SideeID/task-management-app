export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const formatTime = (dateString: string): string => {
    const hour = new Date(dateString).getHours();
    const minute = new Date(dateString).getMinutes();
    return `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
  }

  if (diffInDays === 0) {
    return 'hari ini pada ' + formatTime(dateString);
  } else if (diffInDays === 1) {
    return 'kemarin pada ' + formatTime(dateString);
  } else if (diffInDays < 7) {
    return `${diffInDays} hari yang lalu pada ` + formatTime(dateString);
  } else {
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
};
