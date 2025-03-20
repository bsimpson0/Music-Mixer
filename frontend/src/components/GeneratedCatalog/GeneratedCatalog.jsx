  const songData = [
    { id: 1, title: 'Ocean Breeze Chillwave', creator: 'SonicFlow', tags: ['Chillwave', 'Relaxing', 'Ambient'], img: '/placeholder.jpg' },
    { id: 2, title: 'Golden Hour Indie Jam', creator: 'IndieDreamer', tags: ['Indie', 'Rock', 'Upbeat'], img: '/placeholder.jpg' },
    { id: 3, title: 'Starlight Synth Pop', creator: 'NeonPulse', tags: ['Synth Pop', 'Retro', 'Dance'], img: '/placeholder.jpg' },
    { id: 4, title: 'Sunset Acoustic Ballad', creator: 'FolkVibes', tags: ['Acoustic', 'Folk', 'Mellow'], img: '/placeholder.jpg' },
    { id: 5, title: 'Deep Space Ambient', creator: 'GalacticBeats', tags: ['Ambient', 'Space', 'Meditative'], img: '/placeholder.jpg' },
    { id: 6, title: 'Tropical House Vibes', creator: 'IslandGrooves', tags: ['House', 'Tropical', 'Chill'], img: '/placeholder.jpg' },
    { id: 7, title: 'Funky Disco Revival', creator: 'RetroGroove', tags: ['Disco', 'Funk', 'Groovy'], img: '/placeholder.jpg' },
    { id: 8, title: 'Midnight Lo-Fi Beats', creator: 'ChillZone', tags: ['Lo-Fi', 'Chill', 'Relaxing'], img: '/placeholder.jpg' },
    { id: 9, title: 'Neo-Soul Serenade', creator: 'SmoothVibes', tags: ['Soul', 'Jazz', 'R&B'], img: '/placeholder.jpg' },
    { id: 10, title: 'Haunted Synth Experiment', creator: 'GhostlyWaves', tags: ['Experimental', 'Dark', 'Ambient'], img: '/placeholder.jpg' },
    { id: 11, title: 'Blazing EDM Drop', creator: 'BeatBlaster', tags: ['EDM', 'Bass', 'Energetic'], img: '/placeholder.jpg' },
    { id: 12, title: 'Soothing Nature Soundscape', creator: 'ZenAtmosphere', tags: ['Nature', 'Relaxing', 'Peaceful'], img: '/placeholder.jpg' },
    { id: 13, title: 'Techno Underground Rave', creator: 'DarkBeats', tags: ['Techno', 'Rave', 'Industrial'], img: '/placeholder.jpg' },
    { id: 14, title: 'Epic Cinematic Score', creator: 'FilmComposer', tags: ['Cinematic', 'Epic', 'Orchestral'], img: '/placeholder.jpg' },
    { id: 15, title: 'Smooth Latin Jazz', creator: 'SambaSoul', tags: ['Latin', 'Jazz', 'Smooth'], img: '/placeholder.jpg' },
    { id: 16, title: 'Hard Rock Anthem', creator: 'RiffMaster', tags: ['Rock', 'Heavy', 'Anthemic'], img: '/placeholder.jpg' },
    { id: 17, title: 'Melancholic Piano Solo', creator: 'SadKeys', tags: ['Piano', 'Solo', 'Melancholy'], img: '/placeholder.jpg' },
    { id: 18, title: 'Upbeat Electro Swing', creator: 'VintageGroove', tags: ['Electro Swing', 'Vintage', 'Upbeat'], img: '/placeholder.jpg' }
  ];
  
  const GeneratedCatalog = () => {
    return (
      <div className="catalog-gallery">
      <h2>Generated Music Catalog</h2>
      <p className="catalog-description">
        Discover the unique and inspired soundscapes created just for you. Let the music take you on a journey of creativity and emotion.
      </p>
      <div className="catalog-popular-mixes">
        {songData.map((song) => (
          <div key={song.id} className="catalog-mix-card">
            <div className="catalog-mix-img">
              <img src={song.img} alt={song.title} />
              <div className="catalog-play-icon">▶️</div>
            </div>
            <div className="catalog-mix-details">
              <h4 className="catalog-mix-title">{song.title}</h4>
              <div className="catalog-mix-creator">Prompt by {song.creator}</div>
              <div className="catalog-mix-tags">
                {song.tags.map((tag, index) => (
                  <span key={index} className="catalog-mix-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
  
  export default GeneratedCatalog;
  