import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";

// Put your API key here
builder.init("9963dc5f655145e6a0865ae827a6c488");

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export const CatchAllRoute = function CatchAllRoute() {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);

  // get the page content from Builder
  useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get("page", {
          url: window.location.pathname,
        })
        .promise();
      console.log("fetch", content);
      setContent(content);
      setNotFound(!content);

      // if the page title is found,
      // set the document title
      if (content?.data.title) {
        document.title = content.data.title;
      }
    }
    fetchContent();
  }, [window.location.pathname]);

  // If no page is found, return
  // a 404 page from your code.
  // The following hypothetical
  // <FourOhFour> is placeholder.
  console.log("notFound", notFound, isPreviewingInBuilder);
  if (notFound && !isPreviewingInBuilder) {
    return "404";
  }

  // return the page when found
  return (
    <>
      <div style={{ backgroundColor: "red" }}>
        {/* Render the Builder page */}
        <div>My Header</div>
        <BuilderComponent model="page" content={content} />
        <div>My footer</div>
      </div>
    </>
  );
};
