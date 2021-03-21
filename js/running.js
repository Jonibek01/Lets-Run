// Taking important elements
var elResultAlert       = document.querySelector('.js-result-alert');
var elJoggingForm       = document.querySelector('.js-jogging-form');
var elTemperatureInput  = elJoggingForm.querySelector('.js-temperature-input');
var elIsRainingCheckbox = elJoggingForm.querySelector('.js-is-raining-checkbox');
var elIsGymOpenCheckbox = elJoggingForm.querySelector('.js-is-gym-open-checkbox');

// Counting
var jog = function (evt) {
  evt.preventDefault();

  var userInput = elTemperatureInput.value.trim();

  // Qo'shimcha: parseFloat/parseInt qilingandan so'ng length ga qarab ham tekshirish mumkin. Faqat boshida ! qo'yilishi kerak


  // if value of input is empty, return class is-invalid
  // if (elTemperatureInput.value.trim() === '') {
  if (userInput.length === 0) {
    elTemperatureInput.classList.add('is-invalid');
    return;
  }

  var temperature = parseFloat(userInput, 10);

  // if user gives text instead of num, return is-invalid
  if (isNaN(temperature)) {
    elTemperatureInput.classList.add('is-invalid');
    return;
  }

  // Remove error style class
  elTemperatureInput.classList.remove('is-invalid');

  // setting min/max temps

  var minTemp = 5;
  var maxTemp = 30;

  var bgcolor;
  var textOfContent;

  var itsOkayTemp = userInput >= minTemp && userInput <= maxTemp;

  // temp < 5, temp > 31 => error
  if (!itsOkayTemp) { 
    textOfContent = "No, don't want";
    bgcolor = 'danger';
  // temp is ok, raining, gym is open => Run
  } else if (itsOkayTemp && elIsRainingCheckbox.checked && elIsGymOpenCheckbox.checked) {
    textOfContent = "Wow super weather, let's run";
  // 5 <= temp <= 30 and not raining => Run
  } else if (itsOkayTemp && elIsGymOpenCheckbox.checked) {
    textOfContent = "Yeah let's run";
  // temp is ok, raining, gym is closed => error
  } else if  (itsOkayTemp && elIsRainingCheckbox.checked && !elIsGymOpenCheckbox.checked) {
    textOfContent = "No man, next time)";
    bgcolor = 'danger';
  } 

  // output 
  
    elResultAlert.classList.remove('alert-danger')
    elResultAlert.classList.add(`alert-${bgcolor}`);
    elResultAlert.textContent = textOfContent;
};


// listening the events: form-submit, checkbox-change, input-input
elJoggingForm.addEventListener('submit', jog);
elTemperatureInput.addEventListener('change', jog);
elIsRainingCheckbox.addEventListener('change', jog);
elIsGymOpenCheckbox.addEventListener('change', jog);

// blur - interfaol elementdan e'tiborning ketgani hodisasi
 