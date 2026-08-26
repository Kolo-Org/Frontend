import React, { useState } from "react";
import { Modal } from "../common/Modal/Modal";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (emailOrPhone: string) => void;
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  isOpen,
  onClose,
  onInvite,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError("Please enter an email address or phone number.");
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    const isPhone = /^\+?[0-9]{10,15}$/.test(trimmed);

    if (!isEmail && !isPhone) {
      setError("Please enter a valid email address or phone number.");
      return;
    }

    setError("");
    onInvite(trimmed);
    setInputValue("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Member">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="invite-input"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email or Phone Number
          </label>
          <input
            id="invite-input"
            type="text"
            className={`w-full px-4 py-3 rounded-xl border ${error ? "border-red-500" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-green-500`}
            placeholder="e.g. user@example.com or +234..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (error) setError("");
            }}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl font-medium text-white bg-[#047857] hover:bg-[#065f46] transition-colors"
          >
            Send Invite
          </button>
        </div>
      </form>
    </Modal>
  );
};
