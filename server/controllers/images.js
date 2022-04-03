import cloudinary from "cloudinary";


cloudinary.config({ 
    cloud_name: 'instamemo', 
    api_key: '516433781726457', 
    api_secret: 'bo6PIRRb-OaDTa7-3WZIM4GqD3w' 
  });



  export const deleteImage = async (req, res) => {
    const { id } = req.params;
    const  public_id  = 'post_images/'.concat(id) ;
    const options = {
        resource_type:'image',
        invalidate: true
    };
    
    cloudinary.v2.uploader.destroy( `post_images/${id}`,options,
      (error, result) => {console.log(result, error)});
  }