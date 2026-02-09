import { useState } from "react";
import { convertHtmlToPdf } from "../api/api";
import "./index.css";

export default function IndexPage() {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const blob = await convertHtmlToPdf(html);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "report.pdf";
      a.click();
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleImportHtml = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".html")) {
      alert("Please select an HTML file");
      return;
    }

    const reader = new FileReader();
    reader.onload = ev => setHtml(ev.target.result);
    reader.readAsText(file);
  };

  return (
    <div className="page">
      <h2>HTML → PDF Converter</h2>

      <div className="file-input">
        <label>
          Import HTML file
          <input type="file" accept=".html" onChange={handleImportHtml} />
        </label>
      </div>

      <textarea
        className="html-input"
        placeholder="Paste HTML here"
        value={html}
        onChange={e => setHtml(e.target.value)}
      />

      <div className="actions">
        <button onClick={handleConvert} disabled={loading || !html}>
          {loading ? "Converting..." : "Convert to PDF"}
        </button>
      </div>

      {html && (
        <div className="preview">
          <div className="preview-title">Preview</div>
          <iframe title="preview" srcDoc={html} />
        </div>
      )}
    </div>
  );
}
