import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFilesPage } from './my-files';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  declarations: [
    MyFilesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyFilesPage),
    FileUploadModule
  ],
})
export class MyFilesPageModule {}
