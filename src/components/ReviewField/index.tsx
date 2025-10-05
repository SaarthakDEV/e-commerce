import { ReviewFieldProps } from "@/libs/types";
import { deleteReview, updateReview } from "@/utils/api/products";
import React, { useState, MouseEvent } from "react";
import toast from "react-hot-toast";

const ReviewField: React.FC<ReviewFieldProps> = ({
  productId,
  reviewId,
  username,
  message,
  image,
  setReviewUpdate,
}) => {
  const [updateMode, setUpdateMode] = useState(false);

  const handleUpdate = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setUpdateMode(true);
  };

  const handleSave = async (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    const ele = document.getElementById("edit");
    const updatedReview = ele?.textContent;
    const payload = {
      message: updatedReview!,
      image,
    };
    try {
      const response = (await updateReview(productId, reviewId, payload))?.data;
      if (response?.success) {
        setReviewUpdate(prev => !prev);
      } else {
        throw new Error(response?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setUpdateMode(false);
    }
  };

  const handleDelete = async (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    try {
      const response = (await deleteReview(productId, reviewId))?.data;
      if (response?.success) {
      } else {
        throw new Error(response?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setReviewUpdate(prev => !prev);
      setUpdateMode(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
  };
  return (
    <div key={reviewId} className="text-left">
      <p className="text-gray-700 leading-relaxed">
        <span className="font-semibold">{username}</span>:{" "}
        {updateMode ? (
          <span
            className="block max-w-3xl"
            id="edit"
            contentEditable={true}
            onClick={handleClick}
          >
            {message}
          </span>
        ) : (
          <span>{message}</span>
        )}
      </p>
      <p className="text-xs">
        {updateMode ? (
          <>
            <span onClick={handleSave} className="mr-1 hover:underline text-xs">
              save
            </span>
          </>
        ) : (
          <>
            <span className="mr-1 hover:underline" onClick={handleUpdate}>
              update
            </span>
            •
            <span className="ml-1 hover:underline" onClick={handleDelete}>
              delete
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default ReviewField;
