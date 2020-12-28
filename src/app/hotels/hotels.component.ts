import { Component } from '@angular/core';
import { Hotels } from './hotels';
import { HotelsService } from './hotels.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})

export class HotelsComponent {
  closeResult: string;
  hotels: Hotels[] = [];
  hotelObj = {
    name: '',
    phone: '',
    address: '',
    email: '',
    id: ''
  }
  isLoading: Subject<boolean> = this.ls.isLoading;

  constructor(public hs: HotelsService, private modalService: NgbModal, public http: HttpClient, public ls: LoadingService) {

  }

  ngOnInit(): void {
    this.hs.getHotels().subscribe((response) => {
      this.hotels = response;
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

  addHotel(formObj) {
    console.log(formObj)
    this.hs.addHotel(formObj).subscribe((response) => {
      this.getLastesHotel();
    })
  }

  getLastesHotel() {
    this.hs.getHotels().subscribe((response) => {
      this.hotels = response
    })
  }

  deleteHotel(hotel) {
    if (confirm('Are you sure?')) {
      this.hs.deleteHotel(hotel).subscribe(() => {
        this.getLastesHotel();
      })
    }
  }

  editHotel(hotel) {
    this.hotelObj = hotel;
  }

  updateHotel() {
    this.hs.updateHotel(this.hotelObj).subscribe(() => {
      this.getLastesHotel();
    })
  }
  callApi() {
    this.http.get('http://localhost:3000/Hotels')
      .subscribe(data => {
        console.log(data);
      })
  }
 
}




