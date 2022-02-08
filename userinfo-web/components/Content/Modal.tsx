import { useWeb3React } from "@web3-react/core";
import React from "react";
import { IQFirstContract, IQFirstContract__factory } from "typechains";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const { library } = useWeb3React()
  async function handleSubmit(e:any) {
    e.preventDefault();
    const text = e.target[0].value;
    const IQFirstContract: IQFirstContract = new IQFirstContract__factory()
      .attach("0xE53517b2Dde7556F80F3Db71a5f2EeEe97f7647d")
      .connect(library.getSigner())
      const res =  await IQFirstContract.addMessage(text)
      setShowModal(false);
      // try {
      //  const res =  await IQFirstContract.addMessage(text)
      //   console.log("res",res)
      // } catch (error) {
        //// when cancel process
      //   console.log('error :>> ', error);
      // }
  }
  return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() =>setShowModal(true)}
      >
        Say Hi !
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form className="flex w-full max-w-sm space-x-3" onSubmit={handleSubmit}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Say Hi! to Everyone
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                <div className="col-span-2">
                        <label className="text-gray-700" htmlFor="name">
                            <textarea required maxLength={250} className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="comment" placeholder="Write your message" name="comment" rows={5} cols={40}>
                            </textarea>
                        </label>
                    </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </div>
                </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
      ) : null}
    </>
  );
}