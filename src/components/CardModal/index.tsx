import { Card } from 'components/Home/Index'
import React from 'react'

const CardModal = (props) => {
  const { selectedItem, setShowModal, showModal } = props
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-auto max-w-3xl">
          <div className="relative flex w-full flex-col rounded bg-white shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5">
              <h3 className="w-full pl-6 text-center text-4xl font-semibold">
                {selectedItem.title}
              </h3>
              <button
                className="float-right ml-auto border-0 p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block h-6 w-6 text-2xl text-black outline-none focus:outline-none">
                  X
                </span>
              </button>
            </div>
            <div className="flex w-full justify-center">
              <img className="h-40 w-40" src={selectedItem.image} />
            </div>
            <div className="flex w-full flex-wrap justify-center px-10">
              <p className="my-1 text-lg leading-relaxed text-black">
                Description:
              </p>
              <p className="my-4 text-lg leading-relaxed text-black">
                {selectedItem.description}
              </p>
            </div>
            <div>
              <p className="w-full text-center my-1 text-lg text-black">
                Ingredients:
              </p>
              <div className="w-full flex justify-center">
                {selectedItem.ingredients.map((item: Array<string>, index) => {
                  return (
                    <p className="p-2" key={index}>
                      {item}
                    </p>
                  )
                })}
              </div>
            </div>
            <div className="flex items-center justify-center p-6">
              <button
                className="px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default CardModal
