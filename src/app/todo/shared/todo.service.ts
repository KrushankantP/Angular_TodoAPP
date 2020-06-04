//Step 3
//1. here in this class we will interact with the firebasedb..
import { Injectable } from '@angular/core';
//2. Added required classes for that.
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // 4.Property to store complete todolist item from firebasedb.
  toDoList: AngularFireList<any>;

  //3. Inorder to work with firebase database we need to create AngularFirebaseDatabase object.
  constructor(private firebasedb: AngularFireDatabase) { }//

  // 5. Retrieve  data from the firebasedb
  getToDoList(){
    //6. initialize toDoList variable with the result return from the firebaseDB
    this.toDoList =this.firebasedb.list('titles');
    //7. here we return the list on the function called off.
    return this.toDoList;
  }

  // 8. in order to add a todoList item into firebaseDB.
  //parameter: title with Type: String
  addTitle(title:string)
  {
    //9. add or insert a new record into firebaseDB we just need to called push function
    //From AngularFireList object which is todolist object.
    //10. "element.payload.toJSON(); from (todoComponenet.ts) will retrieve Json object data into this type
    // (title and isChecked).
      this.toDoList.push({
        // 11. Push: has 2 property title and isChecked.
        title:title,
        //12. isChecked property is used for, whether this item or job is completed or not.
        isChecked: false
      });
  }

  //13. whenever we insert a new record into firebasedb it will automatically
  // create a unique string too identify each of this records.
  //we have used unique key in our application inorder to identify items inside our application.
  //parsing unique key from todocomponent along with that a flag boolean to indicate
  //weather this item is done or not.


  checkOrUnCheckTitle($key:string, flag:boolean) {
    // 14. using that kay we can update is checked property of that particular item.
    this.toDoList.update($key, {isChecked:flag});
  }

  // 15. to remove item from the list.
  //we used unique $key and parsed into the remove function.
  removeTitle($key:string){
    this.toDoList.remove($key);
  }
}
// next HTML in app.Component.
