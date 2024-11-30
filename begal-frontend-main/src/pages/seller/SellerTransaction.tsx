import { Order, columns } from "@/components/DatatableTransaction/columns"
import { DataTable } from "@/components/DatatableTransaction/TableTransaction"
import { fetchOrders } from "@/api/depot" // Assuming fetchOrders returns Order[]
import { useEffect, useState } from "react"

export default function SellerTransaction() {
  const [data, setData] = useState<Order[]>([])

  const token = localStorage.getItem("authToken")

  const getData = async () => {
    try {
      if (token) {
        const orders = await fetchOrders(token)
        setData(orders.data) 
        console.log("Orders fetched:", orders)
      } else {
        console.error("No token found")
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  useEffect(() => {
    // Trigger getData only on initial mount
    if (token) {
      getData()
    } else {
      console.log("No token available at mount")
    }
  }, [])  // Empty dependency array ensures it only runs on mount

  // Optionally log token to ensure it's being fetched correctly
  useEffect(() => {
    console.log("Token from localStorage:", token)
  }, [token])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
