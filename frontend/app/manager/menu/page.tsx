

import { IMenu } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image";
import Search from "./search";
import AddMenu from "./addMenu";
import EditMenu from "./editMenu";
import DeleteMenu from "./deleteMenu";
import { CategoryBadge } from "./CategoryBadge";

// Fetch menu data with optional search and category filter
const getMenu = async (search: string, category: string): Promise<IMenu[]> => {
    try {
        const TOKEN = await getCookies("token");
        const url = `${BASE_API_URL}/menu?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`;
        const { data } = await get(url, TOKEN);
        return data?.status ? [...data.data] : [];
    } catch (error) {
        console.error("Error fetching menu:", error);
        return [];
    }
};

const MenuPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    // Wait for searchParams to resolve
    const search = searchParams.search ? searchParams.search.toString() : '';
    const selectedCategory = searchParams.category ? searchParams.category.toString().toUpperCase() : 'ALL'; 

    // Fetch menu data based on search and category
    const menu = await getMenu(search, selectedCategory);

    const category = (cat: string): React.ReactNode => {
        if (cat === "FOOD") {
            return <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                Food
            </span>
        }
        if (cat === "SNACK") {
            return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                Snack
            </span>
        }
        return <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
            Drink
        </span>
    }

    return (
        <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
            <h4 className="text-xl font-bold mb-2">Menu Data</h4>
            <p className="text-sm text-secondary mb-4">
                This page displays menu data, allowing users to view details, search, and manage menu items by adding, editing, or deleting them.
            </p>

            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center w-full max-w-md">
                    <Search url="/manager/menu" search={search} />
                </div>
                <div className="ml-4">
                    <AddMenu />
                </div>
            </div>

            {/* Menu List Section */}
            {menu.length === 0 ? (
                <AlertInfo title="Information">No data available.</AlertInfo>
            ) : (
                <div className="m-2">
                    {menu.map((data, index) => (
                        <div key={`menu-${index}`} className="flex flex-wrap shadow m-2 p-2 rounded-md">
                            <div className="w-full md:w-1/12 p-2">
                                <small className="text-sm font-bold text-primary">Picture</small>
                                <div className="mt-1">
                                    <Image
                                        width={60}
                                        height={60}
                                        src={`${BASE_IMAGE_MENU}/${data.picture}`}
                                        className="rounded-sm"
                                        alt={data.name}
                                        unoptimized
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-2/12 p-2">
                                <small className="text-sm font-bold text-primary">Name</small>
                                <div>{data.name}</div>
                            </div>

                            <div className="w-full md:w-1/12 p-2">
                                <small className="text-sm font-bold text-primary">Price</small>
                                <div>{data.price}</div>
                            </div>

                            <div className="w-full md:w-5/12 p-2">
                                <small className="text-sm font-bold text-primary">Description</small>
                                <div>{data.description}</div>
                            </div>

                            <div className="w-full md:w-1/12 p-2">
                                <small className="text-sm font-bold text-primary">Category</small>
                                <div className="mt-1">
                                    <CategoryBadge cat={data.category} />
                                </div>
                            </div>

                            <div className="w-full md:w-2/12 p-2">
                                <small className="text-sm font-bold text-primary">Action</small>
                                <div className="flex gap-2 mt-1">
                                    <EditMenu selectedMenu={data} />
                                    <DeleteMenu selectedMenu={data} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuPage;
