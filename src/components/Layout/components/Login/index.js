import React, { useContext, useEffect } from 'react';
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import './Login.module.scss';
import styles from '../Login/Login.module.scss';
import { AppContext } from '../../../../Context/AppProvider';
const cx = classNames.bind(styles);

export default function Login() {
    const { headerLanguage } = useContext(AppContext);
    return (
        <Link to={'/login'}>
            <div className={cx('wrapper')}>
                <LoginOutlined className={cx('icon')} />
                <Button>{headerLanguage[0].login}</Button>
            </div>
        </Link>
    );
}
