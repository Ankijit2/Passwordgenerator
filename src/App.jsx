import { useState,useCallback,useRef,useEffect } from 'react'

import './App.css'

function App() {
  const[password,setPassword]=useState("")
  const[length,setLength]=useState(8)
  const[character,setCharacter]=useState(false)
  const[number,setNumber]=useState(false)
  const[message,setMessage]=useState("")

const passwordGn= useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  let num="1234567890"
  let char="!@#$%^&*-_+=[]{}~`"

  if(number===true)str+=num
  if(character===true)str+=char

  for (let index = 0; index < length; index++) {
    let len=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(len)
    
  }

  setPassword(pass)
},[length,character,number,setPassword])

useEffect(()=>{
  passwordGn()
},[length, number, character, passwordGn])

const passwordcopy = useRef(null)

const copytoclipboard= useCallback(()=>{
  if(window.navigator.clipboard.writeText(password)){
    setMessage("copied to clipboard")
    setTimeout(() => {
      setMessage("")
    }, 1000);
  }
},[password],[message])



  return (
    <>
      <div className='flex flex-col bg-cyan-950 rounded-md p-6 h-max w-full'>

        <h1 className='text-center mb-4 text-cyan-600 text-xl'>Password generator</h1>
        <div>
          <input type="text" name="" id=""  className='w-96 mr-3 h-7 p-2 rounded-md' readOnly value={password}/>
          <button className='bg-white rounded-md py-0.5 px-2 text-cyan-600' onClick={copytoclipboard}>Copy</button>
        </div>
        <div className='mt-4 text-white'>
          <input type="range" name="" className="mr-3"id="characterlength"  min="8" max="20" value={length} onChange={(e)=>setLength(e.target.value)}/>
          <label htmlFor="characterlength" className='mr-4' ref={passwordcopy}>Length:{length}</label>
          <input type="checkbox" name="" id="character" defaultChecked={character} className='mr-3'   onChange={() => {
                  setCharacter((prev) => !prev )
              }}/>
          <label htmlFor="character" className='mr-4'>Character</label>
          <input type="checkbox" name="" id="number" className='mr-3'   onChange={() => {
              setNumber((prev) => !prev);
          }}/>
          <label htmlFor="number">Number</label>
        </div>
      </div>
      <div className='absolute text-white px-2 py-1'>{message}</div>
    </>
  )
}

export default App
