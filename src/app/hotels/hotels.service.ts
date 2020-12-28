import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotels } from './hotels';


@Injectable()

export class HotelsService {

  constructor(private httpclient: HttpClient) { }

  url: string = "http://localhost:3000/Hotels";

  getHotels() {
    return this.httpclient.get<Hotels[]>(this.url);
  }
  addHotel(hotel) {
    return this.httpclient.post(this.url, hotel);
  }
  deleteHotel(hotel) {
    return this.httpclient.delete("http://localhost:3000/Hotels/" + hotel.id);
  }
  updateHotel(hotel){
    return this.httpclient.put("http://localhost:3000/Hotels/" + hotel.id, hotel);
  }

}
