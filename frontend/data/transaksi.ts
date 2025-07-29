import Img from '@/public/image/menu/menu-item-1.png'
import Img2 from '@/public/image/menu/menu-item-2.png'
import Img3 from '@/public/image/menu/menu-item-3.png'
import Img4 from '@/public/image/menu/menu-item-4.png'
import Img5 from '@/public/image/menu/menu-item-5.png'
import Img6 from '@/public/image/menu/menu-item-6.png'
import Img7 from '@/public/image/menu/minuman-item-1.png'
import Img8 from '@/public/image/menu/minuman-item-2.png'
import Img9 from '@/public/image/menu/minuman-item-3.png'

export interface dataTransaksi {
    id: number;
    img: any;
    name: string;
    deskripsi: string
    price: number
    category: string
}

export const menu: dataTransaksi[] = [
    {
        id: 1,
        img: Img,
        name: "Magnam Tiste",
        price: 15000,
        deskripsi: "Lorem, deren, trataro, filede, nerada",
        category: "FOOD"
    },
    {
        id: 2,
        img: Img2,
        name: "Aut Luia",
        price: 15000,
        deskripsi: "Lorem, deren, trataro, filede, nerada",
        category: "FOOD"
    },
    {
        id: 3,
        img: Img3,
        name: "Est Eligendi",
        price: 12000,
        deskripsi: "Lorem, deren, trataro, filede, nerada",
        category: "FOOD"
    },
    {
        id: 4,
        img: Img4,
        name: "Eos Mushroom",
        price: 12000,
        deskripsi: "Lorem, deren, trataro, filede, nerada",
        category: "FOOD"
    },
    {
        id: 5,
        img: Img5,
        name: "Eos Luibusdam",
        price: 13000,
        deskripsi: "Lorem, deren, trataro, filede, nerada",
        category: "FOOD"
    },
    {
        id: 6,
        img: Img6,
        name: "Laboriosam Direva",
        price: 9.500,
        deskripsi: "Lorem, deren, trataro, filede, nerada",
        category: "FOOD"
    },
    {
        id: 7,
        img: Img7,
        name: "Sweet Tropica",
        price: 10000,
        deskripsi: "Lorem, deren, trataro, filede, nerada",
        category: "DRINK"
    },
    {
        id: 8,
        img: Img8,
        name: "Green Apple",
        price: 12000,
        deskripsi: "Lorem, deren, trataro, filede, nerada",
        category: "DRINK"
    },
    {
        id: 9,
        img: Img9,
        name: "Boba Sugar",
        price: 13000,
        deskripsi: "Lorem, deren, trataro, filede, nerada",
        category: "DRINK"
    },
    // {
    //     id: 7,
    //     img: Img7,
    //     name: "Laboriosam Direva",
    //     price: 9.95,
    //     deskripsi: "Lorem, deren, trataro, filede, nerada",
    //     category: "minuman"
    // },
    // {
    //     id: 8,
    //     img: Img8,
    //     name: "Laboriosam Direva",
    //     price: 9.95,
    //     deskripsi: "Lorem, deren, trataro, filede, nerada",
    //     category: "minuman"
    // },

]


