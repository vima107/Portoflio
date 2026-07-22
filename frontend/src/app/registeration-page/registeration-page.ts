import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterationService } from '../services/registeration';
import { QuillModule } from 'ngx-quill';

@Component({
	selector: 'app-registeration-page',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, QuillModule],
	templateUrl: './registeration-page.html',
	styleUrls: ['./registeration-page.css']
})
export class RegisterationPage {
	quillModules = {
		toolbar: [
			['bold', 'italic', 'underline'],
			[{ 'list': 'ordered' }, { 'list': 'bullet' }],
			['clean']
		]
	};
	private formBuilder = inject(FormBuilder);
	private registerationService = inject(RegisterationService);

	userForm = this.formBuilder.group({
		name: this.formBuilder.control('',Validators.required),
		jobrole: this.formBuilder.control('',Validators.required),
		password: this.formBuilder.control('',Validators.required),
		image: [null, Validators.required],
		resume: [null, Validators.required],
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
	
	onImageChanege(event: any) {
		const file = event.target.files[0];
		if (file) {
			this.userForm.patchValue({
				image: file
			})
		}
	}

	onResumeChanege(event: any){
		const file = event.target.files[0];
		if(file){
			this.userForm.patchValue({
				resume: file
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
			const formValue = this.userForm.value;
			const formData = new FormData();

			formData.append('name', formValue.name ?? '');
			formData.append('jobrole', formValue.jobrole ?? '');
			formData.append('password', formValue.password ?? '');
			formData.append('description', formValue.description ?? '');
			if (formValue.image) {
				formData.append('image', formValue.image);
			}
			if(formValue.resume){
				formData.append('resume', formValue.resume);
			}
			formValue.skills?.forEach((skill: string | null, index: number) => {
				if (skill != null) {
					formData.append(`skills[${index}]`, skill);
				}
			});

			formValue.projects?.forEach((project: { title?: string | null; description?: string | null } | null, index: number ) => {
				if (project != null) {
					formData.append(`projects[${index}].title`, project.title ?? '');
					formData.append(`projects[${index}].description`, project.description ?? '');
				}
			});

			formValue.contacts?.forEach((contact: { contactType?: string | null; contactValue?: string | null } | null, index: number) => {
				if (contact != null) {
					formData.append(`contacts[${index}].contactType`, contact.contactType ?? '');
					formData.append(`contacts[${index}].contactValue`, contact.contactValue ?? '');
				}
			});
			this.registerationService.registerUser(formData).subscribe({
				// handle response
			});
		}
	}
}
