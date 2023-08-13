import { IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Product from '../components/Product';
import DB from '../data';
import { Item } from '../Interfaces/Type';
const ShowProducts: React.FC = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List of all products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <div className='ion-margin'> 
        <IonGrid fixed={true} className='grille'>
            <IonRow>
                <IonCol>Name</IonCol>
                <IonCol>Price</IonCol>
                <IonCol>Quantity</IonCol>
                <IonCol>Delete</IonCol>
                <IonCol>Update</IonCol>
            </IonRow>
            {
                DB.map((prod: Item) => (<Product item={prod} />) )
            }
        </IonGrid>
        </div>
      </IonContent>
    </>
  );
};

export default ShowProducts;
