import { useState, useEffect } from "react";

// 1. Define the shape of one article
interface Article {
  category: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  image: string;
}

export default function Noticias() {
  // 2. Tell useState what type the array holds
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  // 3. Error state holds a string or null
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/rss/cat/masculino").then((r) => r.text()),
      fetch("/rss/cat/femenino").then((r) => r.text()),
    ])
      .then(([menXml, womenXml]) => {
        const menArticles   = parseRss(menXml,  "masculino").slice(0, 2);
        const womenArticles = parseRss(womenXml, "femenino").slice(0, 2);

        setArticles([...menArticles, ...womenArticles]);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center", padding: "2rem" }}>Cargando noticias…</p>;
  if (error)   return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "28px",
      padding: "20px 24px 24px",
    }}>
      {articles.map((article, i) => (
        <NewsCard key={i} article={article} />
      ))}
    </div>
  );
}

// 4. Type the props with the interface we made above
interface NewsCardProps {
  article: Article;
}

function NewsCard({ article }: NewsCardProps) {
  const [imgBroken, setImgBroken] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <hr className="mb-10 border-brand-gray-light" />

      <div style={{ height: 280, overflow: "hidden" }}>
        {article.image && !imgBroken ? (
          <img
            src={article.image}
            alt={article.title}
            onError={() => setImgBroken(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <img
            src="https://pbs.twimg.com/media/GxwEjq0XIAALuQp.jpg"
            alt={article.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      <div style={{ paddingTop: 12 }}>
        <h2 style={{ fontSize: 15, fontWeight: 400, margin: 0, lineHeight: 1.3 }}>
          {article.title}
        </h2>
        <p style={{ fontSize: 13, color: "#888", margin: "6px 0 0" }}>
          {article.description}
        </p>
      </div>
    </div>
  );
}

// 5. Return type is Article[] so TypeScript knows what comes out
function parseRss(xml: string, category: string): Article[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");

  return Array.from(doc.querySelectorAll("item")).map((item): Article => {
    const rawDesc = item.querySelector("description")?.textContent ?? "";
    const imgMatch = rawDesc.match(/<img[^>]+src=["']([^"']+)["']/i);
    const image =
      item.querySelector("enclosure")?.getAttribute("url") ??
      item.querySelector("content")?.getAttribute("url")  ??
      imgMatch?.[1] ??
      "";

    return {
      category,
      title:       item.querySelector("title")?.textContent?.trim() ?? "",
      description: rawDesc.replace(/<[^>]*>/g, "").trim().slice(0, 200),
      link:        item.querySelector("link")?.textContent ?? "#",
      pubDate:     item.querySelector("pubDate")?.textContent ?? "",
      image,
    };
  });
}