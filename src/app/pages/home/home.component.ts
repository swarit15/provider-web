import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import { RegisterComponent } from '../../auth/register/register.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../core/services/event/event.service';
import { Router } from '@angular/router';
import {EventDesc, EventRequest, EventsData} from '../../core/models/api.responses';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SUCCESS } from '../../core/common/pc-constants';
import { ROUTER_URLS } from '../../core/common/router-urls';
import {ImageService} from "../../core/services/event/image-service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

 selectedFiles: File[]=[];
  @ViewChild('viewEvent', { static: false }) viewEvent: TemplateRef<unknown> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private modalService: NgbModal,
    private imageService:ImageService
  ) {
    this.eventForm = this.getEventForm();
  }
  eventForm: FormGroup;

  eventsData!: EventsData[];
  eventDesc!: EventDesc[];

  responseMessage!:string;

  ngOnInit(): void {
    this.fetEvents();
  }

  removeEvents(collectionName: string){
    this.eventService.removeEvents(collectionName).then((response) => {
      this.fetEvents();
      this.responseMessage = response.successMessage;
    });
  }
  fetEvents() {
    this.eventService.getEventsData().then((response) => {
      this.eventsData = response.response;
    });
  }

  public getEventForm() {
    return this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      }
    );
  }

  get eForm() {
    return this.eventForm.controls;
  }

  async createEvent() {
    if(this.eventForm.invalid) {
      return;
    }

    const eventRequest = this.getEventRequest();
    try {
      const apiResponse = await this.eventService.create(eventRequest);
      if(apiResponse) {
        this.fetEvents();
        this.modalService.dismissAll();
      }
    } catch (error) {
      console.log(error);
    }
  }



  private getEventRequest() {
    return new EventRequest(
      this.eForm.name.value,
    )
  }

  timestampToDate(timestamp: number): Date {
    return new Date(timestamp);
  }

  viewTemplate(template: TemplateRef<unknown> | undefined) {
    this.modalService.open(template);
  }


  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload(collectionName:string) {
    if (!this.selectedFiles) {
      console.error('No file selected.');
      return;
    }
    console.log(this.selectedFiles)

    const formData = new FormData();
    formData.append('collectionName', collectionName)
    for (const file of this.selectedFiles) {
      console.log('----------------------------------------')
      console.log(file);
      formData.append('files', file);
    }

    this.imageService.uploadImage(formData).subscribe(
      response => {
        console.log('Image uploaded successfully:', response);
      },
      error => {
        console.error('Error uploading image:', error);
      }
    );
  }

  fetchEventDesc(collectionName: string) {
    this.eventService.getEventDesc(collectionName).then((response) => {
      this.eventDesc = response.response;
      this.viewTemplate(this.viewEvent);
    });
  }
}
