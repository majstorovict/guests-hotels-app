import { Component } from '@angular/core';
import { GuestsService } from './guests.service';
import { Guests } from './guests';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})

export class GuestsComponent {

  closeResult: string;
  guests: Guests[] = [];
  guestObj = {
    name: '',
    surname: '',
    phone: '',
    id: ''
  }
  isLoading: Subject<boolean> = this.ls.isLoading;

  constructor(public gs: GuestsService, private modalService: NgbModal, public http: HttpClient, public ls: LoadingService) {

  }

  ngOnInit(): void {
    this.gs.getGuests().subscribe((response) => {
      this.guests = response;
    })
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  addGuest(formObj) {
    console.log(formObj)
    this.gs.addGuest(formObj).subscribe(() => {
      this.getLastesGuest();
    })
  }

  getLastesGuest() {
    this.gs.getGuests().subscribe((response) => {
      this.guests = response
    })
  }

  deleteGuest(guest) {
    if (confirm('Are you sure?')) {
      this.gs.deleteGuest(guest).subscribe(() => {
        this.getLastesGuest();
      })
    }
  }

  editGuest(guest) {
    this.guestObj = guest;
  }

  updateGuest() {
    this.gs.updateGuest(this.guestObj).subscribe(() => {
      this.getLastesGuest();
    })
  }
  callApi() {
    this.http.get('http://localhost:8000/Guests')
      .subscribe(data => {
        console.log(data);
      })
  }
}
