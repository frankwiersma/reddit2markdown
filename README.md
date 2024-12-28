# Reddit Thread to Markdown Converter

A beautiful and functional web app to convert Reddit threads into clean Markdown format for easy sharing, sentiment analysis, summarization, and more.

## Features

### 🌟 **Web Interface**
- **Interactive Input:** Paste any Reddit thread URL to get started.
- **One-Click Conversion:** Instantly transform Reddit threads into Markdown.
- **Copy-to-Clipboard:** Easily copy raw Markdown for further use.
- **Toggle View:** Switch between rendered and raw Markdown views.

### 📄 **Markdown Features**
- **Post Details:** Includes title, content, and author metadata.
- **Comment Parsing:** Processes nested Reddit comments with their original hierarchy.
- **Structured Output:** Formats the post and comments in a clean Markdown layout.

### 🚀 **Technology**
- **Frontend:** Built with React and Tailwind CSS for a responsive, modern design.
- **Backend:** Utilizes Reddit's public `.json` endpoint for seamless data fetching without authentication.
- **Deployment:** Hosted on Netlify for quick, scalable web delivery.

### 💻 **Local Execution**
For developers, this project also includes a Python script (`main.py`) to fetch and save Markdown files locally.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/frankwiersma/reddit2markdown.git
cd reddit2markdown
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Usage

1. Open the web app in your browser (`http://localhost:3000` when running locally).
2. Enter a Reddit thread URL in the input field.
3. Click "Convert" to generate the Markdown.
4. View the formatted Markdown or toggle to raw view.
5. Use the "Copy" button to save the Markdown to your clipboard.

---

## Demo

Visit the live app: [https://reddit2markdown.osint-app.com/](https://reddit2markdown.osint-app.com/)

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your branch.
4. Submit a pull request with a detailed description of your changes.

---

### Main Interface
A sleek, intuitive input field with a "Convert" button.

### Markdown Preview
- **Rendered View:** Displays the converted thread in formatted Markdown.
- **Raw View:** Shows the raw Markdown text.

---

## Key Highlights

- **No API Keys Required:** Access public Reddit data with no authentication hassle.
- **User-Friendly Design:** Built with a focus on clarity and simplicity.
- **Developer-Friendly:** Easily extendable and modular architecture.

