import Cart from '../pages/Cart';
import LoginPage from '../pages/LoginPage';
import Introduce from '../pages/Introduce';
import Notification from '../pages/Notification';
import Support from '../pages/Support';
import Home from '../pages/Home';
const publicRoutes = [
    { path: '/salem-store', component: Home },
    { path: '/introduce', component: Introduce },
    { path: '/login', component: LoginPage },
    { path: '/cart', component: Cart },
    { path: '/support', component: Support },
    { path: '/notification', component: Notification },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
