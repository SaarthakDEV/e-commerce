"use client"
import { ProcessedOrder } from '@/libs/types';
import { getCustomerOrder } from '@/utils/api/orders';
import { processOrder } from '@/utils/helpers';
import { useEffect, useState } from 'react'
import OrderCard from '../OrderCard';
import toast from 'react-hot-toast';

const CustomerOrders = () => {
    const [orders, setOrders] = useState<ProcessedOrder[]>([]);

    const retrieveCustomerOrders = async () => {
      try{
        const response = (await getCustomerOrder()).data
        if(response.success){
          setOrders(processOrder(response.data))
        }else{
          throw new Error(response.message)
        }
      }catch(err: any){
        toast.error(err.message)
      }
    }

    useEffect(() => {
        retrieveCustomerOrders();
    }, [])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-8'>
      {
        orders.map((order: ProcessedOrder, idx: number) => (
          <OrderCard key={idx+1} order={order}/>
        ))
      }
    </div>
  )
}

export default CustomerOrders