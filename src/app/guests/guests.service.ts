import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guests } from './guests';


@Injectable()

export class GuestsService {

  constructor(private httpclient: HttpClient) { }

  url: string = "http://localhost:8000/Guests";

  getGuests() {
    return this.httpclient.get<Guests[]>(this.url);
  }
  addGuest(guests) {
    return this.httpclient.post(this.url, guests);
  }
  deleteGuest(guest) {
    return this.httpclient.delete("http://localhost:8000/Guests/" + guest.id);
  }
  updateGuest(guest){
    return this.httpclient.put("http://localhost:8000/Guests/" + guest.id, guest);
  }
}
