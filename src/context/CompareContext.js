// CompareContext.js
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CompareContext = createContext();

const CompareProvider = ({ children }) => {
    const [compareList, setCompareList] = useState([]);


    useEffect(() => {
        const savedCompareList = localStorage.getItem('compareList');
        if (savedCompareList) {
            setCompareList(JSON.parse(savedCompareList ? savedCompareList : []));
        }
    }, []);


    const addToCompare = (product) => {

        if (compareList.length > 2) {
            return toast.error("you can add 3 products to compare", { id: 1 })
        }
        if (compareList.length > 0) {
            const isSameCategory = compareList.every(item => item?.category_name === product?.category_name);
            setCompareList([...compareList, product])

            if (isSameCategory) {
                setCompareList([...compareList, product])
                localStorage.setItem('compareList', JSON.stringify([...compareList, product]));
                toast.success("add to compare", { id: 2 })
            }
            else {
                toast.error("Can't add product to compare: Category mismatch", { id: 3 });

            }

        }

        if (compareList.length === 0) {
            setCompareList([...compareList, product])
            localStorage.setItem('compareList', JSON.stringify([...compareList, product]));
            toast.success("add to compare")

        }


    };

    const removeFromCompare = (productId) => {
        setCompareList(compareList.filter(item => item.id !== productId));
    };

    const clearCompareList = () => {
        setCompareList([]);
    };

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompareList }}>
            {children}
        </CompareContext.Provider>
    );
};

export { CompareContext, CompareProvider };

