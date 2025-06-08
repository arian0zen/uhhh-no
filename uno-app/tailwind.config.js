/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        uno: {
          primary: '#4F46E5',    // Indigo-600 as primary
          secondary: '#6366F1',  // Indigo-500 for secondary
          accent: '#818CF8',     // Indigo-400 for accents
          background: '#F5F3FF', // Indigo-50 for background
          surface: '#FFFFFF',    // Keep white surface
          text: {
            primary: '#1E1B4B',  // Indigo-950 for primary text
            secondary: '#4338CA', // Indigo-700 for secondary text
          }
        }
      },
      fontFamily: {
        primary: ["Montserrat"],
        "primary-bold": ["Montserrat-Bold"],
        "primary-light": ["Montserrat-Light"],
        "primary-medium": ["Montserrat-Medium"],
        "primary-semibold": ["Montserrat-SemiBold"],
        "primary-thin": ["Montserrat-Thin"],
        "primary-extralight": ["Montserrat-ExtraLight"],
        "primary-extrabold": ["Montserrat-ExtraBold"],
        poppins: ["Poppins"],
      }
    },
  },
  plugins: [],
};
