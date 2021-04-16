// @ts-check
document.addEventListener("DOMContentLoaded", loadMain);

function loadMain() {
  const main = document.getElementById("main");
  const { pathname } = new URL(window.location.href);

  if (pathname.match(/interested$/)) {
    // @ts-ignore
    document.querySelector(".interested").style.display = "block";
  }
}
