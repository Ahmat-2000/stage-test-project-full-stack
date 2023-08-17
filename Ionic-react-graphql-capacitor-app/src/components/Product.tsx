import { IonButton, IonCol, IonIcon, IonRow } from "@ionic/react";
import React from "react";
import { oneItem } from "../Interfaces/Type";
import { trashSharp, pencilSharp } from "ionicons/icons";
import { useMutation , gql} from "@apollo/client";
import { useHistory } from 'react-router-dom';
import { useContext } from "react";
import {updateContext} from "../App";
const DELETE_ITEM = gql`
    mutation DeleteProductById($productId: ID!) {
        deleteProductById(productId: $productId)
    }
`;

const Product: React.FC<oneItem> = (props) => {
    const {setUpdateInput} = useContext<any>(updateContext);
    const navigate = useHistory();
    const item = props.item;
    const [trashClick, { 
        loading, error, data},
    ] = useMutation(DELETE_ITEM, {
        onCompleted: (data) => window.alert(data.deleteProductById),
        onError: (error) => window.alert(error.message),
    });
    const trashButtonHandler = () => {
        const confirm = window.confirm("Do you realy want to delete this Item ?");
        if(confirm) trashClick({ variables: { productId: item.id}});
    }
    const UpdateButtonHandler = (e:React.MouseEvent<HTMLIonButtonElement, MouseEvent> ) => {
        e.preventDefault();
        setUpdateInput(() => ({
            id: item.id,
            name : item.name,
            price: item.price,
            quantity: item.quantity,
            isUpdate: true
        }));
        navigate.push("/productInput");
    }
    return (
    <IonRow className="grille">
        <IonCol className="center" >{item.name}</IonCol>
        <IonCol className="center">{item.price}</IonCol>
        <IonCol className="center">{item.quantity}</IonCol>
        <IonCol className="center" >
            <IonButton onClick={trashButtonHandler} className="grid-button">
                <IonIcon color="danger" icon={trashSharp}/> 
            </IonButton >
        </IonCol>
        <IonCol className="center">
            <IonButton onClick={(e) => UpdateButtonHandler(e)} color="success" className="grid-button">
                <IonIcon className="grid-button" color="danger" icon={pencilSharp}/>
            </IonButton>
        </IonCol>
    </IonRow>
    );
};

export default Product;
