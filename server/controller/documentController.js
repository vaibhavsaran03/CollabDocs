import Document from "../schema/documentSchema.js";


export const getDocument = async (id) => {
  if (id === null) return;

  try{
    let document = await Document.findById(id);

    if(document){
      return document;
    }
    else{
      document = await Document.create({ _id: id, data: " " });
      return document;
    }
  }
  catch(err){
    console.log("2Error in getDocument: ", err);
  }
};

export const updateDocument = async (id, data) => {
  try{
    const updatedDocument= await Document.findByIdAndUpdate(id, { data }, {new: true});
    return  updatedDocument;
  }
  catch (err){
    console.log("Error in updateDocument: ", err);
  }
};
