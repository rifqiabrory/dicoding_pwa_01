document.addEventListener("DOMContentLoaded", function () {
  var elSideNav = document.querySelectorAll(".sidenav");
  var elContent = document.querySelector("#content");
  M.Sidenav.init(elSideNav);

  const loadData = () => {
    fetch("./assets/dummy/data.json")
      .then((res) => res.json())
      .then((data) => {
        let items = data.content;
        if (items.length > 0) {
          for (let item of items) {
            elContent.innerHTML += `<div class='col m4 s15'>
                        <div class='card medium'>
                            <div class='card-image'>
                                <img src='${item.image}'>
                                <span class='card-title'>${item.title}</span>
                            </div>
                            <div class='card-content'>
                                <p>${item.description}</p>
                            </div>
                            <div class='card-action center'>
                                <a href='#'>See Detail</a>
                            </div>
                        </div>
                    </div>`;
          }
        } else {
          elContent.innerHTML += `<div class='col m12 s18'><p class='center'>No data found</p></div`;
        }
      });
  };
  loadData();
});
