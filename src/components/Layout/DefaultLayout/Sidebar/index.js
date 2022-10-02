import classNames from 'classnames/bind';
import React, { useState, useContext, useEffect } from 'react';
import './Sidebar.module.scss';
import styles from './Sidebar.module.scss';
import { categoryEN, categoryVN } from '../../../../assets/fakedata/category';
import FilterProduct from '../../components/FilterProduct';
import { AppContext } from '../../../../Context/AppProvider';
import productData from '../../../../assets/fakedata/products';
const cx = classNames.bind(styles);
export default function Sidebar() {
    const {
        language,
        languageEN,
        setRender,
        setFilter,
        initFilter,
        activeSidebar,
        setActiveSidebar,
        setAppClass,
        appclass,
        setProductsList,
        setAppClassMidnav,
        appclassMidnav,
        setLowToHeight,
        setHeightToLow,
    } = useContext(AppContext);
    const category = language === languageEN ? categoryEN : categoryVN;
    const [appClassSidebar, setAppClassSidebar] = useState({
        activeObject: [],
        Object: category.map((e) => e.id),
    });
    // const ToggleActive = (index) => {
    //     if (!appclass.activeObject.includes(index)) {
    //         setAppClass({ ...appclass, activeObject: [...appclass.activeObject, appclass.Object[index]] });
    //     } else {
    //         setAppClass({
    //             ...appclass,
    //             activeObject: appclass.activeObject.filter((e) => e !== appclass.Object[index]),
    //         });
    //     }
    // };
    // function ToggleActiveStyles(index) {
    //     if (appclass.activeObject.includes(appclass.Object[index])) {
    //         return 'active';
    //     } else {
    //         return ' ';
    //     }
    // }
    const ToggleActive = (index, e) => {
        setFilter(initFilter);
        setActiveSidebar(e.render);
        setAppClass({ ...appclass, activeObject: [] });
        setAppClassMidnav({ ...appclassMidnav, activeObject: 0 });
        setLowToHeight(false);
        setHeightToLow(false);
        if (index === appClassSidebar.activeObject) {
            setAppClassSidebar({ ...appClassSidebar, activeObject: [] });
        } else {
            setAppClassSidebar({ ...appClassSidebar, activeObject: appClassSidebar.Object[index] });
            setProductsList(productData.getProductByRender(e.render));
        }
    };

    function ToggleActiveStyles(index, e) {
        if (appClassSidebar.Object[index] === appClassSidebar.activeObject || e.render === activeSidebar) {
            if (e.render === activeSidebar) {
                setRender(e.render);
                return 'active';
            } else {
                return 'topsearch';
            }
        } else {
            return 'topSearch';
        }
    }

    const handleRender = (e) => {
        setRender(e.render);
    };
    return (
        <div className={cx('wrapper')}>
            {category.map((e, index) => (
                <div key={index} className={cx('container')} onClick={() => handleRender(e)}>
                    <div className={cx('menu')} onClick={() => ToggleActive(index, e)}>
                        <h3>{e.display}</h3>
                        <i className="bx bx-chevron-down"></i>
                    </div>
                    <div className={cx(ToggleActiveStyles(index, e))}>
                        <FilterProduct key={index} />
                    </div>
                </div>
            ))}
        </div>
    );
}
