'use strict';

const MIN_AGE = 17;
const MAX_AGE = 99;
var course_number = 2;
var iterator;
function initAge() {
    var studentAgeSelect = document.querySelector('select.student-age');
    for(iterator = MIN_AGE; iterator <= MAX_AGE; iterator++) {
      var studentAgeOption = document.createElement('option');
      studentAgeOption.innerHTML = iterator;
      studentAgeOption.value = iterator;
      studentAgeSelect.appendChild(studentAgeOption);
    }   
}
function validateData() {
    var studentNameValue = document.querySelector('input.student-name').value;
    var studentNamePattern = /^[A-Z][a-z]*$/
    if (studentNameValue.length < 3 || !studentNamePattern.test(studentNameValue)) return false;
    var studentAgeValue = +document.querySelector('select.student-age').value;
    if (studentAgeValue < 1 || studentAgeValue > 99) return false;
    return true;
}
function moveData() {
    var studentNameValue = document.querySelector('input.student-name').value;
    var studentAgeValue = document.querySelector('select.student-age').value;
    var studentAtUniversityValue = document.querySelector('input.student-at-university')
                                                                                 .checked ? 'Yes' : 'No';
    var studentCoursesInputs = document.querySelectorAll('input.student-course');
    
    document.querySelector('span.student-name').innerHTML = studentNameValue;
    document.querySelector('span.student-age').innerHTML = studentAgeValue;
    document.querySelector('span.student-at-university').innerHTML = studentAtUniversityValue;
    var studentCoursesValue = '';
    for(iterator = 0; iterator < studentCoursesInputs.length; iterator++) {
        studentCoursesValue += studentCoursesInputs[iterator].value + ', ';
    }
    document.querySelector('span.student-courses').innerHTML = studentCoursesValue
                                                  .substr(0, studentCoursesValue.length - 2)
}
function formSubmitHandler() {
    var form = document.getElementsByTagName('form')[0];
    form.addEventListener('submit', function(event) {
        var valid;
        valid = validateData();
        if (valid) moveData();
        event.preventDefault();
    });
}
function addCourseHandler() {
    var addCourseButton = document.querySelector('a.add-course');
    var form = document.querySelector('form');
    addCourseButton.addEventListener('click', function(event) {
        var courseFormGroup = document.querySelector('input.student-course').parentNode;
        var newCourseFormGroup = courseFormGroup.cloneNode(true);
        newCourseFormGroup.querySelector('label').innerHTML = 'Course ' + ++course_number + ':';
        form.insertBefore(newCourseFormGroup, event.target.parentNode);
        event.preventDefault();
    });
}
function removeCourseHandler() {
    var form = document.querySelector('form');
    form.addEventListener('click', function(event) {
        if (/remove\-course/.test(event.target.className)) {
            form.removeChild(event.target.parentNode);
            event.preventDefault();
        }
    });
}
window.addEventListener('load', function() {
    initAge();
    formSubmitHandler();
    addCourseHandler();
    removeCourseHandler();
});