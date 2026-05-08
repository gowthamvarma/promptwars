# Project Conventions

## Tech Stack
- **Backend**: Node.js, Express.js (ES Modules)
- **Frontend**: Vanilla JS, CSS, EJS
- **AI**: Google Gemini 2.5 Pro
- **Model**: gemini-2.5-flash

## Structure
- `src/server.js`: Main application file.
- `src/services/aiService.js`: Logic for Gemini API calls.
- `views/`: EJS templates.
- `public/`: Static files (CSS, client-side JS).

## Security
- API keys MUST be stored in `.env`.
- Never commit `.env` files.
- Sanitize AI outputs before rendering if needed (though EJS handles basic escaping).

## Performance
- Use `gemini-2.5-flash` for faster response times.
- Minimize front-end assets to stay under the 10MB limit.
