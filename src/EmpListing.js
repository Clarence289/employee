import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();
    const [search, setSearch,] = useState('');


    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:3000/employee/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:3000/employee").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (

        <div className="container">
            <div className="card">
                <div className="card-title">
                    <div class="input-group mb-5">
                        <input onChange={(event) => setSearch(event.target.value)} style={{ float: 'center' }} type="text" class="form-control" placeholder="Search"
                            aria-describedby="button-addon" />
                        <button class="btn btn-outline-secondary" type="button" id="button-addon"><i class="bi bi-search"></i></button>
                    </div>



                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>position</td>
                                <td>Phone</td>
                                <td>Image</td>
                                <td>Action</td>

                            </tr>
                        </thead>
                        <tbody>

                            {empdata &&
                                empdata.filter((item) => {
                                    return search.toLowerCase() === '' ? item : item.id.toString().toLowerCase().includes(search.toLowerCase())
                                })
                                    .map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.position}</td>
                                            <td>{item.phone}</td>
                                            <td img src={item.image} style={{ height: 70, width: 70 }} >{item.image}</td>
                                            <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                                <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                                <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                            </td>
                                        </tr>
                                    ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmpListing;