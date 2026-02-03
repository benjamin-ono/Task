# React Task Flow B

A modern, high-performance Task Manager built with **React 19** and the **React Compiler**. This project focuses on clean code, minimal state management, and optimized rendering.

## 🚀 Key Features
- **React 19 & Compiler**: Automatic memoization and optimized performance without manual `useMemo`/`useCallback`.
- **Minimal State**: State is derived whenever possible, keeping data structures flat and clean.
- **Persistence**: Automatic synchronization with `localStorage`.
- **Modern UI**: Clean, B&W design with intuitive interactions.
- **Filtering**: Seamlessly toggle between All, Active, and Completed tasks.

## 🛠 Tech Stack
- **Frontend**: React 19, Vite
- **Optimization**: React Compiler (babel-plugin-react-compiler)
- **Styling**: Vanilla CSS (Modern CSS variables)
- **Testing**: Vitest, React Testing Library

## 📂 Project Structure

### `/src`
- `App.jsx`: Root component handling state, persistence, and business logic.
- `App.css`: Global styles and design system tokens.
- `main.jsx`: Entry point for the React application.

### `/src/components`
- `add/`: `Add.jsx` - Handles input and creation of new tasks.
- `list/`: `List.jsx` - Renders the task collection.
- `item/`: `Item.jsx` - Individual task component with editing and status toggle.
- `filter/`: `Filter.jsx` - Controls visibility of tasks based on status.
- `counter/`: `Counter.jsx` - Displays active and completed task statistics.
- `Bonus/`: `Bonus.jsx` - Special actions like "Clear Completed".

### `/public`
- Static assets and icons.

## ⚙️ Development
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Build for production: `npm run build`
4. Run tests: `npm run test`
