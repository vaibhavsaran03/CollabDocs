import React, { Fragment, useContext, useEffect } from "react";
import { DocsContext } from "../../context/docs/docsContext";
import DocItem from "./DocItem";

const Docs = () => {
  const docsContext = useContext(DocsContext);
  const { docs, filtered, getDocs, loading} = docsContext;

  useEffect(() => {
    getDocs();
    // eslint-disable-next-line
  }, []);

  if (!docs || docs.length === 0) {
    return <div>No documents available</div>;
  }

  return (
     <Fragment>
      {(filtered || docs).map((doc) => (
        doc && doc._id ? <DocItem key={doc._id} docs={doc} /> : <div>Document is missing an ID</div>
      ))}
    </Fragment>
  );
};

export default Docs;
