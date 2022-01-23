import { Injectable } from '@angular/core';
import {LikeService} from "./like.service";
import {FormControl} from "@angular/forms";
import {takeUntil} from "rxjs/operators";

@Injectable()
export class SettingsFormService {
  catsControl = new FormControl(false);
  dogsControl = new FormControl(false);

  constructor(private likeService: LikeService) {
    this.likeService.likeEntities
      .subscribe(({likeCats, likeDogs}) => {
        this.catsControl.patchValue(likeCats, {emitEvent: false});
        this.dogsControl.patchValue(likeDogs, {emitEvent: false});
      });

    this.catsControl.valueChanges.subscribe((value) => {
      this.likeService.setLikeCats(value);
    });

    this.dogsControl.valueChanges.subscribe((value) => {
      this.likeService.setLikeDogs(value);
    });
  }
}
