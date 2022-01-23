import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {LikeService} from "../../core/services/like.service";
import {combineLatest} from "rxjs";
import {DestroyService} from "../../core/services/destroy.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
  providers: [DestroyService]
})
export class AppSettingsComponent implements OnInit {
  catsControl = new FormControl(false);
  dogsControl = new FormControl(false);

  constructor(private likeService: LikeService, private destroy$: DestroyService) {}

  ngOnInit(): void {
    this.likeService.likeEntities
      .pipe(takeUntil(this.destroy$))
      .subscribe(({likeCats, likeDogs}) => {
        this.catsControl.patchValue(likeCats, {emitEvent: false});
        this.dogsControl.patchValue(likeDogs, {emitEvent: false});
      });

    this.catsControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.likeService.setLikeCats(value);
    });

    this.dogsControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.likeService.setLikeDogs(value);
    });
  }
}
