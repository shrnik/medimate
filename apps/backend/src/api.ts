import express from "express";
import { aiRouter } from "./chat";
import { CompletionRequestBody } from "./types";

const router = express.Router();

router.post("/completion", async (req, res) => {
  try {
    const { chat, patientInfo } = req.body as CompletionRequestBody;
    const { choices } = await aiRouter({ chat, patientInfo });
    const response = choices[0].message;
    res.json({ data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
