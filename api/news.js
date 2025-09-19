
export default async function handler(req, res) {
  const query = req.query.q || "latest";
  const page = req.query.page || 1;
  const category = req.query.category || "";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&q=${query}&&apiKey=${process.env.NEWS_API_KEY}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
