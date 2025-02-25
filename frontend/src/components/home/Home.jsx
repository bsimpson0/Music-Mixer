import React from "react";
import SearchBar from "../common/SearchBar";

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h2>Mix, Match, and Create Amazing Music</h2>
          <p>Combine elements from different songs to create your own unique musical masterpieces.</p>
          <SearchBar placeholder="Search for songs, beats, or melodies..." />
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <div className="section-title">
            <h3>How It Works</h3>
            <p>Creating your own music has never been easier. Follow these simple steps to get started.</p>
          </div>
          
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🎵</div>
              <h4>Find Tracks</h4>
              <p>Search our vast library of songs and musical elements to find the perfect pieces for your creation.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✂️</div>
              <h4>Select Elements</h4>
              <p>Choose specific parts like chorus, verses, beats, or melodies from different songs to mix together.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h4>Combine & Adjust</h4>
              <p>Our AI-powered mixer will seamlessly blend your selected elements, matching tempo and key.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💾</div>
              <h4>Save & Share</h4>
              <p>Save your creation to your profile and share it with the community or download for personal use.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mixer-section">
        <div className="container">
          <div className="section-title">
            <h3>Music Mixer Studio</h3>
            <p>Drag and drop elements to create your unique mix</p>
          </div>
          
          <div className="mixer-container">
            <div className="tracks">
              <div className="track">
                <div className="track-type">Chorus</div>
                <div className="track-info">
                  <div className="track-title">Dreaming of Tomorrow</div>
                  <div className="track-artist">Starlight Symphony</div>
                </div>
                <div className="track-actions">
                  <button className="track-btn">▶️</button>
                  <button className="track-btn">✖️</button>
                </div>
              </div>
              
              <div className="track">
                <div className="track-type">Beat</div>
                <div className="track-info">
                  <div className="track-title">Urban Pulse</div>
                  <div className="track-artist">Rhythm Collective</div>
                </div>
                <div className="track-actions">
                  <button className="track-btn">▶️</button>
                  <button className="track-btn">✖️</button>
                </div>
              </div>
              
              <div className="track">
                <div className="track-type">Verse</div>
                <div className="track-info">
                  <div className="track-title">Midnight Thoughts</div>
                  <div className="track-artist">Luna Voice</div>
                </div>
                <div className="track-actions">
                  <button className="track-btn">▶️</button>
                  <button className="track-btn">✖️</button>
                </div>
              </div>
            </div>
            
            <div className="waveform">
              <div className="waveform-graphic">
                {/* Simplified waveform representation */}
                {[...Array(20)].map((_, index) => (
                  <div key={index} className="wave-bar"></div>
                ))}
              </div>
            </div>
            
            <div className="mixer-controls">
              <button className="btn btn-primary">Generate Mix</button>
              <div>
                <button className="btn btn-secondary">Save Mix</button>
                <button className="btn btn-secondary">Share</button>
              </div>
            </div>
            
            <div className="add-track">
              <button className="btn btn-secondary">+ Add Another Track</button>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <div className="section-title">
            <h3>Popular User Mixes</h3>
            <p>Discover what other music lovers have created</p>
          </div>
          
          <div className="popular-mixes">
            <div className="mix-card">
              <div className="mix-img">
                <img src="/placeholder.jpg" alt="Mix thumbnail" />
                <div className="play-icon">▶️</div>
              </div>
              <div className="mix-details">
                <h4 className="mix-title">Chillwave Summer</h4>
                <div className="mix-creator">By MusicMaster92</div>
                <div className="mix-tags">
                  <span className="mix-tag">Pop</span>
                  <span className="mix-tag">Electronic</span>
                  <span className="mix-tag">Chill</span>
                </div>
              </div>
            </div>
            
            <div className="mix-card">
              <div className="mix-img">
                <img src="/placeholder.jpg" alt="Mix thumbnail" />
                <div className="play-icon">▶️</div>
              </div>
              <div className="mix-details">
                <h4 className="mix-title">Urban Jazz Fusion</h4>
                <div className="mix-creator">By JazzLover2000</div>
                <div className="mix-tags">
                  <span className="mix-tag">Jazz</span>
                  <span className="mix-tag">Hip Hop</span>
                  <span className="mix-tag">Fusion</span>
                </div>
              </div>
            </div>
            
            <div className="mix-card">
              <div className="mix-img">
                <img src="/placeholder.jpg" alt="Mix thumbnail" />
                <div className="play-icon">▶️</div>
              </div>
              <div className="mix-details">
                <h4 className="mix-title">Rock Ballad Remix</h4>
                <div className="mix-creator">By GuitarHero77</div>
                <div className="mix-tags">
                  <span className="mix-tag">Rock</span>
                  <span className="mix-tag">Ballad</span>
                  <span className="mix-tag">Acoustic</span>
                </div>
              </div>
            </div>
            
            <div className="mix-card">
              <div className="mix-img">
                <img src="/placeholder.jpg" alt="Mix thumbnail" />
                <div className="play-icon">▶️</div>
              </div>
              <div className="mix-details">
                <h4 className="mix-title">EDM Mashup</h4>
                <div className="mix-creator">By BeatDropper</div>
                <div className="mix-tags">
                  <span className="mix-tag">EDM</span>
                  <span className="mix-tag">Dance</span>
                  <span className="mix-tag">Bass</span>
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