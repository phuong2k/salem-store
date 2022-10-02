import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './ProductCard.module.scss';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
const ProductCard = (props) => {
    return (
        <div className={cx('wrapper')}>
            <Link to={`/catalog/${props.slug}`}>
                <div className={cx('product_img')}>
                    <img src={props.img01} alt="" />
                </div>
                <h3 className={cx('product_name')}>{props.name}</h3>
                <div className={cx('product_price')}>
                    {props.price}
                    <span className={cx('product_sale')}>
                        <del>{499000}</del>
                    </span>
                </div>
            </Link>
        </div>
    );
};

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    img03: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
};

export default ProductCard;
