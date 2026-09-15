import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterationService } from '../services/registeration';
import { QuillModule } from 'ngx-quill';
import { Router } from '@angular/router';
import { UserStateService } from '../services/user-state';

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
	private userState = inject(UserStateService);
	private formBuilder = inject(FormBuilder);
	private registerationService = inject(RegisterationService);
	public existingImage: string | null = null;
	public existingResume: string | null = null;	
	userForm = this.formBuilder.group({
		id: this.formBuilder.control(''),
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
	
	ngOnInit() {
    const userData = this.userState.userData;
    if (userData) {
		this.userForm.get('image')?.clearValidators();
        this.userForm.get('image')?.updateValueAndValidity();
        
        this.userForm.get('resume')?.clearValidators();
        this.userForm.get('resume')?.updateValueAndValidity();
        
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('password')?.updateValueAndValidity();
        // Patch basic fields
		this.existingImage = userData.image;
        this.existingResume = userData.resume;
        this.userForm.patchValue({
			id:userData.id,
            name: userData.name,
            jobrole: userData.jobRole,
            description: userData.description[0]?.descripition,
        });

        // Patch skills
        const skillsArray = this.skillArray();
        skillsArray.clear();
        userData.skills.forEach((skill: any) => {
            skillsArray.push(this.formBuilder.control(skill.skill, Validators.required));
        });

        // Patch projects
        const projectsArray = this.projectsArray();
        projectsArray.clear();
        userData.projects.forEach((project: any) => {
            projectsArray.push(this.formBuilder.group({
                title: [project.title, Validators.required],
                description: [project.description, Validators.required]
            }));
        });

        // Patch contacts
        const contactsArray = this.contactArray();
        contactsArray.clear();
        userData.contacts.forEach((contact: any) => {
            contactsArray.push(this.formBuilder.group({
                contactType: [contact.contactType, Validators.required],
                contactValue: [contact.contactValue, Validators.required]
            }));
        });
    }
}

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
			if(formValue.id)
				formData.append('id',formValue.id);
			formData.append('name', formValue.name ?? '');
			formData.append('jobRole', formValue.jobrole ?? '');
			formData.append('password', formValue.password ?? '');
			formData.append('description', formValue.description ?? '');
			if (formValue.image) {
				formData.append('image', formValue.image);
			}
			else if (this.existingImage) {
    			formData.append('image', this.existingImage);
			}
			if(formValue.resume){
				formData.append('resume', formValue.resume);
			}
			else if (this.existingResume) {
    			formData.append('resume', this.existingResume);
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
