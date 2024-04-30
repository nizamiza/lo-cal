import Calendar from "@/components/Calendar";
import StatusMessageList from "@/components/StatusMessageList";
import IntroModal from "@/components/IntroModal";
import Footer from "@/components/Footer";
import Preferences from "@/contexts/Preferences";
import StatusMessages from "@/contexts/StatusMessages";

function App() {
  return (
    <Preferences>
      <StatusMessages>
        <div
          className="sr-only surface"
          role="presentation"
          id="theme-color-reference"
        />
        <main
          className={`
            @container/main
            min-h-screen flex flex-col justify-start gap-6 max-w-[86rem] mx-auto
            px-2 pt-2 pb-4 sm:px-4 sm:pt-4 sm:pb-8
          `}
        >
          <Calendar />

          <IntroModal />
        </main>
        <Footer />
        <StatusMessageList />
      </StatusMessages>
    </Preferences>
  );
}

export default App;
