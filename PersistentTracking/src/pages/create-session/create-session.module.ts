import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateSession} from './create-session';

@NgModule({
  declarations: [
    CreateSession,
  ],
  imports: [
    IonicPageModule.forChild(CreateSession),
  ],
})
export class CreateSessionPageModule {}
