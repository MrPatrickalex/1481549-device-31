try {
  // Слыйды
  const toggles = Array.from(document.getElementsByClassName("slide-toggle"));
  const slides = Array.from(document.getElementsByClassName("preview-slide"));

  toggles.forEach((t, i) => t.addEventListener("click", function(event) {
    event.preventDefault();
    toggles.forEach(t2 => t2.classList.remove("slide-active"))
    t.classList.add("slide-active");
    slides.forEach(s => s.classList.add("visually-hidden"));
    slides[slides.length - i - 1].classList.remove("visually-hidden");
  }));

  // Преимущества
  const advantagesButtons = Array.from(document.getElementsByClassName("advantages-button"));
  const advantages = Array.from(document.getElementsByClassName("advantages-item"));

  advantagesButtons.forEach((b, i) => b.addEventListener("click", function(event) {
    event.preventDefault();
    advantagesButtons.forEach(b2 => b2.classList.remove("advantages-active"));
    b.classList.add("advantages-active");
    advantages.forEach(s => s.classList.add("visually-hidden"));
    advantages[i].classList.remove("visually-hidden");
  }));

  // Напишите нам
  const writeUsButton = document.querySelector(".write-us");
  const writeUsModal = document.querySelector(".writeus-popup");
  const mapButton = document.querySelector(".map-reference");
  const mapModal = document.querySelector(".map-popup");
  const modals = Array.from(document.querySelectorAll(".popup"));
  const close = Array.from(document.querySelectorAll(".popup-close"));

  // Форма
  const form = document.querySelector(".writeus-form");
  const name = document.getElementById("form-name");
  const email = document.getElementById("form-email");
  const text = document.getElementById("form-text");

  var isStorageSupport = true;

  try {
    let nameFromStorage = localStorage.getItem("name");
  } catch (error) {
    isStorageSupport = false;
  }

  form.addEventListener("submit", function (event) {
    if (!name.value || !email.value || !text.value) {
      event.preventDefault();
      console.log("Нужно ввести данные");
      writeUsModal.classList.add("popup-error");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("name", name.value);
        localStorage.setItem("email", email.value);
      }
    }
  });

  writeUsButton.addEventListener("click", function(event) {
    event.preventDefault();
    writeUsModal.classList.remove("popup-hidden");
    writeUsModal.classList.add("popup-show");

    if (isStorageSupport) {
      var nameFromStorage = localStorage.getItem("name");
      var emailFromStorage = localStorage.getItem("email");
      if (nameFromStorage) {
        name.value = nameFromStorage;
      } else {
        name.focus();
      }
      if (emailFromStorage) {
        email.value = emailFromStorage;
      }
    }
  })

  close.forEach(b => b.addEventListener("click", function(event) {
    event.preventDefault();
    modals.forEach(m => {
      m.classList.add("popup-hidden");
      m.classList.remove("popup-show");
    });
  }))

  mapButton.addEventListener("click", function(event) {
    event.preventDefault();
    mapModal.classList.remove("popup-hidden");
    mapModal.classList.add("popup-show");
  })

  // Карта
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [59.938635, 30.323118],
      zoom: 15,
      controls: [],
    });

    myMap.geoObjects.add(
      new ymaps.Placemark(
        [59.938635, 30.323118],
        {
          iconCaption: "Большая Конюшенная улица, 19",
        },
        {
          preset: "islands#icon",
          iconColor: "red",
        }
      )
    );
  }
} catch (error) {
  console.log('TCL: error', error);
}
