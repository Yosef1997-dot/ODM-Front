import styles from "./style.module.css"
import DiffBtwEmployees from '../DiffBtwEmployees'
import ListOfEmployees from "../ListOfEmployees"
import { useState } from "react"


export default function Main() {
    const [compareOrNot, setCompareOrNot] = useState(false)
    const [idsCheckedList, setIdsCheckedList] = useState([])

    return (
        <div className={styles.main}>
            <ListOfEmployees setIdsCheckedList = {setIdsCheckedList} idsCheckedList={idsCheckedList} setCompareOrNot={setCompareOrNot} />
            <DiffBtwEmployees idsCheckedList={idsCheckedList} compareOrNot ={compareOrNot}/>
        </div>
    )
}