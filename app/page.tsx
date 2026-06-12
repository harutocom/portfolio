import Home from './components/Home';
import { fetchZennArticles } from './lib/zenn';

export const revalidate = 3600;

export default async function Page() {
  const articles = await fetchZennArticles();
  return <Home articles={articles} />;
}
