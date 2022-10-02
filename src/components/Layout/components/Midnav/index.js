import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Midnav.module.scss';
import './Midnav.module.scss';
import { AppContext } from '../../../../Context/AppProvider';

const cx = classNames.bind(styles);
export default function Midnav() {
    const {
        midnavLanguage,
        sortLanguage,
        numProduct,
        setProducts,
        products,
        appclassMidnav,
        setAppClassMidnav,
        heightToLow,
        setHeightToLow,
        lowToHeight,
        setLowToHeight,
    } = useContext(AppContext);

    function tinhday(productDate) {
        let str1 = productDate.split('/');
        const t1 = new Date(str1[2], str1[0] - 1, str1[1]);

        const dayold = t1.getDate();
        const monthold = t1.getMonth() * 30;
        const yearold = t1.getFullYear() * 365;
        const diffold = dayold + monthold + yearold;

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() * 30;
        const year = date.getFullYear() * 365;
        const diff = day + month + year;

        var result = diff - diffold;
        return result;
    }
    const [getData, setGetData] = useState([]);
    useEffect(() => {
        setGetData(Object.entries(products));
    }, [products]);

    getData.map((e) => {
        e.day = tinhday(String(e[1].date));
        e[1] = { ...e[1], day: tinhday(String(e[1].date)) };
        return tinhday;
    });
    const dataProduct = [];
    const data = Object.fromEntries(getData);
    for (let objectKeys in data) {
        dataProduct.push(data[objectKeys]);
    }
    console.log('product', products);
    const ToggleActive = (index, e) => {
        setAppClassMidnav({ ...appclassMidnav, activeObject: appclassMidnav.Object[index] });
        switch (e.category) {
            case 'ALL':
                console.log('all');
                setProducts(
                    dataProduct.sort(function () {
                        return 0.5 - Math.random();
                    }),
                );
                break;
            case 'NEW':
                setProducts(
                    dataProduct.sort(function (a, b) {
                        return a.day - b.day;
                    }),
                );
                console.log('new');
                break;
            case 'TOPSALE':
                console.log('topsale');
                setProducts(
                    dataProduct.sort(function (a, b) {
                        return b.sold - a.sold;
                    }),
                );
                break;
            default:
        }
    };

    function ToggleActiveStyles(index) {
        if (appclassMidnav.Object[index] === appclassMidnav.activeObject) {
            return 'active';
        } else {
            return 'topSearch';
        }
    }

    const handleLowToHeight = () => {
        setLowToHeight(true);
        setHeightToLow(false);
        setProducts(
            dataProduct.sort(function (a, b) {
                return a.price - b.price;
            }),
        );
        setAppClassMidnav({ ...appclassMidnav, activeObject: 0 });
    };
    const handleHeightToLow = () => {
        setLowToHeight(false);
        setHeightToLow(true);
        setProducts(
            dataProduct.sort(function (a, b) {
                return b.price - a.price;
            }),
        );
        setAppClassMidnav({ ...appclassMidnav, activeObject: 0 });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('item')}>
                {' '}
                {numProduct} {midnavLanguage.items}
            </div>
            <div className={cx('sort-container')}>
                <div className={cx('sort')}>
                    {sortLanguage.map((e, index) => (
                        <h3
                            key={index}
                            className={cx(ToggleActiveStyles(index))}
                            onClick={() => ToggleActive(index, e)}
                        >
                            {e.displayName}
                        </h3>
                    ))}
                </div>
                <div className={cx('sort-price')}>
                    <div className={cx('sort-price_select')}>
                        <h3>{midnavLanguage.sort}</h3>
                        <div className={cx('sort-price_active')}>
                            <h5 className={cx(lowToHeight ? 'active' : '')}>{midnavLanguage.priceIncrease} </h5>
                            <h5 className={cx(heightToLow ? 'active' : '')}>{midnavLanguage.priceReduce}</h5>
                        </div>
                        <i className="bx bx-chevron-down"></i>
                    </div>
                    <div className={cx('sort-price_option')}>
                        <button onClick={() => handleLowToHeight()}>{midnavLanguage.priceIncrease}</button>
                        <button onClick={() => handleHeightToLow()}>{midnavLanguage.priceReduce}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
