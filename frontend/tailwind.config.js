/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink:          '#0d0d14',
        surface:      '#13131f',
        card:         '#1a1a2e',
        border:       '#2a2a45',
        accent:       '#6c63ff',
        'accent-dim': '#4a43cc',
        muted:        '#6b7280',
        success:      '#22c55e',
        danger:       '#ef4444',
      },
      keyframes: {
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: 0 },
          to:   { transform: 'translateY(0)',    opacity: 1 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        scaleIn: {
          from: { transform: 'scale(0.95)', opacity: 0 },
          to:   { transform: 'scale(1)',    opacity: 1 },
        },
      },
      animation: {
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in':  'fadeIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};