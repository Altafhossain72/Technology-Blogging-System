import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AuthService} from '../shared/services/auth.service';
import {Post} from '../../shared/interfaces/interfaces';
import {PostsService} from '../../shared/services/posts.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

//postSubscription - переменная для результата вызова в ngOnInit метода getAllPosts(observable), что бы в ngOnDestroy отписаться, во избежание утечек памяти
  pSub: Subscription;
  removeSub: Subscription;
  posts: Post[] = [];
  searchStr = '';
  constructor(
    private auth: AuthService,
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.pSub = this.postsService.getAllPosts().subscribe((posts) => {
        this.posts = posts;
      })
  }

  remove(id: string) {
    this.removeSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => {
        return post.id !== id;
      });
      this.alert.danger('Post has been deleted.');
    })
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.removeSub) {
      this.removeSub.unsubscribe()
    }
  }
}
