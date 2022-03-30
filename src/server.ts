import "dotenv/config";
import App from "./app";
import Root from "./routers/root";
import Resigter from "./routers/register";

const app = new App();

app.listen();
