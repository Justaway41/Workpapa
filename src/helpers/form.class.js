class FormValidation {
    static showFormErrors(form, frmName = 'frm') {
        const inputs = document.querySelectorAll(`#${frmName} input`);
        let isFormValid = true;
        inputs.forEach((input) => {
            input.classList.add('active');
            if (input.name) {
                const isInputValid = FormValidation.showInputError(form, input.name);

                if (!isInputValid) {
                    isFormValid = false;
                }
            }
        });

        return isFormValid;
    }

    static showInputError(form, refName) {
        const validity = form[refName].validity;
        const label = document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);


        if (!validity.valid) {
            if (validity.valueMissing) {
                error.textContent = `${label} is a required field`;
            } else if (validity.typeMismatch) {
                error.textContent = `${label} should be a valid email address`;
            }
            return false;
        }

        error.textContent = '';
        return true;
    }

    static resetForm(frmName = 'frm') {
        document.querySelectorAll(`#${frmName}`).reset();
    }
    // static handleChange(form, e) {
    //     console.log(form);
    //     e.target.classList.add('active');
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    //     this.showInputError(form, e.target.name);
    // }
}

export default FormValidation;
