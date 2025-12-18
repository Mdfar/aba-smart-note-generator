ABA Smart Note Generator

A professional tool designed for ABA therapy companies to automate insurance-compliant session documentation using AI.

Features

Goal Checklist: Dynamically convert text goals into actionable checkboxes.

Outcome Tracking: Track "Successful," "Partially Successful," or "Not Successful" status per goal.

AI Synthesis: Uses GPT-4o to transform raw checklist data into clinical, objective prose.

Export Ready: Clean formatting suitable for PDF export and electronic signatures.

Setup

Clone the repository.

Install dependencies: npm install.

Create a .env file and add: OPENAI_API_KEY=your_key_here.

Start the server: npm start.

Open http://localhost:3000 in your browser.

Workflow

Input: Therapist pastes individual client goals.

Execute: Therapist checks off goals worked on during the session.

Generate: AI builds the note following clinical standards.

Finalize: Review, edit, and export for the medical record.