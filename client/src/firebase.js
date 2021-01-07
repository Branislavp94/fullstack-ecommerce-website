import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyA144jWlqEi-Pu_h_6OTwwSWbtHliMFW4Y',
	authDomain: 'ecommerce-product-page.firebaseapp.com',
	databaseURL: 'https://ecommerce-product-page.firebaseio.com',
	projectId: 'ecommerce-product-page',
	storageBucket: 'ecommerce-product-page.appspot.com',
	messagingSenderId: '275977762378',
	appId: '1:275977762378:web:fc372a3373702b1fec18b3',
	measurementId: 'G-HK11GHQ89Q'
};

firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
