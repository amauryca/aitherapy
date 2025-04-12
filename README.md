# Therapeutic AI Assistant

A therapeutic AI assistant application that provides various mental health support features through voice therapy, text therapy, and progress tracking.

## Features

- Voice therapy sessions with emotion detection
- Text-based therapy conversations
- Progress tracking and statistics
- Educational modules
- Clean, calming user interface

## Technology Stack

- **Frontend**: React, TailwindCSS, Shadcn UI components
- **Backend**: Express.js
- **Data Storage**: In-memory storage
- **AI Integration**: Face API for emotion detection
- **Routing**: Wouter for lightweight routing

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5000
```

## Deployment

This project is configured for deployment to GitHub Pages. See [GITHUB_PAGES.md](./GITHUB_PAGES.md) for detailed deployment instructions.

## Project Structure

```
├── client/             # Frontend React application
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utility functions
│   │   ├── pages/      # Page components
│   │   └── ...
├── server/             # Backend Express server
├── shared/             # Shared code between frontend and backend
├── .github/            # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml  # GitHub Pages deployment
└── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.