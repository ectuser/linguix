import {ChangeDetectorRef, Injectable} from '@angular/core';
import {LikeService} from "./like.service";
import {FormControl} from "@angular/forms";
import {distinctUntilChanged, filter, take, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable()
export class SettingsFormService {
  catsControl = new FormControl();
  dogsControl = new FormControl();

  private readonly unsubscribe$ = new Subject();

  constructor(private likeService: LikeService, private cdr: ChangeDetectorRef) {
    this.likeService.likeEntities
      .pipe(take(1))
      .subscribe(({likeCats, likeDogs}) => {
        console.log(likeCats, likeDogs)
        this.catsControl.patchValue(likeCats, {emitEvent: false});
        this.dogsControl.patchValue(likeDogs, {emitEvent: false});
        this.cdr.detectChanges();
      });

    this.catsControl.valueChanges
      .pipe(
        filter((value) => value !== undefined),
        distinctUntilChanged((a, b) => a === b),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((value) => {
        this.likeService.setLikeCats(value);
      });

    this.dogsControl.valueChanges
      .pipe(
        filter((value) => value !== undefined),
        distinctUntilChanged((a, b) => a === b),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((value) => {
        this.likeService.setLikeDogs(value);
      });
  }

  onDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
