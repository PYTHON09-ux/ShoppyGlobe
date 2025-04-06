# 🛍️ Shoppy Globe (React App)

Welcome to **Shoppy Globe**, a modern e-commerce front-end built with **React**, styled using **Tailwind CSS**, and powered by **Redux Toolkit** for state management. It also uses **React Router** for routing and **Lucide React** for sleek, elegant icons.

---

## 📂 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/shoppy-globe.git
cd shoppy-globe
```

---

### 2. Install Node Modules

Make sure you have **Node.js (v16 or later)** and **npm** installed.

```bash
npm install
```

---

### 3. Install and Configure Tailwind CSS

```bash
npm install -D tailwindcss@3.4.1 postcss autoprefixer
npx tailwindcss init -p
```

Update your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Then, in your `src/index.css` file, add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 4. Install Essential Packages

```bash
# React Redux + Redux Toolkit
npm install @reduxjs/toolkit@1.9.5 react-redux@8.1.3

# React Router DOM
npm install react-router-dom@6.22.2

# Lucide React (Icons)
npm install lucide-react@0.276.0
```

---

### 5. Start the Development Server

```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000)

---

## 📦 Tech Stack

- **React 18**
- **Tailwind CSS 3.4**
- **Redux Toolkit**
- **React Router DOM 6**
- **Lucide React Icons**

---

## 🛠️ Available Scripts

- `npm start` – Runs the app in development mode.
- `npm run build` – Builds the app for production.
- `npm run lint` – Lints your code (if ESLint is set up).
- `npm test` – Runs tests (if configured).

---

## 🌐 Deployment

You can deploy this React app to platforms like:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

Happy coding! 🧑‍💻✨

