import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Star, ThumbsUp, ThumbsDown, MessageCircle, User, Calendar, Award, MapPin } from 'lucide-react';
import { getReviews } from '@/utils/api/products';

const Reviews = ({ reviewNumber, reviews }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  // Mock review data
  const reviewData = [
    {
      id: 1,
      category: "Product Reviews",
      icon: <Award className="w-5 h-5" />,
      totalReviews: 245,
      averageRating: 4.5,
      reviews: [
        {
          id: 101,
          productName: "Wireless Headphones Pro",
          rating: 5,
          reviewer: "John Smith",
          date: "2024-03-15",
          location: "New York, USA",
          verified: true,
          helpful: 23,
          comment: "Exceptional sound quality and comfort. Best headphones I've ever owned!",
          images: ["headphone1.jpg", "headphone2.jpg"],
          subReviews: [
            {
              id: 1001,
              aspect: "Sound Quality",
              rating: 5,
              comment: "Crystal clear audio with deep bass"
            },
            {
              id: 1002,
              aspect: "Comfort",
              rating: 4,
              comment: "Very comfortable for long listening sessions"
            },
            {
              id: 1003,
              aspect: "Battery Life",
              rating: 5,
              comment: "Lasts all day without needing a charge"
            }
          ]
        },
        {
          id: 102,
          productName: "Smart Watch Series X",
          rating: 4,
          reviewer: "Sarah Johnson",
          date: "2024-03-12",
          location: "California, USA",
          verified: true,
          helpful: 18,
          comment: "Great features but battery could be better. Overall satisfied with the purchase.",
          images: [],
          subReviews: [
            {
              id: 1004,
              aspect: "Features",
              rating: 5,
              comment: "Comprehensive health tracking and smart notifications"
            },
            {
              id: 1005,
              aspect: "Battery Life",
              rating: 3,
              comment: "Needs charging every day"
            },
            {
              id: 1006,
              aspect: "Design",
              rating: 4,
              comment: "Sleek and modern design"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      category: "Service Reviews",
      icon: <MessageCircle className="w-5 h-5" />,
      totalReviews: 189,
      averageRating: 4.2,
      reviews: [
        {
          id: 201,
          productName: "Customer Support Experience",
          rating: 5,
          reviewer: "Mike Davis",
          date: "2024-03-14",
          location: "Texas, USA",
          verified: true,
          helpful: 31,
          comment: "Outstanding customer service. They resolved my issue within minutes!",
          images: [],
          subReviews: [
            {
              id: 2001,
              aspect: "Response Time",
              rating: 5,
              comment: "Immediate response to my inquiry"
            },
            {
              id: 2002,
              aspect: "Problem Resolution",
              rating: 5,
              comment: "Fixed my issue completely"
            },
            {
              id: 2003,
              aspect: "Staff Friendliness",
              rating: 5,
              comment: "Very polite and professional"
            }
          ]
        },
        {
          id: 202,
          productName: "Delivery Service",
          rating: 3,
          reviewer: "Emma Wilson",
          date: "2024-03-10",
          location: "Florida, USA",
          verified: true,
          helpful: 12,
          comment: "Package arrived safely but took longer than expected. Good packaging though.",
          images: [],
          subReviews: [
            {
              id: 2004,
              aspect: "Delivery Speed",
              rating: 2,
              comment: "Took 5 days longer than promised"
            },
            {
              id: 2005,
              aspect: "Packaging Quality",
              rating: 4,
              comment: "Well protected and secure packaging"
            },
            {
              id: 2006,
              aspect: "Tracking",
              rating: 4,
              comment: "Good tracking updates throughout"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      category: "Experience Reviews",
      icon: <User className="w-5 h-5" />,
      totalReviews: 156,
      averageRating: 4.7,
      reviews: [
        {
          id: 301,
          productName: "Website User Experience",
          rating: 5,
          reviewer: "Alex Thompson",
          date: "2024-03-13",
          location: "Washington, USA",
          verified: true,
          helpful: 28,
          comment: "Intuitive design and seamless navigation. Shopping was a breeze!",
          images: [],
          subReviews: [
            {
              id: 3001,
              aspect: "Navigation",
              rating: 5,
              comment: "Easy to find what I was looking for"
            },
            {
              id: 3002,
              aspect: "Page Speed",
              rating: 4,
              comment: "Fast loading times"
            },
            {
              id: 3003,
              aspect: "Mobile Experience",
              rating: 5,
              comment: "Perfect on mobile devices"
            }
          ]
        }
      ]
    }
  ];

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reviews ({reviewNumber})</h1>
        <p className="text-gray-600">Read what our customers say about their experience</p>
      </div>

      <div className="space-y-4">
        {reviewData.map((category) => {
          const isOpen = openAccordion === category.id;
          
          return (
            <div key={category.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleAccordion(category.id)}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-left">
                    <p className="text-gray-700 leading-relaxed mb-4">{"dsffsdfsd"}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 hidden sm:block">
                    {isOpen ? 'Hide Replies' : 'View Replies'}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                  )}
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-6 py-4 space-y-6">
                    <div className="pl-6 py-4 bg-gray-50 rounded-r-lg">
                  {category.reviews.map((review) => (
                      <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                    ))}
                    </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;