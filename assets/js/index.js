//Tabs
$(document).ready(function(){
    $('.tabs').tabs();
  });



//Filter
  filterSelection("all")
  function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
      w3AddClass(x[i], "hide");
      if (x[i].className.indexOf(c) > -1) w3RemoveClass(x[i], "hide");
    }
  }
  
  // Show filtered elements
  function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }
  
  // Hide elements that are not selected
  function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }
  
  // Add active class to the current control button (highlight it)
  var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }

const deck = document.getElementById("deck-start");
// const current_time = firebase.firestore.Timestamp.now()
// document.getElementById("datepicker").valueAsDate = new Date();
listPortfolios();

function listPortfolios(){
  deck.innerHTML = "";
  var db_collection = db.collection('portfolio').orderBy("date_end","desc");
  db_collection.get().then((snapshot) => {
    snapshot.docs.forEach(element => {
      render(element);
    });
  })
}


function render(doc){
    const portfolio = doc.data();
     var date_start = portfolio.date_start;
     var date_end = portfolio.date_end;
     var now = new Date();
     var date = new Date(date_start);
    date_end = new Date(date_end);
    if (now < date_end){
        date_end = now;
    }

    deck.innerHTML += `<div class="col s12 m12 l6 filterDiv ${portfolio.tag1} ${portfolio.tag2} ${portfolio.tag3}">
    <div class="card medium hoverable">
        <picture class="card-image activator waves-effect waves-block waves-light">
        <source type="image/avif" srcset="${portfolio.AVIF}">
        <source type="image/webp" srcset="${portfolio.WebP}">
        <source type="image/png" srcset="${portfolio.PNG}">
        <img src="${portfolio.PNG}" class="activator" alt="" loading="lazy">
        <h5 class="card-title valign-wrapper light-blue" style="left: 0px; top: 10px; bottom: 100%;position:absolute;margin:0;">${portfolio.category}</h5>
        </picture>
        <div class="card-content">
          <span class="card-title activator">${portfolio.title}<i class="material-icons right">more_vert</i></span>
          <p>${date.toLocaleString('default', { month: 'short',year:'numeric' })} - ${date_end.toLocaleString('default', { month: 'short',year:'numeric' })}</p>
          <p>${portfolio.content_short}</p>
        </div>
        <div class="card-reveal">
          <span class="card-title">${portfolio.title}<i class="material-icons right">close</i></span>
          <p>${date.toLocaleString('default', { month: 'short',year:'numeric' })} - ${date_end.toLocaleString('default', { month: 'short',year:'numeric' })}</p>
          <p>${portfolio.content_long}</p>

          <p><a href="${portfolio.url1}" target="_blank" rel="noopener">${portfolio.link1}</a></p>
          <p><a href="${portfolio.url2}" target="_blank" rel="noopener">${portfolio.link2}</a></p>
          <p><a href="${portfolio.url3}" target="_blank" rel="noopener">${portfolio.link3}</a></p>
          

      

        </div>
      </div>
</div>
</div>
    `
    
//Date Sort
// $('.card-deck .col').sort(function(a,b) {
//   return $(a).find(".card-date") < $(b).find(".card-date") ? 1 : -1;
// }).appendTo(".card-deck");
  }
  



