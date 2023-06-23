
export const fileUpload = async( file ) => {
    if(!file) throw new Error("We don't have any files to upload.");
    const cloudUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append('upload_preset','react-task-app');
    formData.append('file',file);
    try {
        const resp = await fetch(cloudUrl,{method:'POST',body:formData});
        if(!resp.ok) throw new Error('Failed to upload image');
        const cloudResp = await resp.json();
        return cloudResp.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
} 