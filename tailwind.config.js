/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        NMSNeo1: ["NMSNeo1"],
        NMSNeo2: ["NMSNeo2"],
        NMSNeo3: ["NMSNeo3"],
        NMSNeo4: ["NMSNeo4"],
        NMSNeo5: ["NMSNeo5"],
        NMSNeo6: ["NMSNeo6"],
      },
      colors: {
        pointColor: "#0C54F3",
        boardColor: "#A8AFB5",
        secretColor: "#B9C0FF",
        grayColor: "#F2F2F2",
        cancelBtnColor: "#D9D9D9",
        bgColor: "#FBFBFB",
        borderColor: "#A2A2A2",
        textColor: "#464646",
        negativeColor: "#F01C1C",
        commentColor: "#E7E7E7",
        adminColor: "#686D69",
      },
    },
    screens: {
      desktop: "1024px",
      tablet: "790px",
    },
  },
  plugins: [],
};
