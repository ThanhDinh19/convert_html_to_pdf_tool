export async function convertHtmlToPdf(html) {
  const res = await fetch("http://localhost:4000/api/convert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html })
  });

  if (!res.ok) throw new Error("Convert failed");
  return await res.blob();
}
