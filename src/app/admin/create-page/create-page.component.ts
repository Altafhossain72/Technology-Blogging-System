import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {Post} from '../../shared/interfaces/interfaces';
import {PostsService} from '../../shared/services/posts.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;
  constructor(
    private postsService: PostsService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,[Validators.required]),
      author: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required])
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = this.form.value;
    post.date = new Date();

    this.postsService.create(post)
      .subscribe((response) => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.alert.success('Post has been created.');
      });
  }
}
