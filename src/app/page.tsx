import AllCollections from "@/components/view/AllCollections";
import SideShow from "@/components/ui/sidebar";
import MainPage from "@/components/ui/mainpage";
import Bot from "@/components/view/bot/bot";
import ActionToast from "@/components/view/ActionToaster";


export default function Home() {
  return (
    <main className="relative">
      <section>
        <AllCollections />
      </section>
      <section>
        <SideShow />
      </section>
      <section>
        <MainPage />
      </section>
      <section>
        <Bot />
      </section>
      <section>
        <ActionToast/>
      </section>
    </main>
  );
}
