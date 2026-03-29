import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registeration-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registeration-page.html',
  styleUrl: './registeration-page.css',
})
export class RegisterationPage {
  private formBuilder = inject(FormBuilder);
  userForm = this.formBuilder.group({
      image: [null],
      description: ['',Validators.required],
      skills: this.formBuilder.array([
        this.formBuilder.group({
          name: [''],
          description:['']
        })
      ]),
      projects: this.formBuilder.array([
        this.formBuilder.group({
          title: [''],
          description: ['']
        })
      ]),
      contactDetails: this.formBuilder.array([
        this.formBuilder.group({
          type: [''],
          url: ['']
        })
      ])
  })
  
  onImageChane(event: any){
    const file=event.target.files[0];
    if(file){
      this.userForm.patchValue({
        image: file
      })
    }
  }
   
  addSkill(){
    this.skillArray().push(this.formBuilder.group({
      name: [''],
      description: ['']
    })); 
  } 
  skillArray(){
    return this.userForm.get('skills') as FormArray;
  }
  removeSkill(index:number){
    this.skillArray().removeAt(index);
  }

  addContact(){
    this.contactArray().push(this.formBuilder.group({
      type: [''],
      url: ['']
    }));
  }
  contactArray(){
    return this.userForm.get('contactDetails') as FormArray;
  }
  removeContact(index: number){
    this.contactArray().removeAt(index);
  }

  addProject(){
    this.projectsArray().push(this.formBuilder.group({
      title: [''],
      description: ['']
    }))
  }

  projectsArray(){
    return this.userForm.get('projects') as FormArray;
  }

  removeProject(index: number){
    this.projectsArray().removeAt(index);
  }
  submit(){
    alert("works");
    console.log(this.userForm.value);
  }
}
