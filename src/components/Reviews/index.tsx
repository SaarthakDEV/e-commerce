import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Review, ReviewsProps } from "@/libs/types";
import ReviewInputBox from "../ReviewInputBox";
import ReviewField from "../ReviewField";

const Reviews: React.FC<ReviewsProps> = ({ reviewNumber, reviews, productId, setReviewUpdate }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string | null) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Reviews ({reviewNumber})
        </h1>
        <p className="text-gray-600">
          Read what our customers say about their experience
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map(
          (review: Review ) => {
            const isOpen = openAccordion === review?._id;

            return (
              <div
                key={review?._id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() =>
                    toggleAccordion(review?._id)
                  }
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex flex-col items-center space-x-4">
                    { review.image && <img
                      src={review?.image!}
                      alt={review?.message}
                      className="max-w-xs mb-2"
                    />}
                    <ReviewField productId={productId} reviewId={review?._id} username={review?.userId?.name} message={review?.message} image={review?.image} setReviewUpdate={setReviewUpdate}/>
                  </div>

                  {(
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 hidden sm:block">
                        {isOpen ? "Hide Replies" : "View Replies"}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                      )}
                    </div>
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 py-4 space-y-6">
                    <div className="pl-12 py-4 bg-gray-50 rounded-r-lg">
                      {review?.reply?.map((reply) => (
                        <div className="flex flex-col space-x-4">
                    { reply?.image && <img
                      src={reply?.image!}
                      alt={reply?.message}
                      className="max-w-xs"
                    />}
                    <div className="text-left">
                    <p className="text-gray-700 leading-relaxed mb-4">{`${reply?.user?.name}: ${reply?.message}`}</p>
                    </div>
                  </div>
                      ))}
                    <ReviewInputBox productId={productId} reviewId={review?._id} setReviewUpdate={setReviewUpdate}/>
                    </div>
                  </div>
                )}
              </div>
            );
          }
        )}
        <ReviewInputBox productId={productId} reviewId={null} setReviewUpdate={setReviewUpdate}/>
      </div>
    </div>
  );
};

export default Reviews;
