"use strict";

const skills = {
  data: [
    {
      skillName: "html",
      skillLevel: 40,
      skillImage: "html.svg",
    },
    {
      skillName: "css",
      skillLevel: 40,
      skillImage: "css.svg",
    },
    {
      skillName: "python",
      skillLevel: 40,
      skillImage: "python.svg",
    },
    {
      skillName: "cpp",
      skillLevel: 40,
      skillImage: "c++.svg",
    },
  ],
  generateList: function (parentElement) {
    this.data.forEach((item) => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      const div = document.createElement("div");
      dt.classList.add("skill-item");
      dd.classList.add("skill-level");
      dt.textContent = item.skillName;
      div.textContent = item.skillLevel + "%";
      dt.style.backgroundImage = "url(img/skills/" + item.skillImage;
      div.style.width = item.skillLevel + "%";
      dd.append(div);
      parentElement.append(dt, dd);
    });
  },
};

const skillList = document.querySelector("dl.skill-list");

skills.generateList(skillList);
