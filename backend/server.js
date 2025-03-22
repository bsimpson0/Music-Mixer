// server.js - The main entry point for the MusicMixer API backend
// Express is the web framework that handles routing and middleware
const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config({path: './config/.env'});

const app = express();
const PORT = process.env.PORT

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

// New endpoint for lyric generation with OpenAI
app.post('/api/generate-lyrics', async (req, res) => {
  // Extract the prompt from the request body
  const { prompt } = req.body;
  
  // Validate that a prompt was actually provided
  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: 'Prompt is required'
    });
  }
  
  console.log('Received lyric generation request with prompt:', prompt);
  
  try {
    // Call OpenAI API for lyric generation
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can use "gpt-4" if you have access
      messages: [
        { 
          role: "system", 
          content: "You are a professional songwriter who specializes in writing lyrics. Create original song lyrics based on the user's description. Format the lyrics with clear verse and chorus sections."
        },
        { 
          role: "user", 
          content: `Write song lyrics based on this description: ${prompt}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    // Extract the generated lyrics
    const lyrics = response.choices[0].message.content.trim();
    
    res.status(200).json({
      success: true,
      data: {
        id: 'lyric_' + Date.now(),
        lyrics: lyrics,
        prompt: prompt
      },
      message: 'Lyrics generated successfully'
    });
  } catch (error) {
    console.error('Error generating lyrics:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error generating lyrics',
      error: error.message
    });
  }
});

// Update this endpoint to work with the chat interface
// This endpoint will eventually connect to your music generation model
app.post('/api/generate', (req, res) => {
  // Extract the prompt and lyrics from the request body
  const { prompt, lyrics } = req.body; 
  
  // Validate that a prompt was actually provided
  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: 'Prompt is required'
    });
  }
  
  // Log the prompt for debugging purposes
  console.log('Received music generation request with prompt:', prompt);
  console.log('Using lyrics:', lyrics ? lyrics.substring(0, 100) + '...' : 'No lyrics provided');
  
  // For now, I'm just simulating a response with a delay
  // This helps test loading states in the frontend
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

// Start my Express server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the API at http://localhost:${PORT}/`);
  console.log(`OpenAI API status: ${process.env.OPENAI_API_KEY ? 'Configured' : 'Missing API key! Check your .env file'}`);
});