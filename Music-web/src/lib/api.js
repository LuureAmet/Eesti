const API_BASE = '/api/comments.php';

export async function fetchSongData(songId) {
  const response = await fetch(`${API_BASE}?song=${encodeURIComponent(songId)}`);
  if (!response.ok) {
    throw new Error('Failed to load comments');
  }
  return response.json();
}

export async function postTimelineComment(songId, payload) {
  const response = await fetch(`${API_BASE}?song=${encodeURIComponent(songId)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to save comment');
  }

  return response.json();
}
