import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  @ViewChild('audioOption') audioplayer: ElementRef;
  data:any;
  addImage:boolean;
  fileData:any = null;
  previewUrl:any = null;
  description:string;
  commands:any;
  like:boolean;
  fileUrl;
  constructor(private api:ApiService,private sanitizer: DomSanitizer){

  }
  ngOnInit(){
    this.getImage();
  }
  likePage(event,like){
    this.api.likePage(event.id,like).subscribe(data=>{
      this.getImage();
    })
  }
  imageUpload(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }
  getImage(){
    this.api.getImage().subscribe(listofData=>{
      this.commands = listofData;
    })
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('image', this.fileData);
    formData.append('description',this.description);
    this.api.image(formData).subscribe(data=>{
      console.log(data);
      this.getImage();
    });
    this.previewUrl = null;
    this.description = null;
  }
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  toggleAudio(){
    this.audioplayer.nativeElement.play();
  }
  selectType(doc){
    if(doc.image.split(";")[0].includes('image')){
      return 'image';
    }else if (doc.image.split(";")[0].includes('video')){
      return 'video';
    }
    else if(doc.image.split(";")[0].includes('application')){
      return 'file';
    }else if(doc.image.split(";")[0].includes('audio')){
      return 'audio';
    }
  }
  downloadfile(url){
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.location.href=url)
    var aTag = document.createElement('a');
    aTag.setAttribute('href',this.fileUrl);

    // window.location.href=url
  }
}

