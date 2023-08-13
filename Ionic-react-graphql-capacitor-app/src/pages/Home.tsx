import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <div className='flex-center'>
        <p>Welcome to our App</p>
      </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
