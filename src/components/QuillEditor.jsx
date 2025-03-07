import { useComponentStore } from "@/store/useComponentStore";
import { useCurriculumStore } from "@/store/useCurriculumStore";
import { useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = () => {
  const { mode } = useComponentStore();
  const { formCurriculum } = useCurriculumStore();
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "video"],
        ["clean"],
      ],
    },
  };

  const convertGoogleDriveLink = (url) => {
    const match = url.match(/\/d\/(.*?)(\/|$)/);
    if (match) {
      const fileId = match[1];
      if (url.includes("document")) {
        return `https://docs.google.com/document/d/${fileId}/preview`;
      } else if (url.includes("spreadsheets")) {
        return `https://docs.google.com/spreadsheets/d/${fileId}/preview`;
      } else if (url.includes("presentation")) {
        return `https://docs.google.com/presentation/d/${fileId}/preview`;
      } else if (url.includes("file")) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    return url;
  };

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          delta.ops.forEach((op) => {
            if (op.insert && typeof op.insert === "object") {
              const iframes = quill.root.querySelectorAll("iframe");
              if (iframes.length > 0) {
                const lastIframe = iframes[iframes.length - 1];
                lastIframe.style.width = "100%";
                lastIframe.style.height = "500px";
                lastIframe.src = convertGoogleDriveLink(lastIframe.src);
              }
            }
          });
        }
      });
      quill.on("editor-change", () => {
        document.querySelectorAll(".ql-tooltip").forEach((tooltip) => {
          tooltip.style.left = "0px";
        });
        const editorContent = quill.root.innerHTML;
        if (editorContent.includes("<iframe")) {
          quill.root.querySelectorAll("iframe").forEach((iframe) => {
            iframe.style.width = "100%";
            iframe.style.height = "500px";
          });
        }
      });
    }
  }, []);

  return (
    <div className="w-full mt-10">
      <h2 className="text-lg font-bold mb-2">Materials</h2>
      <ReactQuill
        key={mode}
        ref={quillRef}
        value={formCurriculum.contents}
        onChange={(targetContent) => {
          useCurriculumStore.setState((prevState) => ({
            ...prevState,
            formCurriculum: {
              ...prevState.formCurriculum,
              contents: targetContent,
            },
          }));
        }}
        modules={modules}
        className="bg-white"
      />
    </div>
  );
};

export default QuillEditor;
