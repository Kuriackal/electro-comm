import React from "react";
import { Drawer, Button } from 'antd'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import laptop from '../../images/laptop.png'


const SideDrawer = () => {
    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({...state}));


    const imageStyle = {
        width: '100%',
        height: '50px',
        objectFit:'cover'
    }


    return (
        <div>
             <Drawer
            className="text-center"
            title={`Cart / ${cart.length} Product`}
            placement="right"
            closable={false}
            onClose={() => {
                dispatch({
                    type: "SET_VISIBLE",
                    payload: false
                })
            }}
            open={drawer}
            >
            {/* {JSON.stringify(cart)} */}
            {cart.map((p) => {
             
                <div key={p._id} className="row">
                    <div className="col">
                        {p.images[0] ? (
                            <div>
                                 <img src={p.images[0].url} style={imageStyle} />
                                <p className="text-center bg-secondary text-light">
                                {p.title} x {p.count}
                                </p>

                            </div>
                            
                               
                            
                        ) : (
                            <div>
                                 <img src={laptop} style={imageStyle} />
                                <p className="text-center bg-secondary text-light">
                                    {p.title} x {p.count}
                                </p>

                            </div>
                                  
                        )}

                    </div>

                </div>
            })}

            <Link to="/cart" >
                <button onClick={()=>{
                    dispatch({
                        type:"SET_VISIBLE",
                        payload:false
                    })
                }}
                
                className="text-center btn btn-primary btn-block">
                    Go To Cart

                </button>

            </Link>


        </Drawer>

        </div>
       
    )

}
export default SideDrawer;