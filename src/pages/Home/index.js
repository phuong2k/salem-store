import React from 'react';
import Midnav from '../../components/Layout/components/Midnav';
import Sidebar from '../../components/Layout/DefaultLayout/Sidebar';
import classNames from 'classnames/bind';
import style from './Home.module.scss';
import Product from '../../components/Layout/components/Product';
import './Home.module.scss';
const cx = classNames.bind(style);
export default function Home() {
    return (
        <div className={cx('wrapper')}>
            <Midnav />
            <div className={cx('container')}>
                <Sidebar />
                <Product />
            </div>
        </div>
    );
}
