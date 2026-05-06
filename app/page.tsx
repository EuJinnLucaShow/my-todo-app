import { HomeView } from "@/views/home-view";

export default async function Home({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ filter?: string }>;
}>) {
  const { filter } = await searchParams;

  return <HomeView filter={filter} />;
}
