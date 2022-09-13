import "dotenv/config"
import "reflect-metadata"

import { Database } from "./data/database";
import { Application } from "./web/application";

console.clear()
export async function Bootstrap() {

    await new Database().connect();
    new Application().Setup();
}

Bootstrap();