// @ts-check
document.addEventListener("DOMContentLoaded", loadMain);

const serverBaseUrl = `https://ashram-town-hall-meeting-track.herokuapp.com`;

function loadMain() {
  const main = document.getElementById("main");
  const { pathname } = new URL(window.location.href);

  if (pathname.match(/interested$/)) {
    fetch(
      `${serverBaseUrl}/${pathname
        .replace(/\/interested$/, "")
        .slice(1)}/interested`,
      { method: "POST" }
    );

    const slot = document.querySelector(".interested");

    // @ts-ignore
    if (slot) slot.style.display = "block";
  } else if (pathname.match(/cannot-attend$/)) {
    fetch(
      `${serverBaseUrl}/${pathname
        .replace(/\/cannot-attend$/, "")
        .slice(1)}/cannot-attend`,
      { method: "POST" }
    );

    const slot = document.querySelector(".cannot-attend");

    // @ts-ignore
    if (slot) slot.style.display = "block";
    document
      .querySelector(".cannot-attend .submit")
      ?.addEventListener("click", submitResponse);
  }

  /**
   * @param {Event} e
   */
  function submitResponse(e) {
    fetch(
      `${serverBaseUrl}/${pathname
        .replace(/\/cannot-attend$/, "")
        .slice(1)}/feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // @ts-ignore
          feedback: document.querySelector(".cannot-attend textarea").value,
        }),
      }
    );

    const thankYou = document.querySelector(".thank-you-for-feedback");

    // @ts-ignore
    if (thankYou) thankYou.style.display = "block";
    // @ts-ignore
    e.target.setAttribute("disabled", true);
  }
}
