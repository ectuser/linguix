import {NgModule} from "@angular/core";
import {SwitcherComponent} from "./components/switcher/switcher.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [SwitcherComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SwitcherComponent, ReactiveFormsModule]
})
export class SharedModule {}
