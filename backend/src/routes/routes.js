const express = require("express");
const { htmlToPdf } = require("../services/pdf.service");

const router = express.Router();

router.post("/convert", async (req, res) => {
  try {
    const { html } = req.body;

    if (!html) {
      return res.status(400).json({ message: "HTML is required" });
    }

    const pdfBuffer = await htmlToPdf(html);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf"
    });

    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
