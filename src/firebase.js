import { initializeApp } from 'firebase/app';
import { Database, getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBMdxkW7dcz8NyOS33jQAumpE_gITmEC-c',
	authDomain: 'todosproject-8512e.firebaseapp.com',
	projectId: 'todosproject-8512e',
	storageBucket: 'todosproject-8512e.appspot.com',
	messagingSenderId: '497158002521',
	appId: '1:497158002521:web:808a353f7b17d82d5bde48',
	databaseURL:
		'https://todosproject-8512e-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
