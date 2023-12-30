import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const[length , setLength] = useState(6)
  const[numberAllowed , setNumberAllowed] = useState(false)
  const[charAllowed , setCharAllowed] = useState(false)
  const[password , setPassword] = useState("")
  const[copy , setCopy] = useState("copy")
   
  const passRef = useRef(null)
  const passwordGenerator = useCallback ( () => {
      let pass = ""
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      if(numberAllowed){
        str+='1234567890'
      }
      if(charAllowed){
        str+="~`!@#$%^&*()-+=|\}]{[?"
      }
      for (let i=1;i<=length;i++){
       let char = Math.floor(Math.random() * str.length + 1)
       pass+=str.charAt(char)
      }

      setPassword(pass)
  } , [length,charAllowed,numberAllowed,setPassword])

  const copyPasswordToClip = useCallback( () =>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    },
    [password] )

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-slate-100">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} readOnly placeholder="Password" className="outline-none w-full py-3 px-3" ref={passRef} />
          <button className="outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0" onClick={copyPasswordToClip}>{copy}</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-2">
            <input type="range" min={6} max={50} value={length} className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}} />
            <label>Length : {length}</label>
            <div className="flex items-center gap-x-2">
              <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{setNumberAllowed((p) => !p)}} />
              <label htmlFor="numberInput">Number</label>
            </div>
            <div className="flex items-center gap-x-2">
              <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={()=>{setCharAllowed((p) => !p)}} />
              <label htmlFor="charInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
