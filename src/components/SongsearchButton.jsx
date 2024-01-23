import { useState } from 'react';

const SongsearchButton = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    return new Promise((resolve, reject) => {
      // Replace 'YOUR_API_KEY' with your actual YouTube Data API key
      const apiKey = 'AIzaSyAYr18wLgTl4PSSFtCCZ6cbHmdJZMpM9oQ';

      // Ensure the search term is not empty
      if (!searchTerm.trim()) {
        console.log('Please enter a search term');
        reject('Empty search term');
        return;
      }

      // Construct the API URL for searching videos
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
        searchTerm
      )}&key=${apiKey}`;

      // Fetch data from the YouTube Data API
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Update the videos state with the search results
          setVideos(data.items || []);
          resolve();
        })
        .catch((error) => {
          console.error('Error searching on YouTube:', error);
          reject(error);
        });
    });
  };

  const handleVideoClick = (videoId) => {
    // Play the video directly by embedding it on the page
    const iframe = document.createElement('iframe');
    iframe.width = '560'; // Adjust width as needed
    iframe.height = '315'; // Adjust height as needed
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    // Replace the content of the container with the iframe
    const container = document.getElementById('video-container');
    container.innerHTML = '';
    container.appendChild(iframe);
  };

  const startPlayingVideoAfterSearch = () => {
    handleSearch()
      .then(() => {
        // Play the first video directly
        if (videos.length > 0) {
          const firstVideoId = videos[0].id.videoId;
          handleVideoClick(firstVideoId);
        } else {
          console.log('No videos to play');
        }
      })
      .catch((error) => {
        console.error('Error searching and playing video:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search on YouTube</button>
      <button onClick={startPlayingVideoAfterSearch}>Search and Play First Video</button>

      {/* Display the search results */}
      <div id="video-container"></div>
    </div>
  );
};

export default SongsearchButton;
