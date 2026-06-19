# MIRROR — Your AI Creative Alter Ego

MIRROR is an AI-powered Creative Identity Platform that learns directly from a creator's existing content across platforms and builds their unique **"Style DNA."**

Instead of simply responding to prompts with generic, predictable text, MIRROR retrieves similar content and extracts style patterns to generate content in the creator's voice, guard brand consistency, bust creative blocks, and track how their identity evolves over time.

---

## 🚀 Key Features

*   **Style DNA Dashboard** (`/dashboard`): Comprehensive creative identity profile, radar metrics, platform-specific content attributes, and vocabulary/structure patterns.
*   **AI Alter Ego Generator** (`/alter-ego`): Generate content in your authentic voice with a split-pane interface comparing generic AI output vs MIRROR style-matched outputs.
*   **Consistency Guardian** (`/consistency`): Real-time brand voice audit, drift detection alerts, and style-fixing suggestions.
*   **Block Buster** (`/block-buster`): Creative block solver and content repurposing suite based on your content history.
*   **Evolution Tracker** (`/evolution`): Interactive timeline showing shifts in tone, vocabulary, and audience engagement metrics.
*   **Discovery Mode** (`/discover`): Step-by-step wizard for new creators to select interests, explore niches, build custom styles, and generate growth roadmaps.

---

## 🛠️ Technology Stack

*   **Framework**: React + Vite (non-interactive build setup)
*   **Routing**: TanStack Router (Typesafe filesystem routing)
*   **Animations**: Framer Motion (for premium 3D effects, scroll behaviors, and responsive navigation layouts)
*   **Styling**: Tailwind CSS (obsidian dark mode, custom glassmorphism)
*   **Icons**: Lucide React
*   **Charts**: Recharts (radar charts, evolution lines, and engagement bar graphs)

---

## 🧬 Technical Architecture: Style DNA Pipeline

```
[01 Ingestion] ──> [02 Embeddings] ──> [03 Factorization] ──> [04 DNA Profile] ──> [05 RAG Generation]
  YT, X, Blogs       Vector Space        cadence, tone         JSON Weights       Authentic alter ego
```

1.  **Multi-Source Ingestion**: YouTube transcripts, Instagram posts, X threads, newsletters, and podcasts are securely ingested.
2.  **Semantic Embedding**: Data is tokenized and embedded into high-dimensional vector spaces (e.g. BGE / OpenAI Embeddings).
3.  **Stylistic Factorization**: Classification algorithms score style factors (cadence, vocabulary, structure, and brand themes).
4.  **DNA Profile Synthesis**: Extracted weights are synthesized into a custom JSON-based DNA Profile.
5.  **RAG Generation Core**: User inputs trigger a prompt-tuning pipeline that merges Style DNA weights to generate output indistinguishable from the creator.

---

## 💻 Local Development

Follow these steps to run the project locally on your machine:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Setup and Running

1.  **Clone the workspace** and navigate into the project directory:
    ```bash
    cd MIRROR
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the local development server**:
    ```bash
    npm run dev -- --port 5173
    ```

4.  **Open in your browser**:
    Navigate to `http://localhost:5173` to explore the interactive landing page.

---
Developed for the MIRROR Creator Identity platform.
