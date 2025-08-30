# Quiz Practice System

A modern web-based quiz application built with React and Vite, designed for practicing questions from multiple chapters.

## Features

- **Chapter Selection**: Choose from 10 different chapters (C1-C10)
- **Random Quiz Generation**: Automatically selects 10 random questions from the chosen chapter
- **Interactive Quiz Interface**: 
  - Navigate between questions freely
  - Flag questions for review
  - Modify answers before submission
  - Progress tracking
- **Comprehensive Results**: 
  - Score display with percentage
  - Detailed answer review
  - Question explanations
  - Flag indicators
- **Wrong Answer Management**: 
  - Automatic tracking of incorrect answers
  - Statistics for each chapter
  - Local storage persistence

## Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Custom CSS with modern design
- **Data Storage**: Local Storage for wrong answer tracking
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Deployment to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to complete deployment

## Project Structure

```
src/
├── components/
│   ├── ChapterSelection.jsx
│   ├── Quiz.jsx
│   └── Results.jsx
├── App.jsx
├── App.css
└── main.jsx
public/
└── Quiz/
    ├── C1.json
    ├── C2.json
    └── ... (C3-C10.json)
```

## Quiz Data Format

Each chapter file follows this JSON structure:

```json
{
  "C1": [
    {
      "question": "Question text",
      "options": {
        "A": "Option A text",
        "B": "Option B text",
        "C": "Option C text",
        "D": "Option D text"
      },
      "answer": "B",
      "explanation": "Detailed explanation"
    }
  ]
}
```

## Features in Detail

### Chapter Selection
- Grid layout showing all available chapters
- Wrong answer statistics for each chapter
- Overall error summary

### Quiz Interface
- Question navigation with visual indicators
- Answer selection with radio buttons
- Flag functionality for marking questions
- Progress tracking
- Submit button (enabled only when all questions are answered)

### Results Page
- Score circle with percentage
- Expandable question details
- Answer comparison (user vs correct)
- Detailed explanations
- Flag indicators

### Wrong Answer Tracking
- Automatic detection of incorrect answers
- Persistent storage using localStorage
- Statistics by chapter and question
- Error count tracking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
