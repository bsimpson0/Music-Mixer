// server.js - The main entry point for the MusicMixer API backend
// Express is the web framework that handles routing and middleware
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001; // I changed from 5000 since that port was already in use on my computer

// This middleware automatically parses JSON request bodies into JavaScript objects
// Without this, I'd have to manually parse the JSON from my frontend requests
app.use(express.json());

// This custom middleware handles Cross-Origin Resource Sharing (CORS)
// I need this because my React frontend runs on a different port (usually 5173 with Vite)
// Without these headers, browsers would block requests from my frontend to this API
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // In production, I should limit this to my specific domain
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); // This passes control to the next middleware function
});

// A simple root endpoint that helps me verify the API is running
// I can hit this with a browser to make sure my server is online
app.get('/', (req, res) => {
  res.send('MusicMixer API is running');
});

// This is my main endpoint that will eventually connect to my AI music generation model
// It accepts a text prompt and will return generated music
app.post('/api/generate', (req, res) => {
  // Extract the prompt from the request body
  const { prompt } = req.body; 
  
  // Validate that a prompt was actually provided
  // This prevents errors from missing input data
  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: 'Prompt is required'
    });
  }
  
  // Log the prompt for my debugging purposes
  // This helps me see what's being requested while I'm developing
  console.log('Received generation request with prompt:', prompt);
  
  // TODO: Replace this with actual AI model integration
  // - AWS SageMaker endpoint
  
  // For now, I'm just simulating a response with a delay
  // This helps me test loading states in my frontend
  setTimeout(() => {
    res.status(200).json({
      success: true,
      data: {
        id: 'gen_' + Date.now(), // Simple unique ID based on timestamp
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Publicly accessible sample audio file
        status: 'completed'
      },
      message: 'Music generated successfully'
    });
  }, 2000); // 2 second delay simulates processing time
});

// TODO: Add endpoint to retrieve previously generated music
// app.get('/api/generations/:id', (req, res) => {
//   // This will fetch a specific generation by ID
// });

// TODO: Add endpoint to list recent generations
// app.get('/api/generations', (req, res) => {
//   // This will return a list of recent generations
// });

// Start my Express server and listen for incoming requests
// The callback function runs once the server is successfully started
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the API at http://localhost:${PORT}/`);
});

// Future improvements:
// 1. Add error handling middleware to catch and process errors consistently
// 2. Add request logging for all API calls
// 3. Implement rate limiting to prevent abuse
// 4. Add authentication if user accounts are implemented
// 5. Set up environment variables for configuration