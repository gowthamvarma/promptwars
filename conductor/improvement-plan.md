# Improvement Plan: Scoring Higher in PromptWars

This plan outlines the steps to improve the Vibrant Travel Planner based on the judging criteria and the recent requirement to use Gemini 2.5 exclusively.

## Objective
Enhance the application's code quality, security, efficiency, testing, accessibility, and Google Services integration to maximize the competition score.

## Key Files & Context
- `src/server.js`: Main entry point, needs refactoring and security enhancements.
- `src/services/aiService.js`: Core AI logic, ensure consistent use of `gemini-2.5-flash`.
- `views/itinerary.ejs`: Needs accessibility fixes and layout improvements.
- `README.md` & `GEMINI.md`: Documentation updates.

## Implementation Steps

### 1. Model & Documentation Alignment
- **Task**: Standardize on `gemini-2.5-flash`.
- **Changes**:
    - Update `GEMINI.md` to reflect `gemini-2.5-flash` instead of `1.5`.
    - Ensure `src/services/aiService.js` is consistently using `gemini-2.5-flash`.
    - Review `README.md` for any outdated references.

### 2. Code Quality & Refactoring
- **Task**: Improve structure and maintainability.
- **Changes**:
    - Move route handlers from `src/server.js` to `src/routes/index.js`.
    - Use a separate controller for business logic.
    - Add JSDoc comments to all functions.
    - Set up Prettier for consistent formatting.

### 3. Security Enhancements
- **Task**: Implement safe and responsible practices.
- **Changes**:
    - Add `helmet` middleware for secure headers.
    - Improve session configuration (secret management, secure/httponly flags).
    - Validate Gemini's JSON output using a schema library (like `zod`) before rendering.
    - Add basic input sanitization for user messages.

### 4. Testing & Validation
- **Task**: Add functional and unit tests.
- **Changes**:
    - Install `jest` and `supertest`.
    - Add unit tests for `aiService.js` (mocking Gemini API).
    - Add integration tests for Express routes.

### 5. Accessibility (a11y)
- **Task**: Ensure the app is inclusive and usable.
- **Changes**:
    - Add ARIA labels to interactive elements (buttons, inputs).
    - Improve semantic HTML structure in all EJS templates.
    - Ensure proper color contrast in CSS.
    - Add "Skip to Content" link.

## Verification & Testing
- Run `npm test` to verify all tests pass.
- Use `axe-core` or Chrome DevTools to verify accessibility.
- Verify security headers using browser tools.
