import Header from "../components/Header";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex flex-1 pt-16"></main>
    </div>
  );
}
