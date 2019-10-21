import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './pages/Login';
import Book from './pages/Book';
import List from './pages/List';


const Routes = createAppContainer( //precisamos colocar ele ao redor de todas as nossas rotas 
    createSwitchNavigator({
        Login,
        List,
        Book
    })
);

export default Routes;