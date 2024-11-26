import express from "express";
import { aiRouter } from "./chat";

const router = express.Router();

router.get("/completion", async (req, res) => {
  try {
    const { query } = req.query;
    const { choices } = await aiRouter([
      {
        role: "user",
        content: [
          {
            type: "text",
            text: query as string,
          },
        ],
      },
    ]);
    const response = choices[0].message;
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
