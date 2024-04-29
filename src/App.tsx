import Calendar from "@/components/Calendar";
import StatusMessageList from "@/components/StatusMessageList";
import Preferences from "@/contexts/Preferences";
import IntlHelpers from "@/contexts/IntlHelpers";
import StatusMessages from "@/contexts/StatusMessages";

function App() {
  return (
    <Preferences>
      <IntlHelpers>
        <StatusMessages>
          <main
            className={`
              @container/main
              min-h-screen flex flex-col justify-start gap-6 max-w-[86rem] mx-auto
              px-2 pt-2 pb-4 sm:px-4 sm:pt-4 sm:pb-8
            `}
          >
            <Calendar />
          </main>
          <StatusMessageList />
        </StatusMessages>
      </IntlHelpers>
    </Preferences>
  );
}

export default App;
