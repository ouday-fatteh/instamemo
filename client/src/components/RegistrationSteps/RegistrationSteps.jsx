import React , {  useState }  from 'react';
import './RegistrationSteps.css';
import { countries } from './Countries';
import { Form, Input , Button , Steps , message , Select, Upload ,Checkbox} from 'antd';
import ImgCrop from 'antd-img-crop';
import Terms from './Terms';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteImage , finishingSignUp} from '../../actions/users.js';



const { Step } = Steps;

const steps = [{ title: 'General info' },{ title: 'Profile Media'},{ title: 'All done'}];

const { Option } = Select;

const formItemLayout = {labelCol: {xs: {span: 24,},sm: {span: 8,},},wrapperCol: {xs: {span: 24,},sm: {span: 16,},},};

const tailFormItemLayout = {wrapperCol: {xs: {span: 24,offset: 0,},sm: {span: 16,offset: 8,},},};


const RegistrationSteps = () => {
    const [current, setCurrent] = useState(0);
    const [userData,setUserData] = useState({nickname:'',country:'',phone:'',bio:'',gender:'',imageUrl:'',coverImage:'',hasFinishedSignUp:true});
    const [fileListProfile, setFileListProfile] = useState([]);
    const [fileListCover, setFileListCover] = useState([]);
    const [isChecked,setIsChecked] = useState(false);
    const history = useHistory();
    const urlParams = new URLSearchParams(window.location.search);
    const Country =  urlParams.get('hl');
    const countryCode =  urlParams.get('hc');
    const userId = urlParams.get('u_id');
    const [profilePictureId,setProfilePictureId] = useState('');
    const [coverPictureId,setCoverPictureId] = useState('');
    const currentUser = JSON.parse(localStorage.getItem('profile'));
    const imageUrl = 'https://api.cloudinary.com/v1_1/instamemo/image/upload/';
    const profileUploadPreset = 'sm4uutmq';
    const coverUploadPreset = 'ys0ad8g5';
    const dispatch = useDispatch();

    // Check if the user is the same as the one who is trying to register
    if(currentUser?.result._id !== userId){
        history.push('/');
    }

    if(currentUser?.result?.hasFinishedSignUp){
        history.push('/');
    }


    const handleProfileImageUpload = async (options) => { 
      const { onSuccess, onError} = options; 
      let file = fileListProfile[0]?.originFileObj;
      
      const formData = new FormData();
      formData.append('file',file);
      formData.append('upload_preset', profileUploadPreset );
      await fetch(imageUrl,{
          method:'post',
          body:formData
      })
      .then(res => res.json())
      .then(data => {
        onSuccess(data.statusText);
          setUserData({...userData, imageUrl:data.url});
          setProfilePictureId(data.public_id);
      })
      .catch(err => {
          console.log(err);
          onError(err);
      })
      
   }

   const handleCoverImageUpload = async (options) => {  
    const { onSuccess, onError} = options;
    let file = fileListCover[0]?.originFileObj;
    
    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset', coverUploadPreset );
    await fetch(imageUrl,{
        method:'post',
        body:formData
    })
    .then(res => res.json())
    .then(data => {
        onSuccess(data.statusText);
        setUserData({...userData, coverImage:data.url});
        setCoverPictureId(data.public_id);
    })
    .catch(err => {
        console.log(err);
        onError(err);
    })
    
 }


  const onRemove1 = () => {
    setFileListProfile([]);
    setUserData({...userData, profilePicture:''});
    const index = profilePictureId.indexOf('/');
    const image_id = profilePictureId.substring(index+1,profilePictureId.length);
    if(image_id.length){
      dispatch(deleteImage(image_id,'profile'));
      }
   
  }
  const onRemove2 = () => {
    setFileListCover([]);
    setUserData({...userData, coverPicture:''});
    const index = coverPictureId.indexOf('/');
    const image_id = coverPictureId.substring(index+1,coverPictureId.length);
    if(image_id.length){
      dispatch(deleteImage(image_id,'cover'));
      }
   
  }

 
  const onChange1 = ({ fileList: newFileList }) => {
    setFileListProfile(newFileList);
  };
  const onChange2 = ({ fileList: newFileList }) => {
    setFileListCover(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onCheck = e => {
    setIsChecked(e.target.checked);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const updateLocalStorage = () => {
    localStorage.setItem('profile',JSON.stringify({...currentUser,result:{...currentUser.result,
      hasFinishedSignUp:true,
      imageUrl:userData.imageUrl,
      coverImage:userData.coverImage,
      gender:userData.gender,
      country:userData.country,
      bio:userData.bio,
      nickname:userData.nickname
    }}));
  }

  const completingSignUp = () => {
 
    dispatch(finishingSignUp(userData,userId,history,updateLocalStorage));
    message.success('All done , Redirecting you to the homepage.');
  }

    
    const [form] = Form.useForm();

    const onFinish = (values) => {
      
      setUserData({
        ...userData,
        nickname:values.nickname,
        country:values.residence,
        phone:values.prefix+values.phone,
        bio:values.bio,
        gender:values.gender,
      })
    };
  
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 100,
          }}
        >
         { countries?.map((country,index) => (
             <Option key={country.callingCodes[0]+index} value={country.callingCodes[0]}>
                 <div style={{
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'flex-start',
                        width:'100%',
                 }}>
                 <img alt={country.name} src={country.flags.png} style={{width:'17px',height:'12px',marginTop:'0px'}}></img>+{country.callingCodes[0]}
                 </div>
            </Option>
            ))}
        </Select>
      </Form.Item>
    );
    
    return (
      <div className='RegistrationSteps__main'>
        <div className='RegistrationSteps__indicators'>
        <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
        </div>
        <div className="steps-content">
          {current === 0 && 
        <div className='RegistrationSteps__form'>

            <Form {...formItemLayout} form={form} name="register"  onFinish={onFinish} initialValues={{
            residence: `${Country}`,
            prefix: `${countryCode}` ,
            }} scrollToFirstError >

            <Form.Item name="nickname" label="Nickname" tooltip="What do you want others to call you?" rules={[
              {required: true,message: 'Please input your nickname!',whitespace: true,},]}>
            <Input />
            </Form.Item>

            <Form.Item name="residence" label="Country" rules={[
              {
                required: true,
                message: 'Please select country!',
              },]} >

            <Select style={{textAlign:"left"}} >
                {countries?.map(country => (
                    <Option key={country.name} value={country.name}>{country.name}</Option>
                ))}
            </Select>
            </Form.Item>

            <Form.Item name="phone" label="Phone Number" rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },]}>
            <Input addonBefore={prefixSelector} style={{width: '100%',}}/>
            </Form.Item>

            <Form.Item name="bio" label="Bio" rules={[ {required: true,message: 'Please input your bio',},]}>
            <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item name="gender" label="Gender" rules={[{required: true,message: 'Please select gender!',},]} >
            <Select style={{textAlign:"left"}} placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option disabled >There are only two genders</Option>
            </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" >
              Save
            </Button>
            </Form.Item>
     
            </Form>
    </div>
    }
    {current === 1 &&
    <div className='RegistrationSteps__image_upload'>
        <div className='RegistrationSteps__image_upload_profile'>
          <div>Add a profile picture</div>
          <div>
     <ImgCrop grid modalTitle='Edit profile picture'>
     <Upload
       name='file'
       customRequest={handleProfileImageUpload}
       listType="picture-card"
       fileList={fileListProfile}
       accept="image/png, image/jpeg"
       onChange={onChange1}
       onRemove={onRemove1}
       onPreview={onPreview}
       maxCount={1}
     >
       {fileListProfile.length < 1 && '+ Upload'}
     </Upload>
   </ImgCrop>
   </div>
   </div>
   <div style={{borderTop:'1px dotted  rgba(0, 0, 0, 0.1)'}} className='RegistrationSteps__image_upload_profile'>
   <div>Add a cover picture</div>
          <div>
     <ImgCrop grid aspect={21/9}  modalTitle='Edit cover picture'>
     <Upload
       customRequest={handleCoverImageUpload} 
       listType="picture-card"
       fileList={fileListCover}
       accept="image/png, image/jpeg"
       onChange={onChange2}
       onRemove={onRemove2}
       onPreview={onPreview}
       maxCount={1}
     >
       {fileListCover.length < 1 && '+ Upload'}
     </Upload>
   </ImgCrop>
   </div>
   </div>
   </div>
    }
    {current === 2 && 
    <div className='RegistrationSteps__terms_and_conditions'>
      <div className='RegistrationSteps__terms_and_conditions_container'>
        <Terms />
      </div>
      <div><Checkbox onChange={onCheck}>I agree to the terms and conditions.</Checkbox></div>
    </div>
     }
        </div>
        <div className="steps-action">
        {current === 0 && (
          <Form.Item>
          <Button type="primary" disabled={
            !userData.nickname || !userData.phone || !userData.bio || !userData.country || !userData.gender
          } onClick={() => next()}>
            Next
          </Button>
          </Form.Item>
        )}
          {current === 1 && (
          <Button disabled={fileListProfile[0]?.status === 'error' || fileListCover[0]?.status === 'error' || !fileListProfile[0] || !fileListCover[0]} type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" disabled={!isChecked} onClick={completingSignUp}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
      </div>
    );
  };
  

export default RegistrationSteps