document.addEventListener("DOMContentLoaded", function () {
  // เลือกอินพุตสำหรับชื่อและนามสกุล
  var firstNameInput = document.querySelector('input[name="name"]');
  var lastNameInput = document.querySelector('input[name="surname"]');
  // var submit = document.onclick('button[name"submit-btn"]');
  // ฟังก์ชันตรวจสอบอินพุต
  function validateInput(inputField) {
    var isValid = /^[A-Za-zก-ฮะ-์]*$/.test(inputField.value);

    if (!isValid && inputField.value) {
      swal("ไม่อนุญาต!", "ใส่เฉพาะตัวอักษร A-z และ ก-ฮ เท่าน้น!!", "error");
      inputField.value = inputField.value.replace(/[^A-Za-zก-ฮะ-์]/g, "");
    }
  }

  // กำหนด Event Listener สำหรับอินพุต
  if (firstNameInput) {
    firstNameInput.oninput = function () {
      validateInput(firstNameInput);
    };
  }
  if (lastNameInput) {
    lastNameInput.oninput = function () {
      validateInput(lastNameInput);
    };
  }

  var telephoneInput = document.querySelector('input[name="phone"]');

  // Function to validate the telephone input
  function validateTelephone(inputField) {
    // Remove any characters that are not digits
    var value = inputField.value.replace(/\D/g, "");

    // Check if the value is 10 digits long
    if (value.length !== 10) {
      swal("แจ้งเตือน!", "เบอร์โทรศัพท์ต้องมี 10 หลัก!", "error");
      inputField.value = value.slice(0, 10); // Ensure the value is not longer than 10 digits
    } else {
      // Check for consecutive repeated digits (more than 6 times)
      if (/(\d)\1{6,}/.test(value)) {
        swal("แจ้งเตือน!", "เบอร์โทรศัพท์ไม่สามารถมีตัวเลขที่ซ้ำกันมากกว่า 6 ตัวได้!", "error");
        inputField.value = ""; // Clear the input
      } else if (/(\d{2,})\1+/.test(value)) {
        swal("แจ้งเตือน!", "เบอร์โทรศัพท์ไม่สามารถมีลำดับตัวเลขที่ซ้ำกันได้!", "error");
        inputField.value = ""; // Clear the input
      } else {
        inputField.value = value; // Set the cleaned value back to the input
      }
    }
  }
  

  // Real-time validation as the user types
  if (telephoneInput) {
    telephoneInput.oninput = function () {
      // Remove any characters that are not digits
      this.value = this.value.replace(/\D/g, "");
    };

    telephoneInput.onblur = function () {
      validateTelephone(telephoneInput);
    };
  }

  // Validation on form submission
  var form = document.querySelector("form");
  if (form) {
    form.onsubmit = function (event) {
      validateTelephone(telephoneInput);
      // Check again in case validation was bypassed
      if (telephoneInput.value.length !== 10) {
        swal("แจ้งเตือน!", "เบอร์โทรศัพท์ต้องมี 10 หลัก!", "error");
        event.preventDefault(); // Prevent form submission
      }
    };
  }
  // if(submit && this.onclick){
  //    swal("สำเร็จ!", "รับโค้ด ********* !!", "success");
  // }

  var AgeInput = document.querySelector('input[name="age"]');

  // Function to validate the Age input
  function validateAge(inputField) {
    // Remove any characters that are not digits
    var value = inputField.value.replace(/\D/g, "");
  
    // Check if the value is between 1 and 3 digits long
    if (value.length < 1 || value.length > 3) {
      swal("แจ้งเตือน!", "กรุณากรอกข้อมูลด้วย!", "error");
      inputField.value = value.slice(0, 3); // Truncate to 3 digits if necessary
    } else {
      inputField.value = value; // Set the cleaned value back to the input
    }
  }
  
  // Real-time validation as the user types
  if (AgeInput) {
    AgeInput.oninput = function () {
      this.value = this.value.replace(/\D/g, ""); // Remove any non-digits
    };
  
    AgeInput.onblur = function () {
      validateAge(AgeInput);
    };
  }
  
  // Validation on form submission
  var form = document.querySelector("form");
  if (form) {
    form.onsubmit = function (event) {
      validateAge(AgeInput);
      // Check again with correct logic
      if (AgeInput.value.length <= 1 || AgeInput.value.length >= 3) {
        swal("แจ้งเตือน!", "กรอกอายุเพียง 2 หลักเท่านั้น!", "error");
        event.preventDefault(); // Prevent form submission
      }
    };
  }
  var copyButton = document.getElementById('copyButton');

  // Event listener for the copy image
  copyButton.addEventListener('click', function() {
    // Get the input field that holds the code
    var codeInput = document.getElementById('codeInput');

    // Select the content of the input field
    codeInput.select();
    codeInput.setSelectionRange(0, 99999); // For mobile devices

    // Execute the "Copy" command
    document.execCommand('copy');

    // Optional: Show an alert or a tooltip that the code was copied
    alert('Code copied to clipboard: ' + codeInput.value);
  });
});
