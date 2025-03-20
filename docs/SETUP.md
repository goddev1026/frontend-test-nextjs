# Setup Guide

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later

## Installation Steps

1. **Environment Setup**

Create a `.env.local` file in the root directory:

```env
# Add any environment variables here
```

2. **Install Dependencies**

```bash
npm install
```

3. **Development Server**

```bash
npm run dev
```

4. **Build for Production**

```bash
npm run build
npm start
```

## Development Guidelines

1. **Code Style**

   - Use TypeScript for type safety
   - Follow ESLint configuration
   - Use styled-components for styling

2. **Component Structure**

   - Keep components in dedicated folders
   - Include styles in separate files
   - Follow atomic design principles

3. **State Management**
   - Use Redux for global state
   - Use local state for component-specific data
   - Implement proper error handling
