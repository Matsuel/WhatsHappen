import chalk from "chalk";

const colors = {
    error: "#FF0000",
    success: "#4BB543",
    infos: "#007aff"
}

export const color = (color, data) => {
    return chalk.hex(colors[color])(data);
}