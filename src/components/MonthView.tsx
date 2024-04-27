import { usePreference } from "@/contexts/Preferences";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function MonthView() {
  const [firstDayOfWeek] = usePreference("first-day-of-week");
  const [lastVisitedDate] = usePreference("last-viewed-date");

  const weekDays = WEEK_DAYS.slice(firstDayOfWeek).concat(
    WEEK_DAYS.slice(0, firstDayOfWeek)
  );

  const currentDate = new Date(lastVisitedDate);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const missingSquareCount = weekDays.length - (daysInMonth % weekDays.length);

  return (
    <section className="grid">
      <ul className="grid grid-cols-7">
        {weekDays.map((day, index) => (
          <li
            key={index}
            className={`
              p-1 sm:p-2 text-sm md:text-base lg:text-lg
              ${index < weekDays.length - 1 ? "border-r border-indigo-300" : ""}
              ${index > 0 ? "border-l border-indigo-300" : ""}
              ${index === weekDays.length - 1 ? "bg-indigo-600 text-white" : "bg-indigo-200"}
            `}
          >
            {day}
          </li>
        ))}
      </ul>
      <ul className="grid grid-cols-7">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <li
            key={day}
            className={`
              flex flex-col justify-start items-start 
              p-1 sm:p-2 bg-gray-50 border border-gray-200 aspect-square
            `}
          >
            <span className="text-xs sm:text-sm">{day}</span>
          </li>
        ))}
        {Array.from({ length: missingSquareCount }, (_, i) => i + 1).map(
          (_, index) => (
            <li
              key={index}
              className={`
                border-t border-gray-200 aspect-square
                ${index === 0 ? "border-l" : ""}
              `}
              role="presentation"
            ></li>
          )
        )}
      </ul>
    </section>
  );
}
