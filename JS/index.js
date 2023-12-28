var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var sites = [];
if (localStorage.getItem("sites") != null) {
  sites = JSON.parse(localStorage.getItem("sites"));
  displaySites()
}
function submitSite() {
  if (valdiateSiteName() && valdiateSiteUrl()) {
    var site = {
      name: siteName.value,
      url: siteUrl.value
    };
    sites.push(site);
    localStorage.setItem("sites", JSON.stringify(sites))
    displaySites()
    clearForm()
  }
  else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Site Name or Url is not valid !",
    });
  }
}
function displaySites() {
  var trs = "";
  for (var i = 0; i < sites.length; i++) {
    trs += `<tr>
        <td>${i}</td>
        <td>${sites[i].name}</td>
        <td>
            <a href=${sites[i].url} target="_blank" class="btnVisit btn text-white py-2 px-lg-3">
                <i class="fa-solid fa-eye mx-1 "></i>Visit</a>
        </td>
        <td>
            <button onclick=deleteSite(${i}) class="btnDelete btn text-white py-2 px-lg-3"><i class="fa-solid fa-trash"></i>
                Delete</button>
        </td>
    </tr>     `
  }
  document.getElementById("tbody").innerHTML = trs;
}
function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
}
function deleteSite(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger mx-2",
      cancelButton: "btn btn-success mx-2"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to delete this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      sites.splice(index, 1)
      localStorage.setItem("sites", JSON.stringify(sites))
      displaySites()
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
}
function valdiateSiteName() {
  var pattern = /^\S(\s|\S){1,19}\S$/;
  var text = siteName.value;
  var alertMassage = document.getElementById("massage");
  if (pattern.test(text) == true) {
    siteName.style.border = "2px solid green";
    alertMassage.classList.add('d-none')
    return true;
  }
  else {
    siteName.style.border = "2px solid red";
    alertMassage.classList.remove('d-none')
    return false;
  }

}
function valdiateSiteUrl() {
  var pattern = /^https?:\/\/w{3}\.[a-z]{3,}\d*\.[a-z]{2,5}$/i;
  var url = siteUrl.value;
  var alertMassage = document.getElementById("urlMassage");
  if (pattern.test(url) == true) {
    siteUrl.style.border = "2px solid green";
    alertMassage.classList.add('d-none')
    return true;
  }
  else {
    siteUrl.style.border = "2px solid red";
    alertMassage.classList.remove('d-none')
    return false;
  }
}