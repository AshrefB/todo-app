import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentUser = null;
  currentDate = new Date();
  addTask: boolean;
  tasks = [];
  myTask = '';

  constructor(
    private afDB: AngularFireDatabase,
    private fAuth: AngularFireAuth,
    private router: Router
  ) {
    this.fAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
      this.getTasks();
    });
  }

  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }

  addTaskToFirebase() {
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      date: new Date().toISOString(),
      checked: false,
      user: this.currentUser.email
    });
    this.showForm();
  }

  getTasks() {
    this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_changed', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      actions.forEach(action => {
        if(
          action.payload.exportVal().user == this.currentUser?.email && 
          action.payload.exportVal().checked
          ) {
          this.tasks.push({
            key: action.key,
            text: action.payload.exportVal().text,
            hour: action.payload.exportVal().date.substring(11, 16),
            checked: action.payload.exportVal().checked
          });
        }
      });
    });
  }

  changeCheckState(ev: any) {
    this.afDB.object('Tasks/' + ev.key + '/checked/').set(ev.checked);
  }

  deleteTask(task: any) {
    this.afDB.list('Tasks/').remove(task.key);
  }

  logout() {
    this.fAuth.signOut()
      .then(() => this.router.navigate(['/login']));
  }
}
