import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Promotion.module.scss';
import './Promotion.module.scss';
import { promotionen, promotionvn } from '../../../../assets/fakedata/promotion';
import { AppContext } from '../../../../Context/AppProvider';
import { languageVN } from '../../../../assets/fakedata/Language';
const cx = classNames.bind(styles);

const Promotion = () => {
    const [promo, setPromo] = useState(false);
    const { language } = useContext(AppContext);
    useEffect(() => {
        if (language === languageVN) {
            setPromo(false);
        } else {
            setPromo(true);
        }
    }, [language]);
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('scroll')}>{promo ? promotionen : promotionvn}</h4>
            <div className={cx('box-shadow')}></div>
        </div>
    );
};

export default Promotion;
