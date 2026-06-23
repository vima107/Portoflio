import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterationService } from '../services/registeration';
import { required } from '@angular/forms/signals';

@Component({
	selector: 'app-registeration-page',
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './registeration-page.html',
	styleUrl: './registeration-page.css',
})
export class RegisterationPage {
	private formBuilder = inject(FormBuilder);
	private registerationService = inject(RegisterationService);

	userForm = this.formBuilder.group({
		name: this.formBuilder.control('',Validators.required),
		password: this.formBuilder.control('',Validators.required),
		image: [null],
		description: ['', Validators.required],
		skills: this.formBuilder.array([this.formBuilder.control('',Validators.required)]),
		projects: this.formBuilder.array([
			this.formBuilder.group({
				title: ['',Validators.required],
				description: ['',Validators.required]
			})
		]),
		contacts: this.formBuilder.array([
			this.formBuilder.group({
				contactType: ['',Validators.required],
				contactValue: ['',Validators.required]
			})
		])
	})

	onImageChane(event: any) {
		const file = event.target.files[0];
		if (file) {
			this.userForm.patchValue({
				image: file
			})
		}
	}

	addSkill() {
		this.skillArray().push(this.formBuilder.control(''));
	}
	skillArray() {
		return this.userForm.get('skills') as FormArray;
	}
	removeSkill(index: number) {
		const skills = this.userForm.get('skills') as FormArray;
		if(skills.length>1)
			this.skillArray().removeAt(index);
	}

	addContact() {
		this.contactArray().push(this.formBuilder.group({
			contactType: [''],
			contactValue: ['']
		}));
	}
	contactArray() {
		return this.userForm.get('contacts') as FormArray;
	}
	removeContact(index: number) {
		const contacts = this.userForm.get('contacts') as FormArray;
        if(contacts.length>1)
			this.contactArray().removeAt(index);
	}

	addProject() {
		this.projectsArray().push(this.formBuilder.group({
			title: [''],
			description: ['']
		}))
	}

	projectsArray() {
		return this.userForm.get('projects') as FormArray;
	}

	removeProject(index: number) {
		const projects = this.userForm.get('projects') as FormArray;
        if(projects.length>1)
			this.projectsArray().removeAt(index);
	}
	submit() {
		alert("works");
		console.log(this.userForm.value);
		if (this.userForm.valid) {
			this.registerationService.registerUser(this.userForm.value).subscribe({
				
			});
		}
	}
}
