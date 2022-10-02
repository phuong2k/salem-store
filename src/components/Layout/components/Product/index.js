import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import './Product.module.scss';
import styles from './Product.module.scss';
import ProductCard from '../ProductCard';
import { AppContext } from '../../../../Context/AppProvider';
const cx = classNames.bind(styles);
export default function Product() {
    const { products } = useContext(AppContext);
    const datas = Object.entries(products);
    return (
        <div className={cx('product')}>
            <div className={cx('row')}>
                {datas?.map((item, index) => (
                    <div className={cx('col')}>
                        <ProductCard
                            key={index}
                            img01={item[1].image01}
                            img02={item[1].image02}
                            img03={item[1].image03}
                            name={item[1].title}
                            price={item[1].price}
                            slug={item[1].slug}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
