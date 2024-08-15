import React, {useState, useContext} from 'react'
import { v4 as uuidV4 } from "uuid";
import { DocsContext } from '../../context/docs/docsContext';

const DocsForm = () => {
    const docsContext = useContext(DocsContext);
    const [doc,setDoc] = useState({
        title:'',
        content: {},
    }) ;

    const {title,content,createdBy,id} = doc;

    const onChange = e => setDoc({...doc,[e.target.name]:e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        // If the title is empty, set it to "Untitled"
        if (!title.trim()) {
            setDoc({ ...doc, title: "Untitled" });
        }

        docsContext.createDoc({ ...doc, title: title.trim() || "Untitled" });
        setDoc({
            title:'',
            content:{},
        });
    }

  return (
    <form onSubmit={onSubmit}>
        <h3 className="text-primary">New Doc</h3>
        <input type="text" placeholder="Title" name="title" value={title} onChange={onChange}/>

        <div>
            <input type ='submit' value='Create Doc' className='btn btn-dark btn-block'/>
        </div>
      
    </form>
  )
}

export default DocsForm
