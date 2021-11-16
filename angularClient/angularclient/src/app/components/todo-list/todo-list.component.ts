import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from 'src/app/models/item';
import { ItemServiceService } from 'src/app/services/item-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [ItemServiceService],
})
export class TodoListComponent implements OnInit {

  itemForm!: FormGroup;
  items: Item[] = [];
  selectedItem!: Item;
  //@ViewChild("desc", { static: true }) desc: ElementRef;

  undoButton: boolean = false;

  private createForm() {
    this.itemForm = this.formBuilder.group({
      item: ""
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemServiceService,
  ) {
    this.createForm();
  }

  // Get all items when item-list component is loaded
  ngOnInit(): void {
      this.itemService.getAll().subscribe(res => (this.items = res));
  }

  // Add and update an item of the list
  onSubmit(val: { item: string | null; }) {
    if (val.item == null || val.item == "") {
      alert("Enter task description");
    } else {
      if (!this.selectedItem) {
        const newItem: Item = {
          id: NaN,
          description: val.item
        };
        this.itemService
          .save(newItem)
          .subscribe(res => this.items.push(res));
      } else {
        const updatedItem: Item = {
          // update an item require an id number
          id: this.selectedItem.id,
          description: val.item
        };
        this.itemService
          .update(updatedItem)
          .subscribe(
            res =>
              (this.items.filter(todo =>
                this.isSameTodo(res, todo)
              )[0].description = res.description)
          );
      }
    }
    //this.selectedItem = null;
    this.itemForm.reset();
  }

  delete(itemToRemove: Item) {
    this.itemService.delete(itemToRemove).subscribe(res => {
      // removing from the items array
      this.items = this.items.filter(item => item.id !== itemToRemove.id);
    });
    this.undoButton = true;
  }

  select(item: Item) {
    this.selectedItem = item;
    // To populate the input box for edit
    this.itemForm.controls["item"].setValue(item.description);
  }

  // check if two todos are same or not
  isSameTodo(itemList: Item, selectedItem: Item) {
    return itemList.id == selectedItem.id;
  }

}
