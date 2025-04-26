// import AllCollections from "@/components/view/AllCollections";
import SideShow from "@/components/ui/sidebar";
import MainPage from "@/components/ui/mainpage";
import Navbar from "@/components/view/Navbar";
import Bot from "@/components/view/bot/bot";

export default function Home() {
  return (
    <main className="relative">
      <nav>
        <Navbar />
      </nav>
      <section>
        <SideShow />
      </section>

      <section>
        <MainPage />
      </section>

      <section>{/* <AllCollections /> */}</section>

      <section>
        <Bot/>
      </section>
    </main>
  );
}
