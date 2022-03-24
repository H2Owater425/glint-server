import "dotenv/config";
import App from "./app";
import Root from "./routers";
import Resigter from "./routers/register";

const app = new App([new Root(), new Resigter()]);

app.listen();
