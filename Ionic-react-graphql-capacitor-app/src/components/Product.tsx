import { IonButton, IonCol, IonIcon, IonRow, IonTabButton } from "@ionic/react";
import React from "react";
import { oneItem } from "../Interfaces/Type";
import { trashSharp, pencilSharp } from "ionicons/icons";
const Product: React.FC<oneItem> = (props) => {
    const item = props.item;
  return (
      <IonRow className="grille border">
            <IonCol className='border'>{item.name}</IonCol>
            <IonCol className='border'>{item.price}</IonCol>
            <IonCol className='border'>{item.quantity}</IonCol>
            <IonCol className='border'>
                <IonTabButton >
                    <IonIcon icon={trashSharp}/> 
                    trash
                </IonTabButton >
            </IonCol>
            <IonCol className='border'>
                <IonButton expand="block">
                    <IonIcon icon={pencilSharp}/>
                </IonButton>
            </IonCol>
      </IonRow>
  );
};

export default Product;
