"use client"
import { ReactNode } from "react";
import Sidebar from "@/components/cashierTemplate/sidebar";

type MenuType = {
    id: string,
    icon: ReactNode
    path: string,
    label: string
}

type CashierProp = {
    children: ReactNode,
    id: string,
    title: string,
    menuList: MenuType[]
}

const CashierTemplate = ({ children, id, title, menuList }: CashierProp) => {
    return (
        <div className="w-full min-h-dvh">
            <Sidebar menuList={menuList} title={title} id={id}>
                {children}
            </Sidebar>
        </div>
    )
}


export default CashierTemplate