import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Topsearch.module.scss';
import './Topsearch.module.scss';
import { AppContext } from '../../../../Context/AppProvider';
import productData from '../../../../assets/fakedata/products';
const cx = classNames.bind(styles);
export default function Topsearch() {
    const {
        topSearchLanguage,
        setFilter,
        filter,
        initFilter,
        setActiveSidebar,
        setProductsList,
        setAppClass,
        appclass,
        setAppClassMidnav,
        appclassMidnav,
        setLowToHeight,
        setHeightToLow,
    } = useContext(AppContext);

    const ToggleActive = (index, e) => {
        setActiveSidebar(e.render);

        setFilter({ ...filter, categorys: e.category });

        setAppClass({ ...appclass, activeObject: appclass.Object[index] });
        setAppClassMidnav({ ...appclassMidnav, activeObject: 0 });
        setLowToHeight(false);
        setHeightToLow(false);

        console.log('index', index);
        if (index === 0) {
            setFilter(initFilter);
            setProductsList(productData.products);
        }
    };

    function ToggleActiveStyles(index) {
        if (appclass.Object[index] === appclass.activeObject) {
            return 'active';
        } else {
            return 'topSearch';
        }
    }
    return (
        <div className={cx('wrapper')}>
            {topSearchLanguage.map((e, index) => (
                <div key={index} className={cx(ToggleActiveStyles(index, e))} onClick={() => ToggleActive(index, e)}>
                    {e.displayName}
                </div>
            ))}
        </div>
    );
}
