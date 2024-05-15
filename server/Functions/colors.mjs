import chalk from "chalk";

const colors = {
    error: "#FF0000",
    success: "#4BB543",
}

export const color = (color, data) => {
    return chalk.hex(colors[color])(data);
}