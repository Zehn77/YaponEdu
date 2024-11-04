import { Dispatch, SetStateAction } from "react";

export interface Group {
  id: number;
  name?: string;
  createdAt?: string;
  endDate?: string;
  startDate?: string;
}

interface DeleteModalProps {
  onClose: Dispatch<SetStateAction<void>>;
  group: Group | null | undefined;
  deleteGroup: Dispatch<SetStateAction<void>>;
}

const DeletingModal: React.FC<DeleteModalProps> = ({
  onClose,
  group,
  deleteGroup,
}) => {
  return (
    <>
      <h3 className="text-red-500 font-bold text-lg">Deleting Modal</h3>
      <p className="italic mt-2">
        Do you want to delete{" "}
        <span className="font-semibold text-red-500">{group?.name}</span> group?
      </p>
      <div className="mt-6 flex items-center justify-end">
        <button
          onClick={() => {
            onClose();
          }}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            onClose();
            deleteGroup();
          }}
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default DeletingModal;
