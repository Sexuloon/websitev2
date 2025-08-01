import AllCollections from "@/components/view/AllCollections";
import SideShow from "@/components/ui/sidebar";
import MainPage from "@/components/ui/mainpage";
import Bot from "@/components/view/bot/bot";
import CleanCartInfo from "@/lib/cleanCartInfo";

export default function Home() {
  return (
    <main className="relative">
      <CleanCartInfo />
      <section>
        <AllCollections />
      </section>
      <section className="relative">
        <SideShow />
      </section>
      <section className="relative">
        <MainPage />
      </section>
      <section>
        <Bot />
      </section>
    </main>
  );
}
