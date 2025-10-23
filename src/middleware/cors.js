import cors from "cors"
 
const corsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies to be sent
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  optionsSuccessStatus: 200 // Handle legacy browsers' issues with 204 status
})



export default corsMiddleware