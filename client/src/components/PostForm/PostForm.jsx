import { useEffect, useState } from 'react';
import './PostForm.css';
import { useDispatch , useSelector } from 'react-redux';
import { createPost , updatePost , deleteImage} from '../../actions/posts';
import { TextField , Button  } from '@material-ui/core';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useStateIfMounted } from 'use-state-if-mounted';



 const PostForm = (props) => {
     const [postData,setPostData] = useStateIfMounted({title:'',message:'',tags:'',selectedFile:''});
     const [postDataTemp,setPostDataTemp] = useStateIfMounted({title:'',message:'',tags:'',selectedFile:''});
     const post = useSelector((state) => props.currentId ? state.posts.posts.find(post => post._id === props.currentId) : null);
     const dispatch = useDispatch();
     const [isSubmitting,setIsSubmitting] = useState(false);
     const [image,setImage] = useState(null);
     const [uploaded,setUploaded] = useState(false);
     const [changed,setChanged] = useState(false);
     const { Dragger } = Upload;
     const user = JSON.parse(localStorage.getItem('profile'));
     const url = 'https://api.cloudinary.com/v1_1/instamemo/image/upload/';

     const key = 'updatable';


     const openMessage = (msg) => {
        message.loading({ content: 'Loading...', key ,style:{zIndex:9999}});
        console.log('loading');
        setTimeout(() => {
          message.success({ content: msg, key, duration: 2 ,style:{zIndex:9999} });
        }, 1000);
      };
        
     const handleImageUpload = async (options) => {
        const { onSuccess, onError} = options;
        let file = image[0].originFileObj;
        const formData = new FormData();
        formData.append('file',file);
        formData.append('upload_preset','bl1qykjm');
        await fetch(url,{
            method:'post',
            body:formData
        })
        .then(res => res.json())
        .then(data => {
            
            setPostData({...postData,selectedFile:data.url});
            onSuccess(data.statusText);
            setUploaded(true);
            
        })
        .catch(err => {
            console.log(err);
            onError(err);
            
        })
     }

     const fprops = {
        name: 'file',
        multiple: false,
        accept: 'image/*',
        maxCount:1,
        rules:{required:true},
        customRequest: handleImageUpload,
        onChange(info) {
          const { status } = info.file;
          info.file.name = info.file.name.replace(20, '...');
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
          setImage(info.fileList);
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
        onExit(e) {
            console.log(e)
        }
      };



     const handleDisplay = () => {
         if (props.isEditing || props.clicked) {
             return 'flex';
     }else{
         return 'none';
     }
    }

     useEffect(() => {
            if(post){
                setPostData({
                    title:post.title,
                    message:post.message,
                    tags:post.tags,
                    selectedFile:post.selectedFile
                });
                setPostDataTemp ({
                    title:post.title,
                    message:post.message,
                    tags:post.tags,
                    selectedFile:post.selectedFile
                });
            }
     },[post]);

     const deleteImageHandler = () => {
        const currentImage = postData.selectedFile;
        const image_id = currentImage.substring(72 + 1);
        const fetchedImage_id = image_id.substring(0,image_id.length - 4);
        if(fetchedImage_id.length){
        dispatch(deleteImage(fetchedImage_id,'post'));
        }
     }

     const clear = (e) => {
        
            setPostData({
                title:'',
                message:'',
                tags:'',
                selectedFile:''
            }); 
            setUploaded(false);
     }


     const animateAndExit = () => {
         if(props.isEditing){
        props.setIsEditing(false);
        props.setCurrentId(null);
         }else{
        props.handlepostclick(false);
         }
        clear();
     }

     const handleSubmit = (event) => {
        event.preventDefault();
        if(props.currentId){
            dispatch(updatePost(props.currentId,{...postData , name : user?.result?.name}));
            openMessage('Post Updated');
     }else{
            dispatch(createPost({...postData , creator : user?.result?.name , creatorImage : user?.result?.imageUrl ,creatorIsVerified : user?.result?.isVerified }));
            openMessage('Post Created');     
     }
     
     setIsSubmitting(false);
     setTimeout(() => {
         setIsSubmitting(false);
        animateAndExit();
     } , 2000); 
    }
    const handleOnExit = () => {
        animateAndExit();
        deleteImageHandler();
    }
    const handlePostData = (e,item) => {
        if(item === 'title')
        setPostData({...postData, title: e.target.value});
        else if(item === 'message')
        setPostData({...postData, message: e.target.value});
        else if(item === 'tags')
        setPostData({...postData, tags: e.target.value})       
 }
    useEffect(() => {
    if (props.isEditing){
        
        let newTags;
       if (Array.isArray(postData.tags)) {newTags =  postData.tags[0]} else {newTags = postData.tags}
      if (postDataTemp?.title === postData.title && postDataTemp?.message === postData.message && postDataTemp?.tags[0] === newTags){
                  setChanged(false);
        }
      else if(postDataTemp?.title !== postData.title || postDataTemp?.message !== postData.message || postDataTemp?.tags[0] !== newTags) {
                  setChanged(true);
        } 
   }
},[postData]);

    

    return (
        <div className="PostForm__main" style={{display: handleDisplay()}}>
            {isSubmitting ? (
            <div className='Postform__loader'>
                <div className='Postform__loader-text'>{!props.isEditing ? 'Posting' : 'Updating your post'}</div>
                <div className="lds-ripple"><div></div><div></div></div>
            </div>
            ) :null}
            <div className='PostForm__overlay' onClick={() => {handleOnExit()}} ></div>
            <div className="PostForm__outerBox">
                <div className='PostForm__Boxheader'>{!props.isEditing ? 'Create a new post' : 'Edit your post'}</div>
                <div className='PostForm__form'>
                    <form className='PostForm__form__form' onSubmit={(e) => handleSubmit(e)}>
                        <TextField id='PostForm__form--title' required variant='outlined' value = {postData.title} label='Title' onChange={(e) => handlePostData(e,'title')} />
                        <TextField id='PostForm__form--message' required variant='outlined'  multiline minRows={2} maxRows={4} value = {postData.message} label='Type here your message' onChange={(e) => handlePostData(e,'message')}/>
                        <TextField id='PostForm__form--tags' variant='outlined' value={postData.tags} label='Tags (use comma to seperate)' onChange={(e) => handlePostData(e,'tags')}/>
                        <div style={{display:'block',maxWidth:'100%',alignItems:'center',justifyContent:'center',marginTop:'25px'}}>
                       {props.componentNature === 'nav' && (
                       <Dragger  {...fprops}>
                            <div className='PostForm__File-dragger'>
                            <p className="ant-upload-drag-icon">
                             <InboxOutlined />
                             </p>
                            <p className="ant-upload-text" style={{fontSize:'16px'}}>Click or drag image to upload</p>
                            <p className="ant-upload-hint" style={{fontSize:'14px'}}>
                            Please make sure your image don't exceed 2mb. 
                            </p>
                            </div>
                        </Dragger>
                       ) }
                        </div>
                        <div className='PostForm__form__buttons'>
                        <Button type='submit' disabled={uploaded === true || changed === true ? false : true } color='primary' variant="contained" ><div id="muibtn">{props.isEditing ? 'Save changes' : 'Create'}</div></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
 }


 export default PostForm;

