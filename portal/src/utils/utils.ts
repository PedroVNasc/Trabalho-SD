import { NAME } from "../config/constants";

const MS_TO_S = 1000;

export const sleep = async (seconds : number) => {
    await new Promise(resolve => setTimeout(resolve, seconds * MS_TO_S));
};

export const conlog = (...args: any[]) => {
    const timestamp = new Date().toISOString();

    console.log(`[${NAME} - ${timestamp}] `, ...args);
};