var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var sites = [];
if(localStorage.getItem("sites")!=null ){
    sites = JSON.parse(localStorage.getItem("sites"));
    displaySites()
}
function submitSite() {
   if( valdiateSiteName(siteName.value) && valdiateSiteUrl(siteUrl.value)){
    var site = {
        name: siteName.value,
        url: siteUrl.value
    };
    sites.push(site);
    localStorage.setItem("sites", JSON.stringify(sites))
    displaySites()
    clearForm()
   }
   else{
    siteName.style.border="2px solid red";
    siteUrl.style.border="2px solid red";
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Site Name or Url is not valid !",
      }); 
   }   
}
function displaySites() {
    var trs = "";
    for (var i = 0;i<sites.length; i++) {
        trs +=`<tr>
        <td>${i}</td>
        <td>${sites[i].name}</td>
        <td>
            <a href=${sites[i].url} target="_blank" class="btnVisit btn text-white py-2 px-3">
                <i class="fa-solid fa-eye mx-1 "></i>Visit</a>
        </td>
        <td>
            <button onclick=deleteSite(${i}) class="btnDelete btn text-white py-2 px-3"><i class="fa-solid fa-trash"></i>
                Delete</button>
        </td>
    </tr>     `
    }
    document.getElementById("tbody").innerHTML = trs;
}
function clearForm(){
    siteName.value="";
    siteUrl.value="";
}
function deleteSite(index){
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
            sites.splice(index,1)
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
function valdiateSiteName(name){
    var pattern= /^[A-Z][a-z]{3,20}\d*$/;
    return pattern.test(name)
}
function valdiateSiteUrl(url){
    var pattern=/^https?:\/\/w{3}\.[a-z]{4,20}\d*\.[a-z]{2,5}$/i;
    return pattern.test(url);
}