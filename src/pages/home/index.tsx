import { useMutation } from "@tanstack/react-query";
import { getGroupsList } from "../../services/networkServices/networkService";
import { useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import formatTimestamp from "../../helpers/formatTimestamp";
import Modal from "react-responsive-modal";
import { useState } from "react";
import DeletingModal from "../../components/home/DetelingModal";
import { Group } from "../../components/home/DetelingModal";
import { ClipLoader } from "react-spinners";
import { deleteGroup as doDeleteGroup } from "../../services/networkServices/networkService";
import { toast } from "react-toastify";
import { IoIosAddCircle } from "react-icons/io";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState<Group | null>();
  const [isLoading, setIsLoading] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const mutation = useMutation({
    mutationFn: getGroupsList,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  function deleteGroup() {
    setIsLoading(true);
    doDeleteGroup(selectedGroup!.id)
      .then(() => {
        mutation.mutate();
        setIsLoading(false);

        toast.success("You have successfully deleted the group!");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("Problem to delete the group, please try again!");
      });
  }

  return (
    <>
      <div className="relative overflow-x-auto my-8 p-4">
        {(mutation.isPending || isLoading) && (
          <div className="min-h-screen flex justify-center mt-12">
            <ClipLoader size={120} color="#36d7b7" speedMultiplier={1.2} />
          </div>
        )}
        {!mutation.isPending && !isLoading && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Create At
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-green-500 flex justify-center"
                >
                  <button>
                    <IoIosAddCircle className="w-[30px] h-[30px] hover:opacity-90" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {mutation.data?.object?.map((item: Group) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-100 group transition duration-200 ease-in-out transform hover:scale-[1.01]"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap"
                  >
                    {item.id}.
                  </th>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">
                    {item.createdAt ? formatTimestamp(item.createdAt) : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {item.startDate ? item.startDate : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {item.endDate ? item.endDate : "-"}
                  </td>
                  <td className="px-6 py-4 flex gap-4 items-center justify-center">
                    <button onClick={() => {}}>
                      <LuPencil className="w-[16px] h-[16px] hover:text-yellow-500 hover:scale-110 cursor-pointer" />
                    </button>
                    <button
                      onClick={() => {
                        onOpenModal();
                        setSelectedGroup(item);
                      }}
                    >
                      <LuTrash2 className="w-[16px] h-[16px] hover:text-red-500 hover:scale-110 cursor-pointer" />
                    </button>
                  </td>
                  <Modal
                    open={open}
                    onClose={onCloseModal}
                    center
                    classNames={{
                      modal: "delete-modal",
                      overlay: "dark-overlay",
                    }}
                  >
                    <DeletingModal
                      deleteGroup={deleteGroup}
                      group={selectedGroup}
                      onClose={onCloseModal}
                    />
                  </Modal>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
