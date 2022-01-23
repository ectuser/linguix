import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  retryWhen,
  skip,
  switchMap,
  withLatestFrom
} from "rxjs/operators";
import {StorageService} from "./storage.service";
import {LIKE_CATS, LIKE_DOGS} from "../../shared/consts/storage-keys";
import {MessageService} from "./message.service";
import {MessageInstance} from "../../shared/models/message";
import {MessageEnum} from "../../shared/models/messages";
import {changeTimeout} from "../../shared/consts/consts";
import {ExtensionEnabledService} from "./extension-enabled.service";
import {PostInstallService} from "./post-install.service";
import {genericRetryStrategy} from "../../shared/utils/retry-strategy";

@Injectable({providedIn: 'root'})
export class LikeService {
  private readonly likeCatsSubject$ = new BehaviorSubject<boolean | undefined>(undefined);
  private readonly likeDogsSubject$ = new BehaviorSubject<boolean | undefined>(undefined);

  constructor(
    private storageService: StorageService,
    private messageService: MessageService,
    private extensionEnabledService: ExtensionEnabledService,
    private postInstallService: PostInstallService
  ) {
    this.getValuesFromStorage();

    this.handleChangesToSave();

    this.handleChangesToReloadTabs();
  }

  get likeCats(): Observable<boolean> {
    return this.likeCatsSubject$.asObservable().pipe(
      filter((value) => value !== undefined),
      map((value) => value as boolean)
    );
  }

  get likeDogs(): Observable<boolean> {
    return this.likeDogsSubject$.asObservable().pipe(
      filter((value) => value !== undefined),
      map((value) => value as boolean)
    );
  }

  get likeEntities(): Observable<{likeCats: boolean, likeDogs: boolean}> {
    return combineLatest([this.likeCats, this.likeDogs])
      .pipe(
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        debounceTime(changeTimeout),
        map(([likeCats, likeDogs]) => ({likeCats, likeDogs}))
      );
  }

  setLikeCats(status: boolean): void {
    this.likeCatsSubject$.next(status);
  }

  setLikeDogs(status: boolean): void {
    this.likeDogsSubject$.next(status);
  }

  private getValuesFromStorage(): void {
    this.storageService.getItems([LIKE_CATS, LIKE_DOGS])
      .pipe(
        map((data) => {
          const error = new Error('Have not got value');

          if (!data || data[LIKE_CATS] === undefined || data[LIKE_DOGS] === undefined) {
            throw error;
          }
          return data
        }),
        retryWhen(genericRetryStrategy())
      )
      .subscribe((data) => {
        if (data && typeof data[LIKE_CATS] === 'boolean') {
          this.setLikeCats(data[LIKE_CATS]);
        }
        if (data && typeof data[LIKE_DOGS] === 'boolean') {
          this.setLikeDogs(data[LIKE_DOGS]);
        }
      });
  }

  private handleChangesToSave(): void {
    this.likeEntities.pipe(
      skip(1),
      switchMap((data) => {
        return this.storageService.setItems(data);
      })
    ).subscribe();
  }

  private handleChangesToReloadTabs(): void {
    this.likeEntities.pipe(
      skip(1),
      withLatestFrom(this.extensionEnabledService.extensionEnabled$, this.postInstallService.postInstallOpened$),
      filter(([, enabled, postInstall]) => enabled && !postInstall),
    ).subscribe(() => {
      const message = new MessageInstance(MessageEnum.ReloadPages);
      this.messageService.sendToBackground(message);
    });
  }
}
