"use client";

import { useState, useCallback, useRef } from "react";
export function ShuffleMemberForm() {
    // 結果
    const [result, ssetResult] = useState([] as string[])

    // 要素への参照
    const firstRef = useRef<HTMLInputElement>(null)
    const secondRef = useRef<HTMLInputElement>(null)
    const thirdRef = useRef<HTMLInputElement>(null)

    // 通信
    const callApi = useCallback(async() => {
        const members = [] as string[]
        const refs = [firstRef, secondRef, thirdRef]
        // const refs = [firstRef, firstRef, firstRef]
        for (const ref of refs) {
            if (ref.current?.value) {
                members.push(ref.current.value)
            }
        }
        const res = await fetch("/api/shuffle", {
            method: "POST",
            body: JSON.stringify({members}),
        })
        if (res.ok) {
            const result = await res.json() as {members: string[]}
            ssetResult(result.members)
        }
    }, [])
    return (
        <>
        <label htmlFor="first">1人目</label>
        <input type="text" id="first" ref={firstRef} name="first" placeholder="1人目の名前を入力" />
        <label htmlFor="second">2人目</label>
        <input type="text" id="second" ref={secondRef} name="second" placeholder="2人目の名前を入力" />
        <label htmlFor="third">3人目</label>
        <input type="text" id="third" ref={thirdRef} name="third" placeholder="3人目の名前を入力" />
        <button onClick={callApi}>シャッフル</button><br/>
        <label htmlFor="result">結果</label><br/>
        <output id="result" htmlFor="first second third fourth">{result.join("→")}</output>
        </> 
    )
}