const API_URL = "http://10.0.0.236:4000/api";
// const API_URL = "http://localhost:4000/api";

export async function convertHtmlToPdf(html) {
  const res = await fetch(`${API_URL}/convert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html })
  });

  if (!res.ok) throw new Error("Convert failed");
  return await res.blob();
}
