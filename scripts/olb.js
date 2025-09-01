//login script args

var args = {
    themeNumber: "1",
    applicationPath: "https://web4.secureinternetbank.com/PBI_PBI1151",
    formId: "pbi-form",
    passwordId: "pbi-password",
    routingTransit: "103101987",
    usernameId: "pbi-username"
};
new PBI.RemoteLogin(args);
document.getElementById("pbi-submit").disabled = false;

var args2 = {
    applicationPath: "https://web4.secureinternetbank.com/EBC_EBC1151",
    formId: "ebc-form",
    passwordId: "ebc-password",
    routingTransit: "103101987",
    profileNumber: 231,
    usernameId: "ebc-username"
}
new EBC.RemoteLogin(args2);
document.getElementById("ebc-submit").disabled = false;


//event listener for select box
document.getElementById('cboAccountType').addEventListener('change', function() {
    var personal = document.querySelector('.personal');
    var business = document.querySelector('.business');
    if (this.value == 'Personal') {
        business.classList.add('d-none');
        personal.classList.remove('d-none');
    } else {
        personal.classList.add('d-none');
        business.classList.remove('d-none');
    }
});