import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectDB();
    console.log(" Database connected");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
  }
}

startServer();
