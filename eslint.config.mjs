import nextConfig from "eslint-config-next";

const softenedReactRules = {
    "react-hooks/refs": "warn",
    "react-hooks/set-state-in-effect": "warn",
    "react-hooks/immutability": "warn",
    "import/no-anonymous-default-export": "off",
};

export default [
    ...nextConfig,
    {
        files: [
            "**/*.{js,jsx,ts,tsx}",
            "app/**",
            "components/**",
            "lib/**",
            "services/**",
        ],
        rules: softenedReactRules,
    },
];
