import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FilterProduct.module.scss';
import './FilterProduct.module.scss';
import { Button, Checkbox } from 'antd';
import size from '../../../../assets/fakedata/products-size';
import colors from '../../../../assets/fakedata/product-color';
import { AppContext } from '../../../../Context/AppProvider';
const cx = classNames.bind(styles);
export default function FilterProduct() {
    const { filter, category, filterSelect, clearFilter } = useContext(AppContext);
    const [categorys, setCategorys] = useState([]);
    useEffect(() => {
        if (category) {
            setCategorys(category);
        }
    }, [category]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('catalog')}>
                <div className={cx('catalog_filter')}>
                    <div className={cx('catalog_filter_title')}> Danh mục sản phẩm</div>
                    <div className={cx('catalog_filter_content')}>
                        {categorys.map((item, index) => (
                            <p key={index}>
                                <Checkbox
                                    onChange={(input) => filterSelect('CATEGORY', input.target.checked, item)}
                                    checked={filter.categorys?.includes(item.categorySlug)}
                                >
                                    {item.display}
                                </Checkbox>
                            </p>
                        ))}
                    </div>
                </div>
                <div className={cx('catalog_filter')}>
                    <div className={cx('catalog_filter_title')}> kích cỡ / Size</div>
                    <div className={cx('catalog_filter_content')}>
                        {size.map((item, index) => (
                            <p key={index}>
                                <Checkbox
                                    onChange={(input) => filterSelect('SIZE', input.target.checked, item)}
                                    checked={filter.size.includes(item.size)}
                                >
                                    {item.display}
                                </Checkbox>
                            </p>
                        ))}
                    </div>
                </div>
                <div className={cx('catalog_filter')}>
                    <div className={cx('catalog_filter_title')}> Màu sắc</div>
                    <div className={cx('catalog_filter_content')}>
                        {colors.map((item, index) => (
                            <p key={index}>
                                <Checkbox
                                    onChange={(input) => filterSelect('COLOR', input.target.checked, item)}
                                    checked={filter.color.includes(item.color)}
                                >
                                    {item.display}
                                </Checkbox>
                            </p>
                        ))}
                    </div>
                </div>
                <div className={cx('catalog_filter')}>
                    <div className={cx('catalog_filter_content')}>
                        <Button size="sm" onClick={clearFilter}>
                            xoá bộ lọc
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
