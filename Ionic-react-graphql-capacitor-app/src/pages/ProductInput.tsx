import { IonButton, IonCard,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle,IonContent,IonHeader,IonInput,IonItem,IonTitle, IonToolbar } from '@ionic/react';
import * as Yup from 'yup';
const ProductInput: React.FC = () => {

  const intialFieldValue = {name :"", unite_price:"", quantity: ""};
  const handleSubmit = () => {
    
  }
  const validationSchema = Yup.object().shape({
      name: Yup.string().min(3).max(25).required(),
      unite_price: Yup.number().positive().min(0.01 ).required(),
      quantity: Yup.number().positive().min(1).required().integer()
  });
  return (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Product input handler</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className='ion-padding'>
    <form className='flex-vertical'>
        <IonCard>
          <IonCardContent>
          <IonItem className='input'>
            <IonInput  clearInput={true}label="Name" labelPlacement="stacked" placeholder="Enter the product name" />
          </IonItem>
          <IonItem className='input'>
            <IonInput clearInput={true} label="Price" labelPlacement="stacked" placeholder="Enter the product price" />
          </IonItem>
          <IonItem className='input'>
            <IonInput clearInput={true} label="Quantity" labelPlacement="stacked" placeholder="Enter the product quantity" />
          </IonItem>
          </IonCardContent>
          <IonButton expand='block'>Add product</IonButton>
        </IonCard>
    </form>
    </IonContent>
  </>
);
};

export default ProductInput;
