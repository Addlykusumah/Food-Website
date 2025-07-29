import { IMenu, IUser } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "@/components/alert";
import Image from "next/image"
import Search from "./search";
import AddUser from "@/app/manager/user/addUser";
import EditUser from "@/app/manager/user/editUser";
import DeleteUser from "@/app/manager/user/deleteUser";

const getUser = async (search: string): Promise<IUser[]> => {
    try {
        const TOKEN = await getCookies("token")
        const url = `${BASE_API_URL}/user?search=${search}`
        const { data } = await get(url, TOKEN)
        let result: IUser[] = []
        if (data?.status) result = [...data.data]
        return result
    } catch (error) {
        console.log(error)
        return []
    }
}


interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

const UserPage = async ({ searchParams = {} }: Props) => {
    const search = typeof searchParams.search === "string" ? searchParams.search : ''
    const user: IUser[] = await getUser(search)

    return (
        <div>
            <div className="m-2 bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
                <h4 className="text-xl font-bold mb-2">User Data</h4>
                <p className="text-sm text-secondary mb-4">
                    This page displays menu data, allowing users to view details,
                    search, and manage user items by adding, editing, or deleting them.
                </p>
                <div className="flex justify-between items-center mb-4">
                    {/* Search Bar */}
                    <div className="flex items-center w-full max-w-md flex-grow">
                        <Search url={`/manager/user`} search={search} />
                    </div>  
                        {/* Add User Button */}
                        <div className="ml-4">
                            <AddUser/>
                         </div>
                </div>
                {
                    user.length == 0 ?
                        <AlertInfo title="informasi">
                            No data Available
                        </AlertInfo>
                        :
                        <>
                            <div className="m-2">
                                {user.map((data, index) => (
                                    <div key={`keyPrestasi${index}`} className={`flex flex-wrap shadow m-2`}>
                                        <div className="w-full md:w-1/12 p-2">
                                            <small className="text-sm font-bold text-primary">Picture</small><br />
                                            <Image width={40} height={40} src={`${BASE_IMAGE_PROFILE}/${data.profile_picture}`} className="rounded-sm overflow-hidden" alt="preview" unoptimized />
                                        </div>
                                        <div className="w-full md:w-2/12 p-2">
                                            <small className="text-sm font-bold text-primary">Name</small> <br />
                                            {data.name}
                                        </div>
                                        <div className="w-full md:w-1/12 p-2">
                                            <small className="text-sm font-bold text-primary">Email</small> <br />
                                            {data.email}
                                        </div>
                                        <div className="w-full px-36 md:w-5/12 p-2">
                                            <small className="text-sm font-bold text-primary">Role</small> <br />
                                            {data.role}
                                        </div>
                                        <div className="w-full md:w-2/12 p-2">
                                            <small className="text-sm font-bold text-primary">Action</small><br />
                                            <div className="flex gap-1">
                                                <EditUser selectedUser={data} />
                                                <DeleteUser selectedUser={data} />
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                }

            </div>

        </div>
    )
}
export default UserPage



// import { useState } from "react";
// import { FaStar } from "react-icons/fa";
// import img1 from "@/public/image/user/shincan.png"
// import img2 from "@/public/image/user/shincan2.png"
// import img3 from "@/public/image/user/shincan3.jpg"
// import Image from "next/image";

// interface Testimonial {
//     id: number;
//     name: string;
//     role: string;
//     text: string;
//     rating: number;
//     img: any;
// }

// const DashboardPage = () => {
//     const [testimonials, setTestimonials] = useState<Testimonial[]>([
//         {
//             id: 1,
//             name: "Saul Goodman",
//             role: "CEO & Founder",
//             text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
//             rating: 5,
//             img: img1
//         },
//         {
//             id: 2,
//             name: "Saul Goodman",
//             role: "CEO & Founder",
//             text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
//             rating: 5,
//             img: img2
//         },
//         {
//             id: 3,
//             name: "Saul Goodman",
//             role: "CEO & Founder",
//             text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
//             rating: 5,
//             img: img3
//         },
//     ]);
//     const [editingId, setEditingId] = useState<number | null>(null);
//     const [newText, setNewText] = useState<string>("");

//     const handleEdit = (testimonial: Testimonial) => {
//         setEditingId(testimonial.id);
//         setNewText(testimonial.text);
//     };

//     const handleSave = (id: number) => {
//         setTestimonials(
//             testimonials.map((t) => (t.id === id ? { ...t, text: newText } : t))
//         );
//         setEditingId(null);
//     };

//     const handleDelete = (id: number) => {
//         setTestimonials(testimonials.filter((t) => t.id !== id));
//     };

//     return (
//         <div className="container">
//             <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 space-y-8">
//                 <h2 className="text-gray-600 text-sm uppercase font-medium font-roboto">Testimonials</h2>
//                 <h1 className="mb-4 font-amatic text-5xl font-semibold">
//                     What Are They <span className="text-red-500 font-amatic font-semibold">Saying About Us</span>
//                 </h1>
//                 {testimonials.map((testimonial) => (
//                     <div key={testimonial.id} className="bg-white p-6 shadow-lg rounded-lg w-2/3 flex items-center space-x-4">
//                         <div className="w-3/4">
//                             {editingId === testimonial.id ? (
//                                 <textarea
//                                     className="border p-2 w-full rounded"
//                                     value={newText}
//                                     onChange={(e) => setNewText(e.target.value)}
//                                 />
//                             ) : (
//                                 <p className="italic text-gray-600">{testimonial.text}</p>
//                             )}
//                             <h3 className="mt-2 font-bold text-gray-800">{testimonial.name}</h3>
//                             <p className="text-gray-500 text-sm">{testimonial.role}</p>
//                             <div className="flex text-yellow-500 mt-2">
//                                 {[...Array(testimonial.rating)].map((_, i) => (
//                                     <FaStar key={i} />
//                                 ))}
//                             </div>
//                             <div className="mt-3 space-x-2">
//                                 {editingId === testimonial.id ? (
//                                     <button
//                                         onClick={() => handleSave(testimonial.id)}
//                                         className="bg-green-500 text-white px-3 py-1 rounded"
//                                     >
//                                         Save
//                                     </button>
//                                 ) : (
//                                     <button
//                                         onClick={() => handleEdit(testimonial)}
//                                         className="bg-blue-500 text-white px-3 py-1 rounded"
//                                     >
//                                         Edit
//                                     </button>
//                                 )}
//                                 <button
//                                     onClick={() => handleDelete(testimonial.id)}
//                                     className="bg-red-500 text-white px-3 py-1 rounded"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="w-1/4">
//                             <Image
//                                 src={testimonial.img}
//                                 alt="User"
//                                 className="rounded-full bg-cover"
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
// export default DashboardPage;
