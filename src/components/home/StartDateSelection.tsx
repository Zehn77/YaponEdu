import DatePicker, { DateObject } from "react-multi-date-picker";
import { useEffect, useState } from "react";
import formatDate from "../../helpers/formatDate";
import { Dispatch, SetStateAction } from "react";

interface StartDateSelectionProps {
  setStartDate: Dispatch<SetStateAction<string>>;
}

const StartDateSelection: React.FC<StartDateSelectionProps> = ({
  setStartDate,
}) => {
  const [startD, setStartD] = useState<Date | null>(null);

  const handleStartDateChange = (date: DateObject | null) => {
    if (date) {
      const jsDate = new Date(date.year, Number(date.month) - 1, date.day);
      setStartD(jsDate);
    } else {
      setStartD(null);
    }
  };

  useEffect(() => {
    if (startD) {
      setStartDate(formatDate(startD));
    } else {
      setStartDate("");
    }
  }, [startD]);

  return (
    <div className="flex flex-col flex-1 gap-1">
      <label htmlFor="start_date" className="font-medium ml-2">
        Start Date
      </label>
      <DatePicker
        id="start_date"
        value={startD ? new DateObject(startD) : null}
        onChange={handleStartDateChange}
        style={{
          textAlign: "center",
          width: "120px",
          fontWeight: "normal",
          height: "20px",
        }}
      />
    </div>
  );
};

export default StartDateSelection;
