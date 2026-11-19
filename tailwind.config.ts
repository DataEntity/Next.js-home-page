import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#151515',
        paper: '#f4f0e8',
        muted: '#706b63',
        line: '#d8d0c4',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia'],
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('fine', '@media (hover: hover) and (pointer: fine)')
    }),
  ],
}

export default config
