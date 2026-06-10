# AI Job Application Assistant — Frontend

A React-based frontend for the AI Job Application Assistant. Built with React, Axios, and React Router.

## Features
- 📧 Email-based user session
- 📄 PDF resume upload with drag & drop
- 🤖 Triggers AI agents (Job Researcher, Resume Tailor, Cold Email Writer)
- 🔍 Job research results displayed as cards
- 📋 One-click copy for resume summary and cold email
- 🎨 Clean black theme UI

## Tech Stack
- React (Create React App)
- React Router DOM
- Axios
- CSS-in-JS (inline styles)

## Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Email input to get started |
| Upload | `/upload` | PDF resume upload |
| Results | `/results` | AI agent outputs |

## Getting Started

```bash
npm install
npm start
```

Runs on `http://localhost:3000`

## Backend
This frontend connects to the FastAPI backend at `http://127.0.0.1:8000`.
Make sure the backend is running before using the app.

Backend repo: [ai-job-assist](https://github.com/gautam-1910/ai-job-assist)