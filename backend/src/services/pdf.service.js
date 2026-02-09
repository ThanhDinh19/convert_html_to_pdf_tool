const puppeteer = require("puppeteer");

function injectPrintStyle(html) {
    const style = `
  <style>
    @media print {
      .no-break {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      section, table, figure, canvas {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      h1, h2, h3 {
        page-break-after: avoid;
      }

      .page-break {
        page-break-before: always;
        break-before: page;
      }
    }
  </style>
  `;

    if (html.includes("</head>")) {
        return html.replace("</head>", style + "</head>");
    }

    return style + html;
}

async function htmlToPdf(html) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  // Viewport rộng để layout giống màn hình
  await page.setViewport({
    width: 1400,
    height: 800
  });

  html = injectPrintStyle(html);
  await page.setContent(html, { waitUntil: "networkidle0" });

  // 🔑 ĐO CHIỀU CAO THẬT CỦA NỘI DUNG
  const bodyHeight = await page.evaluate(() => {
    return document.documentElement.scrollHeight;
  });

  // 🔥 TẠO PDF 1 TRANG DÀI
  const pdfBuffer = await page.pdf({
    printBackground: true,

    width: "1400px",
    height: `${bodyHeight}px`, // ← KEY LINE

    margin: {
      top: "0px",
      bottom: "0px",
      left: "0px",
      right: "0px"
    }
  });

  await browser.close();
  return pdfBuffer;
}


module.exports = { htmlToPdf };

