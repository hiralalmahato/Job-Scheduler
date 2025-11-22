# Job Scheduler with Visualization

A modern web-based job scheduler that demonstrates greedy algorithm implementation for maximizing total profit based on job deadlines.

## Project Structure

```
job-scheduler/
├── public/
│   └── index.html
├── src/
│   ├── backend/
│   │   └── job_scheduler.cpp
│   └── frontend/
│       └── js/
│           └── app.js
└── styles/
    └── style.css
```

## Setup Instructions

1. Install MinGW-w64 for C++ compilation
2. Run the compile script:
   ```bash
   compile_run.bat
   ```
3. Open `public/index.html` in your web browser

## Features

- Modern UI with Bootstrap 5
- JSON-based communication
- Job scheduling visualization
- Responsive design
- Error handling and validation

## Usage

1. Add jobs with ID (A-Z), deadline, and profit
2. Click "Run Scheduler" to see results
3. View timeline visualization and total profit
