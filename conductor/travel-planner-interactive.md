# Implementation Plan - Interactive Conversational Travel Planner

## Objective
Transform the existing one-shot travel planner into an "award-winning" interactive conversational experience. The app will act as a personal travel agent, asking tailored questions to understand user preferences before generating a vibrant, map-integrated itinerary.

## Tech Stack
- **Backend**: Node.js, Express.js (ES Modules), Express-Session (for state)
- **Frontend**: Vanilla JS, CSS (Vibrant & Playful), EJS
- **AI**: Google Gemini 1.5 Flash (via `@google/generative-ai`)
- **Maps**: Google Maps JavaScript API
- **Photos**: Google Places API (via client-side or server-side)

## Architecture Changes
- **Conversation State**: Use `express-session` to store the chat history and user preferences across requests.
- **Routes**:
  - `GET /`: Landing page with a "Start Planning" button.
  - `GET /chat`: Chat interface for interactive questioning.
  - `POST /chat`: Handle user messages, update session, and get AI response.
  - `GET /itinerary`: Display the final generated itinerary.
- **AI Service**:
  - `getChatResponse(history)`: Manages the conversation flow.
  - `generateFinalItinerary(history)`: Generates the structured JSON itinerary when information is sufficient.

## Implementation Steps

### 1. Setup & Session Management
- Install `express-session`.
- Configure session middleware in `src/server.js`.
- Create a `session` utility to manage travel state (destination, interests, budget, etc.).

### 2. Conversational AI Service
- Update `src/services/aiService.js` to support chat:
  - System prompt: Define the "Vibrant Travel Agent" persona.
  - Logic to decide when to stop asking questions and generate the itinerary.
  - JSON parsing for structured data (when it's time to generate the itinerary).

### 3. Vibrant Chat UI (`/chat`)
- Create `views/chat.ejs`.
- Implement a chat bubble interface with animations.
- Add "Typing..." indicators for AI responses.
- Client-side JS (`public/js/chat.js`) to handle message sending/receiving via AJAX/Fetch.

### 4. Rich Itinerary View (`/itinerary`)
- Enhance `views/itinerary.ejs` with a "Vibrant & Playful" design.
- Integrate Google Maps API to display pins for all activities.
- Use Google Places API to fetch and display photos for each location.

### 5. Refactoring & Polishing
- Improve CSS in `public/css/style.css` (gradients, cards, rounded corners).
- Add "Reset" functionality to start over.
- Ensure "gemini-1.5-flash" is used for speed.

## Verification & Testing
- **Chat Flow**: Test if the AI correctly asks relevant questions based on the destination.
- **State Persistence**: Verify that refreshing the chat page doesn't lose the conversation.
- **JSON Parsing**: Ensure the final itinerary is correctly parsed from AI output.
- **Map Integration**: Confirm all locations appear on the map.
- **Visual Check**: Verify "Vibrant & Playful" style matches the objective.
