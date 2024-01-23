import { useState } from 'react';

const SongsearchButton = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      // Replace 'YOUR_API_KEY' with your actual YouTube Data API key
      const apiKey = 'AIzaSyAYr18wLgTl4PSSFtCCZ6cbHmdJZMpM9oQ';
      
      // Ensure the search term is not empty
      if (!searchTerm.trim()) {
        console.log('Please enter a search term');
        return;
      }

      // Construct the API URL for searching videos
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
        searchTerm
      )}&key=${apiKey}`;

      // Fetch data from the YouTube Data API
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Update the videos state with the search results
      setVideos(data.items || []);
    } catch (error) {
      console.error('Error searching on YouTube:', error);
    }
  };
  const handleVideoClick = (videoId) => {
    // You can handle playing the video here, for now, let's log the video ID
    console.log('Playing video with ID:', videoId);
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

      {/* Display the search results */}
      <div>
        {videos.map((video) => (
          <div key={video.id.videoId} onClick={() => handleVideoClick(video.id.videoId)}>
             <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            <h3>{video.snippet.title}</h3>
            <p>{video.snippet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongsearchButton;
