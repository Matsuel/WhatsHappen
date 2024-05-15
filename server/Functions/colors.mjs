import chalk from "chalk";

const colors = {
    error: "#FF0000",
    warning: "#FFA500",
    success: "#008000",
    info: "#0000FF"
}

export const color = (color, data) => {
    return chalk.hex(colors[color])(data);
}