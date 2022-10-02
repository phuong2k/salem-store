import React, { useState, useCallback, useEffect } from 'react';
import { languageVN, languageEN } from '../assets/fakedata/Language';
import categories from '../assets/fakedata/categories';
import productData from '../assets/fakedata/products';
import { flagvn, flagen } from '../assets/Images/header-img';
import { TopsearchEN, TopsearchVN } from '../assets/fakedata/Topsearch';
import { sortEN, sortVN } from '../assets/fakedata/sort';
import { midNavEN, midNavVN } from '../assets/fakedata/midnav';

export const AppContext = React.createContext();
export default function AppProvider({ children }) {
    //set language
    const [headerLanguage, setHeaderLanguage] = useState(languageVN);
    const [topSearchLanguage, setTopsearchLanguage] = useState(TopsearchVN);
    const [sortLanguage, setSortLanguage] = useState(sortVN);
    const [midnavLanguage, setMidnavLanguage] = useState(midNavVN);


    const [lowToHeight, setLowToHeight] = useState(false);
    const [heightToLow, setHeightToLow] = useState(false);

    const [numProduct, setNumProduct] = useState(0);
    const [render, setRender] = useState();

    const [flag, setFlag] = useState(flagvn);
    const [activeSidebar, setActiveSidebar] = useState('');

    const [appclass, setAppClass] = useState({
        activeObject: [],
        Object: topSearchLanguage.map((e) => e.id),
    });
    const [appclassMidnav, setAppClassMidnav] = useState({
        activeObject: 0,
        Object: sortLanguage.map((e) => e.id),
    });
    const handleLanguage = (e) => {
        if (e) {
            setHeaderLanguage(languageVN);
            setFlag(flagvn);
            setTopsearchLanguage(TopsearchVN);
            setSortLanguage(sortVN);
            setMidnavLanguage(midNavVN);
        } else {
            setHeaderLanguage(languageEN);
            setFlag(flagen);
            setTopsearchLanguage(TopsearchEN);
            setSortLanguage(sortEN);
            setMidnavLanguage(midNavEN);
        }
    };

    // Filter
    const initFilter = {
        categorys: [],
        color: [],
        size: [],
    };
    const [filter, setFilter] = useState(initFilter);

    const [products, setProducts] = useState(productData);

    const [productList, setProductsList] = useState(productData.products);

    useEffect(() => {
        if (render) {
            setProductsList(productData.getProductByRender(render));
        }
    }, [render]);
    const category = categories.filter((cate) => {
        let found = false;
        cate.render.forEach((element) => {
            element === render ? (found = true) : (found = false);
        });
        return found;
    });

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, categorys: [...filter.categorys, item.categorySlug] });
                    break;
                case 'COLOR':
                    setFilter({ ...filter, color: [...filter.color, item.color] });
                    break;
                case 'SIZE':
                    setFilter({ ...filter, size: [...filter.size, item.size] });
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filter.categorys.filter((e) => e !== item.categorySlug);
                    setFilter({ ...filter, categorys: newCategory });
                    break;
                case 'COLOR':
                    const newColor = filter.color.filter((e) => e !== item.color);
                    setFilter({ ...filter, color: newColor });
                    break;
                case 'SIZE':
                    const newSize = filter.size.filter((e) => e !== item.size);
                    setFilter({ ...filter, size: newSize });
                    break;
                default:
            }
        }
    };

    const clearFilter = () => setFilter(initFilter);

    const updateProducts = useCallback(() => {
        let temp = productList;

        if (filter.categorys.length > 0) {
            temp = temp.filter((e) => filter.categorys.includes(e.categorySlug));
        }

        if (filter.color.length > 0) {
            temp = temp.filter((e) => {
                const check = e.colors.find((color) => filter.color.includes(color));
                return check !== undefined;
            });
        }

        if (filter.size.length > 0) {
            temp = temp.filter((e) => {
                const check = e.size.find((size) => filter.size.includes(size));
                return check !== undefined;
            });
        }

        setProducts(temp);
    }, [filter, productList]);

    useEffect(() => {
        updateProducts();
    }, [updateProducts]);

    useEffect(() => {
        if (products.length >= 0) {
            setNumProduct(products.length);
        }
    }, [products.length]);
    return (
        <AppContext.Provider
            value={{
                //language
                midnavLanguage,
                sortLanguage,
                topSearchLanguage,
                headerLanguage,

                lowToHeight, setLowToHeight,
                heightToLow, setHeightToLow,
                appclassMidnav,
                setAppClassMidnav,
                numProduct,
                setProducts,
                appclass,
                setAppClass,
                activeSidebar,
                setActiveSidebar,
                setProductsList,
                updateProducts,
                productList,
                flag,
                setRender,
                category,
                filterSelect,
                clearFilter,
                initFilter,
                filter,
                setFilter,
                products,
                languageVN,
                languageEN,
                handleLanguage,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
