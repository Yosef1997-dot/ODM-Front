import styles from "./style.module.css"
import axios from "axios";
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"


export default function Form() {

    // Location aloud you to get data from the previous page.
    // You should grab the state by the same name you gave him in the link
    const location = useLocation()
    const { employeeId } = location.state
    // Gets the details to fill up the form
    const [employee, setEmployee] = useState({})
    // Makes the decision if message: Detsild updated will be visible or not 
    const [updateMsg, setUpdateMsg] = useState(false)

    function setemployeeDetails() {
        axios.get(`http://localhost:5000/edit/${employeeId}`)
            .then(res => setEmployee(res.data))
    }

    useEffect(() => {
        setemployeeDetails()
    }, [])

    function handleOnChange(e) {
        setUpdateMsg(false)
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        axios.put(`http://localhost:5000/update/${employeeId}`, employee)
        setUpdateMsg(true)
    }

    return (
        <div className={styles.editForm}>
            <Link className={styles.backLink} to="/"> {`<Back`}</Link>
            <h1 className={styles.nameTitle}>{employee.name}</h1>
            <h3 className={styles.editTitle}>Edit details</h3>
            <form onSubmit={handleSubmit} >

                <div className={styles.inputsContainer}>

                    <span className={styles.spanTitle} >Address</span>
                    <input className={styles.inp} type="text" name={"address"} value={employee.address||''} onChange={(e) => handleOnChange(e)} required />

                    <span className={styles.spanTitle}>Phone</span>
                    <input className={styles.inp} type="text" name={"phone"} value={employee.phone||''} onChange={(e) => handleOnChange(e)} required />

                    <span className={styles.spanTitle}>Email</span>
                    <input className={styles.inp} type="email" name={"email"} value={employee.email||''} onChange={(e) => handleOnChange(e)} required />

                    <span className={styles.spanTitle}>Marital Status</span>
                    <select className={styles.inp} name={"maritalStatus"} id="" value={employee.maritalStatus||''} onChange={(e) => handleOnChange(e)} required>
                        <option value="single">single</option>
                        <option value="married">married</option>
                        <option value="divorced">divorced</option>
                        <option value="other">other</option>
                    </select>

                    <span className={styles.spanTitle}>Gender</span>
                    <select className={styles.inp} name={"gender"} id="" value={employee.gender||''} onChange={(e) => handleOnChange(e)} required>
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="prefer not to say">prefer not to say</option>
                    </select>

                </div>

                <div className={styles.buttonsContainer}>
                    <button className={styles.submitBtn} type="submit">Update</button>
                    <button type="button" className={styles.cancelBtn} onClick={() => setemployeeDetails()} >Cancel</button>
                </div>
                <p className={updateMsg ? styles.msgOn : styles.msgOff}>Details Updated</p>

            </form>
        </div>
    )
}