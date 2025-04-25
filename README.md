# 🩺 Doctor Finder

A modern and responsive web application to help users easily find doctors based on specialty, consultation type, and other filters.

🌐 **Live Demo**: [https://doctor-finder-dun.vercel.app](https://doctor-finder-dun.vercel.app)

---

## 📌 Features

- 🔍 **Search & Autocomplete**: Instantly find doctors by name or specialty.
- 🧠 **Smart Filtering**:
  - Filter by consultation type (Online/In-person)
  - Filter by specialties (Cardiologist, Dermatologist, etc.)
  - Sort doctors by rating, availability, or consultation fees
- 📱 **Responsive Design**: Works on all screen sizes.
- ✅ **Accessible & Testable**: Built-in `data-testid` attributes for easy test automation.

---

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Deployment**: Vercel
- **State Management**: useState, useEffect (React Hooks)
- **Testing Ready**: Attributes added for tools like Jest + React Testing Library

---

## 🛠 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/doctor-finder.git

# Navigate into the directory
cd doctor-finder

# Install dependencies
npm install

# Start the development server
npm run dev

# 📁 Folder Structure

src/ ├── components/ # Reusable UI components ├── data/ # Doctor data (static or fetched) ├── pages/ # Main pages and routing └── utils/ # Helper functions
