// import React from 'react';
import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyCsnrQ3RBDtzj-7MyFOr-cRTykxaQ7qcp8",
	authDomain: "ipssi-react-project-1.firebaseapp.com",
	projectId: "ipssi-react-project-1",
	storageBucket: "ipssi-react-project-1.appspot.com",
	messagingSenderId: "474275528957",
	appId: "1:474275528957:web:093e9b68e67818869d3e94"
};

export default class Fire {

	constructor(callback) {
		this.init(callback);
	}

	init(callback){
		if(!firebase.app.length){
			firebase.initializeApp(firebaseConfig);
		}

		firebase.auth().onAuthStateChanged(user=> {
			if(user){
				callback(null);
			}else{
				firebase.auth().signInAnonymously().catch(error => {
					callback(error);
				});
			}
		})
	}

	get ref() {
		return firebase.firestore().collection("Lists");
	}

	getLists(callback) {
		let ref = this.ref.orderBy("name");
		this.unsubcribe = ref.onSnapshot(snapshot => {
			let lists = [];
			snapshot.forEach(doc =>{
				lists.push({ id:doc.id ,...doc.data() });
			});
			callback(lists);
		},function(error){
			console.error(error);
		});
	}


	addList(list) {
		let ref = this.ref;
		ref.add(list);
	}

	deleteList(list) {
		let ref = this.ref;
		ref.doc(list.id).delete();
	}

	updateList(list) {
		let ref = this.ref;
		ref.doc(list.id).update(list);
	}

	detach(){
		this.unsubcribe();
	}

}

