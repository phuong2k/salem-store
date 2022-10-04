import React, { useState } from 'react';
import './Search.module.scss';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import Topsearch from '../Topsearch';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { AppContext } from '../../../../Context/AppProvider';
import { debounce } from 'lodash';
import { db } from '../../../../firebase/config';
import { Select, Spin, Avatar, Input } from 'antd';

const cx = classNames.bind(styles);
function DebounceSelect({ fetchOptions, debounceTimeout = 300, curMembers, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions, curMembers]);

    React.useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    return (
        <Select
            // labelInValue
            // filterOption={false}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size="small" src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}

async function fetchUserList(search, curProduct) {
    return db
        .collection('users')
        .where('keywords', 'array-contains', search?.toLowerCase())
        .orderBy('displayName')
        .limit(20)
        .get()
        .then((snapshot) => {
            return snapshot.docs
                .map((doc) => ({
                    label: doc.data().title,
                    value: doc.data().id,
                    photoURL: doc.data().image01,
                }))
                .filter((opt) => !curProduct.includes(opt.value));
        });
}
export default function Search() {
    const { headerLanguage } = React.useContext(AppContext);
    const [value, setValue] = useState('');
    const handleDelete = () => {
        setValue('');
    };
    const handleInputChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <div className={cx('search')}>
            <h1>Salem-Store Search</h1>
            <div className={cx('search-container')}>
                <div className={cx('search-input')}>
                    <Input
                        value={value}
                        type="text"
                        placeholder={headerLanguage[0].searchInput}
                        onChange={handleInputChange}
                        onSearch={debounceFetcher}
                    />

                    <DebounceSelect
                        mode="multiple"
                        name="search-user"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Nhập tên thành viên"
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                    />

                    <div className={cx('delete')}>
                        <CloseOutlined onClick={() => handleDelete()} />
                    </div>
                    <Topsearch />
                </div>
                <div className={cx('search-icon')}>
                    <SearchOutlined className={cx('searchOutlined')} />
                </div>
            </div>
        </div>
    );
}
