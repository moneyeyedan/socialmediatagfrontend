import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  addImage:boolean;
  fileData:any = null;
  previewUrl:any = null;
  description:string;
  commands:any;
  like:boolean;
  constructor(private api:ApiService){

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
}

