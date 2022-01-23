import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {map, takeUntil} from "rxjs/operators";
import {StorageService} from "./storage.service";
import {LIKE_CATS, LIKE_DOGS} from "../../shared/consts/storage-keys";

@Injectable({providedIn: 'root'})
export class LikeService {
  private readonly likeCatsSubject$ = new BehaviorSubject(false);
  private readonly likeDogsSubject$ = new BehaviorSubject(false);

  constructor(private storageService: StorageService) {
    this.storageService.getItems([LIKE_CATS, LIKE_DOGS]).subscribe((data) => {
      if (data && typeof data[LIKE_CATS] === 'boolean') {
        this.setLikeCats(data[LIKE_CATS]);
      }
      if (data && typeof data[LIKE_DOGS] === 'boolean') {
        this.setLikeDogs(data[LIKE_DOGS]);
      }
    });

    this.likeEntities.subscribe((data) => {
      this.storageService.setItems(data).subscribe();
    });
  }

  get likeCats(): Observable<boolean> {
    return this.likeCatsSubject$.asObservable();
  }

  get likeDogs(): Observable<boolean> {
    return this.likeDogsSubject$.asObservable();
  }

  get likeEntities(): Observable<{likeCats: boolean, likeDogs: boolean}> {
    return combineLatest([this.likeCats, this.likeDogs])
      .pipe(map(([likeCats, likeDogs]) => ({likeCats, likeDogs})));
  }

  setLikeCats(status: boolean): void {
    this.likeCatsSubject$.next(status);
  }

  setLikeDogs(status: boolean): void {
    this.likeDogsSubject$.next(status);
  }
}
