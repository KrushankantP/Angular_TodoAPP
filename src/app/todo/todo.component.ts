import { Component, OnInit } from '@angular/core';
// 1. here we are injecting (or) importing the todoservices inorder to access the todoList variable, and many others.
import { TodoService } from './shared/todo.service';

import {element} from "protractor";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  //2. here we have define the provider who provide the services.
  //as of now we have ToDoServices is provider.
  providers:[TodoService]
})
export class TodoComponent implements OnInit {

  //3. converting a List into an Array in order to design an HTML. toDoListArray it type is any.
  toDolistArray: any[];
  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    //4. injected service and function.

    this.todoService.getToDoList().snapshotChanges()
      //5. so whenever we made any change in firebaseDB the subscribe function will be called
      //and thereby "toDoListArray:any[]  will be updated."
      .subscribe(item=>{ // 6. inside this "item" parameter we have the data collection from firebaseDB.

        //7. initialize array to an empty array.
        this.toDolistArray =[];
        //8. now, we have to iterate through this item variable in order to convert that into an array.
        //it has parameter "element"
        //local variable "x".
        item.forEach(element=>{
          //9. a local variable initialized with this property,"element.payload.toJson"
          // toJSON means this will retrieve a json data to the corresponding inserted data.
          //that means we are going to save a new object with this (todoService.ts) property "title and isChecked".
          var x = element.payload.toJSON();
          //11. inorder to retrieve unique key of the corresponding element we have assigned
          // element or key in this property in this jason object dollar key
          x["$key"] =element.key;
          //12. finally we push this object into this toDoListArray[].
          this.toDolistArray.push(x);
        })


        //13. sort array isChecked false -> true
        //this will sort unchecked item to top and checked item to bottom of the list.
        this.toDolistArray.sort((a,b)=> {
          return a.isChecked - b.isChecked;
        })
      });
  }

  //14. next Add HTML todoComponent.html
  //itemTitle will take input from the textbox object or reference.

  onAdd(itemTitle){
      this.todoService.addTitle(itemTitle.value);
      //reset the text box by assigning null.
      itemTitle.value = null;
  }
   //
  alterCheck($key:string, isChecked){
    this.todoService.checkOrUnCheckTitle($key, !isChecked)
  }
  onDelete($key :string){
    this.todoService.removeTitle($key);
  }
}
