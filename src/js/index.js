import "../css/styles.css";
import "./controller";
if (!("anchorName" in document.documentElement.style)) {
    import("@oddbird/css-anchor-positioning/fn").then(
        ({ default: polyfill }) => {
            polyfill();
        }
    );
}
