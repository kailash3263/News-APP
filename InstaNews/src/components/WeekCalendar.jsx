import { useNavigate } from "react-router-dom";

function WeekCalendar({selectedDate}) {
  const navigate = useNavigate();

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    
    date.setDate(today.getDate() - index);
    
    const dateString = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0")
    ].join("-");
    
    return {
      date,
      dateString,
      day: date.getDate()
    };
  }).reverse();
  
  const handleDateClick = (dateString) => {
    console.log(selectedDate);
    const date = new Date();
    if(parseInt(dateString.slice(-2)) != date.getDate()){
      navigate(`/news/${dateString}`);
    }else{
      navigate(`/`);
    }
    // setSelectedDate(dateString);
  };

  return (
    <section className="week-calendar" aria-label="Select a news date">
      <h6 className="week-calendar__month">
        {today.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h6>

      {/* Dates */}
      <div className="week-calendar__dates">
        {dates.map((item) => (
          <button
            key={item.dateString}
            onClick={() => handleDateClick(item.dateString)}
            aria-label={`News for ${item.date.toLocaleDateString()}`}
            className={`week-calendar__date 
            ${selectedDate === item.dateString? "text-black bg-white": ""}`}
          >
            {item.day}
          </button>
        ))}
      </div>

      {/* TODAY */}
        
    </section>
  );
}

export default WeekCalendar;