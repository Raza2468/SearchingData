import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import './task.css'


export const ApiSearch = () => {

    const url = "https://jsonplaceholder.typicode.com/"

    const [ValidId, setValidID] = useState(null);
    const [ShowData, setShowData] = useState([]);
    const [SaveDatalocalStorage, setSaveDatalocalStorage] = useState([]);
    const [realTime, setRealTime] = useState(false) // real time data

    useEffect(() => {
        axios({
            method: "get",
            url: url + `photos/${ValidId}`,

        }).then((res) => {
            setShowData(res.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [ValidId])


    function SaveData(i) {
        localStorage.setItem(i, JSON.stringify(ShowData))
        alert("Save")
        setRealTime(!realTime)
    }



    function ShowLocalData() {

        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(JSON.parse(localStorage.getItem(keys[i])));
        }
        setSaveDatalocalStorage(values)
    }

    useEffect(() => {
        ShowLocalData()
    }, [realTime])

    return (
        <div>

            <h1>Serching Data</h1>
            <h4>enter the number 1 to 5000</h4>



            {/* Show Api Search Data */}

            <input type="text" placeholder='Search name' onChange={(e) => setValidID(e.target.value)} />

            <br />
            <br />
            <br />

            <table id="customers">
                <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>img</th>
                    <th></th>
                </tr>
                <tr>
                    <td>{ShowData.id}</td>
                    <td>{ShowData.title}</td>
                    <td><img src={ShowData.url} width="100px" /></td>
                    <td><button onClick={() => SaveData(ShowData.id)} class="button button1">Save</button></td>
                </tr>
            </table>


            {/* Save Local Storage Data */}

            <div>
                <br />
                <br />
                <br />
                <br />
                <button onClick={() => ShowLocalData()} class="button button1">Show data</button>
                <br />

                <table id="customers">
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>img</th>
                    </tr>
                    {SaveDatalocalStorage.map((v, i) => {
                        return (
                            <tr>
                                <td>{v.id}</td>
                                <td>{v.title}</td>
                                <td><img src={v.url} width="100px" /></td>
                            </tr>
                        )
                    })}
                </table>

            </div>
        </div>

    )
}