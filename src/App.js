import "./App.css";

import { useRef, useEffect, useState } from "react";
import Header from "./components/Header";

const Canvas = (props) => {
  const rect = (ctx) => (x, y, w, h, color = "#000000") => {
    ctx.fillStyle = color;
    return ctx.fillRect(x, y, w, h);
  };

  const text = (ctx, t, x, y, color = "#000000") => {
    ctx.fillStyle = color;
    ctx.font = "bold 53px Arial";
    ctx.fillText(t.toUpperCase(), x, y);
  };

  useEffect(() => {
    const canvas = props.cref.current;
    const ctx = canvas.getContext("2d");

    ctx.canvas.width = 820;
    ctx.canvas.height = 820;

    let r = rect(ctx);
    var tlop = new Image(); // Create new img element
    tlop.addEventListener(
      "load",
      function () {
        ctx.drawImage(tlop, 0, 0);

        let splitSentence = props.word.split(" ");
        let firstPart = splitSentence
          .slice(0, splitSentence.length - 1)
          .join(" ");
        let lastWord = splitSentence[splitSentence.length - 1];

        r(120, 30, 625, 55, "#f58b57");
        text(ctx, firstPart, 119, 77);
        text(ctx, lastWord, 559, 77);

        r(120, 94, 565, 55, "#f58b57");
        text(ctx, firstPart, 119, 140);
        text(ctx, lastWord, 501, 140);

        r(120, 158, 565, 55, "#f58b57");
        text(ctx, firstPart, 119, 204);
        text(ctx, lastWord, 501, 204);

        r(120, 222, 565, 55, "#f58b57");
        text(ctx, firstPart, 119, 268);
        text(ctx, lastWord, 501, 268);

        r(120, 282, 565, 55, "#f58b57");
        text(ctx, firstPart, 119, 330);
        text(ctx, lastWord, 501, 330);

        r(120, 344, 565, 55, "#f58b57");
        text(ctx, firstPart, 119, 392);
        text(ctx, lastWord, 501, 392);

        r(120, 469, 592, 55, "#f58b57");
        text(ctx, firstPart, 119, 517);
        text(ctx, lastWord, 530, 517);

        r(168, 246, 327, 228);
        r(362, 570, 225, 193);
      },
      false
    );
    tlop.src = "tlop.jpg"; // Set source path
  }, [props.word, props.cref]);

  return <canvas ref={props.cref} {...props} />;
};

function App() {
  const [word, setWord] = useState("THE LIFE OF PABLO");
  const [which, setWhich] = useState(0);

  const xywh = [
    [168, 246, 327, 228],
    [362, 570, 225, 193],
  ];

  function receiveImage(e) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    var reader = new FileReader();

    reader.onload = function (event) {
      var img = new Image();
      img.onload = function () {
        ctx.drawImage(img, ...xywh[~~which]);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);

    setWhich(!which);
  }

  const canvasRef = useRef(null);
  const uploadRef = useRef(null);
  return (
    <div className="App">
      <Header word={word} setWord={setWord}></Header>
      <main>
        <input
          type="file"
          ref={uploadRef}
          id="imageLoader"
          name="imageLoader"
          onChange={receiveImage}
          // onInput={receiveImage}
        />
        <Canvas cref={canvasRef} word={word}></Canvas>
      </main>
    </div>
  );
}

export default App;
