var harryPotterApi = "http://localhost:3000/character";
var btnLetStart = document.querySelector(".header__btn");
var headerNavbar = document.querySelector(".header__navbar-list");
var showUl = document.querySelector(".navbar__favorated");
var imagePreview = document.querySelector(".image--preview");
var imagePreviewImage = imagePreview.querySelector(".image--preview__image");
var imagePreviewText = imagePreview.querySelector(".image--preview__text");
var inputImg = document.querySelector("#input-img");

//tim kiem nhan vat
function getInputValue(each) {
  var inputGetValue = document.querySelector('input[name="search"]');
  inputGetValue.addEventListener("input", function (e) {
    var targetString = e.target.value.toLowerCase();
    var matchCharacter = each.filter((character) => {
      return (
        character.name.toLowerCase().includes(targetString) ||
        character.house.toLowerCase().includes(targetString)
      );
    });
    renderCharacters(matchCharacter);
  });
}

btnLetStart.onclick = function () {
  document.querySelector('input[name="search"]').focus();
};

headerNavbar.addEventListener("click", function () {
  showUl.classList.toggle("active");
});

//preview image
inputImg.addEventListener("change", function () {
  var file = this.files[0];
  if (file) {
    var reader = new FileReader();
    imagePreviewText.style.display = "none";
    imagePreviewImage.style.display = "block";

    reader.addEventListener("load", function () {
      imagePreviewImage.setAttribute("src", this.result);
    });
    reader.readAsDataURL(file);
  } else {
    imagePreviewText.style.display = null;
    imagePreviewImage.style.display = null;
    imagePreviewImage.setAttribute("src", " ");
  }
});

//them moi nhan vat

function start() {
  getCharacters(renderCharacters);
  getCharacters(getInputValue);
  handleCreateCharacter();
}
start();

function getCharacters(callback) {
  fetch(harryPotterApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderCharacters(characters) {
  var html = characters.map(function (character) {
    return `
    <div class="col l-2 box__items">
            <div class="over-flow-hidden">
              <img
                src="${character.image}"
                class="box__img"
                alt=""
              />
            </div>
            <div class="box__content">
              <div class="box__devide">
                <h3 class="box__name">${character.name}</h3>
                <p class="box__house">House: ${character.house}</p>
              </div>
              <div class="box__icon">
                <ion-icon
                  name="heart-outline"
                  class="icon-like active"
                ></ion-icon>
                <ion-icon name="heart" class="icon-like"></ion-icon>
              </div>
            </div>
          </div>
    `;
  });
  document.querySelector(".box").innerHTML = html.join("");
}
// G???i d??? li???u form ??? handleCreateCharacter l??n db.json
function createCharacters(data) {
  var options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch(harryPotterApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(data);
}
// get input.value t??? 2 c??i input v?? c??i imginput t???o th??nh 1 obj form sau ???? g???i h??m handleCreateCharacter truy???n form v??o v?? g???i t???i h??m get Character ????? render ra giao di???n
function handleCreateCharacter(data) {
  var createBtn = document.querySelector("#create-btn");
  createBtn.onclick = function () {
    var name = document.querySelector('input[name="name"]').value;
    var house = document.querySelector('input[name="house"]').value;
    var form = {
      name: name,
      house: house,
      image: data,
    };
    createCharacters(form, function () {
      getCharacters(renderCharacters);
    });
  };
}

// l???ng nghe s??? ki???n ng?????i d??ng input h??nh ???nh v??o v?? tr??? ra data c???a img ???? v?? ?????y l??n JSON
inputImg.addEventListener("change", function () {
  var file = this.files[0];
  var reader = new FileReader();
  console.log(reader);
  reader.addEventListener("load", function () {
    handleCreateCharacter(reader.result);
    return reader.result;
  });
  return reader.readAsDataURL(file);
});
