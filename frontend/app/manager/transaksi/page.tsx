import { IOrder } from "@/app/types";
import { getCookies } from "../../../lib/server-cookies";
import { BASE_API_URL } from "@/global";
import { get } from "../../../lib/api-bridge";
import { AlertInfo } from "@/components/alert";
import Search from "./search";
import EditOrder from "./editOrder";
import DeleteOrder from "./deleteOrder";

const getOrder = async (search: string): Promise<IOrder[]> => {
  try {
    const TOKEN = getCookies("token");
    const url = `${BASE_API_URL}/order?search=${search}`;
    const { data } = await get(url, await TOKEN);
    return data?.status ? [...data.data] : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const TransaksiPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const search = searchParams.search ? searchParams.search.toString() : '';
  const order: IOrder[] = await getOrder(search);

  const category = (cat: string): React.ReactNode => {
    switch (cat) {
      case "NEW":
        return (
          <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
            New
          </span>
        );
      case "PAID":
        return (
          <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
            Paid
          </span>
        );
      default:
        return (
          <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
            Done
          </span>
        );
    }
  };

  return (
    <div>
      <div className="mt-2 bg-white rounded-lg p-3 border-t-4 border-t-primary font-Lilita_One shadow-md text-slate-700">
        <h4 className="text-2xl mb-2 text-oren">Transaction List</h4>
        <p className="text-sm text-secondary mb-4">
          This page displays transaction list, allowing menus to view details, search, and manage menu items by adding, editing, or deleting them.
        </p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center w-full max-w-md flex-grow">
            <Search url={`/manager/transaksi`} search={search} />
          </div>
          <div className="ml-4"></div>
        </div>
        {order.length === 0 ? (
          <AlertInfo title="informasi">No data Available</AlertInfo>
        ) : (
          <div className="m-2">
            {order.map((data, index) => (
              <div key={`keyPrestasi${index}`} className="flex flex-wrap shadow m-2">
                <div className="w-full md:w-2/12 p-2">
                  <small className="text-sm font-bold text-black text-primary">Name</small>
                  <br />
                  {data.customer}
                </div>
                <div className="w-full md:w-2/12 p-2">
                  <small className="text-sm font-bold text-black text-primary">Table Number</small>
                  <br />
                  {data.table_number}
                </div>
                <div className="w-full md:w-2/12 p-2">
                  <small className="text-sm font-bold text-black text-primary">Payment Method</small>
                  <br />
                  {data.payment_method}
                </div>
                <div className="w-full md:w-1/12 p-2">
                  <small className="text-sm font-bold text-black text-primary">Total Price</small>
                  <br />
                  {data.total_price}
                </div>
                <div className="w-full md:w-2/12 p-2 px-36">
                  <small className="text-sm font-bold text-black text-primay">Status</small>
                  <br />
                  {category(data.status)}
                </div>
                <div className="w-full md:w-1/12 p-2">
                  <small className="text-sm font-bold text-black text-primary">Action</small>
                  <br />
                  <div className="flex gap-1">
                    <EditOrder selectedOrder={data} />
                    <DeleteOrder selectedOrder={data} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransaksiPage;
