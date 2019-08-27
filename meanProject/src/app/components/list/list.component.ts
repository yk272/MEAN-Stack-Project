import { Component, OnInit } from '@angular/core';
import {IssueService} from '../../issue.service';
import {Router} from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { AppRoutingModule } from '../../app-routing.module';
import {Issue} from '../../issue.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  issues : Issue[];
  displayedColumns = ['title','responsible','severity','status','actions'];

  constructor(private issueService:IssueService,private router:Router) { }

  ngOnInit() {
   this.fetchIssues();
  }

  fetchIssues(){
    this.issueService
        .getIssues()
        .subscribe((data:Issue[])=>{
          this.issues = data;
          console.log('Data Requested');
          console.log(this.issues);
        });
  }

  editIssue(id){
    this.router.navigate([`/edit/${id}`]);
  }
  deleteIssue(id){
    this.issueService.deleteIssue(id).subscribe(()=>{
      this.fetchIssues();
    });
  }


}
