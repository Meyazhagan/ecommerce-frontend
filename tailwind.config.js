module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx}", "./*.html"],
    theme: {
        extend: {
            fontFamily: {
                nunito: ["Nunito", "sans-serif"],
            },
        },
    },
    variants: {
        extend: {
            scrollbar: ["dark", "rounded"],
        },
    },
    plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};
