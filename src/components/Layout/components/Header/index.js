import React, { useState } from 'react';
import './Header.module.scss';
import classNames from 'classnames/bind';
import { BellOutlined } from '@ant-design/icons';
import styles from '../Header/Header.module.scss';
import { logo, flagvn, flagen } from '../../../../assets/Images/header-img';
import Login from '../../components/Login';
import User from '../../components/user';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../../Context/AppProvider';
import { AuthContext } from '../../../../Context/AuthProvider';
import Promotion from '../Promotion';
import Search from '../Search';
const cx = classNames.bind(styles);

export default function Header() {
    const { handleLanguage, headerLanguage, flag } = React.useContext(AppContext);

    const { showLogin } = React.useContext(AuthContext);

    return (
        <div className={cx('wrapper')}>
            <Promotion />
            <div className={cx('inner')}>
                <div className={cx('container')}>
                    <div className={cx('nav')}>
                        <div className={cx('nav-container')}>
                            <div className={cx('logo')}>
                                <img src={logo} alt="logo" />
                            </div>
                            <Link to={'/'}>
                                <span>{headerLanguage[0].home}</span>
                            </Link>
                            <Link to={'/introduce'}>
                                <span>{headerLanguage[0].introduce}</span>
                            </Link>
                            <Link to={'/notification'}>
                                <div className={cx('notification')}>
                                    <span>{headerLanguage[0].notification}</span>
                                    <BellOutlined className={cx('bell')} />
                                    <div className={cx('cart-amount')}>1</div>
                                    <div className={cx('notification-container')}>
                                        <span className={cx('notification-tittle')}>
                                            {'1'} {headerLanguage[0].notification}
                                        </span>
                                        <div className={cx('notification-content')}>
                                            <div>
                                                <img alt=""></img>
                                            </div>
                                            <div className={cx('content-container')}>
                                                <h1>siêu sale 8.8</h1>
                                                <span>
                                                    8.8 với nhiều voucher hấp dẫn cuc uu dai chi co tai shopeee moi ban
                                                    dang ki
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to={'/support'}>
                                <span>{headerLanguage[0].support}</span>
                            </Link>

                            <div className={cx('selector')}>
                                <span>{headerLanguage[0].language}:</span>

                                <img className={cx('language')} src={flag} alt=""></img>
                                <div className={cx('option')}>
                                    <div className={cx('img-container')} onClick={() => handleLanguage(true)}>
                                        <span>VN</span>
                                        <img src={flagvn} alt=""></img>
                                    </div>
                                    <div className={cx('img-container')} onClick={() => handleLanguage(false)}>
                                        <span>EN</span>
                                        <img src={flagen} alt=""></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('user')}>{showLogin ? <Login /> : <User />}</div>
                    </div>
                    <Search />
                </div>
            </div>
        </div>
    );
}
