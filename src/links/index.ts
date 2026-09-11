export const resolveImageUrl = (path?: string | null) => {
  const trimmed = path?.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("blob:") || trimmed.startsWith("data:")) return trimmed;
  return `${trimmed.replace(/^\/+/, "")}`;
};

const links = {
  resolveImageUrl,
  analyticsGoogle: "G-C9TEK9BS4C",
  siteURL: process.env.NEXT_PUBLIC_FRONTEND_HOST || "https://meu-website-demo.vercel.app",
  apiEndpoint: process.env.NEXT_PUBLIC_BACKEND_HOST || "",
};

export default links;
