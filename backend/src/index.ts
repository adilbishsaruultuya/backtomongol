import { connectToDataBase } from "./database";
import app from "./app";

const PORT = process.env.PORT || 5000;

connectToDataBase();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
