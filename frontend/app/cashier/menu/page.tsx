// import Image from 'next/image'
// import { useRouter, useSearchParams } from 'next/navigation';
// import { menu } from '../data/menu';

// const MenuCashier = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const category = searchParams.get('category');

//     const filteredMenu = category
//         ? menu.filter(post => post.category.toLowerCase() === category.toLowerCase())
//         : menu;

//     const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectedCategory = event.target.value;
//         router.push(selectedCategory ? `/manager/menu?category=${selectedCategory}` : '/manager/menu');
//     };

//     return (
//         <div className='py-10 dark:bg-slate-900 dark:text-white min-h-dvh'>
//             <div className='container'>
//                 {/* Header section */}
//                 <div className='text-center mb-20 max-w-[400px] mx-auto'>
//                     <p className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>Our Menu</p>
//                     <h1 className='text-3xl font-bold'>Menu</h1>
//                     <p className='text-xs text-gray-400'>
//                         Lorem our adipisicing elit. Aliquid ullam a nisi vero qui sed consequuntur iste cum minima error.
//                     </p>
//                     <div className="mt-4 mb-6 flex justify-center space-x-4 text-primary">
//                         <select
//                             name="category"
//                             value={category || ''}
//                             onChange={handleCategoryChange}
//                             className='p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600'
//                         >
//                             <option value="">All</option>
//                             <option value="makanan">Makanan</option>
//                             <option value="minuman">Minuman</option>
//                             <option value="dessert">Dessert</option>
//                         </select>
//                     </div>
//                 </div>
//                 {/* Card section */}
//                 <div>
//                     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 place-items-center py-16'>
//                         {filteredMenu.map(({ id, img, name }) => (
//                             <div key={id} className='max-w-[300px] group rounded-2xl bg-white dark:bg-gray-800 dark:text-white hover:bg-primary hover:text-white duration-300 p-4 shadow-xl'>
//                                 <div className='h-[120px]'>
//                                     <Image src={img} alt="" className='max-w-[200px] mx-auto block transform -translate-y-14 group-hover:scale-105 group-hover:rotate-6 duration-300' />
//                                 </div>
//                                 <div className='p-4 text-center'>
//                                     <h1 className='text-xl font-bold'>{name}</h1>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default MenuCashier;

    // const category = (cat: string): React.ReactNode => {
    //     if (cat === "FOOD") {
    //         return <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
    //             Food
    //         </span>
    //     }
    //     if (cat === "SNACK") {
    //         return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
    //             Snack
    //         </span>
    //     }
    //     return <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
    //         Drink
    //     </span>
    // }
import { IMenu } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "@/lib/api-bridge";
import Image from 'next/image';
import Link from "next/link";

const getMenu = async (search: string, category: string): Promise<IMenu[]> => {
    try {
        const TOKEN = await getCookies("token");
        let url = `${BASE_API_URL}/menu?search=${search}`;
        if (category && category !== "ALL") {
            url += `&category=${category}`; // tambahkan filter category kalau bukan ALL
        }
        const { data } = await get(url, TOKEN);
        let result: IMenu[] = [];
        if (data?.status) result = [...data.data];
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Komponen badge kategori di bawah judul
const CategoryBadge = ({ selected }: { selected: string }) => {
    const categories = ["ALL", "FOOD", "DRINK"];

    return (
        <div className="flex justify-center gap-4 my-8 flex-wrap">
            {categories.map((cat) => (
                <Link
                    key={cat}
                    href={{ pathname: "/cashier/menu", query: { category: cat !== "ALL" ? cat : undefined } }}
                >
                    <span
                        className={`cursor-pointer text-sm font-medium px-4 py-2 rounded-full transition-all
                        ${selected === cat || (cat === "ALL" && !selected) ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
                        hover:bg-primary hover:text-white`}
                    >
                        {cat.charAt(0) + cat.slice(1).toLowerCase()}
                    </span>
                </Link>
            ))}
        </div>
    );
};

const MenuPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const search = searchParams.search ? searchParams.search.toString() : '';
    const selectedCategory = searchParams.category ? searchParams.category.toString().toUpperCase() : 'ALL';
    const menu: IMenu[] = await getMenu(search, selectedCategory);

    return (
        <div className='py-10 bg-white dark:text-white min-h-dvh'>
            <div className='container'>
                {/* Header section */}
                <div className='text-center mb-20 max-w-[400px] mx-auto font-Lilita_One'>
                    <p className='text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>Our Menu</p>
                    <h1 className='text-3xl font-bold'>Menu</h1>
                    <p className='text-xs text-gray-400'>
                        Lorem our adipisicing elit. Aliquid ullam a nisi vero qui sed consequuntur iste cum minima error.
                    </p>
                </div>

                {/* Category filter */}
                <CategoryBadge selected={selectedCategory} />

                {/* Card section */}
                <div>
                    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-y-24 place-items-center px-48 py-16'>
                        {menu.map((data) => (
                            <div
                                key={data.id}
                                className='w-72 group rounded-2xl bg-white dark:bg-gray-800 dark:text-white hover:bg-primary hover:text-white duration-300 p-[20px_10px] shadow-xl flex flex-col items-center relative overflow-visible'
                            >
                                <div className='h-[120px] w-full flex justify-center items-center relative z-0'>
                                    <div className="relative w-[200px] h-[200px]">
                                        <Image
                                            width={300}
                                            height={200}
                                            src={`${BASE_IMAGE_MENU}/${data.picture}`}
                                            className="rounded-sm object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:scale-150 group-hover:rotate-[25deg]"
                                            alt="preview"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                                <div className='p-4 text-center z-10 font-Lilita_One'>
                                    <h1 className='text-xl text-col3'>{data.name}</h1>
                                    <p className='text-sm text-slate-400'>{data.description}</p>
                                    <p className='text-xl mb-4 text-white'>{data.price}</p>
                                    <button className='px-4 py-2 text-col2 bg-oren from-primary to-secondary rounded-full hover:scale-105 duration-200'>
                                        <Link href="/cashier/order">
                                            Order Now
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
