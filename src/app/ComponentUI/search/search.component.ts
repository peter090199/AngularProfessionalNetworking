import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  results: any=[];

  constructor(private searchService: SearchService) {}
  ngOnInit(): void {

  }

  onSearch() {
    this.results = this.searchService.search(this.searchQuery);
  }
  isExpanded = false;

  selectResult(result: any) {
    console.log('Selected:', result);
    this.searchQuery = result.name;
    this.results = []; // Hide dropdown after selection
  }
  onResultClick() {
    this.results = []; // Clear search results after selection
  }
  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 100); 
    this.results = [];
  }
  
  
}
