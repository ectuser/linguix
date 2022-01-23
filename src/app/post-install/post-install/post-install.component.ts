import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {PostInstallService} from "../../core/services/post-install.service";

@Component({
  selector: 'app-post-install',
  templateUrl: './post-install.component.html',
  styleUrls: ['./post-install.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostInstallComponent implements OnInit, OnDestroy {
  constructor(private postInstallService: PostInstallService) {}

  ngOnInit(): void {
    this.postInstallService.setPostInstallOpened(true);
  }

  ngOnDestroy(): void {
    this.postInstallService.setPostInstallOpened(false);
  }
}
