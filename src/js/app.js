/**
 * WEB222 – FINAL ASSESSMENT
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Maikel Mirzadegan
 *      Student ID: 032299158
 *      Date:       August 14,2022
 */
 const { profile } = window;

 // For debugging, display all of our data in the console
 console.log({ profile }, "My Profile");
 
 window.addEventListener("load", () => {
   loadImage(); // Load profile picture
   loadBasicInfo(); // Load basic info data
   addDownloadAction(); // Add action to Resume button
   addContactAction(); // Add action to Contact Me button
   loadAcadHonestyText(); // Load academic honesty text from file
   displayEducData(); // Load education credentials from object
 });
 
 // Focus on top of page after refresh
 window.onbeforeunload = () => {
   window.scrollTo(0, 0);
 };
 
 // Hide the form when user clicks outside of the form
 window.onclick = (event) => {
   hideForm(event);
 };
 
 // Hide the form when user presses Escape
 document.addEventListener("keyup", (event) => {
   const form = document.querySelector(".form-overlay");
   if (event.key === "Escape" && form !== null) {
     hideForm(event);
   }
 });
 
 // Validate form data first before submitting
 function validateForm() {
   let valid = true;
 
   let fNameVal = document.forms["contactForm"]["firstname"].value;
   let lNameVal = document.forms["contactForm"]["lastname"].value;
   let emailVal = document.forms["contactForm"]["email"].value;
   let addressVal = document.forms["contactForm"]["address"].value;
   let cityVal = document.forms["contactForm"]["city"].value;
   let postalVal = document.forms["contactForm"]["postal"].value;
   let purposeVal = document.forms["contactForm"]["purpose"].value;
   let messageVal = document.forms["contactForm"]["message"].value;
   let rateVal = document.forms["contactForm"]["hourlyrate"].value;
   let roleVal = document.forms["contactForm"]["role"].value;
   let error = document.querySelector("#formErrMsg");
   error.innerText = "";
 
   if (
     fNameVal === "" ||
     lNameVal === "" ||
     emailVal === "" ||
     addressVal === "" ||
     cityVal === "" ||
     purposeVal === "" ||
     messageVal === "" ||
     (purposeVal === "hiring" && (rateVal == "" || roleVal == ""))
   ) {
     error.innerText = "ERROR: All fields are mandatory!";
     error.classList.remove("show-if-active");
     setTimeout((e) => {
       error.classList.add("show-if-active");
       error.innerText = "";
     }, 3000);
     valid = false;
   }
 
   try {
     let postal = fixPostalCode(postalVal);
     document.forms["contactForm"]["postal"].value = postal;
   } catch (err) {
     error.innerText = "ERROR: Invalid postal code format!";
     error.classList.remove("show-if-active");
     setTimeout(function (e) {
       error.classList.add("show-if-active");
     }, 5000);
     valid = false;
   }
 
   return valid;
 }
 
 // Hide form when inactive and set main page to active
 function hideForm(event) {
   const basicProfile = document.querySelector(".basic-profile--inactive");
   const acadPolicy = document.querySelector(".acad-policy--inactive");
   const educList = document.querySelector(".educ-list--inactive");
   const form = document.querySelector(".form-overlay");
   if (
     (form !== null &&
       basicProfile !== null &&
       acadPolicy !== null &&
       educList !== null &&
       event.target.id !== "contactMe" &&
       event.target.closest(".form-overlay") === null) ||
     event.target.id === "cancelBtn" ||
     (event.key !== null && event.key === "Escape")
   ) {
     if (form.className === "form-overlay") {
       form.className = "hide-form";
       basicProfile.classList.replace(
         "basic-profile--inactive",
         "basic-profile"
       );
       acadPolicy.classList.replace("acad-policy--inactive", "acad-policy");
       educList.classList.replace("educ-list--inactive", "educ-list");
     }
   }
 }
 
 // Load profile image
 function loadImage() {
   const mypic = document.querySelector("#mypic");
   const myName = document.querySelector("#name");
   const myTitle = document.querySelector("#title");
   mypic.src = profile.imageUrl;
   myName.innerText = profile.name;
   myTitle.innerText = profile.title;
 }
 
 // Load basic info from profile object
 function loadBasicInfo() {
   const email = document.querySelector("#email");
   const language = document.querySelector("#lang");
   const courseCd = document.querySelector("#courseCd");
   const section = document.querySelector("#sect");
   const studentId = document.querySelector("#studId");
   const instructor = document.querySelector("#instructor");
   const aboutMe = document.querySelector("#aboutme");
 
   email.innerHTML = profile.email;
   language.innerText = profile.language;
   courseCd.innerText = profile.courseCode;
   section.innerText = profile.section;
   studentId.innerText = profile.studentId;
   instructor.innerText = profile.instructor;
   aboutMe.innerText = profile.aboutMe;
 }
 
 // Add action to download resume
 function addDownloadAction() {
   document.querySelector("#downloadResume").addEventListener("click", () => {
     window.open("https://maikel-mirza.github.io/Web222/data/resume.pdf");
   });
 }
 
 // Add action to display Contact Me form
 function addContactAction() {
   const basicProfile = document.querySelector(".basic-profile");
   const acadPolicy = document.querySelector(".acad-policy");
   const educList = document.querySelector(".educ-list");
   const form = document.querySelector(".hide-form");
 
   document.querySelector("#contactMe").addEventListener("click", () => {
     basicProfile.classList.replace("basic-profile", "basic-profile--inactive");
     acadPolicy.classList.replace("acad-policy", "acad-policy--inactive");
     educList.classList.replace("educ-list", "educ-list--inactive");
     form.classList.replace("hide-form", "form-overlay");
   });
 }
 
 // Load Academic Honesty from text file and display current date
 function loadAcadHonestyText() {
   fetch("https://maikel-mirza.github.io/Web222/data/acad_integrity.txt") 
     .then((res) => {
       return res.text();
     })
     .then((data) => {
       document.querySelector("#acadPolicyText").innerText = data;
     });
 
   let dateToday = getDateToday();
   document.querySelector(
     "#dateToday"
   ).innerHTML = `<strong>Date:</strong> ${dateToday}`;
 }
 
 // Get date today
 function getDateToday() {
   const date = new Date();
   let month = date.getMonth() + 1;
   let day = date.getDate();
   let year = date.getFullYear();
   switch (month) {
     case 1:
       month = "January";
       break;
     case 2:
       month = "February";
       break;
     case 3:
       month = "March";
       break;
     case 4:
       month = "April";
       break;
     case 5:
       month = "May";
     case 6:
       month = "June";
       break;
     case 7:
       month = "July";
       break;
     case 8:
       month = "August";
       break;
     case 9:
       month = "September";
       break;
     case 10:
       month = "October";
       break;
     case 11:
       month = "November";
       break;
     case 12:
       month = "December";
       break;
     default:
       break;
   }
   let dateToday = `${month} ${day}, ${year}`;
   return dateToday;
 }
 
 // Load education section from profile object->education array
 function displayEducData() {
   let educList = document.querySelector(".creds");
   profile.education.forEach((educ) => {
     const educSummary = document.createElement("div");
     educSummary.classList.add("educ-summary");
     const duration = document.createElement("p");
     duration.id = "duration";
     duration.innerText = educ.period;
     const educType = document.createElement("p");
     educType.id = "educType";
     educType.innerText = educ.degree;
 
     educSummary.appendChild(duration);
     educSummary.appendChild(educType);
     educList.appendChild(educSummary);
 
     const educDetails = document.createElement("educ-details");
     educDetails.classList.add("educ-details");
     const program = document.createElement("p");
     program.id = "program";
     program.innerText = educ.program;
     const institution = document.createElement("p");
     institution.id = "institution";
     institution.innerText = educ.institution;
     const address = document.createElement("p");
     address.id = "address";
     address.innerText = educ.address;
 
     educDetails.appendChild(program);
     educDetails.appendChild(institution);
     educDetails.appendChild(address);
     educList.appendChild(educDetails);
   });
 }
 
 // Fix format of postal code, return fixed format
 function fixPostalCode(postalCode) {
   let regexFSA = /^[A-CEGHJ-NPR-TVXY][0-9][A-CEGHJ-NPR-TV-Z]$/g;
   let regexLDU = /^\s*[0-9][A-CEGHJ-NPR-TV-Z][0-9]\s*$/g;
   // Remove first spaces in between
   let str = postalCode.trim();
   // Validate Forward Sortation Area format using regex
   let fwdSortationArea = str
     .toUpperCase()
     .substring(0, 3)
     .match(regexFSA)
     .toString()
     .trim();
   let localDelUnit = str
     .toUpperCase()
     .substring(3)
     .match(regexLDU)
     .toString()
     .trim();
   // Validate Local Delivery Unit format using regex
   let fixedPostal;
   // If validations are successful, return formatted postal code
   if (fwdSortationArea !== null && localDelUnit !== null) {
     fixedPostal = `${fwdSortationArea} ${localDelUnit}`;
   } else throw "ERROR: Invalid postal code format";
 
   return fixedPostal;
 }
 
