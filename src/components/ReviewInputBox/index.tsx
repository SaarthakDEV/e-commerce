import React, { useState } from 'react'
import { Send, Image } from 'lucide-react';
import { ReviewInputBoxProps } from '@/libs/types';
import { postReview, postReviewReply } from '@/utils/api/products';
import toast from 'react-hot-toast';

const ReviewInputBox: React.FC<ReviewInputBoxProps> = ({ productId, reviewId, setReviewUpdate}) => {
     const [newReview, setNewReview] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
   const [imageUrl, setImageUrl] = useState(null);

  const handleSendReview = async () => {
    let payload = {
        message: "",
        image: null,
    }
    if (newReview?.trim()) {
        payload.message = newReview;
      if (imageUrl) {
        payload.image = imageUrl
      }
      try{
        if(!reviewId){
      const response = (await postReview(productId, payload))?.data
      if(response?.success){
        setReviewUpdate(prev => !prev);
      }else{
        throw new Error(response?.message)
      }
    }else if(reviewId){
        const response = (await postReviewReply(productId, reviewId, payload))?.data
      if(response?.success){
        setReviewUpdate(prev => !prev);
      }else{
        throw new Error(response?.message)
      }
    }
    }catch(err: any){
        toast.error(err?.message)
    }finally{
        setNewReview('');
        setImageUrl(null);
        setShowImageInput(false);
    }

    }
  };


  return (
    <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Write a {!reviewId ? "Reply" : "Review" }</h3>
        <div className="space-y-4">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e?.target?.value)}
            placeholder="Share your experience..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          
          {showImageInput && (
            <div className="space-y-2">
              <input
                type="url"
                value={imageUrl ?? ""}
                onChange={(e) => setImageUrl(e?.target?.value)}
                placeholder="Enter image URL..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowImageInput(!showImageInput)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Image className="w-5 h-5" />
              <span>Add Image</span>
            </button>
            
            <button
              onClick={handleSendReview}
              disabled={!newReview?.trim()}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
              <span>Send Review</span>
            </button>
          </div>
        </div>
      </div>
  )
}

export default ReviewInputBox