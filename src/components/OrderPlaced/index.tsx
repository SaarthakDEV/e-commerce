import { useState, useEffect } from 'react';
import { CheckCircle, Download } from 'lucide-react';

export default function OrderPlaced({ orderId="#ORD-7890991" }) {
  const [showAnimation, setShowAnimation] = useState(false);
  
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div className="h-[85vh] flex justify-center items-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto py-12 px-6">
        
        {/* Success Animation */}
        <div className={`text-center mb-8 transform transition-all duration-1000 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce">
              <span className="text-lg">🎉</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-xl text-gray-600 mb-4">Thank you for your purchase</p>
          <div className="bg-white rounded-full px-6 py-2 inline-block shadow-md">
            <span className="text-sm text-gray-600">Order ID: </span>
            <span className="font-bold text-blue-600">{orderId}</span>
          </div>
        </div>

          
         
            <div className="space-y-3">
              <a href={`/transaction/${orderId}`} target="_blank" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Invoice</span>
              </a>
            </div>
          </div>
        </div>
  );
}