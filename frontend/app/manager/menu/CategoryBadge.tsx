// app/manager/menu/CategoryBadge.tsx
import React from "react";

type Category = 'FOOD' | 'SNACK' | 'DRINK';

const categoryClasses: Record<Category, string> = {
    FOOD: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    SNACK: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    DRINK: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};

const categoryLabels: Record<Category, string> = {
    FOOD: "Food",
    SNACK: "Snack",
    DRINK: "Drink",
};

interface Props {
    cat: string;
}

export const CategoryBadge = ({ cat }: Props) => {
    const key = (cat.toUpperCase() as Category) || 'DRINK'; // Default ke 'DRINK' jika error

    return (
        <span className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded-full ${categoryClasses[key]}`}>
            {categoryLabels[key]}
        </span>
    );
};
