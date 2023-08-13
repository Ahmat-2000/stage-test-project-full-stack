import { IonApp, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import {addCircleSharp} from 'ionicons/icons';

import { useRef } from 'react';

setupIonicReact();

const Test: React.FC = () => {
  const inputRefName = useRef<HTMLIonInputElement>(null);
  const inputRefPrice = useRef<HTMLIonInputElement>(null);
  const inputRefQuantity = useRef<HTMLIonInputElement>(null);
  const addTodos = () => {

  }
  return(
    <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Add Todos</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className='ion-padding'>
      <div className='flex-center'>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position='floating'>Name</IonLabel>
              <IonInput ref={inputRefName}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position='floating'>Price</IonLabel>
              <IonInput ref={inputRefPrice}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position='floating'>Quantity</IonLabel>
              <IonInput ref={inputRefQuantity}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton onClick={addTodos}>
              <IonIcon icon={addCircleSharp} slot="start" size='large'/>
              Add Product
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
      </div>
    </IonContent>
  </>)
};

export default Test;
