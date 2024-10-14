import Board from "../components/Board"
import styles from "./page.module.css"

export default function Page(){
    return (
        <div className={styles["container"]}>
      
        <button className={styles["play-online-button"]}>Play online</button>
        <Board/>
      </div> 
    )
}