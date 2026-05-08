# Vibrant Travel Planner - Award-Winning Conversational AI 🌴

## Challenge Vertical
**Personalized Itinerary Assistant**: This application is a vibrant, interactive travel companion that uses Google Gemini to "interview" the user and build a truly personalized, award-winning travel plan.

## Approach and Logic
- **Conversational Experience**: Instead of a static form, the app uses a multi-turn chat interface. Gemini acts as a professional travel agent, asking one tailored question at a time to deeply understand user preferences.
- **Stateful Interaction**: Using `express-session`, the application maintains the context of the conversation, allowing for a natural and progressive discovery of the user's dream trip.
- **AI Integration**: We leverage `gemini-2.5-flash` for high-speed, high-quality conversational responses and structured JSON generation.
- **Rich Visualization**: The final itinerary is presented in a "Vibrant & Playful" design, featuring detailed activity cards and an easy-to-read layout.

## How the Solution Works
1. **Landing**: User starts their journey on a vibrant landing page.
2. **Interview**: User chats with the AI Travel Agent. The AI asks about destination, pace, food, and hidden gems.
3. **Synthesis**: Once enough info is gathered, Gemini synthesizes the preferences into a structured JSON itinerary.
4. **Final Plan**: The user is redirected to a beautiful, multi-page result showing their full itinerary.

## Setup Instructions
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file and add your `GEMINI_API_KEY`.
4. Run `npm start`.
5. Visit `http://localhost:3000`.

## Key Features
- **Interactive Chat**: Real-time feedback with typing indicators and smooth animations.
- **Persona-Driven**: Energetic and professional travel agent persona.
- **Award-Winning UI**: Modern gradients, rounded cards, and a mobile-friendly layout.
