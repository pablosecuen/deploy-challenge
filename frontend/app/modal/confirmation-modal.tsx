"use client";
import React, { useState } from "react";
import CancelButton from "../components/button/Cancel-button";
import DeleteButton from "../components/button/Delete-button";

interface ConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal animate-fadein border p-4 mt-2 rounded-2xl">
      <div className="modal-content">
        <span>Are you sure you want to delete this note?</span>
        <div className="modal-buttons flex gap-4 mt-4">
          <CancelButton onClick={onClose} color="purple" />
          <DeleteButton onClick={onConfirm} color="red" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
