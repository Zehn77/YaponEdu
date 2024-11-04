import { createGroup } from "../../services/networkServices/networkService";
import { toast } from "react-toastify";
import { FormEvent } from "react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import StartDateSelection from "./StartDateSelection";
import EndDateSelection from "./EndDateSelection";
import { ClipLoader } from "react-spinners";

interface CreatingGroupModalProps {
  onClose: Dispatch<SetStateAction<void>>;
  redownloadGroupsList: Dispatch<SetStateAction<void>>;
}

const CreatingGroupModal: React.FC<CreatingGroupModalProps> = ({
  onClose,
  redownloadGroupsList,
}) => {
  const [groupName, setGroupName] = useState("");
  const [creatorId, setCreatorId] = useState("2");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleOnsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name: groupName,
      startDate,
      endDate,
      creatorId: Number(creatorId),
    };
    setIsLoading(true);
    createGroup(body)
      .then((res) => {
        if (res.success) {
          toast.success("Group muvaffaqqiyatli qo'shildi!");
          onClose();
          redownloadGroupsList();
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error(
          "Group qo'shishda xatolik sodir bo'ldi, iltimos boshqattan harakat qiling!"
        );
      });
  };

  useEffect(() => {
    if (groupName && creatorId && startDate && endDate) {
      setReadyToSubmit(true);
    } else {
      setReadyToSubmit(false);
    }
  }, [groupName, creatorId, startDate, endDate]);

  return (
    <form onSubmit={handleOnsubmit}>
      <h3 className="text-green-500 font-bold text-xl">Creating Group</h3>
      <div className="mt-3">
        <label
          htmlFor="group_name"
          className="block mb-2 font-medium text-gray-900 "
        >
          Group Name
        </label>
        <input
          type="text"
          id="group_name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="bg-gray-50 border font-semibold border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter the Group name..."
          required
        />
      </div>
      <div className="flex justify-around mt-3">
        <StartDateSelection setStartDate={setStartDate} />

        <EndDateSelection setEndDate={setEndDate} />
      </div>

      <div className="mt-6">
        <label
          htmlFor="creator_id"
          className="block mb-2 font-medium text-gray-900 "
        >
          Creator Id
        </label>
        <input
          type="number"
          id="creator_id"
          value={creatorId}
          onChange={(e) => setCreatorId(e.target.value)}
          className="bg-gray-50 font-semibold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter the Creator Id..."
          required
        />
      </div>

      <div className="flex items-center justify-center mt-5">
        <button
          type="submit"
          disabled={!readyToSubmit}
          className={clsx(
            "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none",
            {
              "bg-gray-500 hover:bg-gray-500": !readyToSubmit,
              hidden: isLoading,
            }
          )}
        >
          Create
        </button>
        {isLoading && (
          <button
            type="submit"
            disabled
            className={clsx(
              "text-white flex items-center justify-center gap-2 bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none"
            )}
          >
            Creating...
            <ClipLoader color="white" size={20} />
          </button>
        )}
      </div>
    </form>
  );
};

export default CreatingGroupModal;
