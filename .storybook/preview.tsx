import type {Preview} from "@storybook/nextjs-vite";
import React from "react";
import "../src/styles/globals.css";

const preview: Preview = {
    globalTypes: {
        theme: {
            name: "Theme",
            description: "Global theme for all stories",
            defaultValue: "light",
            toolbar: {
                icon: "circlehollow",
                items: [
                    {value: "light", title: "Light", right: "☀️"},
                    {value: "dark", title: "Dark", right: "🌙"},
                ],
                dynamicTitle: true,
            },
        },
    },
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: "todo",
        },
    },
    decorators: [
        (Story, {globals}) => {
            const theme = globals.theme || "light";

            return (
                <div className={theme === "dark" ? "dark" : ""}>
                    <Story/>
                </div>
            );
        },
    ],
};

export default preview;
