import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../shared/services/posts.service';
import {Subscription} from 'rxjs';
import {Post} from '../shared/interfaces/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  posts: Post[];
  postsSup: Subscription;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.postsSup = this.postsService.getAllPosts()
      .subscribe((posts) => {
        this.posts = posts;
        this.posts.sort(this.sortPosts('date'))
      })
  }

  sortPosts(field) {
    return (a, b) => {
      return a[field] < b[field] ? 1 : -1;
    };
  }

  ngOnDestroy(): void {
    if (this.postsSup) {
      this.postsSup.unsubscribe()
    }
  }
}
