import React,{useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createCategory,getCategories,removeCategory} from '../../../functions/category'
import { Link } from "react-router-dom";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSerach from "../../../components/forms/LocalSearch";




const CategoryCreate = ()=>{
    const {user} = useSelector((state)=>({...state}));

    const [name,setName]= useState("")
    const [loading,setLoading] = useState(false)
    const [categories,setCategories] =useState([]);

    //for adding  filter and search categries (step1)
     const [keyword,setkeyword]= useState("")

    useEffect(()=>{
        loadCategories();

    },[])

    const loadCategories= ()=> getCategories().then((c) =>{
        setCategories(c.data)
    })


    const handleSubmit =(e)=>{
        e.preventDefault();
        // console.log(name);
        setLoading(true)
        createCategory({name},user.token)
        .then((res) =>{
            // console.log(res)
            setLoading(false)
            setName('');
            toast.success(`"${res.data.name}" is created`);
            loadCategories();
        })
        .catch((err) =>{
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })


    }
    // deleting mesage will pop up and get deleted when we press delete button
    const handleRemove = async (slug)=>{
    //   let answer =window.confirm("Delete?");
    //   console.log(answer,slug)
    if(window.confirm("Delete?")){
        setLoading(true);
        removeCategory(slug,user.token)
        .then((res) =>{
            setLoading(false);
            toast.error(`${res.data.name} deleted`);
            loadCategories();
        })
        .catch((err) =>{
            if (err.response.status === 400){
                setLoading(false);
                toast.error(err.response.data);
            }
        })
    }
    }


 

//step4
    const searched= (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return (
        <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'>
                <AdminNav/>
            </div>
            <div className='col'>
              {loading ?  (<h4 className="text-danger">Loading</h4>) : (<h4>Create Category</h4>) }
             
             
             <CategoryForm 
             handleSubmit={handleSubmit}
             name={name}
             setName={setName}
             
             />
              
                <LocalSerach keyword ={keyword} setkeyword={setkeyword}/>


              <br />
                {/*step 5 for filter and search categy*/}
                {categories.filter(searched(keyword)).map((c)=>(
                    <div className="alert alert-secondary" key={c.id}>
                        {c.name}
                         <span onClick={()=>
                            handleRemove(c.slug)
                         }
                          className="btn btn-sm float-right">
                            <DeleteOutlined className="text-danger"/>
                            </span> 
                        <Link to={`/admin/category/${c.slug}`}> 
                        <span className="btn btn-sm float-right">
                        <EditOutlined className="text-warning" />
                        </span>
                        
                        </Link>
                        </div>
                ))}
            </div>

        </div>

    </div>
    )
        
    
    }
export default CategoryCreate;