# Terminal Portfolio

A fully interactive, terminal-styled developer portfolio built with modern web technologies. This project simulates a
command-line interface (CLI) to showcase skills, projects, and professional background in a gamified format.

## 🚀 Features

- **Immersive Terminal Simulation**: Complete with boot sequences, typing effects, and a blinking cursor.
- **Interactive Command System**: navigate the portfolio using commands like `about`, `projects`, and `contact`.
- **Theming Engine**: Switch between visual styles including Matrix, Solarized, Hacker, and Light mode.
- **Accessibility First**: Fully navigable via keyboard, with a screen-reader friendly, SEO-optimized fallback page.
- **Modern Tech Stack**: Built on the bleeding edge of the React ecosystem.

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest + React Testing Library
- **Quality Control**: ESLint, Prettier, Husky (Git Hooks)
- **Deployment**: Vercel

## ⚡ Getting Started

### Prerequisites

- Node.js (v20+)
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/the-user-created/portfolio.git
    cd portfolio
    ```

2. **Install dependencies:**

    ```bash
    pnpm install
    ```

3. **Run the development server:**

    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. **Run Tests:**

    ```bash
    pnpm test
    ```

## ⌨️ Usage

Once the system boots, type `help` to see a list of available commands.

### Core Commands

| Command        | Description                                   |
| :------------- | :-------------------------------------------- |
| `help`         | Displays the list of available commands       |
| `about`        | Information about the developer               |
| `skills`       | Lists technical capabilities and stacks       |
| `projects`     | Displays a list of featured work              |
| `project <id>` | Shows details for a specific project          |
| `contact`      | Displays contact information and social links |
| `resume`       | Generates a download link for the PDF resume  |
| `clear`        | Clears the terminal screen                    |

### Theming

Change the look and feel of the terminal:

- `theme list`: See all available themes.
- `theme set <name>`: Apply a specific theme (e.g., `theme set matrix`).

## 📂 Project Structure

```text
.
├── src/
│   ├── app/             # Application entry points, layouts, and global styles
│   ├── components/      # Reusable React UI components (Terminal, Input, etc.)
│   ├── types/           # TypeScript definitions and interfaces
│   └── utils/           # Command parsing logic and helper functions
├── public/              # Static assets (images, fonts, icons)
└── [config files]       # Tooling configuration (Tailwind, ESLint, Vitest, etc.)
```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
