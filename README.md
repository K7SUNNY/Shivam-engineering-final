# Shivam Engineering - Redesigned Corporate Website

A modern, highly polished, and fully accessible corporate website for **Shivam Engineering**, a premier pipeline solutions and infrastructure engineering company since 2019. 

The website has been redesigned from the ground up utilizing the **Professional Design System** foundations to convey engineering precision, industrial quality, and trustworthiness.

---

## 🎨 Visual Identity & Design System

The redesign features a bold, high-contrast industrial aesthetic tailored specifically for heavy infrastructure and pipeline systems:

*   **Colors**:
    *   **Primary Gold (`#FECE14`)**: Represents pipeline grids, welding arcs, and industrial standards.
    *   **Secondary Deep Black (`#000000`)**: Conveys solidity, strength, and premium engineering focus.
    *   **Neutrals (`#111827` to `#F9FAF9`)**: Slate shades that ensure clean layout borders and content scannability.
*   **Typography**:
    *   **Poppins**: Modern geometric sans-serif used for headers and descriptive layouts.
    *   **IBM Plex Mono**: Technical monospace used for numbers, statistics counters, and cost calculation values to convey mathematical precision.
*   **Aesthetics**: Glassmorphism navigation panel, subtle micro-animations (slide-ins, scale reveals on scroll), clean structural cards, and high-tech inline SVG pipeline blueprint layouts.

---

## 🚀 Key Redesigned Features

1.  **Glassmorphic Navigation (Shrinking Header)**:
    *   Uses modern CSS scroll-driven animations (`animation-timeline: scroll(block root)`) to dynamically shrink navigation height and darken background overlays on scroll.
    *   Integrates a customized JavaScript fallback for browsers without native support (Firefox, older Safari/Chrome versions) to ensure visual parity.
2.  **Interactive Pipeline Cost Calculator Widget**:
    *   Located on the Contact page (`contact.html`).
    *   Computes instant low and high cost ranges in Indian Rupees (Lakhs/Crores) based on laying length (km), pipe diameter (4" to 12"), material choice (Steel, Stainless Steel, HDPE, PVC), and terrain complexity (Rural, Urban, Mountain, Underwater).
    *   Includes an "Include in Inquiry" button that formats and copies estimate details directly into the quote form.
3.  **Filterable Projects Portfolio Grid**:
    *   Located on the Projects page (`projects.html`).
    *   Allows clients to sort and filter through gas pipeline loops, completed installations, and ongoing projects instantly without reloading pages.
4.  **Interactive FAQ Accordion Section**:
    *   Located on the Services page (`services.html`).
    *   Built using semantic HTML `<details>` and `<summary>` elements, providing fully accessible, native, keyboard-navigable accordions with custom rotation triggers.
5.  **A11y (Accessibility) Core Setup**:
    *   Keyboard-friendly focus rings (`outline: 3px solid var(--primary); outline-offset: 2px;`) across all inputs and interactive anchors.
    *   "Skip to main content" links for screen reader navigations.
    *   ARlA labeling structures and keyboard shortcuts (Escape closes the mobile navigation panel).

---

## 📂 Project Structure

```text
├── index.html            # Home page (Hero, Stats, Core Services, Why Choose Us)
├── about.html            # About Us page (Company Story, Team, Mission/Vision, Core Values)
├── services.html         # Services detail grid and interactive FAQ Accordion
├── projects.html         # Projects portfolio grid with filter buttons and SVG blueprints
├── contact.html          # Contact form and the interactive Pipeline Cost Calculator
├── contact.php           # Backend PHP form handler (sends HTML inquiries to company and customer)
├── scripts/
│   └── main.js           # Navigation, counters, filter logic, and calculator calculations
└── styles/
    ├── variables.css     # CSS variable tokens (Colors, typography, space units, shadows)
    ├── main.css          # Main common layout, typography resets, nav, footer, animations
    ├── about.css         # Page-specific styles for leadership cards and value icons
    ├── services.css      # Page-specific styles for service features and FAQs
    ├── projects.css      # Page-specific styles for filters, badges, and blueprints
    └── contact.css       # Page-specific styles for forms, floating labels, and widget inputs
```

---

## 🔧 Setup & Deployment

### Local Development
To view the site locally, launch any static local web server inside the workspace root:

*   Using VS Code: Install **Live Server** extension and click "Go Live".
*   Using Python:
    ```bash
    python3 -m http.server 8000
    ```
*   Using Node.js / npm:
    ```bash
    npx serve .
    ```

### PHP Mailer Configuration
For the contact form to dispatch email notifications (`contact.php`):
1.  Upload the codebase to a web host supporting PHP (e.g., Apache, Nginx with PHP-FPM).
2.  Ensure that the mail server configuration (`sendmail` or custom SMTP server details) is configured in the environment's `php.ini`.
3.  Form submissions send HTML records directly to `info@shivamengineering.in` and dispatch an automated acknowledgment receipt back to the client.
