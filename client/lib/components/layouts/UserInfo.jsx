"use client";
import React, { useState } from "react";

function UserBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({
    user_id: "",
    email: "",
    user_name: "",
    description: "",
    created_at: "",
    updated_at: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <button
        onClick={openModal}
        className="p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Open User Info
      </button>
      <UserInfoModal user={user} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

function UserInfoModal({ user, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Information
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">User ID: {user.user_id}</p>
                <p className="text-sm text-gray-500">Email: {user.email}</p>
                <p className="text-sm text-gray-500">Name: {user.user_name}</p>
                <p className="text-sm text-gray-500">
                  Description: {user.description}
                </p>
                <p className="text-sm text-gray-500">
                  Created At: {user.created_at}
                </p>
                <p className="text-sm text-gray-500">
                  Updated At: {user.updated_at}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserBtn;
