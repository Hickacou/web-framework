"use strict"
console.log("%cFramework template by Hickacou : https://github.com/Hickacou/web-framework", "font-style: italic");
// Please keep this little line if it doesn't bother your project :)

var FrameworkMenuList;
var FrameworkSections;

function loadFiles() {
    if (FrameworkSections.length < 1) return FrameworkMenuList.innerHTML = "<div id='no-section'>No Section</div>";
    for (let section of FrameworkSections) {

        if (SHOW_SECTION_NAME)
            section.className += " framework-section-display-id";

        if (section.getAttribute("center") == "true")
            section.className += " centered-framework-section";

        let menuLink = document.createElement("div");
        menuLink.className = "FRAMEWORK-left-menu-link";
        menuLink.innerHTML = section.getAttribute("display-name") || section.id;
        menuLink.id = section.id;
        menuLink.onclick = () => changeFrameworkSection(section.id);
        FrameworkMenuList.appendChild(menuLink);

        section.style.width = section.style.height = "100%";
        loadStyle(`${section.getAttribute("css-name") || section.id}`);

        if (!section.hasAttribute("script")) continue;
        loadScript(section.getAttribute("script"));

    }
    changeFrameworkSection(FrameworkSections.item(0).id);
}

function changeFrameworkSection(sectionID) {
    for (let section of FrameworkSections) {
        section.style.display = "none";
    }
    for (let link of document.getElementsByClassName("FRAMEWORK-left-menu-link")) {
        link.className = "FRAMEWORK-left-menu-link";
    }
    document.querySelector(`.${FRAMEWORK_CLASS}#${sectionID}`).style.display = "";
    document.querySelector(`.FRAMEWORK-left-menu-link#${sectionID}`).className = "FRAMEWORK-left-menu-link selected";
}


function checkSettings() {
    if (typeof (FRAMEWORK_CLASS) !== "string" || FRAMEWORK_CLASS.length < 1)
        throw new Error("FRAMEWORK_CLASS must be a non-empty string");

    if (typeof (SHOW_SECTION_NAME) !== "boolean")
        throw new TypeError("SHOW_SECTION_NAME must be a boolean");



    if (typeof (CSS_PATH) !== "string" || CSS_PATH.length < 1)
        throw new Error("CSS_PATH must be a non-empty string");

    if (typeof (JS_PATH) !== "string" || JS_PATH.length < 1)
        throw new Error("CSS_PATH must be a non-empty string");
}



function loadStyle(name) {
    let style = document.createElement("link");
    style.setAttribute("rel", "stylesheet");
    style.href = `${CSS_PATH}/${name}.css`;
    document.head.appendChild(style);
}

function loadScript(name) {
    let script = document.createElement("script");
    script.src = `${JS_PATH}/${name}.js`
    document.head.appendChild(script);
}



checkSettings();
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        FrameworkMenuList = document.getElementById("FRAMEWORK-left-menu-list");
        FrameworkSections = document.getElementsByClassName(FRAMEWORK_CLASS);
        loadFiles();
    }
}