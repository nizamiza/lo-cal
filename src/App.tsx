import Calendar from "@/components/Calendar";
import Preferences from "@/contexts/Preferences";
import IntlHelpers from "@/contexts/IntlHelpers";

function App() {
  return (
    <Preferences>
      <IntlHelpers>
        <Calendar />
      </IntlHelpers>
    </Preferences>
  );
}

export default App;
