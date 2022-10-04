import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import '../LoginPage/LoginPage.module.scss';
import styles from '../LoginPage/LoginPage.module.scss';
import HeroSlide from '../../components/Layout/components/HeroSlide';
import heroSliderData from '../../assets/fakedata/hero-slider';
import PolicyCard from '../../components/Layout/components/PolicyCard';
import { AppContext } from '../../Context/AppProvider';
import policy from '../../assets/fakedata/policy';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDocument, generateKeyword } from '../../firebase/services';
import { getAdditionalUserInfo } from 'firebase/auth';
const cx = classNames.bind(styles);

const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

export default function LoginPage() {
    const { headerLanguage, products } = useContext(AppContext);
    const handleLogin = async (provider) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const details = getAdditionalUserInfo(result);
                // products.map((e) => {
                //     console.log(e.id);
                //     addDocument('products', {
                //         id: e.id,
                //         title: e.title,
                //         day: e.day,
                //         price: e.price,
                //         image01: e.image01,
                //         image02: e.image02,
                //         image03: e.image03,
                //         categorySlug: e.categorySlug,
                //         colors: e.colors,
                //         slug: e.slug,
                //         size: e.size,
                //         decription: e.decription,
                //         color_info: e.color_info,
                //         size_info: e.size_info,
                //         material: e.material,
                //         form: e.form,
                //         origin: e.origin,
                //         render: e.render,
                //         date: e.date,
                //         sold: e.sold,
                //         keyWord: generateKeyword(e.title?.toLowerCase()),
                //     });
                // });
                if (details?.isNewUser) {
                    console.log('oke');
                    addDocument('users', {
                        displayName: result.user.displayName,
                        email: result.user.email,
                        photoURL: result.user.photoURL,
                        uid: result.user.uid,
                        providerId: details.providerId,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className={cx('Wrapper')}>
            <div className={cx('productSlide')}>
                <HeroSlide data={heroSliderData} />
            </div>
            <div className={cx('login')}>
                <div className={cx('login-wrapper')}>
                    <h1>{headerLanguage[0].loginWith}</h1>

                    <Link to="/" className={cx('button')}>
                        <button onClick={() => handleLogin(fbProvider)}>{headerLanguage[0].loginFb}</button>
                        <button onClick={() => handleLogin(ggProvider)}>{headerLanguage[0].loginGg}</button>
                    </Link>
                </div>
                <div className={cx('policyCard')}>
                    {policy.map((item, index) => (
                        <Link key={index} to="/support">
                            <PolicyCard name={item.name} description={item.description} icon={item.icon} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
