const SUPABASE_URL = "https://zsjcprfyefnckkzndygr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzamNwcmZ5ZWZuY2trem5keWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NTI3MDksImV4cCI6MjA2NTAyODcwOX0.Acfyj7KPEAYNqwoBPUyXF2IB-_0P0KJv-74lDlF3VG0";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

async function fetchArticles(order = "created_at.desc") {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/articles?select=*&order=${order}`, {
    headers,
  });
  const articles = await res.json();

  const container = document.getElementById("articles");
  container.innerHTML = articles
    .map((a) => `
      <article>
        <h3>${a.title}</h3>
        <h4>${a.subtitle}</h4>
        <p><strong>${a.author}</strong> – ${new Date(a.created_at).toLocaleDateString("pl-PL")}</p>
        <p>${a.content}</p>
      </article>
    `)
    .join("");
}

document.getElementById("sort").addEventListener("change", (e) => {
  fetchArticles(e.target.value);
});

document.getElementById("articleForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  const payload = {
    title: form.title.value,
    subtitle: form.subtitle.value,
    author: form.author.value,
    content: form.content.value,
    created_at: form.created_at.value || new Date().toISOString(),
  };

  await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  form.reset();
  fetchArticles();
});

fetchArticles();
