import DatePicker, { DateObject } from "react-multi-date-picker";
import { useEffect, useState } from "react";
import formatDate from "../../helpers/formatDate";
import { Dispatch, SetStateAction } from "react";

interface EndDateSelectionProps {
  setEndDate: Dispatch<SetStateAction<string>>;
}

const EndDateSelection: React.FC<EndDateSelectionProps> = ({ setEndDate }) => {
  const [EndD, setEndD] = useState<Date | null>(null);

  const handleEndDateChange = (date: DateObject | null) => {
    if (date) {
      const jsDate = new Date(date.year, Number(date.month) - 1, date.day);
      setEndD(jsDate);
    } else {
      setEndD(null);
    }
  };

  useEffect(() => {
    if (EndD) {
      setEndDate(formatDate(EndD));
    } else {
      setEndDate("");
    }
  }, [EndD]);

  return (
    <div className="flex flex-col flex-1 gap-1">
      <label htmlFor="start_date" className="font-medium ml-2">
        Start Date
      </label>
      <DatePicker
        id="start_date"
        value={EndD ? new DateObject(EndD) : null}
        onChange={handleEndDateChange}
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

export default EndDateSelection;
