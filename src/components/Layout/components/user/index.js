import React, { useContext } from 'react';
import './User.module.scss';
import classNames from 'classnames/bind';
import styles from '../user/User.module.scss';
import { LogoutOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../../Context/AppProvider';
import { AuthContext } from '../../../../Context/AuthProvider';
import { auth } from '../../../../firebase/config';

const cx = classNames.bind(styles);

export default function User() {
    const {
        user: { displayName, photoURL },
    } = useContext(AuthContext);
    const { headerLanguage } = useContext(AppContext);

    return (
        <div className={cx('user')}>
            <div className={cx('user-info')}>
                <Link to={'/notification'}>
                    <Avatar src={photoURL} className={cx('avatar')}>
                        {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <h1 className={cx('name')}>{displayName}</h1>
                </Link>
                <div className={cx('user-option')}>
                    <Button className={cx('logout')}>
                        <Link to={'/notification'}>
                            <div>
                                <h2>{headerLanguage[0].account}</h2>
                            </div>
                        </Link>
                    </Button>
                    <Button className={cx('logout')}>
                        <div onClick={() => auth.signOut()}>
                            <h2>{headerLanguage[0].logout}</h2>

                            <LogoutOutlined className={cx('icon')} />
                        </div>
                    </Button>
                </div>
            </div>

            <Link to={'/cart'}>
                <div className={cx('cart')}>
                    <ShoppingOutlined className={cx('cart-icon')} />
                    <span>0</span>
                </div>
            </Link>
        </div>
    );
}
