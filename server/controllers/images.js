import cloudinary from "cloudinary";


cloudinary.config({ 
    cloud_name: 'instamemo', 
    api_key: '516433781726457', 
    api_secret: 'bo6PIRRb-OaDTa7-3WZIM4GqD3w' 
  });



  export const deleteImage = async (req, res) => {
    const { id } = req.params;
    const { type } = req.query;
    let url;
    if (type === 'profile') {url = `profile_images/${id}`}
    if (type === 'cover') {url = `cover_images/${id}`}
    if (type === 'post') {url = `post_images/${id}`}
    const options = {
        resource_type:'image',
        invalidate: true
    };
    
    cloudinary.v2.uploader.destroy( url,options,
      (error, result) => {console.log(result, error)});
  }