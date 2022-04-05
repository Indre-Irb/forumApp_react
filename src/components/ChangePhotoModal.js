import React, {useContext, useRef} from 'react';
import MyContext from "../context/MyContext";
import http from "../plugins/http";

const ChangePhotoModal = () => {

    const {getUser, setUser} = useContext(MyContext)
    const {setChangePhoto} = useContext(MyContext)
    const photoLink = useRef()

    async function changePhoto (id){
        const photoInfo = {
            id,
            photo: photoLink.current.value
        }
        http.post(photoInfo, `changePhoto`).then(res => {
            if(res.success){
                document.body.style.overflow = 'visible'
                setChangePhoto(false)
                setUser(res.updatedUser)
            }
        })
    }

    return (
        <div className="modal d-flex j-center al-center">
            <div className="modalBox d-flex s-evenly al-center f-column">
                <input type="text" ref={photoLink} placeholder="Enter photo link"/>
                <button onClick={()=> changePhoto(getUser._id)}>Change photo</button>
            </div>
        </div>
    );
};

export default ChangePhotoModal;