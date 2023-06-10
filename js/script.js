"use strict";

const skills = {
  isSort: false,
  data: [
    {
      name: "html",
      level: 30,
      skillImage: "html.svg",
    },
    {
      name: "css",
      level: 40,
      skillImage: "css.svg",
    },
    {
      name: "python",
      level: 50,
      skillImage: "python.svg",
    },
    {
      name: "cpp",
      level: 80,
      skillImage: "c++.svg",
    },
  ],
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
      dt.style.backgroundImage = `url(img/skills/${item.skillImage})`;
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
};
const skillList = document.querySelector("dl.skill-list");

skills.generateList(skillList);

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
