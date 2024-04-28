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
              min-h-screen flex flex-col justify-start px-4 pt-4 pb-8 gap-6
              max-w-[86rem] mx-auto
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
