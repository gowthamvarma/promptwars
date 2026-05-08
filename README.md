# Travel Planner - AI Itinerary Assistant

## Challenge Vertical
**Personalized Itinerary Assistant**: This application serves as a smart travel companion that generates detailed, multi-day itineraries based on user preferences using Google Gemini.

## Approach and Logic
- **AI Integration**: The core logic resides in `src/services/aiService.js`, where we prompt the `gemini-1.5-flash` model to return a structured JSON response.
- **Structured Data**: We enforce a specific JSON schema in the prompt to ensure the AI returns data that can be easily rendered by our EJS templates.
- **Dynamic Rendering**: Using Express and EJS, the application takes user inputs (destination, duration, interests, budget) and transforms the AI's JSON output into a clean, readable itinerary.
- **Google Services**: 
  - **Gemini API**: Used for intelligent planning and natural language processing.
  - **Google Maps (Future)**: Planned integration for visualizing itinerary markers.

## How the Solution Works
1. User enters their travel details on the homepage.
2. The server sends these details to Google Gemini with a structured prompt.
3. Gemini generates a personalized itinerary in JSON.
4. The server parses the JSON and renders the `itinerary.ejs` view.
5. User views a beautiful, multi-day plan for their trip.

## Setup Instructions
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file based on `.env.example` and add your `GEMINI_API_KEY`.
4. Run `npm start` to launch the server.
5. Visit `http://localhost:3000`.

## Assumptions
- The AI will return valid JSON if prompted correctly (we use a regex fallback for robustness).
- The user provides valid destinations and durations within the specified range (1-14 days).
- The `gemini-1.5-flash` model is available and accessible via the provided API key.

## Evaluation Focus
- **Code Quality**: Clean, modular code using ES Modules and clear service layers.
- **Security**: Environment variables for API keys; no sensitive data committed.
- **Efficiency**: Use of a lightweight model (Flash) and minimal dependencies.
- **Accessibility**: Semantic HTML and clear navigation.
