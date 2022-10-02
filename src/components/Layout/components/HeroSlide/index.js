import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import './HeroSlide.module.scss';
import styles from './HeroSlide.module.scss';

// import Button from './Button';
const cx = classNames.bind(styles);
const HeroSlide = (props) => {
    const data = props.data;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-tablet')}>
                <Splide
                    options={{
                        type: 'loop',
                        perPage: 1,

                        rewind: true,

                        autoplay: true,
                        speed: 1000,
                        arrows: false,
                    }}
                >
                    {data.getTabletSliderData().map((item, index) => (
                        <SplideSlide key={index}>
                            <Link to={item.path}>
                                <div className={cx('slide-img')}>
                                    <img src={item.img} alt="" />
                                </div>
                            </Link>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
            <div className={cx('slide-mobile')}>
                <Splide
                    options={{
                        type: 'loop',
                        perPage: 1,

                        rewind: true,

                        autoplay: true,
                        speed: 1000,
                        arrows: false,
                    }}
                >
                    {data.getMobileSliderData().map((item, index) => (
                        <SplideSlide className={cx('slide-mobile')} key={index}>
                            <Link to={item.path}>
                                <div className={cx('slide-mobile-img')}>
                                    <img src={item.img} alt="" />
                                </div>
                            </Link>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
};

HeroSlide.propTypes = {
    data: PropTypes.object.isRequired,
};

export default HeroSlide;
