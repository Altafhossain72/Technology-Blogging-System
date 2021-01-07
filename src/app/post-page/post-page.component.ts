import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {PostsService} from '../shared/services/posts.service';
import {Post} from '../shared/interfaces/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      
      switchMap((params) => {
        return this.postsService.getById(params['id'])
      })
    )
  }

}
