import { IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Product from '../components/Product';
// import DB from '../data';
import { Item } from '../Interfaces/Type';
// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';

const GET_ALL_PRODUCTS = gql`
  query{
    getAllProduct {
      id
      name
      price
      quantity
    }
  }
`;
const ShowProducts: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS,{pollInterval: 400});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List of all products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <div className='ion-margin'> 
        <IonGrid fixed={true}>
            <IonRow>
                <IonCol className="center">Name</IonCol>
                <IonCol className="center">Price</IonCol>
                <IonCol className="center">Quantity</IonCol>
                <IonCol className="center">Delete</IonCol>
                <IonCol className="center">Update</IonCol>
            </IonRow>
            {
                data.getAllProduct.map((prod: Item) => (<Product item={prod} key={prod.id} />) )
            }
        </IonGrid>
        </div>
      </IonContent>
    </>
  );
};

export default ShowProducts;
