"use client";
import { getOrderById } from '@/utils/api/orders';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../Loading';

const Invoice = ({ id }) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const styles = StyleSheet.create({
      page: {
        padding: "5%",
        backgroundColor: '#E4E4E4',
        fontSize: "0.25rem"
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
      },

    });

    const retrieveOrderDetails = async () => {
      setIsLoading(true)
      try{
        const response = (await getOrderById(id)).data
        if(response.success){
          setData(response.data)
        }else{
          throw new Error(response.message)
        }
      }catch(err: any){
        toast.error(err.message)
      }finally{
        setIsLoading(false)
      }
    }

    useEffect(() => {
        retrieveOrderDetails()
    }, [])

    if(isLoading){
      return <Loading />
    }

    return (
         <Document>
        <Page size="A4" style={styles.page}>
          <View style={{display: "flex", marginTop:"2%", flexDirection: "row"}}>
          <View style={{width: "55%"}}>
            <Text style={{ fontWeight: "700", marginBottom:"5%"}}>Bill to:</Text>
            <Text style={{ marginBottom:"3%"}}>{data?.user?.name}</Text>
            <Text style={{ marginBottom:"3%"}}>{data?.user?.email}</Text>
            <Text style={{ marginBottom:"3%"}}>{data?.shippingAddress}</Text>
            
          </View>
          <View style={{width: "45%"}}>
            <Text style={{marginBottom: "3%"}}>Invoice# {data?._id}</Text>
            <Text style={{marginBottom: "3%"}}>Invoice Date: {new Date(data?.createdAt).toLocaleDateString()}</Text>
            <Text style={{marginBottom: "3%"}}>Payment Status: {data?.paymentStatus}</Text>
            <Text style={{marginBottom: "3%"}}>Payment Method: {data?.paymentMethod}</Text>
          </View>
        </View>
        <View style={{display: "flex", flexDirection: "row", backgroundColor: "#666666", marginTop: "15%", padding: "2% 5%"}}>
            <View style={{width: "58%", color: "white"}}><Text>Item Description</Text></View>
            <View style={{width: "12%", color: "white"}}><Text>Qty</Text></View>
            <View style={{width: "15%", color: "white"}}><Text>Rate</Text></View>
            <View style={{width: "15%", color: "white"}}><Text>Amount</Text></View>
        </View>
        {
            data?.items?.map(item => (
                <View style={{display: "flex", flexDirection: "row", padding: "5%"}}>
            <View style={{width: "58%"}}><Text>{item.product.name}</Text></View>
            <View style={{width: "12%"}}><Text>{item.quantity}</Text></View>
            <View style={{width: "15%"}}><Text>{item.price}</Text></View>
            <View style={{width: "15%"}}><Text>{item.price * item.quantity}</Text></View>
        </View>
            ))
        }

        <View style={{display: "flex", marginTop:"2%", flexDirection: "row"}}>
          <View style={{width: "45%"}}></View>
          <View style={{width: "55%"}}>
            <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", marginBottom: "5%", padding: "0 3%"}}><Text>Subtotal</Text><Text>{data?.totalAmount}</Text></View>
            <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", marginBottom: "5%", padding: "0 3%"}}><Text>Sales Tax(10%)</Text><Text>{(data?.totalAmount*0.1).toFixed(2)}</Text></View>
            <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", marginBottom: "5%", backgroundColor: "#666666", padding: "3%", color: "white", fontWeight: "600"}}><Text>Total</Text><Text>{data?.totalAmount + (data?.totalAmount*0.1)}</Text></View>
          </View>
          </View>
            <View>
                <Text>Kartly</Text>
                <Text style={{fontSize: "5px"}}>This invoice is computer generated and hence doesn't require any signature</Text>
            </View>
          <View style={{marginTop:"5%"}}>
            <Text>------------------------------------This marks the end of your invoice------------------------------------</Text>
          </View>
        </Page>
      </Document>
    )
}

export default Invoice;