import React, {useContext, useRef, useEffect} from 'react'
import { DocsContext } from '../../context/docs/docsContext'

const DocFilter = () => {
    const docsContext = useContext(DocsContext);
    const text = useRef('');

    const {filterDocs, clearFilter, filtered} = docsContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });
    const onChange = e => {
        if (text.current.value !== '') {
            filterDocs(e.target.value);
        } else {
            clearFilter();
        }
    }
  return (
    <form>
      <input ref={text} type="text" placeholder="Filter Docs..." onChange={onChange}/>
    </form>
  )
}

export default DocFilter
