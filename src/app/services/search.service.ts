import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private users = [
    { code: 701, name: 'John Nexzuz', profilePic: 'assets/images/default.png' },
    { code: 702, name: 'Pedro Yorpo', profilePic: 'assets/images/default.png' },
    { code: 703, name: 'Elizabeth Punay', profilePic: 'assets/images/default.png' },
    { code: 711, name: 'Renjun Laride', profilePic: 'assets/images/default.png' },
    { code: 705, name: 'David Dela Cruz', profilePic: 'assets/images/default.png' }
  ];

  search(query: string): any[] {
    if (!query.trim()) return [];
    
    return this.users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
