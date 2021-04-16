// @ts-check
document.addEventListener("DOMContentLoaded", loadMain);

function loadMain() {
  const main = document.getElementById("main");
  const { pathname } = new URL(window.location.href);

  if (pathname.match(/interested$/)) {
    // @ts-ignore
    document.querySelector(".interested").style.display = "block";
  } else if (pathname.match(/cannot-attend$/)) {
    // @ts-ignore
    document.querySelector(".cannot-attend").style.display = "block";
    document
      .querySelector(".cannot-attend .submit")
      ?.addEventListener("click", submitResponse);
  }
}

/**
 * @param {Event} e
 */
function submitResponse(e) {
  const thankYou = document.querySelector(".thank-you-for-feedback");

  // @ts-ignore
  if (thankYou) thankYou.style.display = "block";
  // @ts-ignore
  e.target.setAttribute("disabled", true);
}
