"use strict";

const skills = {
  isSort: false,
  data: [],
  generateList: function (parentElement) {
    parentElement.innerHTML = "";
    this.data.forEach((item) => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      const div = document.createElement("div");
      dt.classList.add("skill-item");
      dd.classList.add("skill-level");
      dt.textContent = item.name;
      div.textContent = `${item.level}%`;
      dt.style.backgroundImage = `url(img/skills/${item.image})`;
      div.style.width = `${item.level}%`;
      dd.append(div);
      parentElement.append(dt, dd);
    });
  },
  sortList: function (type) {
    if (this.isSort !== type) {
      this.data.sort(getComparer(type));
      skills.isSort = type;

      console.log(`отсортировали данные по ${type}`);
    } else {
      this.data.reverse();

      console.log("инвертировали порядок сортировки");
    }

    skills.generateList(skillList);
  },
  initList: function (url, parentElement, skillSection) {
    fetch(url)
      .then((data) => data.json())
      .then((object) => {
        this.data = object;
        this.generateList(parentElement);
      })
      .catch(() => {
        console.error("что-то пошло не так");
        skillSection.remove();
      });
  },
};
const skillList = document.querySelector("dl.skill-list");
const skillSection = document.querySelector(".skills");

const skillsButtons = document.querySelector(".skills-buttons");

skillsButtons.addEventListener("click", (e) => {
  let target = e.target;

  if (target.nodeName == "BUTTON") {
    switch (target.dataset.type) {
      case "name":
        skills.sortList(target.dataset.type);
        break;

      case "level":
        skills.sortList(target.dataset.type);
        break;

      default:
        console.log("неизвестная кнопка");
    }
  }
});

function getComparer(prop) {
  return function (a, b) {
    if (a[prop] < b[prop]) {
      return -1;
    }

    if (a[prop] > b[prop]) {
      return 1;
    }

    return 0;
  };
}

const mainNav = document.querySelector(".main-nav");
const navBtn = document.querySelector(".nav-btn");

navBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-btn_open")) {
    menu.open();
  } else {
    menu.close();
  }
});

const menu = {
  close: function () {
    mainNav.classList.add("main-nav_closed");
    navBtn.classList.remove("nav-btn_close");
    navBtn.classList.add("nav-btn_open");
    navBtn.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
  },

  open: function () {
    mainNav.classList.remove("main-nav_closed");
    navBtn.classList.remove("nav-btn_open");
    navBtn.classList.add("nav-btn_close");
    navBtn.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
  },
};

menu.close();

const switchCheckbox = document.querySelector(".switch-checkbox");
let test = true;

function switchTheme() {
  if (switchCheckbox.checked) {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", true);
  } else {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", false);
  }
}

switchCheckbox.addEventListener("change", (e) => {
  switchTheme();
});

function startTheme() {
  if (localStorage.getItem("theme") == "true") {
    document.body.classList.remove("dark-theme");
    switchCheckbox.checked = true;
  }
  if (localStorage.getItem("theme") == "false") {
    document.body.classList.add("dark-theme");
    switchCheckbox.checked = false;
  }
}

startTheme();

skills.initList("db/skills.json", skillList, skillSection);
