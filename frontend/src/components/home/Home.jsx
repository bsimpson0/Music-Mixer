import React, { useState } from "react";
import SearchBar from "../common/SearchBar";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handlePromptChange = (value) => {
    setPrompt(value);
  };
  
  const handleGenerate = () => {
    if (prompt.trim() === "") return;
    setIsGenerating(true);
    // Here you would connect to your backend API
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <h2>AI-Powered Music Creation</h2>
          <p>Generate unique music with artificial intelligence. Simply describe your desired song, and our AI will create it for you.</p>
          <div className="prompt-container">
            <SearchBar 
              placeholder="Describe the music you want to create!" 
              onSearch={handleGenerate}
              onChange={handlePromptChange}
              value={prompt}
            />
            <button 
              className="btn btn-primary generate-btn" 
              onClick={handleGenerate}
              disabled={isGenerating || prompt.trim() === ""}
            >
              {isGenerating ? "Generating..." : "Generate Music"}
            </button>
          </div>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <div className="section-title">
            <h3>How It Works</h3>
            <p>Creating AI-generated music has never been easier.</p>
          </div>
          
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">💭</div>
              <h4>Describe Your Vision</h4>
              <p>Enter a detailed prompt describing the style, mood, tempo, and instruments for your desired music.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h4>AI Generation</h4>
              <p>Our advanced machine learning model analyzes your prompt and creates a unique musical composition.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎧</div>
              <h4>Listen & Refine</h4>
              <p>Preview your generated music and make adjustments to further refine the sound to your liking.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="generation-demo">
        <div className="container">
          <div className="section-title">
            <h3>Generation Studio</h3>
            <p>Try out our AI music generation with these example prompts</p>
          </div>
          
          <div className="prompt-examples">
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
          
          <div className="player-section">
            <div className="waveform">
              <div className="waveform-graphic">
                {[...Array(20)].map((_, index) => (
                  <div key={index} className="wave-bar"></div>
                ))}
              </div>
            </div>
            
            <div className="player-controls">
              <button className="btn btn-primary">▶ Play Latest Generation</button>
              <button className="btn btn-secondary">Download</button>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <div className="section-title">
            <h3>Community Creations</h3>
            <p>Explore music created by our AI based on community prompts</p>
          </div>
          
          <div className="popular-mixes">
            <div className="mix-card">
              <div className="mix-img">
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