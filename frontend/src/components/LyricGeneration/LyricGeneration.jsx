import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../common/SearchBar";
import AudioPlayer from "../common/AudioPlayer";

function LyricGeneration() {

  // State for tracking the user's prompt input
  // I need this to both display in the input field and send to the backend
  const [prompt, setPrompt] = useState("");
  
  // State for tracking when music generation is in progress
  // This helps me show loading states and disable buttons appropriately
  const [isGenerating, setIsGenerating] = useState(false);
  
  // State for storing the URL of the generated audio
  // I'll use this to play the audio and conditionally show the player
  const [audioUrl, setAudioUrl] = useState(null);
  
  // State to track if audio is playing for waveform animation
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Handler for updating the prompt state when the user types
  // This connects to my SearchBar component's onChange prop
  const handlePromptChange = (value) => {
    setPrompt(value);
  };
  
  // The main function that handles sending the generation request to my backend
  // I'm using async/await for cleaner handling of the Promise-based fetch API
  const handleGenerate = async () => {
    // Don't proceed if the prompt is empty or just whitespace
    // This prevents unnecessary API calls
    if (prompt.trim() === "") return;
    
    // Set generating state to true to show loading UI
    setIsGenerating(true);
    try {
      // Make the API request to my backend server
      // In production, I'll need to make this URL configurable or relative
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server I'm sending JSON data
        },
        body: JSON.stringify({ prompt }), // Convert the prompt object to a JSON string
      });
      
      // Parse the JSON response from my backend
      const data = await response.json();
      console.log('Response from backend:', data);
      
      // If the response was successful and includes an audio URL, save it to state
      // This will make it available to my audio player and also show the player UI
      if (data.success && data.data.audioUrl) {
        setAudioUrl(data.data.audioUrl);
      }
      
    } catch (error) {
      // Catch and log any errors during the fetch operation
      console.error('Error generating music:', error);
      
      // TODO: Add proper error handling for the user
      // I should show a user-friendly error message in the UI
      // depending on what went wrong (network error, server error, etc.)
    } finally {
      // Whether the request succeeds or fails, reset the generating state
      // This ensures the UI returns to its normal state
      setIsGenerating(false);
    }
  };

    return (
    <>       
        <section className="hero-lyric">
        <div className="container">
          <h2>Lyric Generation Studio</h2>
          <p>Generate unique lyrics by simply describing your theme or concept, and our AI will craft original lyrics just for you.</p>
          
          {/* The prompt container holds my search input and generate button */}
          <div className="prompt-container">
            {/* I'm using my custom SearchBar component for the prompt input 
                and passing several props to control its behavior */}
            <SearchBar 
              placeholder="Describe the music you want to create!" 
              onSearch={handleGenerate} // This allows Enter key to trigger generation
              onChange={handlePromptChange} // This updates my prompt state as the user types
              value={prompt} // This makes the component a controlled input
            />
            
            {/* Generate button that triggers the API call
                I disable it when generating or when the prompt is empty */}
            <button 
              className="btn btn-primary generate-btn" 
              onClick={handleGenerate}
              disabled={isGenerating || prompt.trim() === ""}
            >
              {/* Text changes based on generation state */}
              {isGenerating ? "Generating..." : "Generate Lyrics"}
            </button>
            
            {/* I'm only showing the audio player and waveform after generation is complete
                This improves the user experience by keeping everything in one area */}
            {audioUrl && (
              <div className="generation-result">
                {/* Waveform visualization - Now with animation */}
                <div className="waveform">
                  <div className="waveform-graphic">
                    {/* Creating 20 wave bars with different heights for visualization
                        I'm using the Array constructor with spread to generate 20 elements */}
                    {[...Array(20)].map((_, index) => (
                      <div 
                        key={index} 
                        className={`wave-bar ${isPlaying ? 'animate-wave' : ''}`}
                        style={{
                          animationDelay: `${Math.random() * 0.5}s` // Randomize start times
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Custom audio player */}
                <AudioPlayer 
                  src={audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
                  onPlayPause={(playing) => setIsPlaying(playing)}
                />
                
                {/* Download button below the player */}
                <button 
                  className="btn btn-secondary download-btn"
                  onClick={() => window.open(audioUrl, '_blank')}
                >
                  Download
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      
      {/* Gallery section - Showcases example generations */}
      <section className="gallery">
        <div className="container">
          <div className="section-title">
            <h3>Your Lastest Composition</h3>
            <p>Explore music created by you</p>
          </div>
          {/* Grid of generation examples */}
          <div className="popular-mixes">
            {/* These will eventually be dynamically generated from backend data from the user
                For now, they're static examples to show the UI design */}
            
            {/* Example 1 - Chillwave */}
            <div className="mix-card-lyric">
              <div className="mix-card-lyric-content">
                <div className="mix-details">
                    <h4 className="mix-title">Ocean Breeze Chillwave</h4>
                    <div className="mix-creator">Prompt by SonicFlow</div>
                    <div className="mix-tags">
                        <span className="mix-tag">Chillwave</span>
                        <span className="mix-tag">Relaxing</span>
                        <span className="mix-tag">Ambient</span>
                    </div>
                </div>
                <div className="lyrics-container">
                    <h5>Lyrics</h5>
                    <div className="lyrics-text">
                        <p>This is where the lyrics for Ocean Breeze Chillwave would appear.</p>
                        <p>Each line or verse could be formatted in its own paragraph.</p>
                    </div>
                </div>
                {/* If we want to add download function */}
                {/*<div className="player-controls">
                    <button className="download-button">↓ Download</button>
                </div>*/}
              </div>
            </div>

                {/* Example 2 - Indie Rock */}
                <div className="mix-card-lyric">
                  <div className="mix-card-lyric-content">
                    <div className="mix-details">
                        <h4 className="mix-title">Golden Hour Indie Jam</h4>
                        <div className="mix-creator">Prompt by IndieDreamer</div>
                        <div className="mix-tags">
                          <span className="mix-tag">Indie</span>
                          <span className="mix-tag">Rock</span>
                          <span className="mix-tag">Upbeat</span>
                        </div>
                    </div>
                    <div className="lyrics-container">
                    <h5>Lyrics</h5>
                    <div className="lyrics-text">
                        <p>This is where the lyrics for Golden Hour Indie Jam would appear.</p>
                        <p>Each line or verse could be formatted in its own paragraph.</p>
                    </div>
                    </div>
                    {/* If we want to add download function */}
                    {/*<div className="player-controls">
                        <button className="download-button">↓ Download</button>
                    </div>*/}
                  </div>
                </div>

                {/* Example 3 - Synth Pop */}
                <div className="mix-card-lyric">
                  <div className="mix-card-lyric-content">
                    <div className="mix-details">
                        <h4 className="mix-title">Starlight Synth Pop</h4>
                        <div className="mix-creator">Prompt by NeonPulse</div>
                        <div className="mix-tags">
                        <span className="mix-tag">Synth Pop</span>
                        <span className="mix-tag">Retro</span>
                        <span className="mix-tag">Dance</span>
                        </div>
                    </div>
                    <div className="lyrics-container">
                    <h5>Lyrics</h5>
                    <div className="lyrics-text">
                        <p>This is where the lyrics for Starlight Synth Pop would appear.</p>
                        <p>Each line or verse could be formatted in its own paragraph.</p>
                    </div>
                    </div>
                    {/* If we want to add download function */}
                    {/*<div className="player-controls">
                        <button className="download-button">↓ Download</button>
                    </div>*/}
                  </div>
                </div>

                {/* Example 4 - Acoustic Folk */}
                <div className="mix-card-lyric">
                  <div className="mix-card-lyric-content">
                    <div className="mix-details">
                        <h4 className="mix-title">Sunset Acoustic Ballad</h4>
                        <div className="mix-creator">Prompt by FolkVibes</div>
                        <div className="mix-tags">
                        <span className="mix-tag">Acoustic</span>
                        <span className="mix-tag">Folk</span>
                        <span className="mix-tag">Mellow</span>
                        </div>
                    </div>
                    <div className="lyrics-container">
                      <h5>Lyrics</h5>
                      <div className="lyrics-text">
                          <p>This is where the lyrics for Sunset Acoustic Ballad would appear.</p>
                          <p>Each line or verse could be formatted in its own paragraph.</p>
                      </div>
                    </div>
                    {/* If we want to add download function */}
                    {/*<div className="player-controls">
                        <button className="download-button">↓ Download</button>
                    </div>*/}
                  </div>
              </div>
            </div>
        </div>
      </section>
      </>
    )
  }
  
  export default LyricGeneration