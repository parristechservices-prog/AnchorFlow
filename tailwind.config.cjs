module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        navy: '#1a2e4a',
        teal: '#2a7d8e',
        burnt: '#e07b39'
      }
    }
  },
  plugins: []
}
