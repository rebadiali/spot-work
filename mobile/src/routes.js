import { createAppContainer, createSwitchNavigation, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';
import MyBookings from './pages/MyBookings';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book,
        MyBookings,
    })
);

export default Routes;