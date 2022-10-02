import React from 'react';
import classNames from 'classnames/bind';
import styles from '../PolicyCard/PolicyCard.module.scss';
import '../PolicyCard/PolicyCard.module.scss';

const cx = classNames.bind(styles);

export default function PolicyCard(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('icon')}>
                <i className={props.icon}></i>
            </div>
            <div className={cx('info')}>
                <div className={cx('name')}>{props.name}</div>
                <h5 className={cx('tittle')}>{props.description}</h5>
            </div>
        </div>
    );
}
