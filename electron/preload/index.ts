const loadingTimeout = 3999;

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev: { data: { payload: string } }) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, loadingTimeout);

function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"]
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

// ----------------------------------------------------------------------

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      return parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      return parent.removeChild(child);
    }
  },
};

function useLoading() {
  const className = `loader__spinner`;
  const styleContent = `
      @keyframes loader-spin {
        0% { transform: rotateX(0deg); }
        100% { transform: rotateX(360deg); }
      }
      .${className} > div {
        width: 50px;
        height: 50px;
        background: #fff;
        animation: loader-spin infinite;
        border-top: 3px solid black;
        border-radius: 25px;
      }
      .app-loading-wrap {
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;
        background: #FFFFFF;
        z-index: 9;
      }
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");

  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}
