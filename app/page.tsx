"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "usehooks-ts";
import { saveAs } from "file-saver";

export default function Home() {
  const [textareaContent, setTextareaContent] = useState(
    "Kylie Moore\nGabriel Watkins",
  );
  const debouncedTextareaContent = useDebounce<string>(textareaContent, 500);
  const [imgSrc, setImgSrc] = useState(generateUrl());
  const [imgStyle, setImgStyle] = useState({
    height: 20,
    width: 120,
    verticalAlign: "middle",
  } as any);

  function onTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextareaContent(e.target.value);
  }

  function generateUrl() {
    const encodedNames = textareaContent
      .split("\n")
      .map((name) => encodeURIComponent(name))
      .join(",");
    return `/authors?${encodedNames}`;
  }

  useEffect(() => {
    setImgSrc(generateUrl());

    let longestNameLength = 0;
    debouncedTextareaContent.split("\n").forEach((name) => {
      if (name.length > longestNameLength) {
        longestNameLength = name.length;
      }
    });

    setImgStyle({
      height: 20,
      width: longestNameLength * 8,
      verticalAlign: "middle",
    });
  }, [debouncedTextareaContent]);

  function copyClickHandler() {
    const imgTag = `<img src="${
      process.env.NEXT_PUBLIC_SERVER_URL
    }${imgSrc}" style="height:20px; width: 100px; vertical-align: middle" title="${textareaContent
      .split("\n")
      .join(", ")}" />`;
    navigator.clipboard.writeText(imgTag);
  }

  function downloadClickHandler() {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${imgSrc}`)
      .then((res) => res.blob())
      .then((blob) => {
        saveAs(blob, "eaafa.svg");
      });
  }

  return (
    <>
      <div id="maincontent" style={{ marginTop: 70 }}>
        <h2>&quot;Every Author as First Author&quot; Web API.</h2>
        <h3>What is this?</h3>
        <a href="https://browse.arxiv.org/pdf/2304.01393.pdf">
          &quot;Every Author as First Author&quot;
        </a>{" "}
        is a humorous talk/paper by{" "}
        <img
          src="/authors?Erik%20D.%20Demaine,Martin%20L.%20Demaine"
          style={{ height: 20, width: 125, verticalAlign: "middle" }}
          title="Erik D. Demaine, Martin L. Demaine"
        />{" "}
        describing a
        <blockquote>
          new standard for writing author names on papers and in bibliographies,
          which places <i>every author as a first author — superimposed</i>.
        </blockquote>
        <h3>Ok but what is this site though</h3>
        <p>
          This (unaffiliated!) site allows you to easily generate
          every-author-as-first-author (EAAFA) images that you can embed into
          web pages.
        </p>
        <h3>Show, don&apos;t tell</h3>
        <div className="container">
          <div className="box">
            <p style={{ margin: 0 }}>enter some author names:</p>
            <textarea
              style={{ width: 200, height: 100 }}
              onChange={onTextareaChange}
              value={textareaContent}
            />
          </div>
          <div className="box">
            <p style={{ margin: 0 }}>be amazed:</p>
            <div id="container">
              <img
                src={imgSrc}
                style={imgStyle}
                title={textareaContent.split("\n").join(", ")}
              />
            </div>
            <p>
              <button style={{ marginTop: 10 }} onClick={copyClickHandler}>
                copy the img tag
              </button>
            </p>
            <p>
              <button onClick={downloadClickHandler}>download the image</button>
            </p>
          </div>
        </div>
        <h3>What if I want to do that?</h3>
        <p>Generate a URL that follows this structure:</p>
        <pre>
          https://eaafa.greg.technology/authors/?john%20smith,jane%20johnson
        </pre>
        <p>i.e. url encode author names, and separate them using commas</p>
        <p>
          Then, include this URL in an <span className="mono">&lt;img&gt;</span>{" "}
          tag. I strongly recommend adding a{" "}
          <span className="mono">
            style=&quot;height:20px; width: 100px; vertical-align: middle&quot;
          </span>{" "}
          attribute to the <span className="mono">&lt;img&gt;</span> tag to make
          sure the image is sized correctly and doesn&apos;t mess up your page
          layout. The width value (100px above) will depend on the longest
          author name (and how wide the name is i.e. if it contains a lot of
          &quot;m&quot;s...) It&apos;s roughly{" "}
          <span className="mono">8 * (longest name length)</span>. You can
          always adjust.
        </p>
        <p>
          You might also want to add a <span className="mono">title</span>{" "}
          attribute to the <span className="mono">&lt;img&gt;</span> tag to make
          sure the author names are visible when hovering over the image and to
          make them somewhat less not-accessible.
        </p>
        <h3>Who / Huh</h3>
        <p>
          I am entirely not affiliated with the authors of the original
          (amazing) talk & paper. I&apos;d love to be their friend but I&apos;m
          not sure they'd want that (it's ok).
        </p>
        <p>
          This was made while I was at{" "}
          <a href="https://www.recurse.com/">Recurse Center</a>. View the{" "}
          <a href="https://github.com/gregsadetsky/every-author-as-first-author-web-api">
            source code
          </a>
          . I&apos;ve made{" "}
          <a href="https://recurse.greg.technology">other things</a> too.
        </p>
      </div>
    </>
  );
}
