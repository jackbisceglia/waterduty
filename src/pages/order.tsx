import { Dispatch, SetStateAction, useState } from "react";

import { NextPage } from "next";
import ServerState from "../components/ServerState";
import { WithId } from "mongodb";
import { trpc } from "../utils/trpc";

type OrderType = Partial<WithId<Document>> & {
  name: string;
  position: number;
};

type ModalPropTypes = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  list: OrderType[];
};

const ListOrder = ({ list }: { list: OrderType[] | undefined }) => {
  const { data, isLoading, isError } = trpc.useQuery(["order.get_next_two"], {
    refetchOnWindowFocus: false,
  });

  const getNameStyles = (name: string) => {
    if (name === onDutyToday!.name) {
      return "font-bold text-purple-600";
    } else {
      return "font-normal text-gray-700";
    }
  };

  const [onDutyToday, onDutyTomorrow] = data || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div className="py-10">
      {list!.map(({ _id, name, position }) => {
        return (
          <div
            className="text-3xl py-2 flex w-32 justify-center"
            key={_id!.toString()}
          >
            <p className={`capitalize ${getNameStyles(name)}`}>{name}</p>
          </div>
        );
      })}
    </div>
  );
};

const Modal = ({ show, setShow, list }: ModalPropTypes) => {
  const getVisibility = () => (show ? "absolute" : "hidden");

  return (
    <div
      className={`${getVisibility()} w-3/4 max-w-md min-w-[12rem] h-96 bg-gray-600 flex items-center justify-start py-4 px-6 flex-col rounded-md`}
    >
      <form
        className="flex flex-col justify-evenly h-full items-center"
        action=""
      >
        <p className="text-white text-lg font-semibold py-2">
          Edit On Duty Today
        </p>
        <div>
          {list.map(({ _id, name, position }) => (
            <div
              key={_id?.toString()}
              className="w-1/ py-2 flex justify-start w-full"
            >
              <input
                name="radio"
                type="radio"
                id={_id?.toString()}
                value={name}
                className="text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                className="capitalize text-white px-3 text-xl text-semibold"
                htmlFor={_id?.toString()}
              >
                {name}
              </label>
            </div>
          ))}
        </div>
        <button className="text-white bg-purple-600 hover:bg-purple-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2">
          Submit
        </button>
      </form>
      <button
        onClick={() => setShow((show) => !show)}
        className="font-semibold text-red-500 text-xl"
      >
        X
      </button>
    </div>
  );
};

const Order: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading, isError } = trpc.useQuery(["order.get_list"], {
    refetchOnWindowFocus: false,
  });
  return (
    <main className="container mx-auto flex flex-col items-center justify-center h-[80%] p-4">
      {isLoading || isError ? (
        <ServerState isError={isError} isLoading={isLoading} />
      ) : (
        <>
          <ListOrder list={data as OrderType[]} />
          <button
            onClick={() => setShowModal((showModal) => !showModal)}
            className="text-white bg-purple-600 hover:bg-purple-700  font-medium rounded-lg text-base px-5 py-2 text-center mr-2 my-2"
          >
            Edit
          </button>
          <Modal
            show={showModal}
            setShow={setShowModal}
            list={data as OrderType[]}
          />
        </>
      )}
    </main>
  );
};

export default Order;
