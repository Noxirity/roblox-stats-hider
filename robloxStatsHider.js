let hideOption = "home";

chrome.storage.sync.get(["hideOption"], (result) => {
  hideOption = result.hideOption ?? "home";
  if (shouldBlurElements()) {
    document.querySelectorAll(".game-card-link").forEach((node) => {
      blurInfoLabels(node);
    });
    document
      .querySelectorAll(".border-top.border-bottom.game-stat-container")
      .forEach((node) => {
        blurGameStatContainer(node);
      });
    document.querySelectorAll(".voting-panel.body").forEach((node) => {
      blurVotingPanel(node);
    });
  }
});

function handleAddedNodes(nodes) {
  nodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.classList.contains("game-card-link")) {
        if (shouldBlurElements()) {
          blurInfoLabels(node);
        }
      }
      if (
        node.classList.contains("border-top") &&
        node.classList.contains("border-bottom") &&
        node.classList.contains("game-stat-container")
      ) {
        if (shouldBlurElements()) {
          blurGameStatContainer(node);
        }
      }
      if (
        node.classList.contains("voting-panel") &&
        node.classList.contains("body")
      ) {
        if (shouldBlurElements()) {
          blurVotingPanel(node);
        }
      }

      node.querySelectorAll(".game-card-link").forEach((childNode) => {
        if (shouldBlurElements()) {
          blurInfoLabels(childNode);
        }
      });
      node
        .querySelectorAll(".border-top.border-bottom.game-stat-container")
        .forEach((childNode) => {
          if (shouldBlurElements()) {
            blurGameStatContainer(childNode);
          }
        });
      node.querySelectorAll(".voting-panel.body").forEach((childNode) => {
        if (shouldBlurElements()) {
          blurVotingPanel(childNode);
        }
      });
    }
  });
}

function blurInfoLabels(element) {
  const selectors = [
    ".info-label.vote-percentage-label",
    ".info-label.icon-votes-gray",
    ".info-label.icon-playing-counts-gray",
    ".info-label.playing-counts-label",
  ];

  let elementsToBlur = [];
  selectors.forEach((selector) => {
    element.querySelectorAll(selector).forEach((el) => {
      elementsToBlur.push(el);
      el.style.filter = "blur(5px)";
      console.log("Blurred element:", el);
    });
  });

  elementsToBlur.forEach((el) => {
    el.addEventListener("mouseover", () => {
      elementsToBlur.forEach((el) => (el.style.filter = "none"));
    });
    el.addEventListener("mouseout", () => {
      elementsToBlur.forEach((el) => (el.style.filter = "blur(5px)"));
    });
  });
}

function blurGameStatContainer(element) {
  element.style.filter = "blur(5px)";
  console.log("Blurred game-stat-container:", element);

  element.addEventListener("mouseover", () => {
    element.style.filter = "none";
  });
  element.addEventListener("mouseout", () => {
    element.style.filter = "blur(5px)";
  });
}

function blurVotingPanel(element) {
  element.style.filter = "blur(5px)";
  console.log("Blurred voting-panel body:", element);

  element.addEventListener("mouseover", () => {
    element.style.filter = "none";
  });
  element.addEventListener("mouseout", () => {
    element.style.filter = "blur(5px)";
  });
}

function shouldBlurElements() {
  const homePageUrl = /^https:\/\/www\.roblox\.com\/home/;
  const allPagesUrl = /^https:\/\/www\.roblox\.com\//;
  if (hideOption === "home") {
    return homePageUrl.test(window.location.href);
  } else if (hideOption === "everywhere") {
    return allPagesUrl.test(window.location.href);
  }
  return false;
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      handleAddedNodes(mutation.addedNodes);
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
