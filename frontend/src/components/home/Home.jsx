import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../common/SearchBar";
import AudioPlayer from "../common/AudioPlayer";

const Home = () => {
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
      {/* Hero section - This is the main banner at the top of my page */}
      <section className="hero">
        <div className="container">
          <h2>Music Generation Studio</h2>
          <p>Generate unique music with artificial intelligence. Simply describe your desired song, and our AI will create it for you.</p>
          
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
              {isGenerating ? "Generating..." : "Generate Music"}
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
      
      {/* Remaining sections (features, generation demo, gallery) remain unchanged */}
      <section className="features">
        <div className="container">
          <div className="section-title">
            <h3>How It Works</h3>
            <p>Creating AI-generated music has never been easier.</p>
          </div>
          
          {/* Feature cards grid - Shows the steps in the generation process */}
          <div className="feature-grid">
            {/* Feature 1: Describing the music */}
            <div className="feature-card">
              <div className="feature-icon">💭</div>
              <h4>Describe Your Vision</h4>
              <p>Enter a detailed prompt describing the style, mood, tempo, and instruments for your desired music.</p>
            </div>
            
            {/* Feature 2: AI Processing */}
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h4>AI Generation</h4>
              <p>Our advanced machine learning model analyzes your prompt and creates a unique musical composition.</p>
            </div>
            
            {/* Feature 3: Listening & Refining */}
            <div className="feature-card">
              <div className="feature-icon">🎧</div>
              <h4>Listen & Refine</h4>
              <p>Preview your generated music and make adjustments to further refine the sound to your liking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Generation demo section - Now focused only on example prompts */}
      <section className="generation-demo">
        <div className="container">
          <div className="section-title">
            <h3>Try These Examples</h3>
            <p>Get inspired with these example prompts</p>
          </div>
          
          {/* Example prompt cards that users can click to prefill the prompt */}
          <div className="prompt-examples">
            {/* Each card sets the prompt state when clicked */}
            <div className="prompt-card" onClick={() => setPrompt("A lo-fi hip hop beat with jazzy piano samples and rain sounds")}>
              <p>"A lo-fi hip hop beat with jazzy piano samples and rain sounds"</p>
            </div>
            
            <div className="prompt-card" onClick={() => setPrompt("An energetic EDM track with a heavy drop and futuristic synths")}>
              <p>"An energetic EDM track with a heavy drop and futuristic synths"</p>
            </div>
            
            <div className="prompt-card" onClick={() => setPrompt("A gentle acoustic guitar melody with nature sounds")}>
              <p>"A gentle acoustic guitar melody with nature sounds"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery section - Showcases example generations */}
      <section className="gallery">
        <div className="container">
          <div className="section-title">
            <h3>Community Creations</h3>
            <p>Explore music created by our AI based on community prompts</p>
          </div>
          
          {/* Grid of generation examples */}
          <div className="popular-mixes">
            {/* These will eventually be dynamically generated from backend data
                For now, they're static examples to show the UI design */}
            
            {/* Example 1 - Cyberpunk */}
            <div className="mix-card">
              <div className="mix-img">
                {/* TODO: Replace with actual waveform visualizations or artwork */}
                <img src="/placeholder.jpg" alt="Waveform visualization" />
                <div className="play-icon">▶️</div>
              </div>
              <div className="mix-details">
                <h4 className="mix-title">Cyberpunk City Ambience</h4>
                <div className="mix-creator">Prompt by TechnoVerse</div>
                <div className="mix-tags">
                  <span className="mix-tag">Electronic</span>
                  <span className="mix-tag">Ambient</span>
                  <span className="mix-tag">Futuristic</span>
                </div>
              </div>
            </div>
            
            {/* Example 2 - Jazz */}
            <div className="mix-card">
              <div className="mix-img">
                <img src="/placeholder.jpg" alt="Waveform visualization" />
                <div className="play-icon">▶️</div>
              </div>
              <div className="mix-details">
                <h4 className="mix-title">Rainy Jazz Café</h4>
                <div className="mix-creator">Prompt by MelodyMaster</div>
                <div className="mix-tags">
                  <span className="mix-tag">Jazz</span>
                  <span className="mix-tag">Lo-Fi</span>
                  <span className="mix-tag">Relaxing</span>
                </div>
              </div>
            </div>
            
            {/* Example 3 - Orchestral */}
            <div className="mix-card">
              <div className="mix-img">
                <img src="/placeholder.jpg" alt="Waveform visualization" />
                <div className="play-icon">▶️</div>
              </div>
              <div className="mix-details">
                <h4 className="mix-title">Epic Fantasy Battle</h4>
                <div className="mix-creator">Prompt by OrchestralDreams</div>
                <div className="mix-tags">
                  <span className="mix-tag">Orchestral</span>
                  <span className="mix-tag">Epic</span>
                  <span className="mix-tag">Fantasy</span>
                </div>
              </div>
            </div>
            
            {/* Example 4 - Synthwave */}
            <div className="mix-card">
              <div className="mix-img">
                <img src="/placeholder.jpg" alt="Waveform visualization" />
                <div className="play-icon">▶️</div>
              </div>
              <div className="mix-details">
                <h4 className="mix-title">Retro Synthwave Drive</h4>
                <div className="mix-creator">Prompt by NeonRider</div>
                <div className="mix-tags">
                  <span className="mix-tag">Synthwave</span>
                  <span className="mix-tag">Retro</span>
                  <span className="mix-tag">80s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;