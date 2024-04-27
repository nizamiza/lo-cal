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
          <main className="min-h-screen flex flex-col justify-between px-4 pt-4 pb-8 gap-6">
            <Calendar />
          </main>
          <StatusMessageList />
        </StatusMessages>
      </IntlHelpers>
    </Preferences>
  );
}

export default App;
