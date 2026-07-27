const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });
}

const loader = document.querySelector("[data-site-loader]");
const loaderPercent = document.querySelector("[data-loader-percent]");
const loaderSeenKey = "daats-loader-seen";

if (loader && loaderPercent) {
  initSiteLoader({ loader, loaderPercent, loaderSeenKey });
}

function initSiteLoader({ loader, loaderPercent, loaderSeenKey }) {
  if (getSessionFlag(loaderSeenKey)) return;

  const startedAt = performance.now();
  let progress = 0;
  let loaded = false;
  let completed = false;

  loader.hidden = false;
  document.documentElement.classList.add("is-loading");

  const tick = window.setInterval(() => {
    const ceiling = loaded ? 99 : 92;
    const increment = progress < 40 ? 4 : progress < 72 ? 2 : 1;
    progress = Math.min(progress + increment, ceiling);
    loaderPercent.textContent = `${progress}%`;
  }, 80);

  const finish = () => {
    if (completed) return;
    completed = true;
    loaded = true;

    const elapsed = performance.now() - startedAt;
    const wait = Math.max(0, 1800 - elapsed);

    window.setTimeout(() => {
      window.clearInterval(tick);
      loaderPercent.textContent = "100%";
      loader.classList.add("is-complete");
      setSessionFlag(loaderSeenKey);

      window.setTimeout(() => {
        loader.classList.add("is-hidden");
        document.documentElement.classList.remove("is-loading");

        window.setTimeout(() => {
          loader.hidden = true;
        }, 320);
      }, 220);
    }, wait);
  };

  if (document.readyState === "complete") {
    finish();
  } else {
    window.addEventListener("load", finish, { once: true });
  }
}

function getSessionFlag(key) {
  try {
    return window.sessionStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function setSessionFlag(key) {
  try {
    window.sessionStorage.setItem(key, "true");
  } catch {
    // Ignore storage failures and allow the loader to reappear next time.
  }
}
