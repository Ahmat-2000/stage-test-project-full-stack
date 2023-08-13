import { IonIcon, IonLabel, IonRedirect, IonRoute, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact, } from '@ionic/react';
import {addCircleSharp, homeSharp, listCircleSharp} from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { IonReactRouter } from '@ionic/react-router';
import ProductInput from './pages/ProductInput';
import Home from './pages/Home';
import ShowProducts from './pages/ShowProducts';
import "./main.css";
import { Route, Redirect } from 'react-router';
setupIonicReact();

const App: React.FC = () => {
  
  return(
    <IonReactRouter>
      <IonTabs>
        {/* Routes redirections handling */}
      <IonRouterOutlet>
        <Route exact={true} path='/home' render={() => <Home />}/>
        <Route exact={true} path='/productsList' render={() => <ShowProducts />}/>
        <Route exact={true} path='/productInput' render={() => <ProductInput />}/>
        <Route render={() => <Redirect to={'/home'} />} />
      </IonRouterOutlet>

        {/* Bottom navbar :
          - the slot prop can be either top or bottom to fix the TabNavBar
          - The href IonTabButton prop redirect the courent route to its value
          - The tab prop acte like an id for each IonTabButton, we don't use it but Ionic does
        */}
        <IonTabBar slot="bottom">

          <IonTabButton tab="home" href='/home'>
            <IonIcon icon={homeSharp}/>
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="productInput" href='/productInput'>
            <IonIcon icon={addCircleSharp}/>
            <IonLabel>Add Product</IonLabel>
          </IonTabButton>

          <IonTabButton tab="productsList" href='/productsList'>
            <IonIcon icon={listCircleSharp}/>
            <IonLabel>Show Products</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  )
};

export default App;
