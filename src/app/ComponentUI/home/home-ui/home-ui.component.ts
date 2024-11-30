import { Component, OnInit,OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-home-ui',
  templateUrl: './home-ui.component.html',
  styleUrls: ['./home-ui.component.css']
})
export class HomeUIComponent implements OnInit {
createPost() {
throw new Error('Method not implemented.');
}

  private scrollInterval: any;
  @ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef; // Reference to the scroll container

  posts = [
    {
      id: 1,
      author: 'John Doe',
      content: 'This is a sample post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timestamp: new Date('2024-11-28T12:00:00'),
      likes: 120,
      comments: 45,
      reposts: 10,
      sends: 8,
    },
    {
      id: 2,
      author: 'Jane Smith',
      content: 'Another example post! Just testing out some content here.',
      timestamp: new Date('2024-11-29T10:30:00'),
      likes: 350,
      comments: 200,
      reposts: 30,
      sends: 15,
    },
    {
      id: 3,
      author: 'Alice Cooper',
      content: 'This post is about the latest trends in tech and innovation.',
      timestamp: new Date('2024-11-27T14:45:00'),
      likes: 75,
      comments: 25,
      reposts: 5,
      sends: 2,
    },
    {
      id: 4,
      author: 'Bob Marley',
      content: 'A beautiful day to share some inspiration with the world!',
      timestamp: new Date('2024-11-29T09:00:00'),
      likes: 500,
      comments: 150,
      reposts: 50,
      sends: 40,
    },
    {
      id: 5,
      author: 'Charlie Brown',
      content: 'Just a simple post to share some thoughts with everyone. Keep it real!',
      timestamp: new Date('2024-11-25T16:20:00'),
      likes: 300,
      comments: 100,
      reposts: 25,
      sends: 20,
    },
  ];

  isLoading = false; // Flag for showing spinner
  page = 1; // Pagination or load more page tracking
  isMobile: boolean = false; 
  lastScrollTop: number = 0;
  isScrollingDown: boolean = false;
  constructor() {}
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 768; // or your breakpoint for mobile
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > this.lastScrollTop) {
      // User is scrolling down
      this.isScrollingDown = true;
    } else {
      // User is scrolling up
      this.isScrollingDown = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

    // Toggle the 'hidden' class based on scroll direction
    const searchBar = document.querySelector('.fb-header-left') as HTMLElement;
    if (this.isScrollingDown) {
      searchBar.classList.add('hidden');  // Hide search bar
    } else {
      searchBar.classList.remove('hidden');  // Show search bar
    }
  }

  ngOnInit(): void {
    this.onResize();
  }
  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
  
  }
  // onScroll() {
  //   const scrollElement = this.scrollContainer.nativeElement;
  //   if (scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight) {
  //     if (!this.isLoading) {
  //      // this.loadPosts(); // Load more posts when scrolled to the bottom
  //     }
  //   }
  // }
  startAutoScroll(): void {
    const middleColumn = document.querySelector('.middle-column') as HTMLElement;

    // Clear any existing interval if already scrolling
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }

    this.scrollInterval = setInterval(() => {
      // Scroll the content by 1px every 10ms
      middleColumn.scrollTop += 1;

      // Stop scrolling when the bottom is reached
      if (middleColumn.scrollHeight - middleColumn.scrollTop <= middleColumn.clientHeight) {
        clearInterval(this.scrollInterval);
      }
    }, 10);
  }

  stopAutoScroll(): void {
    // Clear the interval to stop auto-scrolling
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }
  toggleMenu() {
    // Implement your menu toggle logic if needed
  }
}
