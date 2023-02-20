import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import axios from '../../../axios';
import { bindActionCreators } from 'redux';
import {useNavigate} from "react-router-dom"
import { actionCreaters } from '../../../State/index';


function EditUser() {
    const details = useSelector(state=>state); 
    const initialVlaues = { name: details.data.name, email:details.data.email  };
    const [formValues, setFormValues] = useState(initialVlaues);
    const navigate = useNavigate();
    const [errors,setErrors] = useState({});
    console.log(details);
    const onChangeHandle = (event) => {
    const { name, value } = event.target; 
    setFormValues({ ...formValues, [name]: value }); 
  };

  const dispatch = useDispatch();
    const {storeToken} = bindActionCreators(actionCreaters,dispatch);

  const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post(`http://localhost:9000/admin/editUser/${details.data.id}`,{
            name: formValues.name,
            email: formValues.email,
        }).then((response)=>{
            const data = {
                token:response.data.token,
                id:""
            }
            storeToken(data);
            navigate('/admin/home');
        }).catch((error)=>{
            setErrors(error.response.data);
        })
       
    }   


  return (
    <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-4">
                    <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    name="name"
                    value={formValues.name}
                    onChange={onChangeHandle}
                    />
                    {errors && <p style={{color:"red"}}>{errors.name}</p>}
                </div>
                <div className="form-group mt-4">
                    <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    value={formValues.email}
                    onChange={onChangeHandle}
                    />
                    {errors && <p style={{color:"red"}}>{errors.email}</p>}
                </div>
                <div className="form-group mt-4">
                    <button type="submit" className="btn btn-primary">
                        Register User
                    </button>
                </div>
            </form>
        </div>
  )
}

export default EditUser